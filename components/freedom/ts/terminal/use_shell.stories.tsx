import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent } from '@storybook/testing-library'
import { Terminal } from './terminal.js'
import { useShell } from './use_shell.js'

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
				<Terminal.Input />
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
					<Terminal.Input />
				</div>
			</Terminal>
		)
	}
}

export const ParseInput: Story = {
	render() {
		const { register, onParse } = useShell()
		onParse(text => `echo ${text}`)

		return <Terminal data-testid="terminal" className="h-full" {...register()} />
	},
	async play() {
		await userEvent.keyboard('hello world{enter}')
	}
}

export const TODOInputSpanFullWidth: Story = {
	render() {
		const { register } = useShell({
			initial: [faker.lorem.paragraph(), faker.lorem.paragraph(), faker.lorem.paragraph()]
		})

		return (
			<Terminal className="h-full overflow-auto" {...register()}>
				<Terminal.Output />
				<Terminal.Input className="outline-none" />
			</Terminal>
		)
	}
}
