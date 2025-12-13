/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { externals } from 'rollup-plugin-node-externals';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react({ exclude: [/\.spec\.tsx?$/, /\.stories\.tsx?$/] }), { ...externals(), enforce: 'pre' }],
	build: {
		lib: {
			entry: resolve(__dirname, 'ts/index.ts'),
			formats: ['es', 'cjs'],
			fileName: 'just-web-react',
		},
		minify: false,
		rollupOptions: {
			output: {
				exports: 'named',
			},
		},
		sourcemap: true,
	},
	resolve: {
		alias: {
			'@storybook/jest': 'vitest',
		},
	},
	test: {
		globals: true,
		dir: 'ts',
		environment: 'jsdom',
		setupFiles: 'scripts/setup-test.ts',
	},
});
