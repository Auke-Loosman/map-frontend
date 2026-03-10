import type { Category } from '../types/Category'

export async function fetchCategories(userId: string): Promise<Category[]> {
  const res = await fetch(`/api/categories?userId=${userId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }

  return res.json()
}

export async function createCategory(name: string, userId: string): Promise<Category> {
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      userId,
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to create category')
  }

  return res.json()
}

export async function updateCategory(id: string, name: string) {
  const res = await fetch(`/api/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to update category')
  }
}

export async function deleteCategory(id: string) {
  const res = await fetch(`/api/categories/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete category')
  }
}
