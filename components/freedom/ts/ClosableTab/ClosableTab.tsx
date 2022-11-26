import { Tab } from '@headlessui/react'
import { Props } from '@headlessui/react/dist/types'
import { Fragment } from 'react'

export type ClosableTabProps<TTag extends React.ElementType<any> = 'button'> = Props<
  TTag,
  { selected: boolean },
  'id' | 'role' | 'type' | 'aria-controls' | 'aria-selected' | 'tabIndex'
> & { onClose: () => void }

export function ClosableTab(props: ClosableTabProps<'div'>) {
  const { onClose, onClick, ...rest } = props

  return (
    <Tab {...rest} as={Fragment}>
      <div></div>
    </Tab>
  )
}
