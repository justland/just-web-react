import { define, IdGizmoOptions } from '@just-web/app'
import { justTestApp, LogTestGizmo } from '@just-web/app/testing'
import { LogTestGizmoOptions } from '@just-web/log/testing'
import { tersify } from 'tersify'
import { mapKey } from 'type-plus'
import { createJustAppContext, JustReactApp, useJustAppContext } from '../just_app_context.js'
import { reactGizmo } from '../react_gizmo.js'
import { valueGizmoFn, ValueGizmoOptions, type ValueGizmo } from './value_gizmo.js'

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

export type JustApp1x = JustReactApp & ValueGizmo<number> & LogTestGizmo

export const App1Context = createJustAppContext<JustApp1>()
export const App1Context2 = createJustAppContext(app1)

export async function activate(
	options?: Partial<IdGizmoOptions> & { log?: LogTestGizmoOptions; value?: ValueGizmoOptions<number> }
) {
	// note that you can also compose one app from another app.
	const app = await justTestApp({ name: options?.name ?? 'app 1', log: options?.log })
		.with(valueGizmoFn({ value: options?.value?.value ?? 100 }))
		.with(reactGizmo)
		.create()

	app.react.providers.register(({ children }) => (
		<App1Context.Provider value={app}>{children}</App1Context.Provider>
	))

	return app
}

export function App1Info() {
	const app = useJustAppContext(App1Context)
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
