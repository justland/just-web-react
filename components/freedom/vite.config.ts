import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import externals from 'rollup-plugin-node-externals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      exclude: [/\.stories\.tjsx$/]
    }),
    { ...externals(), enforce: 'pre' }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'ts/index.ts'),
      name: 'react-freedom',
      formats: ['es']
    },
    minify: false,
    sourcemap: true
  }
})
