import { Tab } from '@headlessui/react'
import { Fragment } from 'react'

export function Editor() {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab as={Fragment}>

        </Tab>
      </Tab.List>
      <Tab.Panels>

      </Tab.Panels>
    </Tab.Group>
  )
}
