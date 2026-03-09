<script setup lang="ts">
import { useAuth } from '../composables/useAuth'

const { user, logout } = useAuth()
</script>

<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title> Map Item Manager </v-app-bar-title>

      <v-spacer />

      <div v-if="user" class="mr-4">
        {{ user.email }}
      </div>

      <v-btn v-if="user" variant="text" @click="logout"> Logout </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
