import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode, useEffect } from 'react'
import type { CommandParser, CommandTypes, CommandsMap } from './shell.types.js'
import { resolvePrompt, type PromptNode } from './terminal.js'

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

const EMPTY_LINE = <div>&nbsp;</div>

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
	const [completion, setCompletion] = useState({ typed: '', value: '' })

	useEffect(() => {
		if (ref.current && completion) {
			ref.current.value = completion.value
		}
	}, [ref, completion])

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

						const result = await executeCommand.bind({ commands })(command, input)
						setOutput(h => {
							if (!result) return [...h, EMPTY_LINE]
							if (Array.isArray(result)) return [...h, ...result]
							return [...h, result]
						})
						setCompletion({ typed: '', value: '' })
					} else if (e.key === 'Tab') {
						if (!input) return
						e.preventDefault()

						const typed = input === completion.value ? completion.typed : input
						const current = input === completion.value ? completion.value : ''
						const value = matchCommandName(commands, typed, current)
						if (value) {
							setCompletion({ typed, value })
						}
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

async function executeCommand(this: { commands: CommandsMap }, command: CommandTypes, input: string) {
	if (typeof command === 'string') {
		return command
	}
	if (typeof command === 'function') {
		return command.bind(this)({ input })
	}
	return command.run.bind(this)({ input })
}

function matchCommandName(commands: CommandsMap, input: string, current: string) {
	if (!input) return undefined
	const keys = Object.keys(commands)
		.filter(x => x.startsWith(input))
		.sort((a, b) => (a > b ? 1 : -1))

	const currentIndex = keys.indexOf(current)
	if (currentIndex === -1) return keys[0]
	return keys[(currentIndex + 1) % keys.length]
}
