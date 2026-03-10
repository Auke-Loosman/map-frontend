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

function save() {
  emit('update', props.category.id, name.value)
  editing.value = false
}
</script>

<template>
  <v-list-item class="d-flex align-center">
    <template v-if="editing">
      <v-text-field v-model="name" density="compact" class="mr-4" />

      <v-btn color="primary" size="small" @click="save"> Save </v-btn>
    </template>

    <template v-else>
      <span>
        {{ category.name }}
      </span>

      <v-spacer />

      <v-btn icon size="small" variant="text" @click="editing = true"> ✏️ </v-btn>

      <v-btn icon size="small" variant="text" @click="emit('delete', category.id)"> 🗑️ </v-btn>
    </template>
  </v-list-item>
</template>
