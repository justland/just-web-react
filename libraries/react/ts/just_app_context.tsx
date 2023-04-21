import type { JustApp } from '@just-web/app'
import { createContext, useContext } from 'react'
import type { ReactGizmo } from './react_gizmo.js'

export function createJustAppContext<App extends JustApp>() {
	return createContext<App>(undefined as any)
}

const JustAppContext = createJustAppContext<JustApp>()

export function useJustAppContext() {
	return useContext(JustAppContext)
}

export function JustAppProvider<App extends JustApp & ReactGizmo>({
	app,
	children
}: {
	app: App
	children: React.ReactNode
}) {
	const providers = Array.from(app.react.providers.entries() ?? [])
	return (
		<JustAppContext.Provider value={app}>
			{providers.reduce((children, Component) => {
				return <Component>{children}</Component>
			}, children)}
		</JustAppContext.Provider>
	)
}
