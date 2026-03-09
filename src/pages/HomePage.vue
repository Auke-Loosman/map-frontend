<script setup lang="ts">
import { useAuth } from '../composables/useAuth'

const { user, logout } = useAuth()
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title> Map Item Manager </v-card-title>

      <v-card-text>
        <div v-if="user">Logged in as {{ user.email }}</div>

        <div v-else>Not logged in</div>
      </v-card-text>

      <v-card-actions>
        <v-btn v-if="user" @click="logout"> Logout </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
