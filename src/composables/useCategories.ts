import { ref } from 'vue'
import * as CategoryApi from '../api/CategoryApi'
import type { Category } from '../types/Category'
import { useAuth } from './useAuth'

const categories = ref<Category[]>([])

export function useCategories() {
  const { user } = useAuth()

  async function loadCategories() {
    if (!user.value) return

    categories.value = await CategoryApi.fetchCategories(user.value.id)
  }

  async function addCategory(name: string) {
    if (!user.value) return

    const category = await CategoryApi.createCategory(name, user.value.id)

    categories.value.push(category)
  }

  async function updateCategory(id: string, name: string) {
    await CategoryApi.updateCategory(id, name)

    const category = categories.value.find((c) => c.id === id)

    if (category) {
      category.name = name
    }
  }

  async function deleteCategory(id: string) {
    await CategoryApi.deleteCategory(id)

    categories.value = categories.value.filter((c) => c.id !== id)
  }

  return {
    categories,
    loadCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  }
}
