import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: '0.0.0.0', port: 3000, proxy: {
        "/api": {
          target: "http://backend:8000",
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        "@": "/src",
        "@dependencies":
          mode === "json"
            ? "/src/config/dependencies/json.ts"
            : "/src/config/dependencies/api.ts"
      }
    },
    base: env.VITE_BASE_URL || '/'
  }
})
