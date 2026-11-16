<script setup>
// // BARU
import { ref } from 'vue'
import { dataGuruTugas } from '../stores/data'
import { computed } from 'vue'

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

function onSubmit() {
  const json = JSON.parse(JSON.stringify(detailData.value))
  console.log(json)
}

// State reaktif untuk menampung data pilihan
// const selectedOption = ref('')

// Contoh dataset dinamis yang biasa Anda gunakan
// const daftarTugas = ref([
//   { id: 1, nama: 'Desain Layout Flowbite' },
//   { id: 2, nama: 'Integrasi API Pinia Store' },
//   { id: 3, nama: 'Perbaikan Validasi Form' },
// ])

// // LAMA
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// import { useLaporanStore } from '../stores/data'

// const router = useRouter()
// const store = useLaporanStore()

// const judulInput = ref('')
// const penulisInput = ref('Khoirul Anam') // Nilai bawaan sesuai data gambar sebelumnya

// const simpanData = () => {
//   if (judulInput.value.trim() === '') return alert('Form tidak boleh ada yang kosong!')

//   // Masukkan data baru ke dalam store
//   store.tambahLaporanBaru(judulInput.value, penulisInput.value)

//   // Alihkan navigasi kembali ke halaman list rekap
//   router.push('/laporan')
// }

const levels = ['Idadiyah', 'Ibtidaiyah', 'Tsanawiyah', 'Aliyah']
</script>

<template>
  <section class="mx-auto min-h-screen max-w-106.5 base-100 pb-15 pt-10">
    <div class="px-2.5 pb-5 pt-3.25 w-full">
      <!-- <form @submit.prevent="simpanData" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">Judul Laporan</label>
          <input
            v-model="judulInput"
            type="text"
            placeholder="Contoh: Laporan Bulan Oktober"
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1e3d30]"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">Nama Penulis</label>
          <input
            v-model="penulisInput"
            type="text"
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1e3d30]"
          />
        </div>
        <div class="flex gap-2 justify-end pt-2">
          <button
            type="button"
            @click="router.push('/form')"
            class="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-xs font-semibold text-white bg-[#1e3d30] rounded-lg hover:bg-[#152a21]"
          >
            Simpan
          </button>
        </div>
      </form> -->

      <!-- <div class="mb-1.25 text-[10px] font-extrabold uppercase tracking-wide text-[#28604c]">
        
      </div> -->
      <!-- <h1 class="text-[16px] font-normal leading-tight text-[#244638]">Form Laporan GT</h1> -->
      <form class="mt-3 space-y-2.5" @submit.prevent="onSubmit">
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
              ><input v-model="detailData.namaPjgt" type="text" class="field bg-base-100"
            /></label>
            <label
              ><span class="field-label my-4">Nama Madrasah/Ponpes</span
              ><input v-model="detailData.tempatTugas" type="text" class="field bg-base-100"
            /></label>
            <label
              ><span class="field-label my-4">Alamat</span
              ><input v-model="detailData.alamat" type="text" class="field bg-base-100"
            /></label>
          </div>
        </div>

        <!-- contoh -->
        <div>
          <div class="badge badge-xs">Ibtidaiyah 1</div>
          <button class="btn btn-sm btn-primary">tambahkan jenjang</button>
        </div>

        <label>
          Pilih Jenjang
          <input type="text" class="field bg-base-100" />
        </label>
        <label>
          Pilih Kelas
          <input type="text" class="field bg-base-100" />
        </label>
        <pre> bulan {{ detailData.bulan }}</pre>
        <select class="select select-accent" v-model="detailData.bulan">
          <option
            v-for="bulan in bulanHijri"
            :key="bulan"
            :value="bulan.no"
            @model-update="detailData.bulan = bulan.no"
          >
            {{ bulan.bulan }}
          </option>
        </select>

        <!-- end contoh -->

        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Menjadi Wali Kelas</h2>
          <div v-for="level in levels" :key="level" class="mb-2 last:mb-0">
            <div class="small-label">{{ level }}</div>
            <div class="flex gap-1 flex-col">
              <label
                >0000
                <select class="select select-sm field-select text-base-content bg-base-100 w-20">
                  <option>Kelas 1</option>
                  <option>Kelas 2</option>
                  <option>Kelas 3</option>
                  <option>Kelas 4</option>
                  <option>Kelas 5</option>
                  <option>Kelas 6</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div class="card p-2.5 bg-base-200">
          <h2 class="section-title text-primary">Menjadi Guru Fun</h2>
          <div v-for="level in levels" :key="level" class="mb-2 last:mb-0">
            <div class="small-label">{{ level }}</div>
            <div class="flex gap-1 flex-col">
              <fieldset class="fieldset">
                <select class="select select-sm field-select bg-base-100 w-20">
                  <option>Kelas 1</option>
                  <option>Kelas 2</option>
                  <option>Kelas 3</option>
                  <option>Kelas 4</option>
                  <option>Kelas 5</option>
                  <option>Kelas 6</option>
                </select>
              </fieldset>
            </div>
          </div>
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
