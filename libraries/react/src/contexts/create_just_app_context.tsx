import type { GizmoIncubator } from '@just-web/app'
import React, { createContext, type PropsWithChildren } from 'react'
import { JustAppRootContext, type JustReactApp } from './just_app_context'

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
		children,
	}: PropsWithChildren<{
		value: App
		key?: string
	}>) {
		return (
			<JustAppRootContext.Provider value={value}>
				<InnerProvider key={key} value={value}>
					{children}
				</InnerProvider>
			</JustAppRootContext.Provider>
		)
	} as any
	return Context
}
