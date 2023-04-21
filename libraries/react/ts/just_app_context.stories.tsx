import type { Meta, StoryObj } from '@storybook/react'
import { JustAppProvider } from './just_app_context.js'
import { App1Context, App1Info, activate as app1Activate } from './testing/app1.js'
import { App2Context, App2Info, activate as app2Activate } from './testing/app2.js'
import { AppInfo, AppInfoWithUseContext } from './testing/app_info.js'
import { useContext } from 'react'

const meta: Meta<typeof JustAppProvider> = {
	component: JustAppProvider,
	loaders: [
		async () => ({
			app1: await app1Activate(),
			app2: await app2Activate()
		})
	]
}

export default meta

type Story = StoryObj<typeof JustAppProvider>

export const PropsVsContext: Story = {
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

export const AppSpecificContext: Story = {
	render(_, { loaded: { app1, app2 } }) {
		return (
			<App1Context.Provider value={app1}>
				<App2Context.Provider value={app2}>
					<div className="flex gap-2">
						<AppInfo title="Closest Just App Context" />
						<App1Info />
						<App2Info />
					</div>
				</App2Context.Provider>
			</App1Context.Provider>
		)
	}
}

export const WithUseContext: Story = {
	render(_, { loaded: { app1, app2 } }) {
		return (
			<App1Context.Provider value={app1}>
				<App2Context.Provider value={app2}>
					<div className="flex gap-2">
						<AppInfo title="Closest Just App Context" />
						<AppInfoWithUseContext context={App1Context} title="App1 from useContext" />
						<AppInfoWithUseContext context={App2Context} title="App2 from useContext" />
					</div>
				</App2Context.Provider>
			</App1Context.Provider>
		)
	}
}
