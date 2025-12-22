import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: ['src/index.ts', 'src/testing/index.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	minify: false,
	external: ['@just-web/app', '@just-web/states', 'react', 'react-dom']
})
