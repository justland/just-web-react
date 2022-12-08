/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import externals from 'rollup-plugin-node-externals'

export default defineConfig({
  plugins: [
    react({ exclude: [/\.spec\.tsx?$/, /\.stories\.tsx?$/] }),
    { ...externals(), enforce: 'pre' }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'ts/index.tsx'),
      formats: ['es', 'cjs'],
      fileName: 'just-web-react-commands'
    },
    minify: false,
    rollupOptions: {
      output: {
        exports: 'named'
      }
    },
    sourcemap: true
  },
  resolve: {
    alias: {
      '@storybook/jest': 'vitest'
    }
  },
  test: {
    globals: true,
    deps: {
      inline: [/@just-web/, /just-web-react/]
    },
    environment: 'jsdom',
    setupFiles: 'scripts/setup-test.ts',
    typecheck: {
      tsconfig: './tsconfig.json'
    }
  }
})
