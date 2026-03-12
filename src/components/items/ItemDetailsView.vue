<script setup lang="ts">
import type { Item } from '../../types/Item'
import type { Category } from '../../types/Category'

const props = defineProps<{
  item: Item
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

function getCategoryName(categoryId: string) {
  const category = props.categories.find((c) => c.id === categoryId)
  return category ? category.name : 'Unknown'
}
</script>

<template>
  <v-card-text>
    <div class="mb-4">
      <strong>Name</strong>
      <div>{{ item.name }}</div>
    </div>

    <div class="mb-4">
      <strong>Description</strong>
      <div>{{ item.description }}</div>
    </div>

    <div class="mb-4">
      <strong>Category</strong>
      <div>{{ getCategoryName(item.categoryId) }}</div>
    </div>

    <div class="mb-4">
      <strong>Coordinates</strong>
      <div>{{ item.latitude }}, {{ item.longitude }}</div>
    </div>

    <div v-if="item.metadata?.length" class="mb-4">
      <strong>Metadata</strong>

      <v-list density="compact">
        <v-list-item v-for="meta in item.metadata" :key="meta.key">
          <v-list-item-title>{{ meta.key }}</v-list-item-title>
          <v-list-item-subtitle>{{ meta.value }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </div>
  </v-card-text>

  <v-divider />

  <v-card-actions class="justify-space-between">
    <v-btn color="error" variant="text" @click="emit('delete')"> Delete </v-btn>

    <v-btn color="primary" @click="emit('edit')"> Edit </v-btn>
  </v-card-actions>
</template>
