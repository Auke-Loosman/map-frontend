<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'create', name: string): void
}>()

const name = ref('')

function submit() {
  if (!name.value) return

  emit('create', name.value)
  name.value = ''
}
</script>

<template>
  <v-card class="mb-6">
    <v-card-title> Create Category </v-card-title>

    <v-card-text class="d-flex align-center">
      <v-text-field label="Category name" v-model="name" class="mr-4" />

      <v-btn color="primary" @click="submit"> Create </v-btn>
    </v-card-text>
  </v-card>
</template>
