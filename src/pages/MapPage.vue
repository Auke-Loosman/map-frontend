<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { LatLngBounds } from 'leaflet'

import MapView from '../components/map/MapView.vue'
import MapLegend from '../components/map/MapLegend.vue'
import CreateItemDialog from '../components/map/CreateItemDialog.vue'
import ItemSidebar from '../components/items/ItemSidebar.vue'

import { useItems } from '../composables/useItems'
import { useCategories } from '../composables/useCategories'

import type { Item } from '../types/Item'

const { items, loadItemsInBounds, createItem } = useItems()
const { categories, loadCategories } = useCategories()

const activeCategories = ref<string[]>([])

const dialogOpen = ref(false)
const clickedLat = ref<number | null>(null)
const clickedLng = ref<number | null>(null)

onMounted(async () => {
  await loadCategories()
})

function handleBoundsChanged(bounds: LatLngBounds) {
  loadItemsInBounds({
    north: bounds.getNorth(),
    south: bounds.getSouth(),
    east: bounds.getEast(),
    west: bounds.getWest(),
  })
}

function toggleCategory(id: string) {
  const index = activeCategories.value.indexOf(id)

  if (index === -1) {
    activeCategories.value.push(id)
  } else {
    activeCategories.value.splice(index, 1)
  }
}

function handleMapDoubleClick(lat: number, lng: number) {
  clickedLat.value = lat
  clickedLng.value = lng
  dialogOpen.value = true
}

async function handleCreate(payload: { name: string; description: string; categoryId: string }) {
  if (clickedLat.value === null || clickedLng.value === null) return

  await createItem(
    payload.name,
    payload.description,
    payload.categoryId,
    clickedLat.value,
    clickedLng.value,
  )
}

const filteredItems = computed<Item[]>(() => {
  return items.value.filter((item: Item) => activeCategories.value.includes(item.categoryId))
})
</script>

<template>
  <v-container fluid class="pa-0">
    <MapView
      :items="filteredItems"
      :categories="categories"
      @map-dblclick="handleMapDoubleClick"
      @bounds-changed="handleBoundsChanged"
    />

    <MapLegend
      :categories="categories"
      :activeCategories="activeCategories"
      @toggle-category="toggleCategory"
    />

    <CreateItemDialog
      v-model="dialogOpen"
      :latitude="clickedLat"
      :longitude="clickedLng"
      :categories="categories"
      @create="handleCreate"
    />

    <ItemSidebar :categories="categories" />
  </v-container>
</template>
