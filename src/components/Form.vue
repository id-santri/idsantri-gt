<script setup>
// // BARU
import { ref, reactive } from 'vue'
import { dataGuruTugas } from '../stores/data'
import { computed } from 'vue'
import { useLaporanStore } from '@/stores/data'
import { toast } from 'vue3-toastify'
import FormTingkatKelas from './FormTingkatKelas.vue'

const laporanStore = useLaporanStore()

// Mengambil bulan terkini secara otomatis dengan format YYYY-MM
const currentMonth = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  // Ditambah 1 karena Januari dimulai dari 0, lalu ditambah 0 di depan jika di bawah 10
  const month = String(now.getMonth() + 1).padStart(2, '0')

  return `${year}-${month}`
})

const data = dataGuruTugas()
const waliKelas = ref(data.waliKelas)
const guruFan = ref(data.guruFan)
const bulanHijri = ref(data.bulanHijri)
const detailData = ref(data.detailData)
console.log(waliKelas.value)
console.log(guruFan.value)
console.log(bulanHijri.value)
console.log(detailData.value)

const laporan = reactive({
  config_id: '1447-1448-03', // <-- 1. Hapus tanda // (atau isi dinamis dari API config)
  wali_kelas: [
    {
      tingkat: 'Ibtidaiyah',
      kelas: '6',
    },
  ],
  guru_fan: [
    {
      tingkat: 'Tsanawiyah',
      kelas: '1',
    },
    {
      tingkat: 'Ibtidaiyah',
      kelas: '4',
    },
  ],
  sex_murid: 'Perempuan',
  absen: [
    {
      sakit: 1,
    },
  ],
  kegiatan: [
    {
      quran: 'ya',
      kitab: 'tidak',
    },
  ],
  hubungan: [
    {
      guru: 'baik',
      pjgt: 'baik',
    },
  ],
  bisyaroh: [
    {
      nominal: 1000,
      tepat_waktu: true,
    },
  ],
  usul_saran: 'Kondisi kegiatan belajar mengajar berjalan kondusif.',
})

const handleSubmitLaporan = async () => {
  try {
    // 2. Hapus .value karena laporan menggunakan reactive(), bukan ref()
    await laporanStore.tambahLaporanBaru(laporan)
    console.log('Laporan berhasil dikirim:', laporan)

    toast('Laporan berhasil dikirim!', { type: 'success' })

    // 3. Reset form sesuai struktur reactive (jangan pakai laporan.value = ...)
    laporan.usul_saran = ''
  } catch (error) {
    toast(error.message || 'Gagal mengirim laporan.', { type: 'error' })
  }
}

const levels = ['Idadiyah', 'Ibtidaiyah', 'Tsanawiyah', 'Aliyah']
</script>

