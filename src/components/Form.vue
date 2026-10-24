<script setup>
// // KODE FORM BARU

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/data'

// Sub-komponen Custom Dropdown (bisa dipisah ke file terpisah)
// ada kode dihapus disini
const router = useRouter()
const dataStore = useDataStore()

const levels = ref(['SD', 'SMP', 'SMA']) // Sesuaikan jika 'levels' sudah dideklarasikan di parent/data

const form = reactive({
  bulan: 'September',
  namaGT: '',
  namaPJGT: '',
  namaMadrasah: '',
  alamat: '',
  waliKelas: {},
  guruFun: {},
  jenisKelaminMurid: 'Laki-laki',
  jumlahMurid: { kelas1: '1', kelas2: '1', kelas3: '1', kelas4: '1', kelas5: '1', kelas6: '1' },
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

const handleSubmit = () => {
  // Simpan data berbentuk Object & Array ke store Pinia (stores/data.js)
  dataStore.simpanLaporan({ ...form })

  // Pindah halaman menggunakan vue-router (contoh ke route 'dashboard' atau 'sukses')
  router.push({ name: 'dashboard' })
}

// Mengetahui dropdown mana yang sedang diklik/buka
const activeDropdown = ref(null)

// Fungsi untuk membuka atau menutup list dropdown
const toggleDropdown = (key) => {
  activeDropdown.value = activeDropdown.value === key ? null : key
}

// Fungsi untuk memilih data pilihan dan memasukkannya ke object form
const selectOption = (field, value, subKey = null) => {
  if (subKey) {
    form[field][subKey] = value // Untuk Wali Kelas, Guru Fun, & Jumlah Murid per kelas
  } else {
    form[field] = value // Untuk bulan, jenis kelamin, kehadiran, dll
  }
  activeDropdown.value = null // Otomatis menutup list setelah dipilih
}

// // KODE FORM LAMA
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// import { useLaporanStore } from '../stores/data'

// const router = useRouter()
// const store = useLaporanStore()

// const judulInput = ref('')
// const penulisInput = ref('Khoirul Anam') // Nilai bawaan sesuai data gambar sebelumnya

// const simpanData = () => {
//   if (judulInput.value.trim() === '') return alert('Judul tidak boleh kosong!')

//   // Masukkan data baru ke dalam store
//   store.tambahLaporanBaru(judulInput.value, penulisInput.value)

//   // Alihkan navigasi kembali ke halaman list rekap
//   router.push('/laporan')
// }

// const levels = ['Idadiyah', 'Ibtidaiyah', 'Tsanawiyah', 'Aliyah']
</script>

<template>
  <section class="mx-auto min-h-screen max-w-106.5 bg-[#eef1f5] pb-15 pt-10">
    <div class="px-2.5 pb-5 pt-3.25">
      <h2 class="text-lg font-bold text-[#1e3d30] mb-4">Tambah Laporan Baru</h2>
      <!-- Form Baru -->

      <form @submit.prevent="handleSubmit" class="mt-4 space-y-2.5">
        <!-- Card 1 -->
        <div class="card p-2.5">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h2 class="section-title mb-3 text-blue-600 md:text-green-600">Form Laporan GT</h2>
              <p class="max-w-46.25 text-[10px] leading-[1.4] text-[#7a8580]">
                Silakan isi form laporan guru tugas dengan lengkap dan benar.
              </p>
            </div>
          </div>
          <div class="mt-2.75 space-y-2.5">
            <!-- Custom Dropdown: Laporan Bulan -->
            <label class="block">
              <span class="field-label">Laporan Bulan</span>
              <CustomDropdown
                v-model="form.bulan"
                :options="['September', 'Oktober']"
                class="w-20"
              />
            </label>

            <label
              ><span class="field-label">Nama GT</span><input v-model="form.namaGT" class="field"
            /></label>
            <label
              ><span class="field-label">Nama PJGT</span
              ><input v-model="form.namaPJGT" class="field"
            /></label>
            <label
              ><span class="field-label">Nama Madrasah/Ponpes</span
              ><input v-model="form.namaMadrasah" class="field"
            /></label>
            <label
              ><span class="field-label">Alamat</span><input v-model="form.alamat" class="field"
            /></label>
          </div>
        </div>

        <!-- Card: Menjadi Wali Kelas -->
        <div class="card p-2.5">
          <h2 class="section-title">Menjadi Wali Kelas</h2>
          <div v-for="level in levels" :key="level" class="mb-2 last:mb-0">
            <div class="small-label">{{ level }}</div>
            <div class="flex gap-1">
              <label>
                <CustomDropdown
                  v-model="form.waliKelas[level]"
                  :options="['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6']"
                  class="w-20"
                />
              </label>
            </div>
          </div>
        </div>

        <!-- Card: Menjadi Guru Fun -->
        <div class="card p-2.5">
          <h2 class="section-title">Menjadi Guru Fun</h2>
          <div v-for="level in levels" :key="level" class="mb-2 last:mb-0">
            <div class="small-label">{{ level }}</div>
            <div class="flex gap-1">
              <label>
                <CustomDropdown
                  v-model="form.guruFun[level]"
                  :options="['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6']"
                  class="w-20"
                />
              </label>
            </div>
          </div>
        </div>

        <!-- Card: Data Murid -->
        <div class="card p-2.5">
          <h2 class="section-title">Data Murid</h2>
          <label class="block">
            <span class="field-label">Jenis Kelamin Murid</span>
            <CustomDropdown
              v-model="form.jenisKelaminMurid"
              :options="['Laki-laki', 'Perempuan', 'Laki-Laki & Perempuan']"
              class="w-21.25"
            />
          </label>
          <div class="mt-2.75">
            <h3 class="field-label">Jumlah Murid</h3>
            <div class="flex gap-1 flex-wrap">
              <label
                v-for="c in ['kelas1', 'kelas2', 'kelas3', 'kelas4', 'kelas5', 'kelas6']"
                :key="c"
              >
                <span class="field-label">{{ c }}</span>
                <CustomDropdown
                  v-model="form.jumlahMurid[c]"
                  :options="['1', '2', '3', '4', '5', '6']"
                  class="w-20"
                />
              </label>
            </div>
          </div>
        </div>

        <!-- Card: Kehadiran & Kegiatan -->
        <div class="card p-2.5">
          <h2 class="section-title">Kehadiran &amp; Kegiatan</h2>
          <div class="space-y-2.5">
            <label
              ><span class="field-label">Sakit</span
              ><CustomDropdown
                v-model="form.sakit"
                :options="['1 Hari', '2 Hari', '3 Hari', 'Tidak']"
                class="w-15.75"
            /></label>
            <label
              ><span class="field-label">Pulang</span
              ><CustomDropdown
                v-model="form.pulang"
                :options="['1 Hari', '2 Hari', '3 Hari', 'Tidak']"
                class="w-15.75"
            /></label>
            <label
              ><span class="field-label">Udzur Lain</span
              ><CustomDropdown
                v-model="form.udzurLain"
                :options="['1 Hari', '2 Hari', '3 Hari', 'Tidak']"
                class="w-15.75"
            /></label>
            <label
              ><span class="field-label">Mengajar Al-Qur’an</span
              ><CustomDropdown
                v-model="form.mengajarAlQuran"
                :options="['Iya', 'Tidak']"
                class="w-13.5"
            /></label>
            <label
              ><span class="field-label">Mengajar Kitab</span
              ><CustomDropdown
                v-model="form.mengajarKitab"
                :options="['Iya', 'Tidak']"
                class="w-13.5"
            /></label>
            <label
              ><span class="field-label">Imam Sholat Jum’at</span
              ><CustomDropdown v-model="form.imamJumat" :options="['Iya', 'Tidak']" class="w-13.5"
            /></label>
            <label
              ><span class="field-label">Imam Sholat Maktubah</span
              ><CustomDropdown
                v-model="form.imamMaktubah"
                :options="['Iya', 'Tidak']"
                class="w-13.5"
            /></label>
          </div>
        </div>

        <!-- Card: Penilaian & Catatan -->
        <div class="card p-2.5">
          <h2 class="section-title">Penilaian &amp; Catatan</h2>
          <div class="mb-3.25">
            <span class="field-label">Hubungan dengan PJGT</span>
            <div class="flex gap-0.5 text-[17px] leading-none">
              <CustomDropdown
                v-model="form.hubunganPJGT"
                :options="['Baik', 'Cukup Baik', 'Sangat Baik']"
                class="w-21.25"
              />
            </div>
          </div>
          <div class="mb-3.25">
            <span class="field-label">Hubungan dengan Guru Lain</span>
            <div class="flex gap-0.5 text-[17px] leading-none">
              <CustomDropdown
                v-model="form.hubunganGuruLain"
                :options="['Baik', 'Cukup Baik', 'Sangat Baik']"
                class="w-21.25"
              />
            </div>
          </div>
          <label class="mb-2.5 block">
            <span class="field-label">Tugas Tambahan selain mengajar</span>
            <textarea
              v-model="form.tugasTambahan"
              placeholder="Silakan masukkan tugas tambahan..."
              class="field resize-y"
            ></textarea>
          </label>
          <label class="mb-2.5 block">
            <span class="field-label">Usulan dan Saran kepada UGT</span>
            <textarea
              v-model="form.usulanSaran"
              placeholder="Silakan masukkan usulan dan saran..."
              class="field resize-y"
            ></textarea>
          </label>
          <label class="mb-2.5 block">
            <span class="field-label">Bisyaroh Bulan Ini</span>
            <CustomDropdown
              v-model="form.bisyarohBulanIni"
              :options="['700', '800', '900', '1000']"
              class="w-13.5"
            />
          </label>
          <label class="block">
            <span class="field-label">Pemberian Bisyaroh</span>
            <CustomDropdown
              v-model="form.pemberianBisyaroh"
              :options="['Tepat waktu', 'Terlambat']"
              class="w-27.75"
            />
          </label>
          <button
            type="submit"
            class="mt-4 w-full rounded-lg bg-[#174533] py-3 text-[11px] font-bold text-white"
          >
            Simpan Laporan
          </button>
        </div>

        <div class="relative inline-block text-left" ref="dropdownRef">
          <button
            type="button"
            @click="isOpen = !isOpen"
            class="field flex items-center justify-between w-full bg-white border px-2 py-1 text-left"
          >
            <span>{{ modelValue || options[0] }}</span>
            <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <ul
            v-if="isOpen"
            class="absolute z-50 mt-1 max-h-48 overflow-auto bg-white border rounded shadow-lg w-full"
          >
            <li
              v-for="opt in options"
              :key="opt"
              @click="selectOption(opt)"
              class="px-2 py-1.5 hover:bg-gray-100 cursor-pointer text-xs"
            >
              {{ opt }}
            </li>
          </ul>
        </div>
      </form>

      <!-- Form Lama -->
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
        Halaman Guru Tugas
      </div> -->
      <!-- <h1 class="text-[16px] font-normal leading-tight text-[#244638]">Form Laporan GT</h1> -->
      <!-- <form class="mt-4 space-y-2.5">
        <div class="card p-2.5">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h2 class="section-title mb-3 text-blue-600 md:text-green-600">Form Laporan GT</h2>
              <p class="max-w-46.25 text-[10px] leading-[1.4] text-[#7a8580]">
                Silakan isi form laporan guru tugas dengan lengkap dan benar.
              </p>
            </div>
          </div>
          <div class="mt-2.75 space-y-2.5">
            <label
              ><span class="field-label">Laporan Bulan</span
              ><select class="field w-20">
                <option>September</option>
                <option>Oktober</option>
              </select>
            </label>
            <label><span class="field-label">Nama GT</span><input class="field" /></label>
            <label><span class="field-label">Nama PJGT</span><input class="field" /></label>
            <label
              ><span class="field-label">Nama Madrasah/Ponpes</span><input class="field"
            /></label>
            <label><span class="field-label">Alamat</span><input class="field" /></label>
          </div>
        </div>
        <div class="card p-2.5">
          <h2 class="section-title">Menjadi Wali Kelas</h2>
          <div v-for="level in levels" :key="level" class="mb-2 last:mb-0">
            <div class="small-label">{{ level }}</div>
            <div class="flex gap-1">
              <label
                ><select class="field w-20">
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
        <div class="card p-2.5">
          <h2 class="section-title">Menjadi Guru Fun</h2>
          <div v-for="level in levels" :key="level" class="mb-2 last:mb-0">
            <div class="small-label">{{ level }}</div>
            <div class="flex gap-1">
              <label
                ><select class="field w-20">
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
        <div class="card p-2.5">
          <h2 class="section-title">Data Murid</h2>
          <label class="block"
            ><span class="field-label">Jenis Kelamin Murid</span
            ><select class="field w-21.25">
              <option>Laki-laki</option>
              <option>Perempuan</option>
              <option>Laki-Laki & Perempuan</option>
            </select></label
          >
          <div class="mt-2.75">
            <h3 class="field-label">Jumlah Murid</h3>
            <div class="flex gap-1">
              <label>
                <span class="field-label">Kelas 1</span
                ><select class="field w-20">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </label>
              <label>
                <span class="field-label">Kelas 2</span
                ><select class="field w-20">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </label>
              <label>
                <span class="field-label">Kelas 3</span
                ><select class="field w-20">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </label>
              <label>
                <span class="field-label">Kelas 4</span
                ><select class="field w-20">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </label>
              <label>
                <span class="field-label">Kelas 5</span
                ><select class="field w-20">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </label>
              <label>
                <span class="field-label">Kelas 6</span
                ><select class="field w-20">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div class="card p-2.5">
          <h2 class="section-title">Kehadiran &amp; Kegiatan</h2>
          <div class="space-y-2.5">
            <label
              ><span class="field-label">Sakit</span
              ><select class="field w-15.75">
                <option>1 Hari</option>
                <option>2 Hari</option>
                <option>3 Hari</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label">Pulang</span
              ><select class="field w-15.75">
                <option>1 Hari</option>
                <option>2 Hari</option>
                <option>3 Hari</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label">Udzur Lain</span
              ><select class="field w-15.75">
                <option>1 Hari</option>
                <option>2 Hari</option>
                <option>3 Hari</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label">Mengajar Al-Qur’an</span
              ><select class="field w-13.5">
                <option>Iya</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label">Mengajar Kitab</span
              ><select class="field w-13.5">
                <option>Iya</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label">Imam Sholat Jum’at</span
              ><select class="field w-13.5">
                <option>Iya</option>
                <option>Tidak</option>
              </select></label
            >
            <label
              ><span class="field-label">Imam Sholat Maktubah</span
              ><select class="field w-13.5">
                <option>Iya</option>
                <option>Tidak</option>
              </select></label
            >
          </div>
        </div>
        <div class="card p-2.5">
          <h2 class="section-title">Penilaian &amp; Catatan</h2>
          <div class="mb-3.25">
            <span class="field-label">Hubungan dengan PJGT</span>
            <div class="flex gap-0.5 text-[17px] leading-none">
              <select class="field w-21.25">
                <option>Baik</option>
                <option>Cukup Baik</option>
                <option>Sangat Baik</option>
              </select>
            </div>
          </div>
          <div class="mb-3.25">
            <span class="field-label">Hubungan dengan Guru Lain</span>
            <div class="flex gap-0.5 text-[17px] leading-none">
              <select class="field w-21.25">
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
              class="field resize-y"
            ></textarea>
          </label>
          <label class="mb-2.5 block"
            ><span class="field-label">Usulan dan Saran kepada UGT</span
            ><textarea
              placeholder="Silakan masukkan usulan dan saran..."
              class="field resize-y"
            ></textarea>
          </label>
          <label class="mb-2.5 block"
            ><span class="field-label">Bisyaroh Bulan Ini</span
            ><select class="field w-13.5">
              <option>700</option>
              <option>800</option>
              <option>900</option>
              <option>1000</option>
            </select></label
          >
          <label class="block"
            ><span class="field-label">Pemberian Bisyaroh</span
            ><select class="field w-27.75">
              <option>Tepat waktu</option>
              <option>Terlambat</option>
            </select></label
          >

          <button
            type="submit"
            class="mt-4 w-full rounded-lg bg-[#174533] py-3 text-[11px] font-bold text-white"
          >
            Simpan Laporan
          </button>
        </div>
      </form> -->
    </div>
  </section>
</template>

<style></style>
