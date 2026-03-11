<script setup lang="ts">
import { watch } from 'vue'
import L from 'leaflet'
import type { Item } from '../../types/Item'

const props = defineProps<{
  map: L.Map
  items: Item[]
}>()

let markers: L.Marker[] = []

watch(
  () => props.items,
  (items) => {
    markers.forEach((marker) => marker.remove())
    markers = []

    items.forEach((item) => {
      const marker = L.marker([item.latitude, item.longitude]).addTo(props.map).bindPopup(item.name)

      markers.push(marker)
    })
  },
  { immediate: true },
)
</script>
