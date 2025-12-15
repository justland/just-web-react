import { justTestApp } from '@just-web/app/testing'
import type { StoryObj } from '@storybook/react-vite'
import React from 'react'
import { useIntl } from 'react-intl'
import { JustAppProvider, reactGizmo } from '../../react/dist/hooks/store.js'
import { reactIntlGizmoFn } from './react_intl_gizmo.js'

export default {
	title: 'libraries/react-intl',
}

export const WithUseIntl: StoryObj = {
	loaders: [
		async () => {
			const app = await justTestApp()
				.with(reactGizmo)
				.with(reactIntlGizmoFn({ config: { locale: 'en' } }))
				.create()
			return { app }
		},
	],
	decorators: [
		(Story, { loaded: { app } }) => (
			<JustAppProvider value={app}>
				<Story />
			</JustAppProvider>
		),
	],
	render() {
		const intl = useIntl()
		return <div>{intl.formatMessage({ defaultMessage: 'hello', id: 'm3HSJL' })}</div>
	},
}
