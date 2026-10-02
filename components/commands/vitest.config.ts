import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		coverage: {
			// Floor at the measured baseline (#302). Raise it when coverage improves; do not lower it.
			thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 }
		},
		name: 'commands',
		browser: {
			enabled: true,
			provider: playwright(),
			headless: true,
			instances: [
				{
					browser: 'chromium'
				}
			]
		}
	}
})
