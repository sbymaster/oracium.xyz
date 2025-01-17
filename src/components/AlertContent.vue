<script setup>
import { defineProps } from 'vue'

const { type, title, msg, info } = defineProps({
  type: { type: String, default: 'info' },
  title: { type: String, default: 'Informasi!' },
  msg: { type: String, default: '' },
  info: { type: String, default: '' }
})
</script>

<template>
  <div class="col-12 col-lg-8 m-auto">
    <div :class="[`alert-${type}`]" class="alert text-start" role="alert">
      <h5 class="alert-heading">{{ title }}</h5>
      <p class="fs-15px">{{ msg }}</p>
      <div v-if="info">
        <hr />
        <p class="mb-0">{{ info }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
