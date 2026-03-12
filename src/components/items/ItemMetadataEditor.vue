<script setup lang="ts">
import MetadataRow from './MetadataRow.vue'

const props = defineProps<{
  metadata: { key: string; value: string }[]
}>()

const emit = defineEmits<{
  (e: 'update', metadata: { key: string; value: string }[]): void
}>()

function updateRow(index: number, payload: { key: string; value: string }) {
  const updated = [...props.metadata]
  updated[index] = payload

  emit('update', updated)
}

function deleteRow(index: number) {
  const updated = [...props.metadata]
  updated.splice(index, 1)

  emit('update', updated)
}

function addRow() {
  const updated = [...props.metadata]

  updated.push({
    key: '',
    value: '',
  })

  emit('update', updated)
}
</script>

<template>
  <div class="mt-4">
    <h3 class="text-subtitle-1 mb-2">Metadata</h3>

    <MetadataRow
      v-for="(meta, index) in metadata"
      :key="index"
      :keyName="meta.key"
      :value="meta.value"
      @update="updateRow(index, $event)"
      @delete="deleteRow(index)"
    />

    <v-btn variant="text" color="primary" @click="addRow"> + Add metadata </v-btn>
  </div>
</template>
