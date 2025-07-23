// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'pleasanton-downtown' with your repo name
export default defineConfig({
  base: '/p/',
  plugins: [react()]
})
