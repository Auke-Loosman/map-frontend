<script setup lang="ts">
import AppNavbar from '../components/navigation/AppNavbar.vue'
</script>

<template>
  <v-app>
    <AppNavbar />

    <v-main>
      <v-container class="py-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
