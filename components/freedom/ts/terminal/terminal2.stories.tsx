import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { useState } from 'react'
import { summary } from '../storybook/summary.js'
import { Terminal } from './terminal2.js'

const meta: Meta<typeof Terminal> = {
	component: Terminal
}

export default meta

type Story = StoryObj<typeof Terminal>

export const OnChange: Story = {
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
					output={[]}
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
		await userEvent.type(input, 'hello')

		expect(input.value).toBe('hello')
		const capturedText = canvas.getByTestId('captured-text')
		expect(capturedText.innerText).toBe('hello')
	}
}

export const OnKeyDown: Story = {
	decorators: [
		summary(
			<>
				<p>
					<code>onKeyDown</code> captures the keydown event from the input
				</p>
			</>
		)
	],
	render() {
		const [inputText, setInputText] = useState('')
		return (
			<div className="flex flex-col gap-2 p-2 bg-slate-100">
				<Terminal
					output={[]}
					onKeyDown={e => {
						setInputText(e.key)
					}}
				/>
				<div>
					key down: <span data-testid="captured-text">{inputText}</span>
				</div>
			</div>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello')

		expect(input.value).toBe('hello')
		const capturedText = canvas.getByTestId('captured-text')
		expect(capturedText.innerText).toBe('o')
	}
}

export const KeyDownAndChange: Story = {
	decorators: [
		summary(
			<>
				<p>
					This story ensure using both <code>onKeyDown</code> and <code>onChange</code> saving to two different
					states work.
				</p>
			</>
		)
	],
	render() {
		const [changed, setChanged] = useState('')
		const [keyDown, setKeyDown] = useState('')
		return (
			<div className="flex flex-col gap-2 p-2 bg-slate-100">
				<Terminal
					output={[]}
					onKeyDown={e => {
						setKeyDown(e.key)
					}}
					onChange={e => {
						setChanged(e.target.value)
					}}
				/>
				<div>
					change: <span data-testid="change-text">{changed}</span>
				</div>
				<div>
					key down: <span data-testid="keydown-text">{keyDown}</span>
				</div>
			</div>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello')
		expect(input.value).toBe('hello')

		const changed = canvas.getByTestId('change-text')
		expect(changed.innerText).toBe('hello')

		const keydown = canvas.getByTestId('keydown-text')
		expect(keydown.innerText).toBe('o')
	}
}
