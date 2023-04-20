import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../ts/**/*.stories.mdx', '../ts/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-storysource',
		'storybook-dark-mode',
		{
			name: '@storybook/addon-styling',
			options: {
				postCss: true
			}
		}
	],
	framework: {
		name: '@storybook/react-vite',
		options: {}
	},
	features: {
		storyStoreV7: true
	},
	typescript: {
		check: false
	},
	docs: {
		autodocs: true
	}
}

export default config
