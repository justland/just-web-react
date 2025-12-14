import '@storybook/addon-console'
import '../src/styles.css'

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
}
