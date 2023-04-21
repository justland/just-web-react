import type { JustApp } from '@just-web/app'
import { createContext, useContext, type PropsWithChildren } from 'react'
import type { ReactGizmo } from './react_gizmo.js'

export type JustReactApp = JustApp & ReactGizmo

export function createJustAppContext<App extends JustReactApp>() {
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

const JustAppRootContext = createContext<JustApp>(undefined as any)

export function useJustAppContext() {
	return useContext(JustAppRootContext)
}

export function JustAppProvider<App extends JustReactApp>({
	app,
	children
}: {
	app: App
	children: React.ReactNode
}) {
	const providers = Array.from(app.react.providers.entries() ?? [])
	return (
		<JustAppRootContext.Provider value={app}>
			{providers.reduce(
				(children, Component) => (
					<Component>{children}</Component>
				),
				children
			)}
		</JustAppRootContext.Provider>
	)
}
