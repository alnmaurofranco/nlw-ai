import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
