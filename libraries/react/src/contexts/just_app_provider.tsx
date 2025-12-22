import type { JustApp } from '@just-web/app'
import React from 'react'
import type { ReactGizmo } from '../gizmos/react_gizmo'
import { JustAppRootContext } from './just_app_context'

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
					// biome-ignore lint/correctness/useJsxKeyInIterable: TODO
					<Component>{children}</Component>
				),
				children
			)}
		</JustAppRootContext.Provider>
	)
}
