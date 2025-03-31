import react from '@vitejs/plugin-react'

import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'
import monacoEditorPlugin from 'vite-plugin-monaco-editor-esm'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      checker({ typescript: true }),
      monacoEditorPlugin({
        customDistPath: (root: string, buildOutDir: string) => `${root}/${buildOutDir}/monacoeditorwork`,
      }),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: env.PORT,
      proxy: {
        '/api/v1': env.API_URL,
      },
    },
  }
})
