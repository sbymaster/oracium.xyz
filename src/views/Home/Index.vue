<script setup>
import { onMounted, ref, reactive } from 'vue'
import { copyToClipboard } from '@/helpers';
import { company } from '@/models';

let prompText = ref('')

const heroSubTexts = [
  "AI-Driven Insights",
  "Cognitive Intelligence",
  "Algorithmic Foresight",
];

onMounted(() => {

})
</script>

<template>
  <section id="hero" class="main-hero hero section bg-transparent first-section">
    <div class="container position-relative" data-aos="fade-up" data-aos-delay="100">
      <div class="col-12 col-lg-10 m-auto text-center">
        <div class="hero-text mb-5">
          <h2 class="ls-sm fw-bold text-app fs-40px mb-0">Empowering Decentralized</h2>
          <h2 class="ls-sm fw-bold text-app hero-h2-sub fs-40px d-flex align-items-center justify-content-center">
            <span class="hero-h2-sub-first">Governance with</span>
            <span class="rolling-text hero-h2-sub-second text-app-linier d-inline-block">
              <span class="rolling-text-line d-block" v-for="(text, index) in heroSubTexts" :key="index">{{ text
                }}</span>
            </span>
          </h2>
          <div class="col-12 col-lg-10 m-auto">
            <p class="mt-0 w-100 text-white fw-normal fs-15px ls-xs hero-desc text-white">Oracium combines advanced AI
              and
              on-chain analysis to revolutionize decision-making for DAOs and decentralized protocols, providing
              real-time
              governance intelligence and fostering transparent, efficient, and informed choices.</p>
          </div>
        </div>
        <div class="hero-prompt mb-4">
          <div class="col-12 col-lg-8 m-auto">
            <form>
              <div class="input-group p-2 rounded-sm bg-white">
                <input required v-model="prompText" class="form-control form-control-sm fs-13px bg-transparent"
                  placeholder="Start typing your prompt ..." />
                <router-link :to="{ name: 'ai', query: { text: prompText } }"
                  class="input-group-text btn btn-sm bg-app rounded-sm text-white fs-13px px-3 d-inline-flex align-items-center">Start
                  with AI</router-link>
              </div>
            </form>
          </div>
        </div>
        <div class="copy-ca">
          <div class="col-12 col-lg-6 m-auto">
            <div class="input-group p-0 rounded-sm align-items-center justify-content-center custom-input-group">
              <div
                class="form-control form-control-sm fs-11px ls-xs bg-transparent border-0 text-start ps-3 text-white">{{
                  company.key_ca }}</div>
              <a @click.prevent="copyToClipboard(keyCA)"
                class="input-group-text btn btn-sm bg-transparent rounded-sm text-app fw-bold fs-12px px-3 d-inline-flex align-items-center gap-2">
                <i class="bi bi-copy"></i>
                <span>Copy CA</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
