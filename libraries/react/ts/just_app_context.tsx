import type { GizmoIncubator, JustApp } from '@just-web/app';
import React, { type Context, createContext, type PropsWithChildren, useContext } from 'react';
import type { NonUndefined } from 'type-plus';
import type { ReactGizmo } from './react_gizmo.js';

export type JustReactApp = JustApp & ReactGizmo;

const JustAppRootContext = createContext<JustApp & Partial<ReactGizmo>>(undefined as any);

/**
 * Creates a context of a `JustReactApp` to be used in `useJustAppContext()`.
 *
 * Typically, you would specify the generic type `App` when callying this function.
 *
 * You can also call it and pass the `appIncubator` to infer the generic type `App`.
 * However, that is not the typical usage.
 *
 * @example
 * ```ts
 * const App1Context = createJustAppContext<App1>()
 *
 * function App1Info() {
 * 	const app = useContext(App1Context)
 * 	// ...
 * }
 * ```
 */
export function createJustAppContext<App extends JustReactApp>(_appIncubator?: GizmoIncubator<App>) {
	const Context = createContext<App>(undefined as any);
	const InnerProvider = Context.Provider;
	Context.Provider = function Provider({
		value,
		key,
		children,
	}: PropsWithChildren<{
		value: App;
		key?: string;
	}>) {
		return (
			<JustAppRootContext.Provider value={value}>
				<InnerProvider key={key} value={value}>
					{children}
				</InnerProvider>
			</JustAppRootContext.Provider>
		);
	} as any;
	return Context;
}

export function useJustAppContext<App extends JustReactApp>(context: Context<App>): App;
export function useJustAppContext<App = JustApp>(): NonUndefined<App>;
export function useJustAppContext(context = JustAppRootContext) {
	return useContext(context);
}

export function JustAppProvider<App extends JustApp & Partial<ReactGizmo>>({
	value,
	children,
}: {
	value: App;
	children: React.ReactNode;
}) {
	const providers = Array.from(value.react?.providers.values() ?? []);
	return (
		<JustAppRootContext.Provider value={value}>
			{providers.reduce(
				(children, Component) => (
					// biome-ignore lint/correctness/useJsxKeyInIterable: TODO
					<Component>{children}</Component>
				),
				children
			)}
		</JustAppRootContext.Provider>
	);
}
