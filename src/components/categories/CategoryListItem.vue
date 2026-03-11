<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '../../types/Category'

const props = defineProps<{
  category: Category
}>()

const emit = defineEmits<{
  (e: 'update', id: string, name: string, color: string): void
  (e: 'delete', id: string): void
}>()

const editing = ref(false)

const name = ref(props.category.name)
const color = ref(props.category.color)

function startEdit() {
  name.value = props.category.name
  color.value = props.category.color
  editing.value = true
}

function save() {
  emit('update', props.category.id, name.value, color.value)
  editing.value = false
}

function cancel() {
  editing.value = false
}

function remove() {
  if (!confirm('Delete this category?')) return
  emit('delete', props.category.id)
}
</script>

<template>
  <v-list-item>
    <!-- Display mode -->
    <template v-if="!editing">
      <v-list-item-title class="d-flex align-center ga-2">
        <div class="color-indicator" :style="{ background: props.category.color }" />

        {{ props.category.name }}
      </v-list-item-title>
    </template>

    <!-- Edit mode -->
    <template v-else>
      <div class="d-flex ga-2 w-100 align-center">
        <v-text-field v-model="name" density="compact" hide-details label="Name" />

        <v-text-field
          v-model="color"
          type="color"
          density="compact"
          hide-details
          label="Color"
          style="max-width: 80px"
        />
      </div>
    </template>

    <template #append>
      <div class="d-flex ga-1">
        <template v-if="!editing">
          <v-btn icon="mdi-pencil" variant="text" size="small" @click="startEdit" />

          <v-btn icon="mdi-delete" variant="text" size="small" color="error" @click="remove" />
        </template>

        <template v-else>
          <v-btn icon="mdi-check" variant="text" size="small" color="primary" @click="save" />

          <v-btn icon="mdi-close" variant="text" size="small" @click="cancel" />
        </template>
      </div>
    </template>
  </v-list-item>
</template>

<style scoped>
.color-indicator {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
