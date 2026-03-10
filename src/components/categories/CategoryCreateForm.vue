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
  <v-card elevation="3">
    <v-card-title class="text-h6"> Create Category </v-card-title>

    <v-card-text>
      <div class="d-flex align-center">
        <v-text-field
          label="Category name"
          v-model="name"
          hide-details
          density="comfortable"
          class="flex-grow-1 mr-4"
        />

        <v-btn color="primary" prepend-icon="mdi-plus" @click="submit"> Create </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
