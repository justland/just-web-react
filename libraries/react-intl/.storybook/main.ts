import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook-community/storybook-dark-mode'),
		getAbsolutePath('@storybook/addon-docs'),
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
	typescript: {
		check: false,
		reactDocgen: 'react-docgen-typescript',
	},
	docs: {},
	viteFinal(config) {
		return mergeConfig(config, {
			build: {
				target: 'esnext',
			},
		})
	},
}

export default config

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')))
}
