import { define } from '@just-web/app'

export type ValueGizmoOptions<T> = { value: T }

export const valueGizmoFn = define(<T>(options: ValueGizmoOptions<T>) => ({
	async create() {
		return {
			value: options.value
		}
	}
}))

export type ValueGizmo<T> = define.Infer<typeof valueGizmoFn<T>>
