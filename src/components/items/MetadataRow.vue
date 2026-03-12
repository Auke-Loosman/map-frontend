<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  keyName: string
  value: string
}>()

const emit = defineEmits<{
  (e: 'update', payload: { key: string; value: string }): void
  (e: 'delete'): void
}>()

const keyField = ref('')
const valueField = ref('')

watch(
  () => props,
  () => {
    keyField.value = props.keyName
    valueField.value = props.value
  },
  { immediate: true },
)

function update() {
  emit('update', {
    key: keyField.value,
    value: valueField.value,
  })
}
</script>

<template>
  <div class="d-flex align-center mb-2">
    <v-text-field
      v-model="keyField"
      label="Key"
      density="compact"
      class="mr-2"
      @update:model-value="update"
    />

    <v-text-field
      v-model="valueField"
      label="Value"
      density="compact"
      class="mr-2"
      @update:model-value="update"
    />

    <v-btn icon="mdi-delete" color="error" variant="text" @click="emit('delete')" />
  </div>
</template>
