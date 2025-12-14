import type { Preview } from '@storybook/react-vite'
import { spyOn } from 'storybook/test'

const preview: Preview = {
	parameters: {
		backgrounds: {},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	initialGlobals: {
		backgrounds: {
			value: 'light',
		},
	},
}

export default preview

export const beforeEach = function beforeEach() {
	spyOn(console, 'log').mockName('console.log')
	spyOn(console, 'warn').mockName('console.warn')
	spyOn(console, 'error').mockName('console.error')
	spyOn(console, 'info').mockName('console.info')
	spyOn(console, 'debug').mockName('console.debug')
	spyOn(console, 'trace').mockName('console.trace')
	spyOn(console, 'count').mockName('console.count')
	spyOn(console, 'dir').mockName('console.dir')
	spyOn(console, 'assert').mockName('console.assert')
}
