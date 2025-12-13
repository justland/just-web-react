import type { ReactNode } from 'react';

export type CommandParser = (
	this: { commands: CommandsMap },
	props: { input: string }
) => Promise<ReactNode> | ReactNode;

export interface Argument {
	name: string;
	description: string;
}

export interface Command {
	description: string;
	run: CommandParser;
}

export type CommandTypes = string | CommandParser | Command;

export interface CommandsMap {
	[k: string]: CommandTypes;
}
