import type { ReactNode } from 'react'

export function summary(node: ReactNode) {
	return (Story: any) => (
		<div className="flex flex-col gap-1">
			<div className="p-1 rounded bg-slate-300 dark:text-gray-200 dark:bg-gray-800">{node}</div>
			<Story />
		</div>
	)
}
