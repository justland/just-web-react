import type { JustApp } from '@just-web/app'
import { justTestApp } from '@just-web/app/testing'
import { createJustAppContext } from '../just_app_context.js'
import { valueGizmoFn, type ValueGizmo } from './value_gizmo.js'
import { reactGizmo } from '../react_gizmo.js'

/**
 * Define the app type based on what the app needs,
 * and how it is composed in runtime.
 */
export type JustApp1 = JustApp & ValueGizmo<number>

export const JustApp1Context = createJustAppContext<JustApp1>()

export async function activate({ name }: { name: string } = { name: 'app1' }) {
	// note that you can also compose one app from another app.
	const app = await justTestApp({ name })
		.with(valueGizmoFn({ value: 100 }))
		.with(reactGizmo)
		.create()

	app.react.providers.register(({ children }) => (
		<JustApp1Context.Provider value={app}>{children}</JustApp1Context.Provider>
	))

	return app
}
