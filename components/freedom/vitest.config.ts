import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
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
