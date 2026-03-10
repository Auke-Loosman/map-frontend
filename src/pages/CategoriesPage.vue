<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategories } from '../composables/useCategories'

import CategoryCreateForm from '../components/categories/CategoryCreateForm.vue'
import CategoryList from '../components/categories/CategoryList.vue'

const { categories, loadCategories, addCategory, updateCategory, deleteCategory } = useCategories()

onMounted(loadCategories)
</script>

<template>
  <v-container>
    <CategoryCreateForm @create="addCategory" />

    <CategoryList :categories="categories" @update="updateCategory" @delete="deleteCategory" />
  </v-container>
</template>
