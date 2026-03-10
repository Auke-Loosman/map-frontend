import { ref } from 'vue'
import * as CategoryApi from '../api/CategoryApi'
import type { Category } from '../types/Category'
import { useAuth } from './useAuth'

const categories = ref<Category[]>([])

export function useCategories() {
  const { user } = useAuth()

  async function loadCategories() {
    categories.value = await CategoryApi.fetchCategories()
  }

  async function addCategory(name: string) {
    if (!user.value) return

    const category = await CategoryApi.createCategory(name, user.value.id)

    categories.value.push(category)
  }

  return {
    categories,
    loadCategories,
    addCategory,
  }
}
