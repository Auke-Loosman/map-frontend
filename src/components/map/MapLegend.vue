<script setup lang="ts">
import type { Category } from '../../types/Category'

const props = defineProps<{
  categories: Category[]
  activeCategories: string[]
}>()

const emit = defineEmits<{
  (e: 'toggle-category', id: string): void
}>()
</script>

<template>
  <div class="legend">
    <div class="legend-title">Categories</div>

    <div
      v-for="category in categories"
      :key="category.id"
      class="legend-item"
      @click="emit('toggle-category', category.id)"
    >
      <div class="legend-color" :style="{ background: category.color }" />

      <span class="legend-label">
        {{ category.name }}
      </span>

      <v-checkbox
        :model-value="activeCategories.includes(category.id)"
        density="compact"
        hide-details
      />
    </div>
  </div>
</template>

<style scoped>
.legend {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  padding: 14px;
  border-radius: 8px;
  width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.legend-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 0;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-label {
  flex: 1;
}
</style>
