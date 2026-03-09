<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function register() {
  console.log(email.value, password.value)
}
</script>

<template>
  <v-container max-width="400">
    <v-card>
      <v-card-title>Create Account</v-card-title>

      <v-card-text>
        <v-text-field label="Email" v-model="email" />

        <v-text-field label="Password" type="password" v-model="password" />
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="register"> Register </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
