import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: {
		'just-web-react-commands': 'src/index.tsx',
	},
	format: ['esm', 'cjs'],
	dts: true,
	minify: false,
	external: [
		'@just-web/app',
		'@just-web/browser-keyboard',
		'@just-web/commands',
		'@just-web/keyboard',
		'@just-web/os',
		'@just-web/react',
		'react',
		'react-dom',
	],
})
