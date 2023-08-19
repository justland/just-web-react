import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: [
		// '../ts/**/*.mdx',
		'../ts/**/*.stories.@(js|jsx|ts|tsx)'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
		{
			name: '@storybook/addon-coverage',
			options: {
				istanbul: {
					exclude: ['**/headlessui/**']
				}
			}
		},
		// '@storybook/addon-storysource',
		{
			name: '@storybook/addon-styling',
			options: {}
		}
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
