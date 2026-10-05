import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		coverage: {
			// Floor at the measured baseline (#302). Raise it when coverage improves; do not lower it.
			thresholds: { statements: 98, branches: 86, functions: 100, lines: 100 }
		},
		name: 'freedom',
		environment: 'jsdom'
		// browser: {
		// 	enabled: true,
		// 	provider: playwright(),
		// 	headless: true,
		// 	instances: [
		// 		{
		// 			browser: 'chromium',
		// 		},
		// 	],
		// },
	}
})
