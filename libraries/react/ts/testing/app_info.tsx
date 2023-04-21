import type { JustApp } from '@just-web/app'
import { tersify } from 'tersify'
import { mapKey } from 'type-plus'
import { useJustAppContext } from '../just_app_context.js'

/**
 * AppInfo is a generic component not tied to any specific app.
 *
 * Typically, generic component can get the app through props.
 * We can also use context to get the closest gizmo/app.
 */
export function AppInfo({ app, title }: { app?: JustApp; title?: string }) {
	if (!app) {
		app = useJustAppContext()
	}
	return (
		<div className="bg-slate-300 rounded-md p-3">
			{title && <p className="text-xl">{title}</p>}
			<p>The app contains the following info:</p>
			{mapKey(app, key => (
				<p>
					{key}: {tersify(app![key], { maxLength: 50 })}
				</p>
			))}
		</div>
	)
}
