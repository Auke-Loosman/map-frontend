import { ref } from 'vue'
import type { Item } from '../types/Item'
import * as ItemApi from '../api/ItemApi'

const items = ref<Item[]>([])
const selectedItem = ref<Item | null>(null)

const loading = ref(false)
const error = ref<string | null>(null)

export function useItems() {
  async function loadItems() {
    loading.value = true
    error.value = null

    try {
      items.value = await ItemApi.getItems()
    } catch (err) {
      console.error(err)
      error.value = 'Failed to load items'
    } finally {
      loading.value = false
    }
  }

  async function loadItemsInBounds(bounds: {
    north: number
    south: number
    east: number
    west: number
  }) {
    loading.value = true
    error.value = null

    try {
      items.value = await ItemApi.getItemsInBounds(bounds)
    } catch (err) {
      console.error(err)
      error.value = 'Failed to load items in bounds'
    } finally {
      loading.value = false
    }
  }

  async function createItem(
    name: string,
    description: string,
    categoryId: string,
    latitude: number,
    longitude: number,
  ) {
    loading.value = true
    error.value = null

    try {
      const item = await ItemApi.createItem(name, description, categoryId, latitude, longitude)

      items.value.push(item)

      return item
    } catch (err) {
      console.error(err)
      error.value = 'Failed to create item'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateItem(
    id: string,
    name: string,
    description: string,
    categoryId: string,
    metadata: { key: string; value: string }[],
  ) {
    loading.value = true
    error.value = null

    try {
      await ItemApi.updateItem(id, name, description, categoryId, metadata)

      await loadItems()

      const updated = items.value.find((i) => i.id === id) || null

      if (selectedItem.value?.id === id) {
        selectedItem.value = updated
      }

      return updated
    } catch (err) {
      console.error(err)
      error.value = 'Failed to update item'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteItem(id: string) {
    loading.value = true
    error.value = null

    try {
      await ItemApi.deleteItem(id)

      items.value = items.value.filter((item) => item.id !== id)

      if (selectedItem.value?.id === id) {
        selectedItem.value = null
      }
    } catch (err) {
      console.error(err)
      error.value = 'Failed to delete item'
      throw err
    } finally {
      loading.value = false
    }
  }

  function selectItem(item: Item) {
    selectedItem.value = item
  }

  function clearSelectedItem() {
    selectedItem.value = null
  }

  return {
    items,
    selectedItem,
    loading,
    error,
    loadItems,
    loadItemsInBounds,
    createItem,
    updateItem,
    deleteItem,
    selectItem,
    clearSelectedItem,
  }
}
