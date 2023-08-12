import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { useState } from 'react'
import { Terminal } from './terminal2.js'
import { summary } from '../storybook/summary.js'
import { faker } from '@faker-js/faker'

const meta: Meta<typeof Terminal> = {
	component: Terminal
}

export default meta

type Story = StoryObj<typeof Terminal>

export const OnChangeCapturesInputText: Story = {
	decorators: [
		summary(
			<>
				<p>
					<code>onChange</code> captures the input text in the terminal
				</p>
				<p>
					This story ensures that when the input text is saved in a state, which causes redraw, the terminal
					input still contains the input text, instead of being cleared.
				</p>
			</>
		)
	],
	render() {
		const [inputText, setInputText] = useState('')
		return (
			<div className="flex flex-col gap-2 p-2 bg-slate-100">
				<Terminal
					onChange={e => {
						console.log('onChange triggered')
						setInputText(e.target.value)
					}}
				/>
				<div>
					input text: <span data-testid="captured-text">{inputText}</span>
				</div>
			</div>
		)
	},
	async play({ canvasElement }) {
		console.log('play started')
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		const word = faker.word.noun()
		await userEvent.type(input, word)

		expect(input.value).toBe(word)
		const capturedText = canvas.getByTestId('captured-text')
		expect(capturedText.innerText).toBe(word)
	}
}
