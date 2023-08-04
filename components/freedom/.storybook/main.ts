export default {
	stories: ['../ts/**/*.stories.mdx', '../ts/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-storysource',
		'storybook-dark-mode',
		{
			name: '@storybook/addon-styling',
			options: {}
		}
	],
	framework: {
		name: '@storybook/react-vite',
		options: {}
	},
	features: {
		storyStoreV7: true,
		interactionsDebugger: true
	},
	typescript: {
		check: false
	}
}
