<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const { register } = useAuth()

async function submit() {
  await register(email.value, password.value)
  router.push('/login')
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
        <v-btn color="primary" @click="submit"> Register </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
