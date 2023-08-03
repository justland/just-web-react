import { Dialog } from '@headlessui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof Dialog> = {
	component: Dialog,
}

export default meta

type Story = StoryObj<typeof Dialog>

export const BasicExample: Story = {
	render() {
		const [isOpen, setIsOpen] = useState(true)

		return <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
			<Dialog.Panel>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>
        <Dialog.Title>Deactivate account</Dialog.Title>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog.Panel>
		</Dialog>
	}
}
