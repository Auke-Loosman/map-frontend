<script setup lang="ts">
import { computed, ref } from 'vue'

import ItemDetailsView from './ItemDetailsView.vue'
import ItemBasicForm from './ItemBasicForm.vue'

import { useItems } from '../../composables/useItems'
import type { Category } from '../../types/Category'

const { categories } = defineProps<{
  categories: Category[]
}>()

const { selectedItem, clearSelectedItem, updateItem, deleteItem } = useItems()

const mode = ref<'view' | 'edit'>('view')

const isOpen = computed(() => selectedItem.value !== null)

function close() {
  mode.value = 'view'
  clearSelectedItem()
}

function enableEdit() {
  mode.value = 'edit'
}

function cancelEdit() {
  mode.value = 'view'
}

async function handleSave(payload: { name: string; description: string; categoryId: string }) {
  if (!selectedItem.value) return

  await updateItem(selectedItem.value.id, payload.name, payload.description, payload.categoryId)

  mode.value = 'view'
}

async function handleDelete() {
  if (!selectedItem.value) return

  await deleteItem(selectedItem.value.id)
  close()
}
</script>

<template>
  <v-navigation-drawer v-model="isOpen" location="right" width="380" temporary>
    <v-card v-if="selectedItem" class="d-flex flex-column" height="100%">
      <v-card-title class="d-flex justify-space-between align-center">
        {{ mode === 'view' ? 'Item Details' : 'Edit Item' }}

        <v-btn icon="mdi-close" variant="text" @click="close" />
      </v-card-title>

      <v-divider />

      <div class="flex-grow-1 overflow-y-auto">
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
          @cancel="cancelEdit"
        />
      </div>
    </v-card>
  </v-navigation-drawer>
</template>
