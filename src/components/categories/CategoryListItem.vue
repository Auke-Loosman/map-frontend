<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '../../types/Category'

const props = defineProps<{
  category: Category
}>()

const emit = defineEmits<{
  (e: 'update', id: string, name: string): void
  (e: 'delete', id: string): void
}>()

const editing = ref(false)
const name = ref(props.category.name)

function startEdit() {
  name.value = props.category.name
  editing.value = true
}

function save() {
  emit('update', props.category.id, name.value)
  editing.value = false
}

function remove() {
  if (!confirm('Delete this category?')) return
  emit('delete', props.category.id)
}
</script>

<template>
  <v-list-item>
    <!-- NORMAL MODE -->
    <v-list-item-title v-if="!editing">
      {{ props.category.name }}
    </v-list-item-title>

    <!-- EDIT MODE -->
    <v-text-field v-else v-model="name" density="compact" hide-details />

    <template #append>
      <div class="d-flex ga-1">
        <!-- NORMAL ACTIONS -->
        <template v-if="!editing">
          <v-btn icon="mdi-pencil" variant="text" size="small" @click="startEdit" />

          <v-btn icon="mdi-delete" variant="text" size="small" color="error" @click="remove" />
        </template>

        <!-- EDIT ACTIONS -->
        <template v-else>
          <v-btn icon="mdi-check" variant="text" size="small" color="primary" @click="save" />

          <v-btn icon="mdi-close" variant="text" size="small" @click="editing = false" />
        </template>
      </div>
    </template>
  </v-list-item>
</template>
