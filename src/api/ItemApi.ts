import type { Item } from '../types/Item'

const API_URL = 'http://localhost:8000/api/items'

function getAuthHeaders() {
  const token = localStorage.getItem('token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export async function getItems(): Promise<Item[]> {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch items')
  }

  return response.json()
}

export async function createItem(
  name: string,
  description: string,
  categoryId: string,
  latitude: number,
  longitude: number,
): Promise<Item> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name,
      description,
      categoryId,
      latitude,
      longitude,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to create item')
  }

  return response.json()
}

export async function updateItem(
  id: string,
  name: string,
  description: string,
  categoryId: string,
): Promise<Item> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name,
      description,
      categoryId,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to update item')
  }

  return response.json()
}

export async function deleteItem(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to delete item')
  }
}
