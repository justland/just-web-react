import '@storybook/addon-console'
import { withThemeByClassName } from '@storybook/addon-styling'
import type { Preview } from '@storybook/react'


/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import '../ts/index.css'

const preview: Preview = {
	decorators: [
		// Adds theme switching support.
		// NOTE: requires setting "darkMode" to "class" in your tailwind config
		withThemeByClassName({
			themes: {
				light: 'light',
				dark: 'dark'
			},
			defaultTheme: 'light'
		})
	],
	parameters: {
		backgrounds: {
			default: 'light'
		},
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	}
}

export default preview
