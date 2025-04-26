import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load biến môi trường từ .env
dotenv.config()

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    'process.env': {
        fiberApi: process.env.FIBER_API_DOMAIN,
        api: process.env.VUE_APP_API_URL,
    }
  }
})
