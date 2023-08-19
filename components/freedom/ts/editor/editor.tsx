import { Tab } from '@headlessui/react'
import { Fragment } from 'react'

export function Editor() {
	return (
		<Tab.Group>
			<Tab.List>
				<Tab as={Fragment}>
					<div role="tab" onClick={() => console.info('outer')}>
						text
						<div
							onClick={e => {
								e.preventDefault()
								console.info('closing')
							}}
						>
							[x]
						</div>
					</div>
				</Tab>
			</Tab.List>
			<Tab.Panels>
				<Tab.Panel>hello</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	)
}
