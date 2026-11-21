<script setup>
import { ref, computed } from 'vue'

// Data master jenjang dan kelas (Array of Objects seperti di gambar)
const dataJenjang = [
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

const selectedJenjang = ref('')
const selectedKelas = ref('')
const daftarPilihan = ref([])

// 1. Ambil daftar nama jenjang dari setiap object di dalam array
const listNamaJenjang = computed(() => {
  return dataJenjang.map((item) => Object.keys(item)[0])
})

// 2. Cari object yang memiliki key sesuai jenjang yang dipilih, lalu ambil array kelasnya
const opsiKelas = computed(() => {
  if (!selectedJenjang.value) return []

  const found = dataJenjang.find((item) => Object.keys(item)[0] === selectedJenjang.value)
  return found ? found[selectedJenjang.value] : []
})

const handleJenjangChange = () => {
  selectedKelas.value = ''
}

const tambahJenjang = () => {
  if (!selectedJenjang.value || !selectedKelas.value) return

  const sudahAda = daftarPilihan.value.some(
    (item) => item.jenjang === selectedJenjang.value && item.kelas === selectedKelas.value,
  )

  if (!sudahAda) {
    daftarPilihan.value.push({
      //   id: Date.now(),
      jenjang: selectedJenjang.value,
      kelas: selectedKelas.value,
    })
  }

  selectedJenjang.value = ''
  selectedKelas.value = ''
  console.log('Daftar Pilihan:', daftarPilihan.value) // Debugging: lihat daftar pilihan di console
}

const hapusPilihan = (id) => {
  daftarPilihan.value = daftarPilihan.value.filter((item) => item.id !== id)
}
</script>

<template>
  <div class="p-6 bg-base-200 rounded-xl max-w-2xl">
    <!-- Tombol Header -->
    <div class="mb-4">
      <button
        type="button"
        @click="tambahJenjang"
        :disabled="!selectedJenjang || !selectedKelas"
        class="btn btn-sm bg-[#243b2e] hover:bg-[#1a2b22] text-white border-none rounded-none px-4 normal-case font-normal disabled:opacity-50"
      >
        tambahkan jenjang
      </button>
    </div>

    <!-- Container Dropdown Berjejer ke Samping -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Dropdown Pilih Jenjang -->
      <div class="form-control w-full">
        <label class="label pt-0">
          <span class="label-text text-base text-base-content">Pilih Jenjang</span>
        </label>
        <select
          v-model="selectedJenjang"
          @change="handleJenjangChange"
          class="select select-bordered w-full bg-base-100 focus:outline-none"
        >
          <option value="" disabled selected>-- Pilih Jenjang --</option>
          <!-- 3. Looping menggunakan listNamaJenjang -->
          <option v-for="jenjang in listNamaJenjang" :key="jenjang" :value="jenjang">
            {{ jenjang }}
          </option>
        </select>
      </div>

      <!-- Dropdown Pilih Kelas -->
      <div class="form-control w-full">
        <label class="label pt-0">
          <span class="label-text text-base text-base-content">Pilih Kelas</span>
        </label>
        <select
          v-model="selectedKelas"
          :disabled="!selectedJenjang"
          class="select select-bordered w-full bg-base-100 focus:outline-none disabled:bg-base-100/60"
        >
          <option value="" disabled selected>
            {{ selectedJenjang ? '-- Pilih Kelas --' : 'Pilih jenjang dulu' }}
          </option>
          <option v-for="kelas in opsiKelas" :key="kelas" :value="kelas">
            {{ kelas }}
          </option>
        </select>
      </div>
    </div>

    <!-- Hasil Pilihan Tampil di Bawahnya & Bisa Dihapus -->
    <div v-if="daftarPilihan.length > 0" class="mt-5 pt-4 border-t border-base-300">
      <p class="text-sm text-base-content/70 mb-2">Jenjang & Kelas Terpilih:</p>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="item in daftarPilihan"
          :key="item.id"
          class="badge badge-lg bg-base-100 border-base-300 gap-2 py-4 px-3 shadow-sm"
        >
          <span class="font-medium">{{ item.jenjang }} - {{ item.kelas }}</span>
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
