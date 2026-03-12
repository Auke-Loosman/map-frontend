<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Item } from '../../types/Item'
import type { Category } from '../../types/Category'

const props = defineProps<{
  item: Item
  categories: Category[]
}>()

const emit = defineEmits<{
  (
    e: 'save',
    payload: {
      name: string
      description: string
      categoryId: string
    },
  ): void
  (e: 'cancel'): void
}>()

const name = ref('')
const description = ref('')
const categoryId = ref('')

watch(
  () => props.item,
  (item) => {
    name.value = item.name
    description.value = item.description
    categoryId.value = item.categoryId
  },
  { immediate: true },
)

function handleSave() {
  emit('save', {
    name: name.value,
    description: description.value,
    categoryId: categoryId.value,
  })
}
</script>

<template>
  <v-card-text>
    <v-text-field v-model="name" label="Name" />

    <v-textarea v-model="description" label="Description" rows="3" />

    <v-select
      v-model="categoryId"
      :items="categories"
      item-title="name"
      item-value="id"
      label="Category"
    />
  </v-card-text>

  <v-divider />

  <v-card-actions class="justify-space-between">
    <v-btn variant="text" @click="emit('cancel')"> Cancel </v-btn>

    <v-btn color="primary" @click="handleSave"> Save </v-btn>
  </v-card-actions>
</template>
