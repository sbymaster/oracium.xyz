<script setup>
import { defineProps } from 'vue'
import { copyToClipboard } from '@/helpers';
import { company } from '@/models';

const { title } = defineProps({
  title: { type: String, default: 'Oracium' },
})
</script>

<template>
  <div class="page-title dark-background bg-transparent">
    <div class="container position-relative">
      <h1 class="text-capitalize text-app">{{ title }}</h1>
      <div class="copy-ca">
        <div class="col-12 col-lg-6 m-auto">
          <div class="input-group p-1 rounded-sm align-items-center justify-content-center custom-input-group bg-app-lighter">
            <div class="form-control form-control-sm fs-11px ls-xs bg-transparent text-white border-0 text-start ps-3">{{ company.key_ca }}
            </div>
            <a @click.prevent="copyToClipboard(keyCA)"
              class="input-group-text btn btn-sm bg-transparent rounded-sm text-app-light fw-500 fs-12px px-3 d-inline-flex align-items-center gap-2">
              <i class="bi bi-copy"></i>
              <span>Copy CA</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
