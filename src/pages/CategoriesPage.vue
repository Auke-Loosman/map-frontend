<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategories } from '../composables/useCategories'

const { categories, loadCategories, addCategory } = useCategories()

const newCategory = ref('')

async function submit() {
  if (!newCategory.value) return

  await addCategory(newCategory.value)

  newCategory.value = ''
}

onMounted(loadCategories)
</script>

<template>
  <v-container>
    <v-card class="mb-4">
      <v-card-title>Create Category</v-card-title>

      <v-card-text>
        <v-text-field label="Category name" v-model="newCategory" />

        <v-btn color="primary" @click="submit"> Create </v-btn>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Categories</v-card-title>

      <v-list>
        <v-list-item v-for="category in categories" :key="category.id">
          {{ category.name }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>
