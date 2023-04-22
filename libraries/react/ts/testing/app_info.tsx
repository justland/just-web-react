import type { JustApp } from '@just-web/app'
import { tersify } from 'tersify'
import { mapKey } from 'type-plus'
import { useJustAppContext } from '../just_app_context.js'
import { useContext } from 'react'
import { Card } from './card.js'

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
		<Card>
			{title && <p className="text-xl">{title}</p>}
			<p>The app contains the following info:</p>
			{mapKey(app, key => (
				<p>
					{key}: {tersify(app![key], { maxLength: 50 })}
				</p>
			))}
		</Card>
	)
}

export function AppInfoWithUseContext({ context, title }: { context: React.Context<any>; title?: string }) {
	const app = useContext(context)
	return (
		<Card>
			{title && <p className="text-xl">{title}</p>}
			<p>The app contains the following info:</p>
			{mapKey(app, key => (
				<p>
					{key}: {tersify(app![key], { maxLength: 50 })}
				</p>
			))}
		</Card>
	)
}
