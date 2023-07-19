import React from 'react'
import type { HtmlHTMLAttributes, PropsWithChildren } from 'react'

export function Card(props: PropsWithChildren<HtmlHTMLAttributes<any>>) {
	const { className, ...rest } = props
	return <div className={`rounded-md p-3 ${className ?? 'bg-slate-300'}`} {...rest}></div>
}
