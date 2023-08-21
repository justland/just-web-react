import { faker } from '@faker-js/faker'
import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { useState } from 'react'
import { listCommand } from './list_commands.js'
import { Terminal, type PromptNode, type PromptNodeProps } from './terminal.js'
import { useShell } from './use_shell.js'
import { summary } from '../storybook/summary.js'

faker.seed(1234)

const meta: Meta<typeof Terminal> = {
	decorators: [
		Story => {
			return (
				<div className="h-80 bg-gray-100 w-80">
					<Story />
				</div>
			)
		}
	],
	component: Terminal
}

export default meta

type Story = StoryObj<typeof Terminal>

export const BasicExample: Story = {
	render() {
		const { register } = useShell()

		return <Terminal className="h-full overflow-auto" {...register()} />
	}
}

export const WithInitialNodes: Story = {
	render() {
		const { register } = useShell({ initial: ['simple text', <b>Bold text</b>] })

		return <Terminal className="h-full overflow-auto" {...register()} />
	}
}

export const FormatEachLine: Story = {
	render() {
		const { register } = useShell({
			initial: [faker.lorem.paragraph(), faker.lorem.paragraph(), faker.lorem.paragraph()]
		})

		return (
			<Terminal className="h-full overflow-auto" {...register()}>
				<Terminal.OutputArea>
					{({ output }) => output.map(line => <div className="outline">{line}</div>)}
				</Terminal.OutputArea>
				<Terminal.PromptArea />
			</Terminal>
		)
	}
}

export const WithCustomLayout: Story = {
	render() {
		const { register } = useShell({
			initial: [faker.lorem.paragraph(), faker.lorem.paragraph(), faker.lorem.paragraph()]
		})

		return (
			<Terminal className="h-full flex flex-col" {...register()}>
				<div>Status: connected</div>
				<div className="overflow-auto">
					<Terminal.OutputArea />
					<Terminal.PromptArea />
				</div>
			</Terminal>
		)
	}
}

