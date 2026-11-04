import { defineStore } from 'pinia'

import { ref, computed } from 'vue'

export const useLaporanStore = defineStore('laporan', () => {
  const daftarLaporan = ref([
    { id: 1, judul: 'Laporan Bulan Januari', penulis: 'Khoirul Anam' },
    { id: 2, judul: 'Laporan Bulan Februari', penulis: 'Khoirul Anam' },
    { id: 3, judul: 'Laporan Bulan Maret', penulis: 'Khoirul Anam' },
    { id: 4, judul: 'Laporan Bulan April', penulis: 'Khoirul Anam' },
    { id: 5, judul: 'Laporan Bulan Mei', penulis: 'Khoirul Anam' },
    { id: 6, judul: 'Laporan Bulan Juni', penulis: 'Khoirul Anam' },
    { id: 7, judul: 'Laporan Bulan Juli', penulis: 'Khoirul Anam' },
    { id: 8, judul: 'Laporan Bulan Agustus', penulis: 'Khoirul Anam' },
    { id: 9, judul: 'Laporan Bulan September', penulis: 'Khoirul Anam' },
  ])

  // Hitung total panjang array agar bisa dipanggil di Dashboard
  const totalLaporan = computed(() => daftarLaporan.value.length)

  // Aksi untuk menambah data dari halaman form
  const tambahLaporanBaru = (judul, penulis) => {
    const idBaru = daftarLaporan.value.length + 1
    daftarLaporan.value.push({ id: idBaru, judul, penulis })
  }

  return { daftarLaporan, totalLaporan, tambahLaporanBaru }
})
export const dataGuruTugas = defineStore('guru', () => {
  const detailData = ref([
    {
      id: 1448001,
      nama: 'Khoirul Anam',
      umur: 25,
      alamat: 'Jl. Cokro no. 1234',
      tahunAjaran: 2026,
      tempatTugas: 'MDS. Nurul Hidayah',
      namaPjgt: 'KH. Muhammad Karom',
      status: true,
    },
  ])

  return { detailData }
})

export const useThemeStore = defineStore('theme', () => {
  // Ambil tema awal dari localStorage atau gunakan preferensi sistem OS
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const currentTheme = ref(getInitialTheme())

  // Fungsi untuk menerapkan tema ke elemen HTML root
  const initTheme = () => {
    document.documentElement.setAttribute('data-theme', currentTheme.value)
  }

  // Fungsi untuk mengganti tema (Toggle)
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', currentTheme.value)
    localStorage.setItem('theme', currentTheme.value)
  }

  return {
    currentTheme,
    initTheme,
    toggleTheme,
  }
})
