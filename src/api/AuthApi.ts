const API = '/api'

import type { AuthResponse } from '../types/AuthResponse'

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (!res.ok) {
    throw new Error('Login failed')
  }

  return res.json()
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (!res.ok) {
    throw new Error('Registration failed')
  }

  return res.json()
}
