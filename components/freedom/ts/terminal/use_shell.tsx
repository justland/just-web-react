import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { resolvePrompt, type PromptNode } from './terminal.js'

export interface CommandParser {
	(props: { input: string }): Promise<ReactNode> | ReactNode
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

	commands?: Record<string, string | CommandParser>
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

					if (e.key === 'Enter') {
						if (echoPrompt) {
							setOutput(h => {
								if (!ref.current) return h

								const entry = <Prompt>{ref.current.value}</Prompt>
								return [...h, entry]
							})
						}

						const input = ref.current.value

						const command = lookupCommand(commands, input) ?? onParse

						const result = await executeCommand(command, input)
						setOutput(h => [...h, result ? result : <div>&nbsp;</div>])
						ref.current.value = ''
					}
				},
				output
			}
		}
	}
}

function lookupCommand(commands: Record<string, string | CommandParser>, input: string) {
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
