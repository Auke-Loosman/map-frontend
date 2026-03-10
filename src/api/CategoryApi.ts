import type { Category } from '../types/Category'

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories')

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
