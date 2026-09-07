import type { JustApp } from '@just-web/app'
import { type Context, useContext } from 'react'
import { JustAppRootContext, type JustReactApp } from '../contexts/just_app_context'

export function useJustAppContext<App extends JustReactApp>(context: Context<App>): App
export function useJustAppContext<App = JustApp>(): Exclude<App, undefined>
export function useJustAppContext(context = JustAppRootContext) {
	return useContext(context)
}
