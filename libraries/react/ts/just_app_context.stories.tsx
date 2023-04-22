import type { Meta, StoryObj } from '@storybook/react'
import { JustAppProvider } from './just_app_context.js'
import { createStoreContext, useStoreContext } from './store_context.js'
import { App1Context, App1Info, activate as app1Activate } from './testing/app1.js'
import { App2Context, App2Info, activate as app2Activate } from './testing/app2.js'
import { AppInfo, AppInfoWithUseContext } from './testing/app_info.js'
import { Card } from './testing/card.js'
import { useJustTestAppContext } from './testing/just_test_app_context.js'
import { createStore } from '@just-web/states'

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

export const NoRenderWhenModifyState: Story = {
	loaders: [
		async () => ({
			app1: await app1Activate({ log: { emitLog: true } })
		})
	],
	render(_, { loaded: { app1 } }) {
		return (
			<App1Context.Provider value={app1}>
				<EmitLog />
			</App1Context.Provider>
		)
	}
}

function EmitLog() {
	const app = useJustTestAppContext()
	return (
		<div className="bg-slate-300 rounded-md p-3">
			<p>Write log will not trigger render</p>
			<div>Number of logs: {app.log.reporter.logs.length} (this will not change)</div>
			<button className="rounded bg-slate-500 p-1" onClick={() => app.log.warn('writing some log')}>
				Click me
			</button>
		</div>
	)
}

const StoreContext = createStoreContext<{ value: number }>()

export const WithStoreContext: Story = {
	render(_, { loaded: { app1 } }) {
		const store = createStore(app1)
		return (
			<StoreContext.Provider value={store}>
				<Card>
					<StoreDisplay />
					<StoreChanger />
				</Card>
			</StoreContext.Provider>
		)
	}
}

function StoreDisplay() {
	const [value] = useStoreContext(StoreContext, s => s.value)
	return <div>Value: {value}</div>
}

function StoreChanger() {
	const [, setValue] = useStoreContext(
		StoreContext,
		s => s.value,
		(store, value) => {
			store.value = value
		}
	)
	return (
		<button className="button" onClick={() => setValue(v => v + 1)}>
			Increment
		</button>
	)
}
