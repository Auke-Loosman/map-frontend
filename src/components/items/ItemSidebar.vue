<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import ItemDetailsView from './ItemDetailsView.vue'
import ItemBasicForm from './ItemBasicForm.vue'

import { useItems } from '../../composables/useItems'
import type { Category } from '../../types/Category'

defineProps<{
  categories: Category[]
}>()

const { selectedItem, clearSelectedItem, updateItem, deleteItem, loading } = useItems()

const mode = ref<'view' | 'edit'>('view')

const isOpen = computed({
  get: () => selectedItem.value !== null,
  set: (value: boolean) => {
    if (!value) close()
  },
})

function close() {
  if (loading.value) return
  mode.value = 'view'
  clearSelectedItem()
}

function enableEdit() {
  mode.value = 'edit'
}

async function handleSave(payload: {
  name: string
  description: string
  categoryId: string
  metadata: { key: string; value: string }[]
}) {
  if (!selectedItem.value) return

  await updateItem(
    selectedItem.value.id,
    payload.name,
    payload.description,
    payload.categoryId,
    payload.metadata,
  )

  // force exit edit mode after save
  mode.value = 'view'
}

async function handleDelete() {
  if (!selectedItem.value) return

  await deleteItem(selectedItem.value.id)

  close()
}

/**
 * IMPORTANT FIX
 * If selectedItem changes (after reloadItems),
 * always reset sidebar to view mode
 */
watch(
  () => selectedItem.value,
  () => {
    mode.value = 'view'
  },
)
</script>

<template>
  <v-navigation-drawer v-model="isOpen" location="right" width="380" temporary>
    <v-card v-if="selectedItem">
      <v-card-title class="d-flex justify-space-between align-center">
        {{ mode === 'view' ? 'Item Details' : 'Edit Item' }}

        <v-btn icon="mdi-close" variant="text" @click="close" />
      </v-card-title>

      <v-divider />

      <ItemDetailsView
        v-if="mode === 'view'"
        :item="selectedItem"
        :categories="categories"
        @edit="enableEdit"
        @delete="handleDelete"
      />

      <ItemBasicForm
        v-if="mode === 'edit'"
        :item="selectedItem"
        :categories="categories"
        @save="handleSave"
      />
    </v-card>
  </v-navigation-drawer>
</template>
