import { JustApp, justApp } from '@just-web/app'
import type { Meta, StoryObj } from '@storybook/react'
import { AppContextProvider, useAppContext } from './index.js'
import { Context, createContext, useContext } from 'react'

const meta: Meta<typeof AppContextProvider> = {
	component: AppContextProvider
}

export default meta

const LogChild = () => {
	const c = useAppContext()
	return <div>Keys in `ctx.log``: {Object.keys(c.log).join(', ')}</div>
}

type Story = StoryObj<typeof AppContextProvider>

export const GetContext: Story = {
	loaders: [async () => ({ app: await justApp({ name: 'app' }).create() })],
	render: (_args, { loaded: { app } }) => {
		return (
			<AppContextProvider value={app}>
				<LogChild />
			</AppContextProvider>
		)
	}
}

GetContext.parameters = {
	visual: false
}

function AppInfo<C extends JustApp>({ context }: { context: Context<C> }) {
	const app = useContext(context)
	return (
		<div className="bg-slate-300 rounded-md p-3">
			<p>App name: {app.name}</p>
			<p>App id: {app.id}</p>
		</div>
	)
}

const App1Context = createContext<JustApp>(undefined as any)
const App2Context = createContext<JustApp>(undefined as any)
const App3Context = createContext<JustApp>(undefined as any)

export const DefaultTypeToAppBaseContext: Story = {
	loaders: [
		async () => ({
			app1: await justApp({ name: 'app1' }).create(),
			app2: await justApp({ name: 'app2' }).create(),
			app3: await justApp({ name: 'app3' }).create()
		})
	],
	render: (_, { loaded: { app1, app2, app3 } }) => {
		return (
			<App1Context.Provider value={app1}>
				<App2Context.Provider value={app2}>
					<App3Context.Provider value={app3}>
						<div className="flex gap-2">
							<AppInfo context={App1Context} />
							<AppInfo context={App2Context} />
							<AppInfo context={App3Context} />
						</div>
					</App3Context.Provider>
				</App2Context.Provider>
			</App1Context.Provider>
		)
	}
}

// const CustomType = () => {
// 	const c = useAppContext<OSContext>()
// 	return (
// 		<div>
// 			<p>App name: {c.name}</p>
// 			<p>App id: {c.id}</p>
// 			<p>has os context: {c.os ? 'true' : 'false'}</p>
// 		</div>
// 	)
// }

// export const CustomContext = () => {
// 	const app = createApp({ name: 'app' }).extend(osPlugin())
// 	return (
// 		<AppContextProvider value={app}>
// 			<CustomType />
// 		</AppContextProvider>
// 	)
// }

// const AddLog = () => {
// 	const c = useAppContext<TestLogContext>()

// 	return (
// 		<>
// 			<div>Number of logs: {c.log.reporter.logs.length}</div>
// 			<button onClick={() => c.log.info('write another log')}>Write log will not trigger render</button>
// 		</>
// 	)
// }

// export const ModifyingAppState = () => {
// 	const app = createTestApp()
// 	return (
// 		<AppContextProvider value={app}>
// 			<AddLog />
// 		</AppContextProvider>
// 	)
// }

// const FeatureAContext = createStoreContext<{ a: number }>()

// const FeatureA = () => {
// 	const [a] = useStoreContext(FeatureAContext, s => s.a)
// 	return <div>Feature A: {a}</div>
// }

// const featureAPlugin = definePlugin(() => ({
// 	name: 'featureA',
// 	init: (ctx: ReactPluginContext) => {
// 		ctx.react.providers.register(({ children }) => (
// 			<FeatureAContext.Provider value={createStore({ a: 1 })}>{children}</FeatureAContext.Provider>
// 		))
// 		return []
// 	}
// }))

// const FeatureBContext = createStoreContext<{ b: number }>()
// const FeatureB = () => {
// 	const [b] = useStoreContext(FeatureBContext, s => s.b)
// 	return <div>Feature B: {b}</div>
// }

// const featureBPlugin = definePlugin(() => ({
// 	name: 'featureB',
// 	init: (ctx: ReactPluginContext) => {
// 		ctx.react.providers.register(({ children }) => (
// 			<FeatureBContext.Provider value={createStore({ b: 2 })}>{children}</FeatureBContext.Provider>
// 		))
// 		return []
// 	}
// }))

// const FeatureButtons = () => {
// 	const [, setA] = useStoreContext(
// 		FeatureAContext,
// 		s => s.a,
// 		(s, v) => {
// 			s.a = v
// 		}
// 	)
// 	const [, setB] = useStoreContext(
// 		FeatureBContext,
// 		s => s.b,
// 		(s, v) => {
// 			s.b = v
// 		}
// 	)

// 	return (
// 		<>
// 			<button onClick={() => setA(v => v + 1)}>Feature A ++</button>
// 			<button onClick={() => setB(v => v + 1)}>Feature B ++</button>
// 		</>
// 	)
// }

// export function WithContexts() {
// 	const app = createTestApp().extend(reactPlugin()).extend(featureAPlugin()).extend(featureBPlugin())

// 	return (
// 		<AppContextProvider value={app}>
// 			<FeatureA />
// 			<FeatureB />
// 			<FeatureButtons />
// 		</AppContextProvider>
// 	)
// }
