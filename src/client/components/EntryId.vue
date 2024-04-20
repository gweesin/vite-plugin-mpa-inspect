<script setup lang="ts">
import { root } from '../logic'

defineProps<{ id?: string }>()
</script>

<template>
  <div v-if="id" my-auto text-sm font-mono flex="~ items-center">
    <template v-if="id.startsWith(root)">
      <span class="op50">.</span>
      <span>{{ id.slice(root.length) }}</span>
    </template>
    <span v-else>{{ id }}</span>
    <slot />
  </div>
</template>
