<script setup lang="ts">
import type { Category } from '../../types/Category'

defineProps<{
  categories: Category[]
  activeCategories: string[]
}>()

const emit = defineEmits<{
  (e: 'toggle-category', id: string): void
}>()

function toggle(id: string) {
  emit('toggle-category', id)
}
</script>

<template>
  <div class="legend">
    <div class="legend-title">Categories</div>

    <div
      v-for="category in categories"
      :key="category.id"
      class="legend-item"
      @click="toggle(category.id)"
    >
      <div class="legend-color" :style="{ background: category.color }" />

      <div class="legend-name">
        {{ category.name }}
      </div>

      <v-checkbox
        :model-value="activeCategories.includes(category.id)"
        density="compact"
        hide-details
        @click.stop="toggle(category.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.legend {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 220px;
  background: white;
  color: #222; /* fixes invisible text */
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.legend-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: #222;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  cursor: pointer;
  color: #222;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.legend-name {
  flex: 1;
  font-size: 14px;
  color: #222;
}
</style>
