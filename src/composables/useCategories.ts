import { ref } from 'vue'
import * as CategoryApi from '../api/CategoryApi'
import type { Category } from '../types/Category'
import { useAuth } from './useAuth'

const categories = ref<Category[]>([])

export function useCategories() {
  const { user } = useAuth()

  async function loadCategories() {
    if (!user.value) return

    categories.value = await CategoryApi.getCategories()
  }

  async function addCategory(name: string, color: string) {
    if (!user.value) return

    const category = await CategoryApi.createCategory(name, color)

    categories.value.push(category)
  }

  async function updateCategory(id: string, name: string, color: string) {
    const updated = await CategoryApi.updateCategory(id, name, color)

    const index = categories.value.findIndex((c) => c.id === id)

    if (index !== -1) {
      categories.value[index] = updated
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
