import type { JustApp } from '@just-web/app'
import { justTestApp } from '@just-web/app/testing'
import { createJustAppContext } from '../just_app_context.js'
import { reactGizmo, type ReactGizmo } from '../react_gizmo.js'
import { valueGizmoFn, type ValueGizmo } from './value_gizmo.js'
import { useContext } from 'react'
import { mapKey } from 'type-plus'
import { tersify } from 'tersify'

/**
 * Define the app type based on what the app needs,
 * and how it is composed in runtime.
 */
export type JustApp1 = JustApp & ReactGizmo & ValueGizmo<number>

export const App1Context = createJustAppContext<JustApp1>()

export async function activate({ name }: { name: string } = { name: 'app1' }) {
	// note that you can also compose one app from another app.
	const app = await justTestApp({ name })
		.with(valueGizmoFn({ value: 100 }))
		.with(reactGizmo)
		.create()

	app.react.providers.register(({ children }) => (
		<App1Context.Provider value={app}>{children}</App1Context.Provider>
	))

	return app
}

export function App1Info() {
	const app = useContext(App1Context)
	return (
		<div className="bg-slate-300 rounded-md p-3">
			<p className="text-xl">App 1 Info</p>
			<p>The app 1 contains the following info:</p>
			{mapKey(app, key => (
				<p>
					{key}: {tersify(app![key], { maxLength: 50 })}
				</p>
			))}
		</div>
	)
}
