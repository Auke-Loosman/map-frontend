import { ref } from 'vue'
import type { Item } from '../types/Item'
import * as ItemApi from '../api/ItemApi'

const items = ref<Item[]>([])
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

  return {
    items,
    loading,
    error,
    loadItems,
    createItem,
  }
}
