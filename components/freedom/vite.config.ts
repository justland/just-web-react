/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import externals from 'rollup-plugin-node-externals'

export default defineConfig({
	// @ts-ignore
	plugins: [react({ exclude: [/\.spec\.tsx?$/, /\.stories\.tsx?$/] }), { ...externals(), enforce: 'pre' }],
	build: {
		lib: {
			entry: resolve(__dirname, 'ts/index.ts'),
			formats: ['es', 'cjs'],
			fileName: 'react-freedom'
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
			// '@storybook/jest': 'vitest'
		}
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'scripts/setup-test.ts',
		typecheck: {
			tsconfig: './tsconfig.json'
		}
	}
})
