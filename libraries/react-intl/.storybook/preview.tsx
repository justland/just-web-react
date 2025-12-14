import '@storybook/addon-console'

export default {
	parameters: {
        controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},

        docs: {
            codePanel: true
        }
    },
	tags: ['autodocs'],
}
