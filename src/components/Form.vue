<script setup>
// // BARU
import { ref, reactive, computed } from 'vue'
import { dataGuruTugas } from '../stores/data'
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
  config_id: bulanHijri.value || '1447-1448-02', // <-- 1. Hapus tanda // (atau isi dinamis dari API config)
  wali_kelas: [],
  guru_fan: [],
  sex_murid: '',
  absen: [
    {
      sakit: 0,
    },
  ],
  kegiatan: [
    {
      quran: '',
      kitab: '',
    },
  ],
  hubungan: [
    {
      guru: '',
      pjgt: '',
    },
  ],
  bisyaroh: [
    {
      nominal: 0,
      tepat_waktu: '',
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
</script>

<template>
  <section class="mx-auto min-h-screen max-w-106.5 bg-base-300 pb-15 pt-10">
    <div class="px-2.5 pb-5 pt-3.25">
      <!-- <h2 class="text-lg font-bold text-accent-content mb-4">Tambah Laporan Baru</h2> -->
      <!-- Form Baru -->

      <form class="mt-3 space-y-2.5" @submit.prevent="handleSubmitLaporan">
        <div class="card p-2.5 bg-base-200">
          <h2 class="mt-1 mb-3 text-15px] font-extrabold uppercase tracking-wide text-base-content">
            Buat Laporan Baru
          </h2>
          <div class="flex items-start justify-between gap-2">
            <div>
              <h2 class="section-title mb-3 text-accent-content">Form Laporan Guru Tugas</h2>
              <p class="max-w-46.25 text-[10px] leading-[1.4] text-base-content">
                Silakan isi form laporan guru tugas dengan lengkap dan benar.
              </p>
            </div>
          </div>
          <div>
            <label
              ><span class="field-label my-2">Laporan Bulan</span>
              <select
                v-model="laporan.config_id"
                class="select select-sm field-select bg-base-100 w-full"
              >
                <option disabled value="">Pilih Bulan...</option>
                <option
                  v-for="item in bulanHijri"
                  :key="item.no"
                  :value="`${detailData.th_ajaran_h}-${String(item.no).padStart(2, '0')}`"
                >
                  {{ item.bulan }}
                </option>
              </select>
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
          <FormTingkatKelas v-model="laporan.wali_kelas" />
        </div>
        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Menjadi Guru Fun</h2>
          <FormTingkatKelas v-model="laporan.guru_fan" />
        </div>
        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Data Murid</h2>
          <label class="block"
            ><span class="field-label my-2">Jenis Kelamin Murid</span
            ><select
              v-model="laporan.sex_murid"
              class="select select-sm field-select bg-base-100 w-20"
            >
              <option>Laki-laki</option>
              <option>Perempuan</option>
              <option>Laki-Laki & Perempuan</option>
            </select></label
          >
        </div>
        <!-- 3. Absen (Akses indeks ke-0: laporan.absen[0]) -->
        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Absensi</h2>
          <label
            ><span class="field-label">Sakit</span
            ><select
              v-model.number="laporan.absen[0].sakit"
              class="select select-sm field-select bg-base-100 w-15.75"
            >
              <option :value="0">Tidak</option>
              <option :value="1">1 Hari</option>
              <option :value="2">2 Hari</option>
              <option :value="3">3 Hari</option>
            </select></label
          >
        </div>

        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Kegiatan</h2>
          <div class="space-y-2.5">
            <label
              ><span class="field-label my-4">Mengajar Al-Quran</span
              ><select
                v-model="laporan.kegiatan[0].quran"
                class="select select-sm field-select bg-base-100 w-20"
              >
                <option>Iya</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label my-4">Mengajar Kitab</span
              ><select
                v-model="laporan.kegiatan[0].kitab"
                class="select select-sm field-select bg-base-100 w-20"
              >
                <option>Iya</option>
                <option>Tidak</option>
              </select></label
            >
          </div>
        </div>
        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Hubungan</h2>
          <div class="mb-3.25">
            <span class="field-label">Dengan PJGT</span>
            <div class="flex gap-0.5 text-[17px] leading-none">
              <select
                v-model="laporan.hubungan[0].pjgt"
                class="select select-sm field-select bg-base-100 w-20"
              >
                <option>Baik</option>
                <option>Cukup Baik</option>
                <option>Sangat Baik</option>
              </select>
            </div>
            <span class="field-label">Dengan Guru Lain</span>
            <div class="flex gap-0.5 text-[17px] leading-none">
              <select
                v-model="laporan.hubungan[0].guru"
                class="select select-sm field-select bg-base-100 w-20"
              >
                <option>Baik</option>
                <option>Cukup Baik</option>
                <option>Sangat Baik</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Bisyaroh</h2>

          <label class="mb-2.5 block"
            ><span class="field-label">Nominal</span
            ><input
              v-model.number="laporan.bisyaroh[0].nominal"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              @input="
                laporan.bisyaroh[0].nominal = Number(
                  String(laporan.bisyaroh[0].nominal).replace(/\D/g, ''),
                )
              "
              class="field bg-base-100"
          /></label>
          <label class="block"
            ><span class="field-label">Tepat Waktu</span
            ><select
              v-model="laporan.bisyaroh[0].tepat_waktu"
              class="select select-sm field-select bg-base-100 w-20"
            >
              <option>Tepat waktu</option>
              <option>Terlambat</option>
            </select></label
          >
        </div>
        <div class="card p-2.5 bg-base-200">
          <div class="mb-3.25">
            <h2 class="section-title text-primary">Catatan</h2>

            <label class="mb-2.5 block"
              ><span class="field-label">Usulan dan Saran kepada UGT</span
              ><textarea
                v-model="laporan.usul_saran"
                placeholder="Silakan masukkan usulan dan saran..."
                class="field resize-y bg-base-100"
              ></textarea>
            </label>
          </div>
        </div>
        <button
          type="submit"
          class="mt-4 w-full rounded-lg bg-primary py-3 text-[11px] font-bold text-accent-content"
        >
          Simpan Laporan
        </button>
      </form>
    </div>
  </section>
</template>

<style></style>
