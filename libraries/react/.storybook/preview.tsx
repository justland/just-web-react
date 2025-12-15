import { spyOn } from 'storybook/test'

import '../src/tailwind.css'

export default {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},

		docs: {
			codePanel: true,
		},
	},

	tags: ['autodocs'],

	beforeEach: function beforeEach() {
		spyOn(console, 'log').mockName('console.log')
		spyOn(console, 'warn').mockName('console.warn')
		spyOn(console, 'error').mockName('console.error')
		spyOn(console, 'info').mockName('console.info')
		spyOn(console, 'debug').mockName('console.debug')
		spyOn(console, 'trace').mockName('console.trace')
		spyOn(console, 'count').mockName('console.count')
		spyOn(console, 'dir').mockName('console.dir')
		spyOn(console, 'assert').mockName('console.assert')
	},
}
