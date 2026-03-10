<script setup lang="ts">
import NavbarLinks from './NavbarLinks.vue'
import UserMenu from './UserMenu.vue'
</script>

<template>
  <v-app-bar color="primary">
    <div class="d-flex align-center w-100 px-6">
      <span class="text-h6 font-weight-medium mr-8"> GeoHub </span>

      <NavbarLinks />

      <v-spacer />

      <UserMenu />
    </div>
  </v-app-bar>
</template>
