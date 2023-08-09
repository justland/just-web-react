import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { useState } from 'react'
import { Terminal } from './terminal.js'

const meta: Meta<typeof Terminal> = {
	component: Terminal
}

export default meta

type Story = StoryObj<typeof Terminal>

export const Disabled: Story = {
	render() {
		const [disabled, setDisabled] = useState(true)

		return (
			<>
				{disabled ? 'disabled' : 'enabled'} <input type="checkbox" onClick={() => setDisabled(v => !v)} />
				<Terminal output={[]} prompt=">" disabled={disabled} />
			</>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const checkbox = canvas.getByRole('checkbox')
		expect(canvas.getByRole<HTMLInputElement>('textbox').disabled).toBe(true)
		await userEvent.click(checkbox)
		expect(canvas.getByRole<HTMLInputElement>('textbox').disabled).toBe(false)
	}
}
