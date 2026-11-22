<script setup>
import Auth from '@/model/Auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const id_gt = ref('')
const otp_request = ref('')
const email = ref('')
const termsAccepted = ref(false)
const loading = ref(false)
const router = useRouter()

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const handleRegister = async () => {
  if (!termsAccepted.value) {
    toast('Anda harus menyetujui Syarat dan Ketentuan.', {
      type: 'error',
      position: 'top-center',
      dangerouslyHTMLString: true,
    })
    return
  }
  // 1. Bungkus data menjadi satu objek
  const dataRegister = {
    gt_id: Number(id_gt.value),
    otp: otp_request.value,
    email: email.value,
  }
  try {
    loading.value = true
    const response = await delay(0) // Tambahkan delay 1 detik
    // const response = await Auth.register(dataRegister.gt_id, dataRegister.otp, dataRegister.email)

    // console.log('Response dari API:', response)
    // alert(response?.message || 'Registrasi berhasil! Silakan Login.')
    toast(response?.message || 'Berhasil registrasi! Silakan Login.', {
      type: 'info',
      position: 'top-center',
      dangerouslyHTMLString: true,
    })
    // arahkan ke halaman request otp
    await router.push('/login')
  } catch (error) {
    toast(error.message || 'Terjadi kesalahan saat registrasi.', {
      type: 'error',
      position: 'top-center',
      dangerouslyHTMLString: true,
    })
    // console.error('Terjadi kesalahan saat registrasi:', error)
  } finally {
    loading.value = false
  }

  console.log('Data Registrasi:', dataRegister)

  // Simpan ke Local Storage browser
  localStorage.setItem('data_registrasi', JSON.stringify(dataRegister))

  // alert('Data berhasil disimpan ke Local Storage!')
  // Tambahkan logika API registrasi Anda di sini
}

// console.log('ID Guru Tugas:', id_gt.value)
// console.log('Kode OTP:', otp_request.value)
// console.log('Alamat Email:', email.value)
</script>

<template>
  <!-- Container Tampilan Mobile (Simulasi Layar HP) -->
  <div
    class="mx-auto my-0 flex min-h-screen max-w-109.5 flex-col justify-between bg-brand-white px-6 py-8 shadow-xl font-sans"
  >
    <!-- Bagian Atas / Header -->
    <div class="mt-4">
      <h2 class="text-2xl font-bold pt-5 text-brand-darkgreen">Registrasi Akun</h2>
      <p class="mt-1 text-sm text-brand-darkgreen">
        Mulai menjadi bagian dari Guru Tugas PP. Syaichona Moh. Cholil Bangkalan
      </p>
      <!-- Garis dekoratif perpaduan warna -->
      <div class="mt-4 h-1.5 w-16 bg-brand-darkgreen rounded-full relative">
        <div class="absolute right-0 top-0 h-full w-4 bg-brand-yellow rounded-full"></div>
      </div>
    </div>

    <!-- Bagian Form Utama -->
    <div class="mt-6 flex-1">
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Input Nama Lengkap -->
        <div>
          <label class="block text-sm font-medium text-brand-darkgreen mb-1.5">ID Guru Tugas</label>
          <input
            v-model="id_gt"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            @input="id_gt = id_gt.replace(/\D/g, '')"
            required
            placeholder="Masukkan ID Guru Tugas"
            class="w-full px-4 py-3 bg-base-100 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-darkgreen focus:ring-2 focus:ring-brand-darkgreen/20 transition text-sm"
          />
        </div>

        <!-- Input Password -->
        <div>
          <label class="block text-sm font-medium text-brand-darkgreen mb-1.5">Kode OTP</label>
          <input
            v-model="otp_request"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            @input="otp_request = otp_request.replace(/\D/g, '')"
            placeholder="Masukkan Kode OTP"
            class="w-full px-4 py-3 bg-base-100 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-darkgreen focus:ring-2 focus:ring-brand-darkgreen/20 transition text-sm"
          />
        </div>

        <!-- Input Email -->
        <div>
          <label class="block text-sm font-medium text-brand-darkgreen mb-1.5">Alamat Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="nama@email.com"
            class="w-full px-4 py-3 bg-base-100 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-darkgreen focus:ring-2 focus:ring-brand-darkgreen/20 transition text-sm"
          />
        </div>

        <!-- Checkbox Syarat & Ketentuan -->
        <div class="flex items-start text-xs pt-1">
          <input
            v-model="termsAccepted"
            type="checkbox"
            required
            class="mt-0.5 h-4 w-4 rounded text-brand-darkgreen focus:ring-brand-darkgreen border-gray-300 accent-brand-darkgreen mr-2"
          />
          <span class="text-brand-darkgreen leading-tight">
            Saya menyetujui
            <a href="#" class="font-medium text-brand-darkgreen underline">Syarat Ketentuan</a> dan
            <a href="#" class="font-medium text-brand-darkgreen underline">Kebijakan Privasi</a>
            yang berlaku.
          </span>
        </div>

        <!-- Tombol Submit -->
        <button
          type="submit"
          class="w-full mt-4 py-3.5 bg-primary text-accent-content font-semibold rounded-xl shadow-md hover:bg-opacity-95 active:scale-[0.99] transition-all text-center"
        >
          Daftar Akun
        </button>
      </form>
    </div>

    <!-- Bagian Footer / Navigasi Pindah Halaman -->
    <div class="mt-8 text-center text-sm text-brand-darkgreen">
      Sudah registrasi akun?
      <router-link
        to="/login"
        class="font-bold text-brand-darkgreen border-b-2 border-brand-yellow pb-0.5 hover:text-opacity-80"
      >
        Masuk di sini
      </router-link>
    </div>
  </div>
</template>
