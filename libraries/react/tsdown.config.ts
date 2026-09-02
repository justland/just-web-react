import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: ['src/index.ts', 'src/testing/index.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	minify: false,
	deps: {
		neverBundle: ['@just-web/app', '@just-web/states', 'react', 'react-dom']
	}
})
