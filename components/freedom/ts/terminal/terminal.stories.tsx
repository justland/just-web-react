import type { Meta, StoryObj } from '@storybook/react'
import { useSimpleTerminal } from './terminal.hooks.js'
import { Terminal } from './terminal.js'

const meta: Meta<typeof Terminal> = {
	decorators: [
		Story => {
			return (
				<div className="h-80 bg-gray-100">
					<Story />
				</div>
			)
		}
	],
	component: Terminal as any
}

export default meta

type Story = StoryObj<typeof Terminal>

export const BasicExample: Story = {
	render: () => {
		const { register, onParse } = useSimpleTerminal()
		onParse(text => {
			return `echo ${text}`
		})

		return (
			<>
				<Terminal className="h-full" {...register()}>
					<Terminal.Body />
				</Terminal>
			</>
		)
	}
}
