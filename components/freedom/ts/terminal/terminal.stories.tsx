import type { Meta, StoryObj } from '@storybook/react'
import { Terminal } from './terminal.js'

const meta: Meta<typeof Terminal> = {
	decorators: [
		Story => {
			return (
				<div className="h-full bg-gray-100">
					<Story />
				</div>
			)
		}
	],
	component: Terminal
}

export default meta

type Story = StoryObj<typeof Terminal>

export const BasicExample: Story = {}
