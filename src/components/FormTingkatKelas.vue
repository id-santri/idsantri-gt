<script setup>
import { ref, computed } from 'vue'

// 1. Hubungkan langsung array dari komponen induk menggunakan defineModel
const daftarPilihan = defineModel({ type: Array, default: () => [] })

// Data master Tingkat dan kelas (Array of Objects seperti di gambar)
const dataTingkat = [
  {
    Idadiyah: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
  },
  {
    Ibtidaiyah: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
  },
  {
    Tsanawiyah: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
  },
  {
    Aliyah: ['Kelas 1', 'Kelas 2', 'Kelas 3'],
  },
]

const selectedTingkat = ref('')
const selectedKelas = ref('')
// const daftarPilihan = ref([])

// 1. Ambil daftar nama Tingkat dari setiap object di dalam array
const listNamaTingkat = computed(() => {
  return dataTingkat.map((item) => Object.keys(item)[0])
})

// 2. Cari object yang memiliki key sesuai Tingkat yang dipilih, lalu ambil array kelasnya
const opsiKelas = computed(() => {
  if (!selectedTingkat.value) return []

  const found = dataTingkat.find((item) => Object.keys(item)[0] === selectedTingkat.value)
  return found ? found[selectedTingkat.value] : []
})

const handleTingkatChange = () => {
  selectedKelas.value = ''
}

const tambahTingkat = () => {
  if (!selectedTingkat.value || !selectedKelas.value) return

  const sudahAda = daftarPilihan.value.some(
    (item) => item.Tingkat === selectedTingkat.value && item.kelas === selectedKelas.value,
  )

  if (!sudahAda) {
    // 2. Push ke daftarPilihan (otomatis memperbarui laporan.wali_kelas / guru_fan)
    daftarPilihan.value.push({
      //   id: Date.now(),
      Tingkat: selectedTingkat.value,
      kelas: selectedKelas.value,
    })
  }

  selectedTingkat.value = ''
  selectedKelas.value = ''
  console.log('Daftar Pilihan:', daftarPilihan.value) // Debugging: lihat daftar pilihan di console
}

const hapusPilihan = (id) => {
  daftarPilihan.value = daftarPilihan.value.filter((item) => item.id !== id)
}
</script>

<template>
  <div class="bg-base-200 rounded-xl max-w-2xl">
    <!-- Container Dropdown Berjejer ke Samping -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Dropdown Pilih Tingkat -->
      <div class="form-control w-full">
        <label class="label pt-0">
          <span class="field-label label-text text-base text-base-content">Pilih Tingkat</span>
        </label>
        <select
          v-model="selectedTingkat"
          @change="handleTingkatChange"
          class="select select-bordered field w-full bg-base-100 focus:outline-none"
        >
          <option value="" disabled selected>-- Pilih Tingkat --</option>
          <!-- 3. Looping menggunakan listNamaTingkat -->
          <option v-for="Tingkat in listNamaTingkat" :key="Tingkat" :value="Tingkat">
            {{ Tingkat }}
          </option>
        </select>
      </div>

      <!-- Dropdown Pilih Kelas -->
      <div class="form-control w-full">
        <label class="label pt-0">
          <span class="field-label label-text text-base text-base-content">Pilih Kelas</span>
        </label>
        <select
          v-model="selectedKelas"
          :disabled="!selectedTingkat"
          class="select select-bordered field w-full bg-base-100 focus:outline-none disabled:bg-base-100/60"
        >
          <option value="" disabled selected>
            {{ selectedTingkat ? '-- Pilih Kelas --' : 'Pilih tingkat dulu' }}
          </option>
          <option v-for="kelas in opsiKelas" :key="kelas" :value="kelas">
            {{ kelas }}
          </option>
        </select>
      </div>
      <!-- Tombol Header -->
      <div class="mb-4">
        <button
          type="button"
          @click="tambahTingkat"
          :disabled="!selectedTingkat || !selectedKelas"
          class="btn btn-sm field bg-primary hover:bg-[#1a2b22] text-white border-none rounded-none px-4 normal-case font-normal disabled:opacity-50"
        >
          Tambah Tingkat Kelas
        </button>
      </div>
    </div>

    <!-- Hasil Pilihan Tampil di Bawahnya & Bisa Dihapus -->
    <div v-if="daftarPilihan.length > 0" class="mt-5 pt-4 border-t border-base-300">
      <p class="field-label text-sm text-base-content/70 mb-2">Tingkat & Kelas Terpilih:</p>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="item in daftarPilihan"
          :key="item.id"
          class="badge field badge-lg bg-base-100 border-base-300 gap-2 py-4 px-3 shadow-sm"
        >
          <span class="font-medium">{{ item.Tingkat }} - {{ item.kelas }}</span>
          <button
            type="button"
            @click="hapusPilihan(item.id)"
            class="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10"
            title="Hapus"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
