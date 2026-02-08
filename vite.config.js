// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/test2/'   // ← ТОЧНО имя твоего репозитория!
  // Если репозиторий называется employees-app → '/employees-app/'
  // Если в будущем переименуешь репозиторий — меняй здесь!
})