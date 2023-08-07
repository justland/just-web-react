import type { Command } from './shell.types.js'

export const list: Command = {
	type: 'command',
	description: 'list all commands',
	parse() {
		return Object.keys(this.commands)
			.sort((a, b) => (a > b ? 1 : -1))
			.map(name => {
				const command = this.commands[name]
				if (typeof command === 'object') {
					return `${name} - ${command.description}`
				}
				return name
			})
	}
}
