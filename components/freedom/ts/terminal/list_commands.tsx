import type { Command } from './shell.types.js'

export const listCommand: Command = {
	description: 'list all commands',
	run() {
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
