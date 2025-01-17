<script setup>
import { defineProps } from 'vue'

const { currentPage, totalData, perPage, onPageChange } = defineProps({
  currentPage: { type: Number, default: 1 },
  totalData: { type: Number, default: 0 },
  perPage: { type: Number, default: 20 },
  onPageChange: { type: Function }
})

const countPage = Math.ceil(totalData / perPage)
const readyPaging = countPage > 1
const maxViewPage = 10
let linkPagination = []
let linkPaginationBef = []

for (let i = 1; i <= countPage; i++) {
  linkPagination.push(i)
}

if (currentPage > maxViewPage) {
  for (let j = currentPage - maxViewPage; j < currentPage; j++) {
    if (j > 0) linkPaginationBef.push(j)
  }
}
</script>

<template>
  <section
    v-if="readyPaging"
    id="blog-pagination"
    class="blog-pagination section"
  >
    <div class="container">
      <div class="d-flex justify-content-center">
        <ul>
          <li v-if="currentPage > 1">
            <a @click.prevent="onPageChange(1)"
              ><i class="bi bi-chevron-double-left"></i
            ></a>
          </li>
          <li v-if="currentPage > 1">
            <a @click.prevent="onPageChange(currentPage - 1)"
              ><i class="bi bi-chevron-left"></i
            ></a>
          </li>
          <li
            v-if="linkPaginationBef.length"
            v-for="linkBef in linkPaginationBef"
            :key="linkBef"
          >
            <a @click.prevent="onPageChange(linkBef)">{{ linkBef }}</a>
          </li>
          <li v-if="linkPaginationBef.length">...</li>
          <li v-for="link in linkPagination" :key="link">
            <a v-if="link === currentPage" class="active">{{ link }}</a>
            <a v-else @click.prevent="onPageChange(link)">{{ link }}</a>
          </li>
          <li v-if="currentPage < countPage">
            <a @click.prevent="onPageChange(currentPage + 1)"
              ><i class="bi bi-chevron-right"></i
            ></a>
          </li>
          <li v-if="currentPage < countPage">
            <a @click.prevent="onPageChange(countPage)"
              ><i class="bi bi-chevron-double-right"></i
            ></a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
