import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import manifest from './manifest.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        ...manifest,
        name: 'ID Santri Guru Tugas',
        short_name: 'ID Santri GT',
        description: 'Aplikasi Laporan Bulanan Guru Tugas',
      },
    }),
  ],
  devtools: {
    apply: 'serve',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
