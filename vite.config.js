import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dotenv from 'dotenv'
import { resolve } from 'path'

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
  },
  server: {
    proxy: {
        // Laravel backend nội bộ
        '/api': {
            target: 'http://localhost:8000',
            changeOrigin: false,
            rewrite: path => path.replace(/^\/api/, ''),
        },
        // External bot API
        '/fiber-api': {
            target: 'https://fiber.bizdev.vn',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/fiber-api/, ''),
            secure: false,
            configure: (proxy, options) => {
                proxy.on('proxyReq', (proxyReq, req, res) => {
                proxyReq.setHeader('Origin', 'https://bot.bizdev.vn'); // 👉 Fake Origin
                });
            }
        }
    },
  }
})
