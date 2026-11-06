import { createRouter, createWebHistory } from 'vue-router'
import Form from '../components/Form.vue'
import Dashboard from '../components/Dashboard.vue'
import GuruTugas from '../components/GuruTugas.vue'
import Pjgt from '@/components/Pjgt.vue'
import Laporan from '@/components/Laporan.vue'
import Surat from '@/components/Surat.vue'
import Rekap from '@/components/Rekap.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import HalamanUtama from '@/layout/HalamanUtama.vue'
import HalamanLogin from '@/layout/HalamanLogin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'halaman-utama',
      component: HalamanUtama,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: '/form',
          name: 'form',
          component: Form,
        },
        {
          path: '/gt',
          name: 'guru-tugas',
          component: GuruTugas,
        },
        {
          path: '/pjgt',
          name: 'pjgt',
          component: Pjgt,
        },
        {
          path: '/laporan',
          name: 'laporan',
          component: Laporan,
        },
        {
          path: '/surat',
          name: 'surat',
          component: Surat,
        },
        {
          path: '/rekap',
          name: 'rekap',
          component: Rekap,
        },
      ],
    },
    {
      path: '',
      name: 'halaman-login',
      component: HalamanLogin,
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/register',
          name: 'register',
          component: Register,
        },
      ],
    },
  ],
})
router.beforeEach((to) => {
  // console.log("beforeEach to", to.fullPath);
  if (to.fullPath == '/') {
    return '/dashboard'
  }
  // cek route tujuan
  // if
  // jika route tujuan adalah /login atau /register,
  // maka jika sudah punya token, redirect ke /home

  // else
  // jika route tujuan bukan /login atau /register, maka cek token
  // jika tidak punya token, redirect ke /login

  return true
})

export default router
