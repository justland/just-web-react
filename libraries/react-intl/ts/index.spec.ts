import { justTestApp } from '@just-web/app/testing'
import { reactGizmo } from '@just-web/react'
import { createIntlCache, reactIntlGizmoFn } from './index.js'

it('exports createIntlCache() to provide cache support', async () => {
	await justTestApp()
		.with(reactGizmo)
		.with(
			reactIntlGizmoFn({
				config: { locale: 'en' },
				cache: createIntlCache()
			})
		)
		.create()
})
