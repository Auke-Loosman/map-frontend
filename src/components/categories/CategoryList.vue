<script setup lang="ts">
import CategoryListItem from './CategoryListItem.vue'
import type { Category } from '../../types/Category'

defineProps<{
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'update', id: string, name: string): void
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <v-card>
    <v-card-title> Categories </v-card-title>

    <v-list>
      <CategoryListItem
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @update="(id, name) => emit('update', id, name)"
        @delete="(id) => emit('delete', id)"
      />
    </v-list>
  </v-card>
</template>