<template>
  <section class="mx-auto min-h-screen max-w-106.5 bg-base-300 pb-15 pt-10">
    <div class="px-2.5 pb-5 pt-3.25">
      <!-- <h2 class="text-lg font-bold text-accent-content mb-4">Tambah Laporan Baru</h2> -->
      <!-- Form Baru -->

      <form class="mt-3 space-y-2.5" @submit.prevent="handleSubmitLaporan">
        <div class="card p-2.5 bg-base-200">
          <h2 class="mt-1 mb-3 text-15px] font-extrabold uppercase tracking-wide text-primary">
            Buat Laporan Baru
          </h2>
          <div class="flex items-start justify-between gap-2">
            <div>
              <h2 class="section-title mb-3 text-primary">Form Laporan Guru Tugas</h2>
              <p class="max-w-46.25 text-[10px] leading-[1.4] text-base-content">
                Silakan isi form laporan guru tugas dengan lengkap dan benar.
              </p>
            </div>
          </div>
          <div>
            <label
              ><span class="field-label my-2">Laporan Bulan</span>
              <input
                id="current-month"
                type="month"
                :value="currentMonth"
                readonly
                class="field bg-base-100"
              />
              <!-- <select class="select select-sm field-select bg-white w-20">
                <option>September</option>
                <option>Oktober</option>
              </select> -->
            </label>
            <label
              ><span class="field-label my-4">Nama GT</span
              ><input disabled v-model="detailData.nama" type="text" class="field bg-base-100"
            /></label>
            <label
              ><span class="field-label my-4">Nama PJGT</span
              ><input v-model="detailData.pjgt_nama" type="text" class="field bg-base-100"
            /></label>
            <label
              ><span class="field-label my-4">Nama Madrasah/Ponpes</span
              ><input v-model="detailData.pjgt_nama_lembaga" type="text" class="field bg-base-100"
            /></label>
            <label
              ><span class="field-label my-4">Alamat</span
              ><input v-model="detailData.alamat_pendek" type="text" class="field bg-base-100"
            /></label>
          </div>
        </div>

        <!-- contoh -->

        <!-- end contoh -->

        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Menjadi Wali Kelas</h2>
          <FormTingkatKelas />
          <!-- <div v-for="level in levels" :key="level" class="mb-2 last:mb-0">
            <div class="small-label">{{ level }}</div>
            <div v-for="kelas in laporan.wali_kelas" :key="kelas" class="flex gap-1 flex-col">
              <label>
                <select
                  v-model="kelas.kelas"
                  class="select select-sm field-select text-base-content bg-base-100 w-20"
                >
                  <option>Kelas 1</option>
                  <option>Kelas 2</option>
                  <option>Kelas 3</option>
                  <option>Kelas 4</option>
                  <option>Kelas 5</option>
                  <option>Kelas 6</option>
                </select>
              </label>
            </div>
          </div> -->
        </div>
        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Menjadi Guru Fun</h2>
          <FormTingkatKelas />
          <!-- <div v-for="level in levels" :key="level" class="mb-2 last:mb-0">
            <div class="small-label">{{ level }}</div>
            <div v-for="kelas in laporan.guru_fan" :key="kelas" class="flex gap-1 flex-col">
              <fieldset class="fieldset">
                <select
                  v-model="kelas.kelas"
                  class="select select-sm field-select bg-base-100 w-20"
                >
                  <option>Kelas 1</option>
                  <option>Kelas 2</option>
                  <option>Kelas 3</option>
                  <option>Kelas 4</option>
                  <option>Kelas 5</option>
                  <option>Kelas 6</option>
                </select>
              </fieldset>
            </div>
          </div> -->
        </div>
        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Data Murid</h2>
          <label class="block"
            ><span class="field-label my-2">Jenis Kelamin Murid</span
            ><select class="select select-sm field-select bg-base-100 w-20">
              <option>Laki-laki</option>
              <option>Perempuan</option>
              <option>Laki-Laki & Perempuan</option>
            </select></label
          >
        </div>
        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Kehadiran &amp; Kegiatan</h2>
          <div class="space-y-2.5">
            <label
              ><span class="field-label">Sakit</span
              ><select class="select select-sm field-select bg-base-100 w-15.75">
                <option>1 Hari</option>
                <option>2 Hari</option>
                <option>3 Hari</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label my-4">Pulang</span
              ><select class="select select-sm field-select bg-base-100 w-20">
                <option>1 Hari</option>
                <option>2 Hari</option>
                <option>3 Hari</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label my-4">Udzur Lain</span
              ><select class="select select-sm field-select bg-base-100 w-20">
                <option>1 Hari</option>
                <option>2 Hari</option>
                <option>3 Hari</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label my-4">Mengajar Al-Qur’an</span
              ><select class="select select-sm field-select bg-base-100 w-20">
                <option>Iya</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label my-4">Mengajar Kitab</span
              ><select class="select select-sm field-select bg-base-100 w-20">
                <option>Iya</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label my-4">Imam Sholat Jum’at</span
              ><select class="select select-sm field-select bg-base-100 w-20">
                <option>Iya</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label my-4">Imam Sholat Maktubah</span
              ><select class="select select-sm field-select bg-base-100 w-20">
                <option>Iya</option>
                <option>Tidak</option>
              </select></label
            >
          </div>
        </div>
        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Penilaian &amp; Catatan</h2>
          <div class="mb-3.25">
            <span class="field-label">Hubungan dengan PJGT</span>
            <div class="flex gap-0.5 text-[17px] leading-none">
              <select class="select select-sm field-select bg-base-100 w-20">
                <option>Baik</option>
                <option>Cukup Baik</option>
                <option>Sangat Baik</option>
              </select>
            </div>
          </div>
          <div class="mb-3.25">
            <span class="field-label">Hubungan dengan Guru Lain</span>
            <div class="flex gap-0.5 text-[17px] leading-none">
              <select class="select select-sm field-select bg-base-100 w-20">
                <option>Baik</option>
                <option>Cukup Baik</option>
                <option>Sangat Baik</option>
              </select>
            </div>
          </div>
          <label class="mb-2.5 block"
            ><span class="field-label">Tugas Tambahan selain mengajar</span
            ><textarea
              placeholder="Silakan masukkan tugas tambahan..."
              class="field resize-y bg-base-100"
            ></textarea>
          </label>
          <label class="mb-2.5 block"
            ><span class="field-label">Usulan dan Saran kepada UGT</span
            ><textarea
              placeholder="Silakan masukkan usulan dan saran..."
              class="field resize-y bg-base-100"
            ></textarea>
          </label>
          <label class="mb-2.5 block"
            ><span class="field-label">Bisyaroh Bulan Ini</span
            ><input type="number" class="field bg-base-100"
          /></label>
          <label class="block"
            ><span class="field-label">Pemberian Bisyaroh</span
            ><select class="select select-sm field-select bg-base-100 w-20">
              <option>Tepat waktu</option>
              <option>Terlambat</option>
            </select></label
          >

          <button
            type="submit"
            class="mt-4 w-full rounded-lg bg-primary py-3 text-[11px] font-bold text-accent-content"
          >
            Simpan Laporan
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style></style>
