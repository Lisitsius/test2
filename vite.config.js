// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/test2/'   // ← обязательно! Имя репозитория в нижнем регистре + слеш в конце
})