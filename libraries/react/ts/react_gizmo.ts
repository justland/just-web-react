import { define } from '@just-web/app';
import type { JSXElementConstructor, ReactNode } from 'react';

export const reactGizmo = define({
	async create() {
		const components: Array<JSXElementConstructor<{ children: ReactNode }>> = [];
		return {
			react: {
				providers: {
					register(Component: JSXElementConstructor<{ children: ReactNode }>) {
						components.push(Component);
					},
					values(): IterableIterator<JSXElementConstructor<{ children: ReactNode }>> {
						return components.values();
					},
				},
			},
		};
	},
});

export type ReactGizmo = define.Infer<typeof reactGizmo>;
