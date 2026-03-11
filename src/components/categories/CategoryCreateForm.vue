<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'create', name: string, color: string): void
}>()

const name = ref('')
const color = ref('#888888')

function createCategory() {
  if (!name.value) return

  emit('create', name.value, color.value)

  name.value = ''
  color.value = '#888888'
}
</script>

<template>
  <v-card class="mb-4">
    <v-card-text>
      <v-text-field v-model="name" label="Category name" variant="outlined" />

      <v-text-field v-model="color" label="Color" type="color" variant="outlined" />

      <v-btn color="primary" class="mt-2" @click="createCategory"> Create Category </v-btn>
    </v-card-text>
  </v-card>
</template>
