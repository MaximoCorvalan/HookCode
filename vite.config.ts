import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Configura el servidor de desarrollo y la compilación; el plugin habilita React y su recarga rápida.
export default defineConfig({
  plugins: [react()],
})
