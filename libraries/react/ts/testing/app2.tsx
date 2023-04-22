import { justTestApp } from '@just-web/app/testing'
import { tersify } from 'tersify'
import { mapKey } from 'type-plus'
import { JustReactApp, createJustAppContext, useJustAppContext } from '../just_app_context.js'
import { reactGizmo } from '../react_gizmo.js'
import { valueGizmoFn, type ValueGizmo } from './value_gizmo.js'

/**
 * Normally you would not create the `app`/`incubator` at load time.
 *
 * You typically should create your app at runtime.
 * So that you can use some runtime information to construct the app,
 * like passing different options to each gizmo functions.
 *
 * Doing it at load time is possible, but not recommended.
 */
export const app2 = justTestApp({ name: 'app 2' })
	.with(valueGizmoFn({ value: 50 }))
	.with(reactGizmo)

/**
 * Define the app type based on what the app needs,
 * and how it is composed in runtime.
 */
export type JustApp2 = JustReactApp & ValueGizmo<number>

export const App2Context = createJustAppContext<JustApp2>()

export async function activate() {
	// note that you can also compose one app from another app.
	const app = await app2.create()

	app.react.providers.register(({ children }) => (
		<App2Context.Provider value={app}>{children}</App2Context.Provider>
	))

	return app
}

export function App2Info() {
	const app = useJustAppContext(App2Context)
	return (
		<div className="bg-slate-300 rounded-md p-3">
			<p className="text-xl">App 2 Info</p>
			<p>The app 2 contains the following info:</p>
			{mapKey(app, key => (
				<p>
					{key}: {tersify(app![key], { maxLength: 50 })}
				</p>
			))}
		</div>
	)
}
