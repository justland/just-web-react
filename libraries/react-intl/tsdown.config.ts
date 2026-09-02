import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	minify: false,
	deps: {
		neverBundle: ['@just-web/react', 'react', 'react-intl']
	}
})
