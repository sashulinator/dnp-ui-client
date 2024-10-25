import react from '@vitejs/plugin-react'

import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), checker({ typescript: true })],
    resolve: {
      alias: {
        '~dnp': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api/v1': env.API_URL,
        '/realms': env.AUTH_SERVICE_URL,
      },
    },
  }
})
