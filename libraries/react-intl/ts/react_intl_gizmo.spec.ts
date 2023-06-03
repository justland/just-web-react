import { justTestApp } from '@just-web/app/testing'
import { reactGizmo } from '@just-web/react'
import { reactIntlGizmoFn, type IntlShape } from './index.js'
import { testType } from 'type-plus'
import { formatJSGizmoFn } from '@just-web/formatjs'
import { a } from 'assertron'

it('requires react and includes formatjs', async () => {
	const app = await justTestApp()
		.with(reactGizmo)
		.with(reactIntlGizmoFn({ config: { locale: 'en' } }))
		.create()

	testType.equal<typeof app.react_intl.intl, IntlShape>(true)
	expect(app.react_intl).toBeDefined()
})

it('uses existing formatjs gizmo if provided', async () => {
	const app = await justTestApp()
		.with(reactGizmo)
		.with(formatJSGizmoFn({ config: { locale: 'en' } }))
		.with(reactIntlGizmoFn())
		.create()

		expect(app.formatjs.intl).toBe(app.react_intl.intl)
})

it('throws if no formatjs and not providing options', async () => {
	const err = await a.throws(justTestApp()
		.with(reactGizmo)
		.with(reactIntlGizmoFn())
		.create())

	expect(err.message).toEqual(`options is required when there is no formatjs gizmo`)
})
