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
    <v-app-bar color="primary">
      <v-app-bar-title> Map Item Manager </v-app-bar-title>

      <v-spacer />

      <template v-if="!user">
        <v-btn variant="text" to="/login"> Login </v-btn>
        <v-btn variant="text" to="/register"> Register </v-btn>
      </template>

      <template v-else>
        <div class="mr-4">
          {{ user.email }}
        </div>

        <v-btn variant="text" @click="handleLogout"> Logout </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
