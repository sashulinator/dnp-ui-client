// @ts-ignore
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
        // @ts-ignore
        '~': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api/1.0': env.UNI,
        '/api/0.6': env.CEH,
      },
    },
  }
})
