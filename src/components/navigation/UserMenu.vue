<script setup lang="ts">
import { useAuth } from '../../composables/useAuth'
import { useRouter } from 'vue-router'

const { user, logout } = useAuth()
const router = useRouter()

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <div v-if="!user" class="d-flex ga-2">
    <v-btn variant="text" to="/login"> Login </v-btn>

    <v-btn variant="text" to="/register"> Register </v-btn>
  </div>

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
</template>
