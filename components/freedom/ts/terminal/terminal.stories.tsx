import type { Meta, StoryObj } from '@storybook/react'
import { Terminal } from './terminal.js'

const meta: Meta<typeof Terminal> = {
	component: Terminal
}

export default meta

type Story = StoryObj<typeof Terminal>

export const BasicExample: Story = {}
