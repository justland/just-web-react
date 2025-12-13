import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

export function Editor() {
	return (
		<Tab.Group>
			<Tab.List>
				<Tab as={Fragment}>
					{/** biome-ignore lint/a11y/useFocusableInteractive: TODO */}
					{/** biome-ignore lint/a11y/useKeyWithClickEvents: TODO */}
					<div onClick={() => console.info('outer')} role="tab">
						text
						{/** biome-ignore lint/a11y/noStaticElementInteractions: TODO */}
						{/** biome-ignore lint/a11y/useKeyWithClickEvents: TODO */}
						<div
							onClick={(e) => {
								e.preventDefault();
								console.info('closing');
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
	);
}
