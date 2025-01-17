<script setup>
import { defineProps } from 'vue'

const { height, width, radius, background } = defineProps({
  height: { type: String, default: 'hs-150px' },
  width: { type: String, default: 'ws-100' },
  radius: { type: String, default: 'rounded-sm' },
  background: { type: String, default: 'bg-lazy' }
})
</script>

<template>
  <div :class="[height, width, radius, background]"></div>
</template>

<style scoped></style>
