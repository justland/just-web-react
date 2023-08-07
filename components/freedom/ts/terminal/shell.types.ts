import type { ReactNode } from 'react'

export interface CommandParser {
	(this: {commands: CommandsMap}, props: { input: string }): Promise<ReactNode> | ReactNode
}

export interface Command {
	type: 'command'
	description: string
	parse: CommandParser
}

export interface CommandsMap {
	[k: string]: string | CommandParser | Command
}
