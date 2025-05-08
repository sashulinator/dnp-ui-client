import react from '@vitejs/plugin-react'

import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'
import monacoEditorPlugin from 'vite-plugin-monaco-editor-esm'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      tsconfigPaths(),
      react(),
      checker({ typescript: true }),
      monacoEditorPlugin({
        customDistPath: (root: string, buildOutDir: string) => `${root}/${buildOutDir}/monacoeditorwork`,
      }),
    ],
    server: {
      port: Number(env.PORT),
      proxy: {
        '/api/v1': env.API_URL,
      },
    },
  }
})
