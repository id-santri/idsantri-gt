<script setup>
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import { onMounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useThemeStore } from './stores/data'
import ThemeToggle from './components/ThemeToggle.vue'

const themeStore = useThemeStore()

// Inisialisasi tema saat aplikasi pertama kali di-mount di browser
onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <section>
    <Header />
    
    <RouterView />
    <Nav />
  </section>
</template>

<style></style>
