import { JustApp, justApp } from '@just-web/app'
import type { Meta, StoryObj } from '@storybook/react'
import { AppContextProvider, useAppContext } from './index.js'

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

const DefaultType = () => {
	const c = useAppContext()
	return (
		<div className="bg-slate-300 rounded-md p-3">
			<p>App name: {c.name}</p>
			<p>App id: {c.id}</p>
		</div>
	)
}

export const DefaultTypeToAppBaseContext: Story = {
	loaders: [
		async () => ({
			app1: await justApp({ name: 'app1' }).create(),
			app2: await justApp({ name: 'app2' }).create()
		})
	],
	render: (_, { loaded: { app1, app2 } }) => {
		return (
			<AppContextProvider value={app1}>
				<AppContextProvider value={app2}>
					<div className="flex">
						<DefaultType />
					</div>
				</AppContextProvider>
			</AppContextProvider>
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
