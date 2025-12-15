import type { JustApp } from '@just-web/app'
import { type Context, useContext } from 'react'
import type { NonUndefined } from 'type-plus'
import { JustAppRootContext, type JustReactApp } from '../contexts/just_app_context'

export function useJustAppContext<App extends JustReactApp>(context: Context<App>): App
export function useJustAppContext<App = JustApp>(): NonUndefined<App>
export function useJustAppContext(context = JustAppRootContext) {
	return useContext(context)
}
