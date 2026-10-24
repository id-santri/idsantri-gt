import { defineStore } from 'pinia'

import { ref, computed } from 'vue'

// // KODE DATA FORM LAMA

// export const useLaporanStore = defineStore('laporan', () => {
//   const daftarLaporan = ref([
//     { id: 1, judul: 'Laporan Bulan Januari', penulis: 'Khoirul Anam' },
//     { id: 2, judul: 'Laporan Bulan Februari', penulis: 'Khoirul Anam' },
//     { id: 3, judul: 'Laporan Bulan Maret', penulis: 'Khoirul Anam' },
//     { id: 4, judul: 'Laporan Bulan April', penulis: 'Khoirul Anam' },
//     { id: 5, judul: 'Laporan Bulan Mei', penulis: 'Khoirul Anam' },
//     { id: 6, judul: 'Laporan Bulan Juni', penulis: 'Khoirul Anam' },
//     { id: 7, judul: 'Laporan Bulan Juli', penulis: 'Khoirul Anam' },
//     { id: 8, judul: 'Laporan Bulan Agustus', penulis: 'Khoirul Anam' },
//     { id: 9, judul: 'Laporan Bulan September', penulis: 'Khoirul Anam' },
//   ])

//   // Hitung total panjang array agar bisa dipanggil di Dashboard
//   const totalLaporan = computed(() => daftarLaporan.value.length)

//   // Aksi untuk menambah data dari halaman form
//   const tambahLaporanBaru = (judul, penulis) => {
//     const idBaru = daftarLaporan.value.length + 1
//     daftarLaporan.value.push({ id: idBaru, judul, penulis })
//   }

//   return { daftarLaporan, totalLaporan, tambahLaporanBaru }
// })

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
