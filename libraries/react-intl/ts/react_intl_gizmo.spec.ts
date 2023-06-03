import { justTestApp } from '@just-web/app/testing'
import { reactGizmo } from '@just-web/react'
import { reactIntlGizmoFn, type IntlShape } from './index.js'
import { testType } from 'type-plus'

it('requires react and includes formatjs', async () => {
	const app = await justTestApp()
		.with(reactGizmo)
		.with(reactIntlGizmoFn({ config: { locale: 'en' } }))
		.create()

	testType.equal<typeof app.react_intl.intl, IntlShape>(true)
	expect(app.react_intl).toBeDefined()
})
