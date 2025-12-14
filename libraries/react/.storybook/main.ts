import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, join } from 'path'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [getAbsolutePath('@storybook-community/storybook-dark-mode'), getAbsolutePath('@storybook/addon-docs')],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
	typescript: {
		check: false,
		reactDocgen: 'react-docgen-typescript',
	},
	docs: {},
}

export default config

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')))
}
