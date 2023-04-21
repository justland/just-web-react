import { JustApp } from '@just-web/app'
import type { Meta, StoryObj } from '@storybook/react'
import { JustAppProvider } from './just_app_context.js'
import { ReactGizmo } from './react_gizmo.js'
import { AppInfo } from './testing/app_info.js'
import { activate } from './testing/app1.js'

const meta: Meta<typeof JustAppProvider> = {
	component: JustAppProvider
}

export default meta

type Story = StoryObj<typeof JustAppProvider>

export const PropsVsContext: Story = {
	loaders: [
		async () => ({
			app1: await activate(),
			app2: await activate({ name: 'app2' })
		})
	],
	render(_, { loaded: { app1, app2 } }) {
		return (
			<JustAppProvider app={app1}>
				<JustAppProvider app={app2}>
					<div className="flex gap-2">
						<AppInfo title="App through props" app={app1} />
						<AppInfo title="App through context" />
					</div>
				</JustAppProvider>
			</JustAppProvider>
		)
	}
}
