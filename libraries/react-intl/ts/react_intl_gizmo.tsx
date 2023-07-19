import React from 'react'
import { define, incubate } from '@just-web/app'
import { formatJSGizmoFn, type FormatJSGizmo, type FormatJSGizmoOptions } from '@just-web/formatjs'
import type { ReactGizmo } from '@just-web/react'
import { RawIntlProvider, type IntlShape } from 'react-intl'

export type ReactIntlGizmoOptions<T = string> = FormatJSGizmoOptions<T>

export const reactIntlGizmoFn = define(function <T = string>(options?: ReactIntlGizmoOptions<T>) {
	return {
		static: define.require<ReactGizmo>().optional<FormatJSGizmo>(),
		async create(ctx: ReactGizmo & Partial<FormatJSGizmo>) {
			const formatjs = await getFormatjs(ctx, options)
			return [
				{
					react_intl: {
						intl: formatjs.intl as IntlShape
					}
				},
				() =>
					ctx.react.providers.register(({ children }) => (
						<RawIntlProvider value={formatjs.intl as IntlShape}>{children}</RawIntlProvider>
					))
			]
		}
	}
})

export type ReactIntlGizmo = define.Infer<typeof reactIntlGizmoFn>

async function getFormatjs(ctx: Partial<FormatJSGizmo>, options: ReactIntlGizmoOptions<any> | undefined) {
	if (ctx.formatjs) return ctx.formatjs
	if (!options) throw new Error('options is required when there is no formatjs gizmo')
	return (await incubate().with(formatJSGizmoFn(options)).create()).formatjs
}
