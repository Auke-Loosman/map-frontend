import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/auth/LoginPage.vue'
import RegisterPage from '../pages/auth/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      component: LoginPage,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      component: RegisterPage,
      meta: { guestOnly: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.meta.guestOnly && token) {
    return next('/')
  }

  next()
})

export default router
