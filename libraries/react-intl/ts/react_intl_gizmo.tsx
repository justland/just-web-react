import { define, incubate } from '@just-web/app'
import { formatJSGizmoFn, type FormatJSGizmoOptions } from '@just-web/formatjs'
import type { ReactGizmo } from '@just-web/react'
import { RawIntlProvider, type IntlShape } from 'react-intl'

export const reactIntlGizmoFn = define((options: FormatJSGizmoOptions) => ({
	static: define.require<ReactGizmo>(),
	async create({ react }) {
		const { formatjs } = await incubate().with(formatJSGizmoFn(options)).create()
		return [
			{
				react_intl: {
					intl: formatjs.intl as IntlShape
				}
			},
			() =>
				react.providers.register(({ children }) => (
					<RawIntlProvider value={formatjs.intl as unknown as IntlShape}>{children}</RawIntlProvider>
				))
		]
	}
}))

export type ReactIntlGizmo = define.Infer<typeof reactIntlGizmoFn>
