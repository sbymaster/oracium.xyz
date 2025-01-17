<script setup>
import AlertContent from '@/components/AlertContent';
</script>

<template>
    <div class="page-title dark-background bg-transparent">
        <div class="container position-relative">
            <h1 class="text-app">4 0 4</h1>
            <nav class="breadcrumbs">
                <ol>
                    <li><router-link :to="{ name: 'home' }">Home</router-link></li>
                    <li class="current">404</li>
                </ol>
            </nav>
        </div>
    </div>
    <section id="starter-section" class="starter-section section">
        <div class="container section-title aos-init aos-animate" data-aos="fade-up">
            <AlertContent :type="'danger'" :title="'Page Not Found!'"
                :msg="'Maaf, kami tidak dapat menemukan halaman yang Anda cari. Halaman tersebut mungkin sudah tidak tersedia atau sedang dalam perbaikan.'"
                :info="'Silakan periksa kembali URL atau kembali ke halaman utama.'" />
        </div>
    </section>
</template>

<style scoped></style>
