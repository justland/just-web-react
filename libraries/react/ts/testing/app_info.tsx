import React from 'react'
import { useContext } from 'react'
import { tersify } from 'tersify'
import { mapKey } from 'type-plus'
import { useJustAppContext, type JustReactApp } from '../just_app_context.js'
import { Card } from './card.js'

/**
 * AppInfo is a generic component not tied to any specific app.
 *
 * Typically, generic component can get the app through props.
 * We can also use context to get the closest gizmo/app.
 */
export function AppInfo({ app, title }: { app?: JustReactApp; title?: string }) {
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
			<p>
				using <code>useContext()</code>
			</p>
			<p>The app contains the following info:</p>
			{mapKey(app, key => (
				<p>
					{key}: {tersify(app![key], { maxLength: 50 })}
				</p>
			))}
		</Card>
	)
}

export function AppInfoWithUseJustAppContext({
	context,
	title
}: {
	context: React.Context<any>
	title?: string
}) {
	const app = useJustAppContext(context)
	return (
		<Card>
			{title && <p className="text-xl">{title}</p>}
			<p>
				using <code>useJustAppContext()</code>
			</p>
			<p>The app contains the following info:</p>
			{mapKey(app, key => (
				<p>
					{key}: {tersify(app![key], { maxLength: 50 })}
				</p>
			))}
		</Card>
	)
}
