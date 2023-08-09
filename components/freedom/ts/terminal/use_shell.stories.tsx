import { faker } from '@faker-js/faker'
import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { useState } from 'react'
import { listCommand } from './list_commands.js'
import { Terminal } from './terminal.js'
import { useShell } from './use_shell.js'

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
		const { register } = useShell({ initial: [<b>Bold text</b>, <i>Italic text</i>] })

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
				<Terminal.Output>
					{({ output }) => output.map(line => <div className="outline">{line}</div>)}
				</Terminal.Output>
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
					<Terminal.Output />
					<Terminal.PromptArea />
				</div>
			</Terminal>
		)
	}
}

export const CustomStringPrompt: Story = {
	render() {
		const { register } = useShell({ prompt: '>>>' })

		return <Terminal className="h-full overflow-auto" {...register()} />
	}
}

export const CustomReactPrompt: Story = {
	render() {
		const { register } = useShell({
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
			)
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
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
				<Terminal.Output />
				<Terminal.PromptArea input={<Terminal.Input className="w-full outline-none" />} />
			</Terminal>
		)
	}
}

export const DisableEchoPrompt: Story = {
	render() {
		const { register } = useShell({ echoPrompt: false })

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play() {
		await userEvent.keyboard('hello world{enter}')
	}
}

export const ChangePrompt: Story = {
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
	async play() {
		await userEvent.keyboard('change prompt{enter}')
	}
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
	async play() {
		await userEvent.keyboard('hello world{enter}')
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
	async play() {
		await userEvent.keyboard('hello world{enter}')
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
	async play() {
		await userEvent.keyboard('hello world{enter}')
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
	async play() {
		await userEvent.keyboard('help{enter}')
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
	async play() {
		await userEvent.keyboard('miku sing{enter}')
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
	async play() {
		await userEvent.keyboard('chatty{enter}')
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
	async play() {
		await userEvent.keyboard('miku sing{enter}')
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
		await userEvent.keyboard('m{tab}')
		const canvas = within(canvasElement)
		const input = canvas.getByRole<HTMLInputElement>('textbox')
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
				miku: 'miku',
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		await userEvent.keyboard('m{tab}')
		expect(canvas.getByRole<HTMLInputElement>('textbox').value).toEqual('mika')
		await userEvent.keyboard('{tab}')
		expect(canvas.getByRole<HTMLInputElement>('textbox').value).toEqual('miku')
		await userEvent.keyboard('{tab}')
		expect(canvas.getByRole<HTMLInputElement>('textbox').value).toEqual('mika')
	}
}


export const ReCompleteAfterBackspace: Story = {
	render() {
		const { register } = useShell({
			commands: {
				mika: 'mika',
				miku: 'miku',
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement)
		await userEvent.keyboard('m{tab}')
		expect(canvas.getByRole<HTMLInputElement>('textbox').value).toEqual('mika')
		await userEvent.keyboard('{backspace}{tab}')
		expect(canvas.getByRole<HTMLInputElement>('textbox').value).toEqual('mika')
		await userEvent.keyboard('{tab}')
		expect(canvas.getByRole<HTMLInputElement>('textbox').value).toEqual('miku')
		await userEvent.keyboard('{tab}')
		expect(canvas.getByRole<HTMLInputElement>('textbox').value).toEqual('mika')
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
	async play() {
		await userEvent.keyboard('list{enter}')
	}
}
