import { justTestApp } from '@just-web/app/testing'
import { tersify } from 'tersify'
import { mapKey } from 'type-plus'
import { createJustAppContext, useJustAppContext, type JustReactApp } from '../just_app_context.js'
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

export function activate() {
	return app2.create(app =>
		app.react.providers.register(({ children }) => (
			<App2Context.Provider value={app}>{children}</App2Context.Provider>
		))
	)
}

export function App2Info({ title }: { title?: string }) {
	const app = useJustAppContext(App2Context)
	return (
		<div className="bg-slate-300 rounded-md p-3">
			{title && <p className="text-xl">{title}</p>}
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
