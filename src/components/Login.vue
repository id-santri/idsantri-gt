<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const otp_verify = ref('')
const rememberMe = ref(false)
const router = useRouter()

// State penanda status pengiriman email
const isEmailSent = ref(false)

const handleLogin = async () => {
  // TAHAP 1: Jika email belum dikirim
  if (!isEmailSent.value) {
    if (!email.value) {
      alert('Silakan masukkan alamat email terlebih dahulu.')
      return
    }

    console.log('Mengirim OTP ke email:', email.value)
    // Tambahkan pemanggilan API kirim OTP di sini...

    // Ubah state menjadi true agar form berganti menampilkan input OTP
    isEmailSent.value = true

    // TAHAP 2: Jika email sudah dikirim (Proses verifikasi OTP)
  } else {
    if (!otp_verify.value) {
      alert('Silakan masukkan kode OTP.')
      return
    }

    console.log('Verifikasi OTP:', otp_verify.value)
    // Tambahkan pemanggilan API verifikasi OTP di sini...

    // 1. Buat dan simpan token setelah OTP valid
    const dummyToken = 'dummy-token-' + btoa(email.value) + '-' + Date.now()
    localStorage.setItem('token', dummyToken)

    // 2. Simpan data login lengkap ke Local Storage
    const loginData = {
      email: email.value,
      otp_verify: otp_verify.value,
      rememberMe: rememberMe.value,
    }
    console.log('Data Login:', loginData)
    localStorage.setItem('data_login', JSON.stringify(loginData))

    // 3. Redirect ke halaman dashboard
    router.push('/dashboard')
  }
}
</script>

<template>
  <!-- Container Tampilan Mobile (Simulasi Layar HP) -->
  <div
    class="mx-auto my-0 flex min-h-screen max-w-109.5 flex-col justify-between bg-brand-white px-6 py-8 shadow-xl font-sans"
  >
    <!-- Bagian Atas / Header -->
    <div class="mt-8 text-center">
      <div
        class="mx-auto flex h-25 w-25 pt-7 items-center justify-center rounded-full bg-brand-darkgreen text-brand-yellow text-3xl font-bold"
      >
        <img
          src="../assets/logo-pondok.png"
          class="flex items-center justify-center rounded-[7px]"
        />
      </div>
      <h2 class="mt-6 text-2xl font-bold text-accent-content my-2">Aplikasi</h2>
      <p
        class="mx-auto max-w-85 text-[20px] font-bold uppercase leading-[1.22] tracking-[.2px] text-primary"
      >
        Laporan Guru Tugas
      </p>
      <p class="mx-auto max-w-85 text-[16px] leading-[1.22] tracking-[.2px] text-base-content">
        Pondok Pesantren
      </p>
      <p class="mx-auto max-w-85 text-[16px] leading-[1.22] tracking-[.2px] text-base-content">
        Syachona Moh. Cholil Bangkalan
      </p>
      <!-- <p class="mt-2 text-sm text-gray-500">Silakan masuk ke akun Anda</p> -->
    </div>

    <!-- Bagian Form Utama -->
    <div class="mt-8 flex-1">
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Input Email -->
        <div v-show="!isEmailSent">
          <label class="block text-sm font-medium text-brand-darkgreen mb-1.5"
            >Masukkan Alamat Email</label
          >
          <input
            v-model="email"
            type="email"
            :required="!isEmailSent"
            placeholder="nama@email.com"
            class="w-full px-4 py-3 bg-base-100 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-darkgreen focus:ring-2 focus:ring-brand-darkgreen/20 transition text-sm"
          />
        </div>

        <!-- Input Password -->
        <div v-show="isEmailSent">
          <label class="block text-sm font-medium text-brand-darkgreen mb-1.5">Kode OTP</label>
          <input
            v-model="otp_verify"
            type="number"
            :required="isEmailSent"
            placeholder="masukkan kode OTP"
            class="w-full px-4 py-3 bg-base-100 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-darkgreen focus:ring-2 focus:ring-brand-darkgreen/20 transition text-sm"
          />
        </div>

        <!-- Opsi Tambahan -->
        <div class="flex items-center justify-between text-xs pt-1">
          <label class="flex items-center text-brand-darkgreen">
            <input
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 rounded text-brand-darkgreen focus:ring-brand-darkgreen border-gray-300 accent-brand-darkgreen mr-2"
            />
            Ingat Saya
          </label>
          <a href="#" class="font-medium text-brand-darkgreen hover:underline">Lupa Sandi?</a>
        </div>

        <!-- Tombol Submit -->
        <button
          @click="$router.push('/dashboard')"
          type="submit"
          class="w-full mt-4 py-3.5 bg-primary text-accent-content font-semibold rounded-xl shadow-md hover:bg-opacity-95 active:scale-[0.99] transition-all text-center"
        >
          Login
        </button>
      </form>
    </div>

    <!-- Bagian Footer / Navigasi Pindah Halaman -->
    <div class="mt-8 text-center text-sm text-brand-darkgreen">
      Belum punya akun?
      <router-link
        to="/register"
        class="font-bold text-brand-darkgreen border-b-2 border-brand-yellow pb-0.5 hover:text-opacity-80"
      >
        Daftar di sini
      </router-link>
    </div>
  </div>
</template>
