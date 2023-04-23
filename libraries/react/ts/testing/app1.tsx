import { type IdGizmoOptions } from '@just-web/app'
import { justTestApp, type LogTestGizmo, type LogTestGizmoOptions } from '@just-web/app/testing'
import { tersify } from 'tersify'
import { mapKey } from 'type-plus'
import { createJustAppContext, useJustAppContext } from '../just_app_context.js'
import { reactGizmo } from '../react_gizmo.js'
import { type JustReactTestApp } from './just_react_test_app.types.js'
import { valueGizmoFn, type ValueGizmo, type ValueGizmoOptions } from './value_gizmo.js'

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

export type JustApp1 = JustReactTestApp & ValueGizmo<number>& LogTestGizmo

export const App1Context = createJustAppContext<JustApp1>()
export const App1Context2 = createJustAppContext(app1)

export function activate(
	options?: Partial<IdGizmoOptions> & { log?: LogTestGizmoOptions; value?: ValueGizmoOptions<number> }
) {
	// note that you can also compose one app from another app.
	return justTestApp({ name: options?.name ?? 'app 1', log: options?.log })
		.with(valueGizmoFn({ value: options?.value?.value ?? 100 }))
		.with(reactGizmo)
		.create(app =>
			app.react.providers.register(({ children }) => (
				<App1Context.Provider value={app}>{children}</App1Context.Provider>
			))
		)
}

export function App1Info({ title }: { title?: string }) {
	const app = useJustAppContext(App1Context)
	return (
		<div className="bg-slate-300 rounded-md p-3">
			{title && <p className="text-xl">{title}</p>}
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
