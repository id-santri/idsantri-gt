<script setup>
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'

import { RouterView } from 'vue-router'
</script>

<template>
  <section>
    <Header />

    <RouterView />
    <Nav />
  </section>
</template>

<style></style>
