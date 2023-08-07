import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent } from '@storybook/testing-library'
import { Terminal } from './terminal.js'
import { useShell } from './use_shell.js'
import { useState } from 'react'

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
	component: Terminal as any
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
				<Terminal.Prompt />
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
					<Terminal.Prompt />
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
			initial: [faker.lorem.paragraph(), faker.lorem.paragraph(), faker.lorem.paragraph()]
		})

		return (
			<Terminal className="h-full overflow-auto" {...register()}>
				<Terminal.Output />
				<Terminal.Prompt className="flex">
					<Terminal.Input className="w-full outline-none" />
				</Terminal.Prompt>
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
			onParse(text) {
				return `echo ${text}`
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
			async onParse(text) {
				return `echo ${text}`
			}
		})

		return <Terminal className="h-full overflow-auto" {...register()} />
	},
	async play() {
		await userEvent.keyboard('hello world{enter}')
	}
}
