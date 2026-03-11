<script setup lang="ts">
import type { Item } from '../../types/Item'
import type { Category } from '../../types/Category'
import ItemMetadataRenderer from '../items/ItemMetadataRenderer.vue'

defineProps<{
  item: Item
  category?: Category
}>()
</script>

<template>
  <div class="popup">
    <div class="title">
      {{ item.name }}
    </div>

    <div class="category">
      {{ category?.name }}
    </div>

    <div class="description">
      {{ item.description }}
    </div>

    <div v-if="item.metadata?.length">
      <ItemMetadataRenderer v-for="m in item.metadata" :key="m.key" :metadata="m" />
    </div>
  </div>
</template>

<style scoped>
.popup {
  min-width: 200px;
}

.title {
  font-weight: bold;
}

.category {
  font-size: 12px;
  opacity: 0.7;
}

.description {
  margin: 6px 0;
}
</style>
