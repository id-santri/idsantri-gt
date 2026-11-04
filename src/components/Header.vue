<script setup>
import { ref, onMounted } from 'vue'
// import ThemeToggle from './ThemeToggle.vue'
import { useThemeStore } from '../stores/data'

const themeStore = useThemeStore()

onMounted(() => {
  // Jalankan inisialisasi tema saat komponen dimuat agar warna langsung diterapkan
  themeStore.initTheme()
})
</script>

<template>
  <section class="flex items-center justify-center dashboard-shell relative overflow-hidden">
    <header
      class="flex h-11.25 fixed max-w-109.5 top-0 z-20 items-center justify-between bg-primary text-primary-content px-5.5 py-7 shadow-sm left-1/2 -translate-x-1/2 w-full"
    >
      <div class="flex items-center gap-2">
        <RouterLink to="/" class="flex items-center gap-2">
          <img
            src="../assets/logo-pondok.png"
            class="flex h-8.75 w-8.75 items-center justify-center rounded-[7px] bg-primary-content text-[12px] font-black text-[#1e4032]"
          />
        </RouterLink>

        <div class="leading-[1.05] gap-1 flex flex-col text-left">
          <div class="text-[12px] font-extrabold tracking-wide text-primary-content">Aplikasi</div>
          <div class="mt-0.75 text-[7px] uppercase tracking-[1px] text-accent-content">
            Laporan Guru Tugas
          </div>
        </div>
      </div>

      <button class="flex gap-3 5rounded-md px-2 py-0.75 text-secondary-content items-center">
        <label class="swap swap-rotate">
          <!-- Checkbox tersembunyi yang mendengarkan state Pinia -->
          <input
            type="checkbox"
            :checked="themeStore.currentTheme === 'mydark'"
            @change="themeStore.toggleTheme"
          />

          <!-- Ikon Sun / Matahari (Muncul saat Light mode aktif) -->
          <svg class="swap-on fill-current w-6 h-6" xmlns="http://w3.org" viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.36Zm12,.72a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.77ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>

          <!-- Ikon Moon / Bulan (Muncul saat Dark mode aktif) -->
          <svg class="swap-off fill-current w-6 h-6" xmlns="http://w3.org" viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.69Z"
            />
          </svg>
        </label>
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        <!-- <p class="text-[12px] font-bold">LOG OUT</p> -->
      </button>
    </header>
  </section>
</template>

<style></style>
