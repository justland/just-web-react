import type { ReactNode } from 'react'

export interface CommandParser {
	(this: { commands: CommandsMap }, props: { input: string }): Promise<ReactNode> | ReactNode
}

export interface Argument {
	name: string
	description: string
}

export interface Command {
	description: string
	run: CommandParser
}

export type CommandTypes = string | CommandParser | Command

export interface CommandsMap {
	[k: string]: CommandTypes
}
