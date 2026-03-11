<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Category } from '../../types/Category'

const props = defineProps<{
  modelValue: boolean
  latitude: number | null
  longitude: number | null
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (
    e: 'create',
    payload: {
      name: string
      description: string
      categoryId: string
    },
  ): void
}>()

const dialog = ref(props.modelValue)

const name = ref('')
const description = ref('')
const categoryId = ref('')

watch(
  () => props.modelValue,
  (v) => (dialog.value = v),
)
watch(dialog, (v) => emit('update:modelValue', v))

function createItem() {
  if (!name.value || !description.value || !categoryId.value) return

  emit('create', {
    name: name.value,
    description: description.value,
    categoryId: categoryId.value,
  })

  name.value = ''
  description.value = ''
  categoryId.value = ''
  dialog.value = false
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>Create Item</v-card-title>

      <v-card-text>
        <div class="text-caption mb-3">
          Lat: {{ latitude }} <br />
          Lng: {{ longitude }}
        </div>

        <v-text-field v-model="name" label="Name" variant="outlined" />

        <v-textarea v-model="description" label="Description" variant="outlined" />

        <v-select
          v-model="categoryId"
          :items="categories"
          item-title="name"
          item-value="id"
          label="Category"
          variant="outlined"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn variant="text" @click="dialog = false"> Cancel </v-btn>

        <v-btn color="primary" @click="createItem"> Create </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
