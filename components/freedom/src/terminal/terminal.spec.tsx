import React, { createRef, type ReactNode } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act, Simulate } from 'react-dom/test-utils'
import { afterEach, beforeEach, expect, it } from 'vitest'
import { listCommand, type PromptNodeProps, Terminal, type UseShellProps, useShell } from '../index.js'

let container: HTMLDivElement

beforeEach(() => {
	container = document.createElement('div')
	document.body.appendChild(container)
})

afterEach(() => {
	unmountComponentAtNode(container)
	container.remove()
})

function Shell(props: UseShellProps) {
	const shell = useShell(props)
	const { ref, ...rest } = shell.register()
	return <Terminal.Widget {...rest} ref={ref} />
}

function renderShell(props: UseShellProps = {}) {
	act(() => {
		render(<Shell {...props} />, container)
	})
	const input = container.querySelector('input')!
	const log = container.querySelector('[role="log"]')!
	return { input, log }
}

async function type(input: HTMLInputElement, value: string) {
	await act(async () => {
		input.value = value
		Simulate.change(input)
	})
}

async function press(input: HTMLInputElement, key: string) {
	await act(async () => {
		Simulate.keyDown(input, { key })
	})
}

it('renders the initial output and the prompt', () => {
	const { input, log } = renderShell({ initial: ['hello'] })
	expect(log.textContent).toBe('hello')
	expect(input).not.toBeNull()
	expect(container.textContent).toContain('>')
})

it('echoes the prompt and runs a string command', async () => {
	const { input, log } = renderShell({ commands: { hi: 'hello there' } })
	await type(input, 'hi')
	await press(input, 'Enter')
	expect(log.textContent).toBe('>hihello there')
})

it('does not echo the prompt when echoPrompt is false', async () => {
	const { input, log } = renderShell({ echoPrompt: false, commands: { hi: 'hello there' } })
	await type(input, 'hi')
	await press(input, 'Enter')
	expect(log.textContent).toBe('hello there')
})

it('runs function commands and spreads array results', async () => {
	const { input, log } = renderShell({
		echoPrompt: false,
		commands: { echo: ({ input }) => [input, 'done'] }
	})
	await type(input, 'echo x')
	await press(input, 'Enter')
	expect(Array.from(log.children).map((c) => c.textContent)).toEqual(['echo x', 'done'])
})

it('lists commands with listCommand', async () => {
	const { input, log } = renderShell({
		echoPrompt: false,
		commands: { list: listCommand, beta: 'b', alpha: () => 'a' }
	})
	await type(input, 'list')
	await press(input, 'Enter')
	expect(Array.from(log.children).map((c) => c.textContent)).toEqual(['alpha', 'beta', 'list - list all commands'])
})

it('reports unknown commands', async () => {
	const { input, log } = renderShell({ echoPrompt: false, commands: { hi: 'hello' } })
	await type(input, 'nope')
	await press(input, 'Enter')
	expect(log.textContent).toBe('Unknown command: nope')
})

it('falls back to onParse when no command matches', async () => {
	const { input, log } = renderShell({
		echoPrompt: false,
		commands: { hi: 'hello' },
		onParse: async ({ input }) => [`parsed ${input}`]
	})
	await type(input, 'other')
	await press(input, 'Enter')
	expect(log.textContent).toBe('parsed other')
})

it('uses onParse when there are no commands', async () => {
	const { input, log } = renderShell({ echoPrompt: false, onParse: ({ input }) => `parsed ${input}` })
	await type(input, 'x')
	await press(input, 'Enter')
	expect(log.textContent).toBe('parsed x')
})

it('stops when onKeyDown stops propagation', async () => {
	const { input, log } = renderShell({
		echoPrompt: false,
		commands: { hi: 'hello' },
		onKeyDown: (e) => e.stopPropagation()
	})
	await type(input, 'hi')
	await press(input, 'Enter')
	expect(log.textContent).toBe('')
})

it('cycles through matching command names on Tab', async () => {
	const { input } = renderShell({ commands: { ab: 'x', ac: 'y', b: 'z' } })
	await type(input, 'a')
	await press(input, 'Tab')
	expect(input.value).toBe('ab')
	await press(input, 'Tab')
	expect(input.value).toBe('ac')
	await press(input, 'Tab')
	expect(input.value).toBe('ab')
})

it('ignores Tab with no input', async () => {
	const { input } = renderShell({ commands: { ab: 'x' } })
	await press(input, 'Tab')
	expect(input.value).toBe('')
})

it('supports a custom prompt component', async () => {
	const Prompt = ({ children }: PromptNodeProps) => <div data-prompt="custom">$ {children}</div>
	const { input, log } = renderShell({ prompt: Prompt, commands: { hi: 'hello' } })
	await type(input, 'hi')
	await press(input, 'Enter')
	expect(log.querySelector('[data-prompt="custom"]')?.textContent).toBe('$ hi')
})

it('renders custom layout and output render prop', () => {
	act(() => {
		render(
			<Terminal output={['a', 'b']} prompt=">">
				<Terminal.OutputArea>
					{({ output }: { output: ReactNode[] }) => <span data-testid="count">{output.length}</span>}
				</Terminal.OutputArea>
				<Terminal.PromptArea input={<span data-testid="custom-input" />} />
			</Terminal>,
			container
		)
	})
	expect(container.querySelector('[data-testid="count"]')?.textContent).toBe('2')
	expect(container.querySelector('[data-testid="custom-input"]')).not.toBeNull()
})

it('focuses the input on mouse up', () => {
	act(() => {
		render(<Terminal output={[]} prompt=">" />, container)
	})
	const input = container.querySelector('input')!
	input.blur()
	act(() => {
		Simulate.mouseUp(container.firstElementChild!)
	})
	expect(document.activeElement).toBe(input)
})

it('forwards an object ref to the input', () => {
	const ref = createRef<HTMLInputElement>()
	act(() => {
		render(<Terminal output={[]} prompt=">" ref={ref} />, container)
	})
	expect(ref.current).toBe(container.querySelector('input'))
})

it('forwards a function ref to the input', () => {
	let el: HTMLInputElement | null = null
	act(() => {
		render(
			<Terminal
				output={[]}
				prompt=">"
				ref={(e) => {
					el = e
				}}
			/>,
			container
		)
	})
	expect(el).toBe(container.querySelector('input'))
})
