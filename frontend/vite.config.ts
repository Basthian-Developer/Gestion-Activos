import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    host: '0.0.0.0', port: 3000, proxy: {
      "/api": {
        target: "http://backend:8000",
        changeOrigin: true
      }
    }
  },
  base: mode === 'github-pages' ? '/Gestion-Activos/' : '/'
}))
