<script setup lang="ts">
import { useAuth } from '../../composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <div class="d-flex ga-2">
    <v-btn v-if="user" variant="text" to="/categories"> Categories </v-btn>
  </div>
</template>
