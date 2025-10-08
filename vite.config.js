import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import { fileURLToPath, URL } from 'node:url'



// https://vite.dev/config/
export default defineConfig({
  // base: '/frontend/',
  plugins: [react(), tailwindcss(),],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      port: 3000,
      host: 'localhost'
    },
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
   build: {
    chunkSizeWarningLimit: 3000 
  }
})
