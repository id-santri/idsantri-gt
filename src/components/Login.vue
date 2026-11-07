<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const router = useRouter()

const handleLogin = () => {
  // 1. Buat token dummy/buatan sendiri
  // Anda bisa membuat string acak berbasis waktu agar terlihat seperti token asli
  const dummyToken = 'dummy-token-' + btoa(email.value) + '-' + Date.now()

  // 2. ** KUNCI UTAMA **
  // Langsung simpan token dummy tersebut ke localStorage
  localStorage.setItem('token', dummyToken)

  // alert('Login Berhasil (Simulasi)! Token telah disimpan.')

  // 3. Redirect ke halaman /home sesuai aturan router.beforeEach Anda
  router.push('/dashboard')

  // console.log('Proses Login:', {
  //   email: email.value,
  //   password: password.value,
  //   rememberMe: rememberMe.value,
  // })
  // Tambahkan logika API login Anda di sini
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

        <!-- Input Password -->
        <div>
          <label class="block text-sm font-medium text-brand-darkgreen mb-1.5">Kata Sandi</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
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
