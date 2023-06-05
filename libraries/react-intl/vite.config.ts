/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { transform } from '@formatjs/ts-transformer'
import typescript from '@rollup/plugin-typescript'
import { externals } from 'rollup-plugin-node-externals'

export default defineConfig({
	plugins: [
		typescript({
			transformers: {
				before: [
					transform({
						overrideIdFn: '[sha512:contenthash:base64:6]',
						ast: true
					})
				]
			}
		}),
		react({ exclude: [/\.spec\.tsx?$/, /\.stories\.tsx?$/] }),
		{ ...externals(), enforce: 'pre' }
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'ts/index.ts'),
			formats: ['es', 'cjs'],
			fileName: 'just-web-react'
		},
		minify: false,
		rollupOptions: {
			output: {
				exports: 'named'
			}
		},
		sourcemap: true
	}
})
