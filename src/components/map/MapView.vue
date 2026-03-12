<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet.markercluster'

import { useItems } from '../../composables/useItems'

import type { Item } from '../../types/Item'
import type { Category } from '../../types/Category'

interface MarkerClusterGroup extends L.LayerGroup {
  addLayer(layer: L.Layer): this
  clearLayers(): this
}

const props = defineProps<{
  items: Item[]
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'map-dblclick', lat: number, lng: number): void
}>()

const { selectItem } = useItems()

const mapContainer = ref<HTMLDivElement | null>(null)

let map: L.Map
let markerCluster: MarkerClusterGroup

function createColoredIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${color};
      width:16px;
      height:16px;
      border-radius:50%;
      border:2px solid white;
      box-shadow:0 0 4px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [16, 16],
  })
}

onMounted(() => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView([52.52, 5.75], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  markerCluster = (
    L as unknown as {
      markerClusterGroup(): MarkerClusterGroup
    }
  ).markerClusterGroup()

  map.addLayer(markerCluster)

  map.on('dblclick', (event: L.LeafletMouseEvent) => {
    emit('map-dblclick', event.latlng.lat, event.latlng.lng)
  })
})

watch(
  () => props.items,
  (items) => {
    if (!map || !markerCluster) return

    markerCluster.clearLayers()

    items.forEach((item) => {
      const category = props.categories.find((c) => c.id === item.categoryId)

      const icon = createColoredIcon(category?.color || '#888')

      const marker = L.marker([item.latitude, item.longitude], { icon })

      marker.on('click', () => {
        map.flyTo([item.latitude, item.longitude], map.getZoom())

        selectItem(item)
      })

      markerCluster.addLayer(marker)
    })
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div ref="mapContainer" class="map"></div>
</template>

<style scoped>
.map {
  height: calc(100vh - 64px);
  width: 100%;
}
</style>
