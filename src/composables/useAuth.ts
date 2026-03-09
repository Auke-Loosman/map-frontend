import { ref } from 'vue'
import * as AuthApi from '../api/AuthApi'
import type { User } from '../types/User'

const token = ref<string | null>(localStorage.getItem('token'))

const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))

export function useAuth() {
  async function login(email: string, password: string) {
    const response = await AuthApi.login(email, password)

    token.value = response.token
    user.value = response.user

    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
  }

  async function register(email: string, password: string) {
    await AuthApi.register(email, password)
  }

  function logout() {
    token.value = null
    user.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    token,
    user,
    login,
    register,
    logout,
  }
}
