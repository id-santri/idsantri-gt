import { defineStore } from 'pinia'

import { ref, computed } from 'vue'
import Profile from '@/model/Profile.js'
import Laporan from '@/model/Laporan.js'

// // KODE DATA FORM LAMA

export const useLaporanStore = defineStore('laporan', () => {
  const daftarLaporan = ref(JSON.parse(localStorage.getItem('daftarLaporan')) || [])

  const getTotalLaporan = async () => {
    try {
      const response = await Profile.get() // Sesuaikan nama fungsi API profile Anda
      const dataApi = response.data?.laporan || [] // Sesuaikan dengan struktur JSON backend Anda
      daftarLaporan.value = dataApi
      // Simpan ke localStorage agar data tidak hilang saat halaman di-refresh (F5)
      localStorage.setItem('daftarLaporan', JSON.stringify(dataApi))
      console.log('Daftar Laporan berhasil diperbarui:', dataApi)
    } catch (error) {
      console.error('Error fetching laporan data:', error)
    }
  }

  // Hitung total panjang array agar bisa dipanggil di Dashboard
  const totalLaporan = computed(() => daftarLaporan.value.length)

  // Aksi untuk menambah data dari halaman form
  const tambahLaporanBaru = (judul, penulis) => {
    const idBaru = daftarLaporan.value.length + 1
    daftarLaporan.value.push({ id: idBaru, judul, penulis })
  }

  return { daftarLaporan, totalLaporan, tambahLaporanBaru, getTotalLaporan }
})

// // KODE DATA FORM BARU

export const useDataStore = defineStore('data', () => {
  // Bentuk Object untuk menyimpan data form satuan
  const formLaporan = ref({
    bulan: 'September',
    namaGT: '',
    namaPJGT: '',
    namaMadrasah: '',
    alamat: '',
    waliKelas: {},
    guruFun: {},
    jenisKelaminMurid: 'Laki-laki',
    jumlahMurid: {
      kelas1: '1',
      kelas2: '1',
      kelas3: '1',
      kelas4: '1',
      kelas5: '1',
      kelas6: '1',
    },
    sakit: 'Tidak',
    pulang: 'Tidak',
    udzurLain: 'Tidak',
    mengajarAlQuran: 'Tidak',
    mengajarKitab: 'Tidak',
    imamJumat: 'Tidak',
    imamMaktubah: 'Tidak',
    hubunganPJGT: 'Baik',
    hubunganGuruLain: 'Baik',
    tugasTambahan: '',
    usulanSaran: '',
    bisyarohBulanIni: '700',
    pemberianBisyaroh: 'Tepat waktu',
  })

  // Bentuk Array untuk menampung riwayat/daftar laporan yang sudah dikirim
  const listLaporan = ref([])

  function simpanLaporan(dataBaru) {
    // Masukkan ke array
    listLaporan.value.push({ ...dataBaru })
    // Simpan juga ke object utama jika diperlukan
    formLaporan.value = { ...dataBaru }
  }

  return {
    formLaporan,
    listLaporan,
    simpanLaporan,
  }
})
export const dataGuruTugas = defineStore('guru', () => {
  // 1. Ubah nilai awal menjadi objek kosong atau ambil dari localStorage jika ada (agar aman saat refresh)
  const detailData = ref(JSON.parse(localStorage.getItem('profile')) || {})

  const bulanHijri = [
    {
      bulan: 'Muharram',
      no: 1,
    },
    {
      bulan: 'Safar',
      no: 2,
    },
  ]
  // Tambahkan optional chaining (?.) agar tidak error saat detailData masih kosong
  const waliKelas = computed(() => detailData.value?.wali_kelas || [])
  const guruFan = computed(() => detailData.value?.guru_fan || [])

  // 2. Buat fungsi (action) untuk mengambil data dari API dan menyimpannya ke detailData
  const getProfileGuru = async () => {
    const response = await Profile.get() // Sesuaikan nama fungsi API profile Anda
    const dataApi = response.data?.gt || response.data?.data?.gt || {} // Sesuaikan dengan struktur JSON backend Anda

    // Simpan ke state Pinia
    detailData.value = dataApi

    // Opsional: Simpan juga ke localStorage agar data tidak hilang saat halaman di-refresh (F5)
    localStorage.setItem('profile', JSON.stringify(dataApi))
  }

  return { detailData, waliKelas, guruFan, bulanHijri, getProfileGuru }
})

export const useThemeStore = defineStore('theme', () => {
  // Ambil tema awal dari localStorage atau gunakan preferensi sistem OS
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'mydark' : 'mylight'
  }

  const currentTheme = ref(getInitialTheme())

  // Fungsi untuk menerapkan tema ke elemen HTML root
  const initTheme = () => {
    document.documentElement.setAttribute('data-theme', currentTheme.value)
  }

  // Fungsi untuk mengganti tema (Toggle)
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'mylight' ? 'mydark' : 'mylight'
    document.documentElement.setAttribute('data-theme', currentTheme.value)
    localStorage.setItem('theme', currentTheme.value)
  }

  return {
    currentTheme,
    initTheme,
    toggleTheme,
  }
})
