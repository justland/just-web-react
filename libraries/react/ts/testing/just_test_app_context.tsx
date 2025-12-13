import { useJustAppContext } from '../just_app_context.js';
import type { JustReactTestApp } from './just_react_test_app.types.js';

export function useJustTestAppContext<App extends JustReactTestApp>() {
	return useJustAppContext() as App;
}
