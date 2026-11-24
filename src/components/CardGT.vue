<script setup>
import { ref, computed } from 'vue'
import { dataGuruTugas } from '../stores/data'
import QrcodeVue from 'qrcode.vue'

const data = dataGuruTugas()
const idGuru = ref(data.detailData.id || '')
const namaGuru = ref(data.detailData.nama || '')
const umurGuru = ref(data.detailData.umur || '')
const tahunAjaranGuru = ref(data.detailData.th_ajaran_h || '')
const tempatTugasGuru = ref(data.detailData.pjgt_nama_lembaga || '')
const alamatGuru = ref(data.detailData.alamat_pendek || '')
const img = ref(data.detailData.image_url || '')
const qrSize = ref(200)

// Menggunakan optional chaining yang aman untuk mengambil ID guru
const dataId = computed(() => {
  return data.detailData.id.toString() || ''
})

// Gambar default jika user belum mengunggah foto
const defaultImage = 'https://unsplash.com'
const avatarUrl = ref(defaultImage)

// Handler untuk membaca file yang diunggah
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Membuat URL sementara untuk preview gambar (lebih cepat & efisien dibanding FileReader)
    avatarUrl.value = URL.createObjectURL(file)
  }
}
</script>

<template>
  <div
    class="w-full max-h-[200px] bg-gradient-to-br from-green-600 to-green-800 text-white rounded-[25px] shadow-xl p-[5%] flex flex-col justify-between overflow-hidden relative"
  >
    <!-- Bagian Atas / Header Kartu -->
    <div class="flex justify-between items-start z-1">
      <div>
        <h2 class="text-[clamp(10px,4.5cqw,12px)] font-bold tracking-wider leading-none">
          GURU TUGAS
        </h2>
        <p class="text-[clamp(6px,2cqw,8px)] mt-1 border-b border-white/50">
          Pondok Pesantren Syaichona Moh. Cholil Bangkalan
        </p>
      </div>
    </div>

    <!-- Bagian Tengah / Informasi Profil -->
    <div class="flex items-center gap-[2%] my-auto z-1">
      <!-- Wadah Foto Profil -->
      <div
        class="w-[22%] aspect-square bg-gray-700 rounded-full border-2 border-white overflow-hidden flex-shrink-0 flex items-center justify-center relative"
      >
        <!-- Binding source gambar ke variable reactive avatarUrl -->
        <img
          :src="img ? img : '/src/assets/default.png'"
          alt="Foto Profil"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Detail Teks -->
      <div class="flex-1 min-w-0">
        <div class="grid grid-cols-[70px_9px_1fr] items-baseline">
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">Id</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">:</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">
            {{ idGuru }}
          </p>
        </div>
        <div class="grid grid-cols-[70px_9px_1fr] items-baseline font-medium tracking-wide">
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">Nama</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">:</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">
            {{ namaGuru }}
          </p>
        </div>
        <div class="grid grid-cols-[70px_9px_1fr] items-baseline">
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">Umur</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">:</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">
            {{ umurGuru }}
          </p>
        </div>

        <div class="grid grid-cols-[70px_9px_1fr] items-baseline">
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">Tahun Ajaran</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">:</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">
            {{ tahunAjaranGuru }}
          </p>
        </div>

        <div class="grid grid-cols-[70px_9px_2fr] items-baseline">
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">Tempat Tugas</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">:</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">
            {{ tempatTugasGuru }}
          </p>
        </div>
        <div class="grid grid-cols-[70px_9px_1fr] items-baseline">
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">Alamat</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">:</p>
          <p class="mt-1 text-[clamp(10px,2.8vw,8px)] font-mono">
            {{ alamatGuru }}
          </p>
        </div>
      </div>
    </div>
    <!-- 🎨 Dekorasi Motif Lingkaran Latar Belakang -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-70 overflow-hidden z-0">
      <!-- Lingkaran Kuning Kiri Atas -->
      <div
        class="absolute -top-24 -left-50 h-68 w-68 rounded-full border-[26px] opacity-40 border-[#c8d831]/85"
      ></div>

      <!-- Lingkaran Besar Hijau Muda Tengah -->
      <div
        class="absolute -top-2 left-2/2 -translate-x-1/4 h-72 w-72 rounded-full bg-[#389b48]/45"
      ></div>

      <!-- Lengkungan Hijau Gelap Bawah Kanan -->
      <div class="absolute top-46 -right-14 h-44 w-44 rounded-full bg-green-950/30"></div>
    </div>
  </div>
</template>

<style></style>
