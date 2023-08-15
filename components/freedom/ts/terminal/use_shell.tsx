import {
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
	type KeyboardEvent as ReactKeyboardEvent,
	type ReactNode
} from 'react'
import type { CommandTypes, CommandsMap } from './shell.types.js'
import { usePrompt, type PromptNode } from './terminal.js'

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
	onParse?: (props: { input: string }) => Promise<ReactNode> | ReactNode
	/**
	 * Handles `keydown` events on the terminal.
	 *
	 * This is called before `onParse`.
	 * If `e.preventDefault()` is called, the handling will stop.
	 */
	onKeyDown?: (e: ReactKeyboardEvent<HTMLInputElement>) => void
	commands?: CommandsMap
}

/**
 * A hook for a shell emulator.
 */
export function useShell(props?: UseShellProps) {
	const { initial = [], echoPrompt = true, prompt = '>', commands, onParse, onKeyDown } = props ?? {}

	const ref = useRef<HTMLInputElement>(null)
	const [output, setOutput] = useState<Array<ReactNode>>(initial)
	const [input, setInput] = useState('')
	const [completion, setCompletion] = useState({ typed: '', value: '' })

	useEffect(() => {
		if (ref.current && completion) {
			ref.current.value = completion.value
		}
	}, [ref, completion])

	const Prompt = usePrompt(prompt)
	return {
		setOutput,
		input,
		register() {
			return {
				ref,
				prompt,
				onChange(e: ChangeEvent<HTMLInputElement>) {
					setInput(e.target.value)
				},
				async onKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
					if (!ref.current) return

					if (e.key === 'Enter' && echoPrompt) {
						setOutput(h => {
							const entry = <Prompt>{input}</Prompt>
							return [...h, entry]
						})
					}

					if (onKeyDown) {
						onKeyDown(e)
					}

					if (e.isPropagationStopped()) return

					if (e.key === 'Enter') {
						e.preventDefault()
						setCompletion({ typed: '', value: '' })

						let command: CommandTypes | undefined
						if (commands) {
							command = lookupCommand(commands, input)

							if (command) {
								const result = await executeCommand.bind({ commands })(command, input)
								if (result) {
									setOutput(h => {
										if (Array.isArray(result)) return [...h, ...result]
										return [...h, result]
									})
								}
								return
							}
						}

						if (onParse) {
							const result = await onParse({ input })
							if (result) {
								setOutput(h => {
									if (Array.isArray(result)) return [...h, ...result]
									return [...h, result]
								})
							}
							return
						}
						if (commands && !command && !onParse) {
							setOutput(h => [...h, `Unknown command: ${input}`])
						}
					} else if (commands && e.key === 'Tab') {
						if (!input) return
						e.preventDefault()

						const typed = input === completion.value ? completion.typed : input
						const value = matchCommandName(commands, typed, input)
						if (value) {
							setInput(value)
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
