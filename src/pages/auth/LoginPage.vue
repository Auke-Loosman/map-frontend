<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const email = ref('')
const password = ref('')

const { login } = useAuth()
const router = useRouter()

async function submit() {
  await login(email.value, password.value)

  router.push('/')
}
</script>

<template>
  <v-container max-width="400">
    <v-card>
      <v-card-title>Login</v-card-title>

      <v-card-text>
        <v-text-field label="Email" v-model="email" />

        <v-text-field label="Password" type="password" v-model="password" />
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="submit"> Login </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
