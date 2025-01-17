<script setup>
import { useRoute } from 'vue-router';
import Header from './Header';
import Footer from './Footer';

const route = useRoute();
</script>

<template>
  <div :class="[route.meta.has_bg ? `has-bg-${route.meta.has_bg}` : '']" id="app-content">
    <Header :routeName="route.name"></Header>
    <main class="main">
      <router-view></router-view>
    </main>
    <Footer v-if="route.name != 'ai'"></Footer>
    <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center rounded"><i
        class="bi bi-arrow-up-short"></i></a>
    <div id="preloader"></div>
  </div>
</template>

<style scoped></style>
