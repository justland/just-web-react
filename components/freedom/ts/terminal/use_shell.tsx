import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { resolvePrompt, type PromptNode } from './terminal.js'

export interface CommandParser {
	(props: { input: string }): Promise<ReactNode> | ReactNode
}

export interface CommandsMap {
	[k: string]: string | CommandParser
}

export interface UseShellProps {
	/**
	 * The initial output to be presented on the terminal.
	 */
	initial?: Array<ReactNode>
	/**
	 * Whether to echo the prompt in the output.
	 * Default to `true`.
	 */
	echoPrompt?: boolean
	/**
	 * The prompt to be presented on the terminal.
	 * Default to `>`.
	 *
	 * It can be a React component accepting `PromptNodeProps`.
	 */
	prompt?: PromptNode
	/**
	 * When user presses `Enter`, the function to be called if:
	 *
	 * - no `commands` are provided.
	 * - no `command` is identified to process the command.
	 */
	onParse?: CommandParser

	commands?: CommandsMap
}

/**
 * A hook for a shell emulator.
 */
export function useShell(props?: UseShellProps) {
	const {
		initial = [],
		echoPrompt = true,
		prompt = '>',
		commands = {},
		onParse = ({ input }: { input: string }) => (input ? `Unknown command: ${input.split(' ')[0]}` : '')
	} = props ?? {}

	const ref = useRef<HTMLInputElement>(null)
	const [output, setOutput] = useState<Array<ReactNode>>(initial)

	const Prompt = resolvePrompt(prompt)
	return {
		register() {
			return {
				ref,
				prompt: Prompt,
				async onKeyDown(e: ReactKeyboardEvent<HTMLElement>) {
					if (!ref.current) return

					const input = ref.current.value
					if (e.key === 'Enter') {
						e.preventDefault()
						if (echoPrompt) {
							setOutput(h => {
								if (!ref.current) return h

								const entry = <Prompt>{ref.current.value}</Prompt>
								return [...h, entry]
							})
						}

						const command = lookupCommand(commands, input) ?? onParse

						const result = await executeCommand(command, input)
						setOutput(h => [...h, result ? result : <div>&nbsp;</div>])
						ref.current.value = ''
					} else if (e.key === 'Tab') {
						e.preventDefault()

						const name = matchCommandName(commands, input)
						if (name) ref.current.value = name
					}
				},
				output
			}
		}
	}
}

function lookupCommand(commands: CommandsMap, input: string) {
	for (const [command, parser] of Object.entries(commands)) {
		if (input.startsWith(command)) {
			return parser
		}
	}
}

async function executeCommand(command: string | CommandParser, input: string) {
	if (typeof command === 'string') {
		return Promise.resolve(command)
	}
	return command({ input })
}

function matchCommandName(commands: CommandsMap, input: string) {
	return Object.keys(commands).find(k => k.startsWith(input))
}
