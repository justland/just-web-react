import React from 'react'
import { define, type GizmoBase } from '@just-web/app'

export const dummyGizmoFn: (options?: { a: number }) => GizmoBase<{
    dummy: number | undefined;
}> = define((options?: { a: number }) => ({
	async create() {
		return { dummy: options?.a }
	}
}))

export const Component = () => <div>dummy</div>
