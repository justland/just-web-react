/* eslint-disable @typescript-eslint/no-unused-vars */
import type { GizmoIncubator, JustApp } from '@just-web/app'
import { createContext, useContext, type Context, type PropsWithChildren } from 'react'
import type { NonUndefined } from 'type-plus'
import type { ReactGizmo } from './react_gizmo.js'

export type JustReactApp = JustApp & ReactGizmo

const JustAppRootContext = createContext<JustApp & Partial<ReactGizmo>>(undefined as any)

/**
 * Creates a context of a `JustReactApp` to be used in `useJustAppContext()`.
 *
 * Typically, you would specify the generic type `App` when callying this function.
 *
 * You can also call it and pass the `appIncubator` to infer the generic type `App`.
 * However, that is not the typical usage.
 *
 * @example
 * ```ts
 * const App1Context = createJustAppContext<App1>()
 *
 * function App1Info() {
 * 	const app = useContext(App1Context)
 * 	// ...
 * }
 * ```
 */
export function createJustAppContext<App extends JustReactApp>(_appIncubator?: GizmoIncubator<App>) {
	const Context = createContext<App>(undefined as any)
	const InnerProvider = Context.Provider
	Context.Provider = function Provider({
		value,
		key,
		children
	}: PropsWithChildren<{
		value: App
		key?: string
	}>) {
		return (
			<JustAppRootContext.Provider value={value}>
				<InnerProvider value={value} key={key}>
					{children}
				</InnerProvider>
			</JustAppRootContext.Provider>
		)
	} as any
	return Context
}

export function useJustAppContext<App extends JustReactApp>(context: Context<App>): App
export function useJustAppContext<App = JustApp>(): NonUndefined<App>
export function useJustAppContext(context = JustAppRootContext) {
	const app = useContext(context)
	if (!app) throw new Error('A JustApp context provider must be used before using useJustAppContext()')
	return app
}

export function JustAppProvider<App extends JustApp & Partial<ReactGizmo>>({
	value,
	children
}: {
	value: App
	children: React.ReactNode
}) {
	const providers = Array.from(value.react?.providers.values() ?? [])
	return (
		<JustAppRootContext.Provider value={value}>
			{providers.reduce(
				(children, Component) => (
					<Component>{children}</Component>
				),
				children
			)}
		</JustAppRootContext.Provider>
	)
}
