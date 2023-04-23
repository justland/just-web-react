import type { Meta, StoryObj } from '@storybook/react'
import { createContext } from 'react'
import { JustAppProvider } from './just_app_context.js'
import { App1Info, activate as app1Activate } from './testing/app1.js'
import { activate as app2Activate } from './testing/app2.js'

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

export const WithDummyContextInBetween: Story = {
	render(_, { loaded: { app1 } }) {
		return (
			<JustAppProvider value={app1}>
				<div className="flex gap-2">
					<ContextInBetween>
						<App1Info />
					</ContextInBetween>
				</div>
			</JustAppProvider>
		)
	}
}

const UndefinedContext = createContext(undefined as any)

function ContextInBetween({ children }: { children: React.ReactNode }) {
	return <UndefinedContext.Provider value={undefined}>{children}</UndefinedContext.Provider>
}
