import { define } from '@just-web/app'
import type { JSXElementConstructor, ReactNode } from 'react'

export const reactGizmo = define({
	async create() {
		const components: Array<JSXElementConstructor<{ children: ReactNode }>> = []
		return {
			react: {
				providers: {
					register(Component: JSXElementConstructor<{ children: ReactNode }>) {
						components.push(Component)
					},
					entries(): Iterable<JSXElementConstructor<{ children: ReactNode }>> {
						return {
							*[Symbol.iterator]() {
								for (let i = 0; i < components.length; i++) {
									yield components[i]
								}
								return components.length
							}
						}
					}
				}
			}
		}
	}
})

export type ReactGizmo = define.Infer<typeof reactGizmo>
