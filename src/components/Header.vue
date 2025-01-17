<script setup>
import { defineProps } from 'vue'
const { routeName } = defineProps({
  routeName: { type: String, default: 'home' },
})
</script>

<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      <router-link :to="{ name: 'home' }" class="logo d-flex align-items-center">
        <img src="/assets/img/oracium.png" class="md2 p-1" alt="oracium" />
        <!-- <h1 class="sitename">oracium</h1> -->
      </router-link>
      <nav id="navmenu-center" class="navmenu">
        <ul>
          <li>
            <router-link :class="{'is-active': routeName == 'home'}" class="fs-13px" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li>
            <router-link :class="{'is-active': routeName == 'about'}" class="fs-13px" :to="{ name: 'about' }">About</router-link>
          </li>
          <li>
            <router-link :class="{'is-active': routeName == 'feature'}" class="fs-13px" :to="{ name: 'feature' }">Features</router-link>
          </li>
        </ul>
      </nav>
      <nav id="navmenu" class="navmenu">
        <ul>
          <li class="d-xl-none">
            <router-link :class="{'is-active': routeName == 'home'}" class="fs-13px" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li class="d-xl-none">
            <router-link :class="{'is-active': routeName == 'about'}" class="fs-13px" :to="{ name: 'about' }">About</router-link>
          </li>
          <li class="d-xl-none">
            <router-link :class="{'is-active': routeName == 'feature'}" class="fs-13px" :to="{ name: 'feature' }">Features</router-link>
          </li>
          <li class="action"><router-link :to="{ name: 'ai' }"
              class="btn btn-sm text-white bg-app py-1 px-3 rounded fs-13px 14px">Start with AI</router-link></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
