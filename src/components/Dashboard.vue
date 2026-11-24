<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import { useLaporanStore } from '../stores/data'
import CardGT from './CardGT.vue'

const store = useLaporanStore()

// State untuk membuka/tutup dropdown
const isOpen = ref(false)

// State untuk menyimpan pilihan aktif
const selectedOption = ref('')

// Template ref untuk mendeteksi elemen dropdown
const dropdownRef = ref(null)

// Daftar pilihan
const options = ['1446 H - 1447 H', '1447 H - 1448 H', '1448 H - 1449 H']

// Fungsi saat opsi dipilih
const selectOption = (option) => {
  selectedOption.value = option
  isOpen.value = false // Tutup dropdown setelah memilih
}

// Fungsi untuk menutup dropdown jika klik di luar
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Pasang event listener saat komponen dimuat
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// Bersihkan event listener saat komponen dihancurkan
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <main class="flex items-center justify-center bg-base-100 text-ugt-ink">
    <section
      class="bg-gradient-to-b from-green-900 to-green-500 relative mx-auto min-h-dvh max-w-109.5 w-full flex flex-col justify-between overflow-x-hidden"
    >
      <!-- 🎨 Dekorasi Motif Lingkaran Latar Belakang -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <!-- Lingkaran Kuning Kiri Atas -->
        <!-- Lingkaran Kuning Kiri Atas -->
        <div
          class="absolute -top-24 -left-20 h-68 w-68 rounded-full border-[26px] opacity-50 border-[#c8d831]/85"
        ></div>

        <!-- Lingkaran Besar Hijau Muda Tengah -->
        <div
          class="absolute bottom-90 right-1/2 -translate-x-1/4 h-42 w-42 rounded-full bg-[#389b48]/45"
        ></div>

        <!-- Lingkaran Kuning Kanan Atas -->
        <div
          class="absolute -top-1 -right-24 h-34 w-34 rounded-full border-[24px] border-[#c8d831]/85"
        ></div>

        <!-- Lengkungan Hijau Gelap Bawah Kanan -->
        <div class="absolute top-36 -right-14 h-44 w-44 rounded-full bg-green-950/30"></div>
      </div>
      <!-- <div class="dashboard-gradient absolute inset-x-0 top-0 h-[77%]"></div> -->

      <div
        class="relative z-10 flex-1 px-5 pt-22 pb-6 text-center flex flex-col items-center justify-center"
      >
        <!-- <p
          class="mx-auto max-w-85 text-[20px] font-bold uppercase leading-[1.22] tracking-[.2px] text-white"
        >
          Laporan Guru Tugas
        </p>
        <p class="mx-auto max-w-85 text-[16px] leading-[1.22] tracking-[.2px] text-white">
          Pondok Pesantren
        </p>
        <p class="mx-auto max-w-85 text-[16px] leading-[1.22] tracking-[.2px] text-white">
          Syachona Moh. Cholil Bangkalan
        </p> -->

        <RouterLink
          to="/rekap"
          class="mx-auto flex w-56 flex-col items-start justify-center rounded-[18px] dashboard-gradient-card px-4 py-2.5 text-left shadow-sm transition hover:brightness-105"
        >
          <span class="text-[42px] font-black leading-none text-[#234737]">
            {{ store.totalLaporan }}
          </span>
          <p class="mt-1 whitespace-nowrap uppercase font-extrabold text-[14px] text-[#1c382d]">
            Rekap
          </p>
          <p class="mt-0.5 whitespace-nowrap leading-tight font-bold text-[11px] text-[#1c382d]">
            Laporan Bulanan Guru Tugas
          </p>
        </RouterLink>
      </div>

      <div class="relative z-10 rounded-t-[36px] bg-primary-content px-5 pt-6 pb-22">
        <CardGT />
        <div class="grid grid-cols-3 gap-2 pt-5">
          <RouterLink to="/form" class="flex flex-col items-center text-center">
            <span
              class="mb-1.5 h-13 w-13 sm:h-15 sm:w-15 rounded-full bg-primary flex justify-center items-center"
            >
              <font-awesome-icon
                icon="clipboard-list"
                class="text-lg sm:text-xl text-accent-content"
              />
            </span>
            <span class="whitespace-nowrap text-[11px] font-medium text-base-content"
              >Form Laporan</span
            >
          </RouterLink>

          <RouterLink to="/laporan" class="flex flex-col items-center text-center">
            <span
              class="mb-1.5 h-13 w-13 sm:h-15 sm:w-15 rounded-full bg-primary flex justify-center items-center"
            >
              <font-awesome-icon icon="chart-line" class="text-lg sm:text-xl text-accent-content" />
            </span>
            <span class="whitespace-nowrap text-[11px] font-medium text-base-content"
              >Detail Laporan</span
            >
          </RouterLink>

          <RouterLink to="/surat" class="flex flex-col items-center text-center">
            <span
              class="mb-1.5 h-13 w-13 sm:h-15 sm:w-15 rounded-full bg-primary flex justify-center items-center"
            >
              <font-awesome-icon icon="briefcase" class="text-lg sm:text-xl text-accent-content" />
            </span>
            <span class="whitespace-nowrap text-[11px] font-medium text-base-content"
              >Surat Tugas</span
            >
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style></style>