export const CustomStringPrompt: Story = {
	render() {
		const { register, setOutput } = useShell({
			prompt: '>>>',
			onParse({ input }) {
				setOutput(h => [...h, `echo: ${input}`])
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello world{enter}')
		const echo = await canvas.findByText('echo: hello world')
		expect(echo).toBeInTheDocument()
	}
}

export const CustomReactPrompt: Story = {
	render() {
		const { register, setOutput } = useShell({
			prompt: ({ children }) => (
				<>
					<div>cyberuni</div>
					<div className="flex">
						<span className="px-4 bg-slate-300">$</span>
						<span className="flex-grow bg-indigo-300">
							{children || <Terminal.Input className="w-full bg-indigo-300 outline-none" />}
						</span>
					</div>
				</>
			),
			onParse({ input }) {
				setOutput(h => [...h, `echo: ${input}`])
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello world{enter}')
		const echo = await canvas.findByText('echo: hello world')
		expect(echo).toBeInTheDocument()
	}
}

export const InputSpanFullWidth: Story = {
	render() {
		const { register } = useShell({
			initial: [faker.lorem.paragraph()],
			prompt: ({ children }) => (
				<div className="flex gap-2">
					<span>&gt;</span>
					{children}
				</div>
			)
		})

		return (
			<Terminal className="h-full overflow-auto" {...register()}>
				<Terminal.OutputArea />
				<Terminal.PromptArea input={<Terminal.Input className="w-full outline-none" />} />
			</Terminal>
		)
	}
}

export const DisableEchoPrompt: Story = {
	render() {
		const { register, setOutput } = useShell({
			echoPrompt: false,
			onParse({ input }) {
				setOutput(o => [...o, `echo: ${input}`])
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello world{enter}')
		const text = canvas.getByText('echo: hello world')
		expect(text).toBeInTheDocument()
	}
}

export const ChangeStringPrompt: Story = {
	render() {
		const [prompt, setPrompt] = useState('>')
		const { register } = useShell({
			prompt,
			onParse() {
				setPrompt('$')
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'change prompt{enter}')
	}
}

export const ChangeStringToReactPrompt: Story = {
	decorators: [summary('this does not work at the momemt. Cannot add Prompt as the useCallback dependency')],
	tags: ['skip-test'],
	render() {
		const [prompt, setPrompt] = useState<PromptNode>('>')
		const { register } = useShell({
			prompt,
			onParse() {
				setPrompt(({ children }: PromptNodeProps) => (
					<div className="flex gap-2">
						<span>$$</span>
						{children}
					</div>
				))
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	}
	// async play({ canvasElement }) {
	// 	const canvas = within(canvasElement)
	// 	const input = canvas.getByRole<HTMLInputElement>('textbox')
	// 	await userEvent.type(input, 'change prompt{enter}')
	// }
}

export const ParseInput: Story = {
	render() {
		const { register } = useShell({
			onParse({ input }) {
				return `echo ${input}`
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello world{enter}')
	}
}

export const ParseInputAsync: Story = {
	render() {
		const { register } = useShell({
			async onParse({ input }) {
				return `async-echo ${input}`
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello world{enter}')
	}
}

export const UnknownCommand: Story = {
	render() {
		const { register } = useShell({
			commands: {
				miku: ({ input }) => `miku ${input}`
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello world{enter}')
	}
}

export const StringCommand: Story = {
	render() {
		const { register } = useShell({
			commands: {
				help: `tried to help`
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'help{enter}')
	}
}

export const FunctionCommand: Story = {
	render() {
		const { register } = useShell({
			commands: {
				miku: ({ input }) => `received '${input}'`
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'miku sing{enter}')
	}
}

export const CommandReturnsArray: Story = {
	render() {
		const { register } = useShell({
			commands: {
				chatty: ({ input }) => [`received '${input}'`, `start '${input}'`, `end '${input}'`]
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'chatty{enter}')
	}
}

export const ReactNodeCommand: Story = {
	render() {
		const { register } = useShell({
			commands: {
				miku: ({ input }) => <div className="bg-teal-300">received &apos;{input}&apos;</div>
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'miku sing{enter}')
	}
}

export const AutoComplete: Story = {
	render() {
		const { register } = useShell({
			commands: {
				miku: 'miku'
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'm{tab}')
		expect(input.value).toBe('miku')
	}
}

export const TabAwayIfPromptIsEmpty: Story = {
	render() {
		const { register } = useShell({
			commands: {
				miku: 'miku'
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		input.focus()
		expect(input).toEqual(document.activeElement)
		await userEvent.keyboard('{tab}')
		expect(input).not.toEqual(document.activeElement)
	}
}

export const CompleteCycleThroughMatches: Story = {
	render() {
		const { register } = useShell({
			commands: {
				mika: 'mika',
				miku: 'miku'
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'm{tab}')
		expect(input.value).toEqual('mika')
		await userEvent.type(input, '{tab}')
		expect(input.value).toEqual('miku')
		await userEvent.type(input, '{tab}')
		expect(input.value).toEqual('mika')
	}
}

export const ReCompleteAfterBackspace: Story = {
	render() {
		const { register } = useShell({
			commands: {
				mika: 'mika',
				miku: 'miku'
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'm{tab}')
		expect(input.value).toEqual('mika')
		await userEvent.type(input, '{backspace}{tab}')
		expect(input.value).toEqual('mika')
		await userEvent.type(input, '{tab}')
		expect(input.value).toEqual('miku')
		await userEvent.type(input, '{tab}')
		expect(input.value).toEqual('mika')
	}
}

export const ListCommandsByEmptyPrompt: Story = {
	render() {
		const { register } = useShell({
			commands: {
				str: 'str cmd',
				fn: () => 'fn cmd',
				foo: 'foo',
				miku: {
					description: 'tell miku to do something',
					run: ({ input }) => <div className="bg-teal-300">received &apos;{input}&apos;</div>
				},
				list: listCommand
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'list{enter}')
	}
}

export const HandleKeyDown: Story = {
	render() {
		const [typed, setTyped] = useState('')
		const { register } = useShell({
			onKeyDown(e) {
				e.persist()
				setTyped(v => v + e.key)
			}
		})

		return (
			<>
				<Terminal className="h-full overflow-auto" {...register()} />
				<div>Typed: {typed}</div>
			</>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'type something{enter}')
	}
}

export const OnParseSuppressUnknownCommand: Story = {
	render() {
		const { register } = useShell({
			commands: {
				miku: ({ input }) => `miku ${input}`
			},
			onParse() {}
		})

		return (
			<>
				<Terminal className="h-full overflow-auto" {...register()} />
			</>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'luka sing{enter}')
		expect(canvas.getByText('luka sing')).toBeInTheDocument()

		expect(canvas.queryByText(`Unknown command: luka sing`)).toBeNull()
	}
}

export const UpdateOutput: Story = {
	render() {
		const { register, setOutput } = useShell({
			onParse({ input }) {
				setOutput(v => [...v, `echoing with setOutput: ${input}`])
			}
		})

		return (
			<>
				<Terminal className="h-full overflow-auto" {...register()} />
			</>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello world{enter}')
		expect(canvas.getByText('echoing with setOutput: hello world')).toBeInTheDocument()
	}
}

export const AccessInput: Story = {
	render() {
		const { register, setOutput, input } = useShell({
			onKeyDown(e) {
				if (e.key === 'Enter') {
					setOutput(v => [...v, `onKeyDown: ${input}`])
				}
			},
			onParse({ input }) {
				setOutput(v => [...v, `onParse: ${input}`])
			}
		})

		return (
			<>
				<Terminal className="h-full overflow-auto" {...register()} />
			</>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello world{enter}')
		expect(canvas.getByText('onKeyDown: hello world')).toBeInTheDocument()
		expect(canvas.getByText('onParse: hello world')).toBeInTheDocument()
	}
}

export const StopPropagation: Story = {
	render() {
		const { register, setOutput, input } = useShell({
			onKeyDown(e) {
				if (e.key === 'Enter') {
					setOutput(v => [...v, `onKeyDown: ${input}`])
					e.stopPropagation()
				}
			},
			onParse({ input }) {
				setOutput(v => [...v, `onParse: ${input}`])
			},
			commands: {
				miku: 'command: miku'
			}
		})

		return (
			<>
				<Terminal className="h-full overflow-auto" {...register()} />
			</>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello world{enter}')
		expect(canvas.getByText('onKeyDown: hello world')).toBeInTheDocument()
		expect(canvas.queryByText('onParse: hello world')).toBeNull()

		await userEvent.clear(input)
		await userEvent.type(input, 'miku sing{enter}')
		expect(canvas.getByText('onKeyDown: miku sing')).toBeInTheDocument()
		expect(canvas.queryByText('command: miku')).toBeNull()
	}
}

export const HideInputWhenProcessing: Story = {
	render() {
		const { register, setOutput } = useShell({
			async onParse({ input }) {
				return new Promise<void>(a => {
					setTimeout(() => {
						setOutput(v => [...v, `onParse: ${input}`])
						a()
					}, 1000)
				})
			},
			commands: {
				miku: 'command: miku'
			}
		})

		return (
			<>
				<Terminal className="h-full overflow-auto" {...register()} />
			</>
		)
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
		await userEvent.type(input, 'hello world{enter}')
		expect(canvas.getByText('onKeyDown: hello world')).toBeInTheDocument()
		expect(canvas.queryByText('onParse: hello world')).toBeNull()

		await userEvent.clear(input)
		await userEvent.type(input, 'miku sing{enter}')
		expect(canvas.getByText('onKeyDown: miku sing')).toBeInTheDocument()
		expect(canvas.queryByText('command: miku')).toBeNull()
	}
}
