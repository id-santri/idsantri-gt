<script setup>
import { reactive, computed } from 'vue'

// State reaktif dengan nilai awal sesuai contoh Anda
const formData = reactive({
  wali_kelas: [
    { tingkat: 'Ibtidaiyah', kelas: '1' },
    { tingkat: 'Tsanawiyah', kelas: '2' },
  ],
  guru_fan: [
    { tingkat: 'Ibtidaiyah', kelas: '1' },
    { tingkat: 'Tsanawiyah', kelas: '2' },
  ],
})

// Fungsi tambah & hapus baris untuk Wali Kelas
const addWaliKelas = () => {
  formData.wali_kelas.push({ tingkat: '', kelas: '' })
}

const removeWaliKelas = (index) => {
  formData.wali_kelas.splice(index, 1)
}

// Fungsi tambah & hapus baris untuk Guru Fan
const addGuruFan = () => {
  formData.guru_fan.push({ tingkat: '', kelas: '' })
}

const removeGuruFan = (index) => {
  formData.guru_fan.splice(index, 1)
}

// Menggunakan computed untuk memantau bentuk data bersih secara real-time
const formattedOutput = computed(() => {
  return {
    wali_kelas: formData.wali_kelas,
    guru_fan: formData.guru_fan,
  }
})

// Submit form dan cetak objek murni (non-Proxy) ke console
const submitForm = () => {
  const payload = JSON.parse(JSON.stringify(formattedOutput.value))
  console.log('Hasil Form:', payload)
}
</script>

<template>
  <section class="mx-auto min-h-screen max-w-106.5 bg-base-100 pb-12 pt-6">
    <div class="px-2.5 pb-5 pt-3.25">
      <div
        class="card p-2.5 min-h-screen pt-10 pb-20 mt-7 mb-6 relative bg-base-200 rounded-3xl w-full max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col items-center sm:items-start gap-6 font-san"
      >
        <h2 class="text-[clamp(12px,4cqw,24px)] font-bold tracking-wider leading-none">
          Surat Tugas
        </h2>
        <div class="form-container">
          <form @submit.prevent="submitForm">
            <!-- Bagian 1: Wali Kelas -->
            <div class="section">
              <h3>Data Wali Kelas</h3>
              <div
                v-for="(item, index) in formData.wali_kelas"
                :key="'wali-' + index"
                class="row-group"
              >
                <select v-model="item.tingkat" required>
                  <option value="" disabled>Pilih Tingkat</option>
                  <option value="Ibtidaiyah">Ibtidaiyah</option>
                  <option value="Tsanawiyah">Tsanawiyah</option>
                  <option value="Aliyah">Aliyah</option>
                </select>

                <input type="text" v-model="item.kelas" placeholder="Kelas (misal: 1)" required />

                <button
                  type="button"
                  @click="removeWaliKelas(index)"
                  v-if="formData.wali_kelas.length > 1"
                >
                  Hapus
                </button>
              </div>

              <button type="button" @click="addWaliKelas">+ Tambah Wali Kelas</button>
            </div>

            <hr />

            <!-- Bagian 2: Guru Fan -->
            <div class="section">
              <h3>Data Guru Fan</h3>
              <div
                v-for="(item, index) in formData.guru_fan"
                :key="'guru-' + index"
                class="row-group"
              >
                <select v-model="item.tingkat" required>
                  <option value="" disabled>Pilih Tingkat</option>
                  <option value="Ibtidaiyah">Ibtidaiyah</option>
                  <option value="Tsanawiyah">Tsanawiyah</option>
                  <option value="Aliyah">Aliyah</option>
                </select>

                <input type="text" v-model="item.kelas" placeholder="Kelas (misal: 1)" required />

                <button
                  type="button"
                  @click="removeGuruFan(index)"
                  v-if="formData.guru_fan.length > 1"
                >
                  Hapus
                </button>
              </div>

              <button type="button" @click="addGuruFan">+ Tambah Guru Fan</button>
            </div>

            <hr />

            <button type="submit" class="btn-submit">Simpan & Cek Console</button>
          </form>

          <!-- Preview langsung di layar (opsional, untuk memudahkan pengecekan) -->
          <pre>{{ formattedOutput }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  font-family: sans-serif;
}
.row-group {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
select,
input {
  padding: 6px;
}
.btn-submit {
  margin-top: 10px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
}
pre {
  background: #f4f4f4;
  padding: 10px;
  margin-top: 15px;
  border-radius: 4px;
}
</style>
