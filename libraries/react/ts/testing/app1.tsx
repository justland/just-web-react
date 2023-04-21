import { define } from '@just-web/app'
import { justTestApp } from '@just-web/app/testing'
import { useContext } from 'react'
import { tersify } from 'tersify'
import { mapKey } from 'type-plus'
import { createJustAppContext, JustReactApp } from '../just_app_context.js'
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
export const app1 = justTestApp({ name: 'app 1' })
	.with(valueGizmoFn({ value: 100 }))
	.with(reactGizmo)

export type JustApp1 = define.Infer<typeof app1>

export type JustApp1x = JustReactApp & ValueGizmo<number>

export const App1Context = createJustAppContext<JustApp1>()

export async function activate() {
	// note that you can also compose one app from another app.
	const app = await app1.create()

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
