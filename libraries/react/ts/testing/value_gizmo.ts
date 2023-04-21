import { define } from '@just-web/app'

export const valueGizmoFn = define(<T>(options: { value: T }) => ({
	async create() {
		return {
			value: options.value
		}
	}
}))

export type ValueGizmo<T> = define.Infer<typeof valueGizmoFn<T>>
