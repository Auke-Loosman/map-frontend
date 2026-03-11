<script setup lang="ts">
import { useAuth } from '../../composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <div class="d-flex ga-2">
    <v-btn to="/" variant="text">Home</v-btn>
    <v-btn to="/map" variant="text">Map</v-btn>
    <v-btn to="/categories" variant="text">Categories</v-btn>
  </div>
</template>
