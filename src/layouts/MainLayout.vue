<script setup lang="ts">
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { user, logout } = useAuth()
const router = useRouter()

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable">
      <div class="d-flex align-center">
        <v-app-bar-title class="mr-6"> Map Item Manager </v-app-bar-title>

        <v-btn v-if="user" variant="text" to="/categories"> Categories </v-btn>
      </div>

      <v-spacer />
      <template v-if="!user">
        <v-btn variant="text" to="/login"> Login </v-btn>

        <v-btn variant="text" to="/register"> Register </v-btn>
      </template>

      <v-menu v-else>
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="text">
            {{ user.email }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="handleLogout">
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
