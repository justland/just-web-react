import type { PropsWithChildren } from 'react'

export function Card({ children }: PropsWithChildren<Record<string, unknown>>) {
	return <div className="bg-slate-300 rounded-md p-3">{children}</div>
}
