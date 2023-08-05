import type { Meta, StoryObj } from '@storybook/react'
import { useSimpleTerminal } from './use_simple_terminal.js'
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
	render() {
		const { register, onParse } = useSimpleTerminal()
		onParse(text => `echo ${text}`)

		return (
			<>
				<Terminal className="h-full" {...register()}>
					<Terminal.Body />
				</Terminal>
			</>
		)
	}
}

export const WithInitialNodes: Story = {
	render() {
		const { register, onParse } = useSimpleTerminal({ initial: [<b>Bold text</b>, <i>Italic text</i>] })
		onParse(text => `echo ${text}`)

		return (
			<>
				<Terminal className="h-full" {...register()}>
					<Terminal.Body />
				</Terminal>
			</>
		)
	}
}
