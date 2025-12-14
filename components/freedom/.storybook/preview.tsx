import '@storybook/addon-console'
import { withThemeByClassName } from '@storybook/addon-styling'
import type { Preview } from '@storybook/react-vite'
import React from 'react'

import '../src/index.css'

function isTestRunner() {
	return !!(typeof window !== 'undefined' && window && window.navigator.userAgent.match(/StorybookTestRunner/))
}

const preview: Preview = {
	decorators: [
		// Adds theme switching support.
		// NOTE: requires setting "darkMode" to "class" in your tailwind config
		withThemeByClassName({
			themes: {
				light: 'light',
				dark: 'dark',
			},
			defaultTheme: 'light',
		}),
		(Story, { tags }) => {
			if (isTestRunner() && tags.some((t) => t === 'skip-test')) return <div />
			return <Story />
		},
	],

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
