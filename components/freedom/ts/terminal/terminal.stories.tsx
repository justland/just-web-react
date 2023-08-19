import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { useState, type ReactNode } from 'react'
import { summary } from '../storybook/summary.js'
import { Terminal } from './terminal.js'

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
					prompt="$"
					output={[]}
					onChange={e => {
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
			<p>
				<code>onKeyDown</code> captures the keydown event from the input
			</p>
		)
	],
	render() {
		const [inputText, setInputText] = useState('')
		return (
			<div className="flex flex-col gap-2 p-2 bg-slate-100">
				<Terminal
					prompt="$"
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
			<p>
				This story ensure using both <code>onKeyDown</code> and <code>onChange</code> saving to two different
				states work.
			</p>
		)
	],
	render() {
		const [changed, setChanged] = useState('')
		const [keyDown, setKeyDown] = useState('')
		return (
			<div className="flex flex-col gap-2 p-2 bg-slate-100">
				<Terminal
					prompt="$"
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

export const Disabled: Story = {
	decorators: [summary(<p>When disabled, the input element will be disabled.</p>)],
	render() {
		const [disabled, setDisabled] = useState(true)

		return (
			<div className="flex flex-col gap-2">
				<div className="flex gap-1">
					<label htmlFor="enable">{disabled ? 'Enable Terminal' : 'Disable Terminal'}</label>
					<input id="enable" type="checkbox" onClick={() => setDisabled(v => !v)} />
				</div>
				<div className="h-80 bg-gray-100 w-80">
					<Terminal prompt="$" output={[]} disabled={disabled} />
				</div>
			</div>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const checkbox = canvas.getByRole('checkbox')
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		expect(input.disabled).toBe(true)
		await userEvent.click(checkbox)
		expect(input.disabled).toBe(false)
	}
}

export const TerminalClassName: Story = {
	decorators: [
		summary(
			<>
				<p>
					<code>Terminal</code> accepts a <code>className</code> prop for the overall style
				</p>
				<p>
					To style the output area and the prompt area, you can add <code>className</code> into those
					components
				</p>
			</>
		)
	],
	render() {
		return (
			<div className="h-80 w-80">
				<Terminal className="h-full bg-stone-400 py-2" prompt="$" output={[]} />
			</div>
		)
	}
}

export const ScrollToBottom: Story = {
	decorators: [
		summary(
			<p>
				<code>Terminal</code> will automatically scroll to the bottom.
			</p>
		)
	],
	render() {
		const [output, setOutput] = useState<ReactNode[]>([])

		return (
			<div className="flex flex-col gap-2">
				<div className="flex gap-1">
					<button
						className="rounded px-2 py-1 bg-slate-200"
						onClick={() => {
							const entry = (
								<div>
									<p>Multiline 1</p>
									<p>Multiline 2</p>
									<p>Multiline 3</p>
									<p>Multiline 4</p>
								</div>
							)
							setOutput(v => [...v, entry])
						}}
					>
						Add output
					</button>
				</div>
				<div className="h-80 bg-gray-100 w-80">
					<Terminal prompt="$" output={output} className="h-full overflow-auto" />
				</div>
			</div>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const button = canvas.getByRole('button')
		await userEvent.click(button)
		await userEvent.click(button)
		await userEvent.click(button)
		await userEvent.click(button)
	}
}
