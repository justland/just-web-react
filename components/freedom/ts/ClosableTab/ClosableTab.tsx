import { Tab } from '@headlessui/react'
import { ComponentType, Fragment } from 'react'

type ExtractProps<T> = T extends ComponentType<infer P> ? P : T

export type ClosableTabProps = ExtractProps<typeof Tab> & { onClose: () => void }

export function ClosableTab(props: ClosableTabProps) {
	const { onClose, onClick, ...rest } = props

	return (
		<Tab {...rest} as={Fragment}>
			<div></div>
		</Tab>
	)
}
