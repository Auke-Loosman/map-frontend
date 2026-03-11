<script setup lang="ts">
import { detectMetadataType } from '../../utils/metadataType'

const props = defineProps<{
  metadata: {
    key: string
    value: string
  }
}>()

const type = detectMetadataType(props.metadata.key, props.metadata.value)
</script>

<template>
  <div class="metadata-row">
    <template v-if="type === 'datetime'">
      📅 {{ metadata.key }}:
      {{ new Date(metadata.value).toLocaleString() }}
    </template>

    <template v-else-if="type === 'time'">
      🕒 {{ metadata.key }}:
      {{ metadata.value }}
    </template>

    <template v-else-if="type === 'url'">
      🌐 {{ metadata.key }}:
      <a :href="metadata.value" target="_blank">
        {{ metadata.value }}
      </a>
    </template>

    <template v-else-if="type === 'phone'">
      📞 {{ metadata.key }}:
      <a :href="'tel:' + metadata.value">
        {{ metadata.value }}
      </a>
    </template>

    <template v-else-if="type === 'location'">
      📍 {{ metadata.key }}:
      {{ metadata.value }}
    </template>

    <template v-else> {{ metadata.key }}: {{ metadata.value }} </template>
  </div>
</template>

<style scoped>
.metadata-row {
  font-size: 13px;
  margin: 2px 0;
}
</style>
