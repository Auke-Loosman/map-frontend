<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Item } from '../../types/Item'
import type { Category } from '../../types/Category'

import ItemMetadataEditor from './ItemMetadataEditor.vue'

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
      metadata: { key: string; value: string }[]
    },
  ): void
  (e: 'cancel'): void
}>()

const name = ref('')
const description = ref('')
const categoryId = ref('')
const metadata = ref<{ key: string; value: string }[]>([])

watch(
  () => props.item,
  (item) => {
    name.value = item.name
    description.value = item.description
    categoryId.value = item.categoryId
    metadata.value = item.metadata ? [...item.metadata] : []
  },
  { immediate: true },
)

function handleSave() {
  emit('save', {
    name: name.value,
    description: description.value,
    categoryId: categoryId.value,
    metadata: metadata.value,
  })
}

function updateMetadata(newMetadata: { key: string; value: string }[]) {
  metadata.value = newMetadata
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

    <ItemMetadataEditor :metadata="metadata" @update="updateMetadata" />
  </v-card-text>

  <v-divider />

  <v-card-actions class="justify-space-between">
    <v-btn variant="text" @click="emit('cancel')"> Cancel </v-btn>

    <v-btn color="primary" @click="handleSave"> Save </v-btn>
  </v-card-actions>
</template>
