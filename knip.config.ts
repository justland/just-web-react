import type { KnipConfig } from 'knip'

const config: KnipConfig = {
	workspaces: {
		'.': {
			entry: ['turbo.json', 'plopfile.mjs'],
			project: ['**/*.{ts,tsx,js,jsx,mjs}'],
			ignore: [
				'**/node_modules/**',
				'**/dist/**',
				'**/build/**',
				'**/.next/**',
				'**/coverage/**',
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'**/*.test.ts',
				'**/*.test.tsx'
			]
		}
	}
}

export default config
