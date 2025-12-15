import { useJustAppContext } from '../hooks/use_just_app_context.js'
import type { JustReactTestApp } from './just_react_test_app.types.js'

export function useJustTestAppContext<App extends JustReactTestApp>() {
	return useJustAppContext() as App
}
