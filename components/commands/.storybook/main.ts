import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../ts/**/*.mdx', '../ts/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		// '@storybook/addon-storysource',
		// 'storybook-dark-mode',
	],
	docs: {
		autodocs: 'tag'
	},
	framework: {
		name: '@storybook/react-vite',
		options: {}
	},
	typescript: {
		check: false
	}
}
export default config
