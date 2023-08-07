import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
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
	onParse?: (text: string) => Promise<ReactNode> | ReactNode
}

/**
 * A hook for a shell emulator.
 */
export function useShell(props?: UseShellProps) {
	const {
		initial = [],
		echoPrompt = true,
		prompt = '>',
		onParse = (text: string) => (text ? `Unknown command: ${text.split(' ')[0]}` : '')
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

						const result = await onParse(ref.current.value ?? '')
						setOutput(h => [...h, result ? result : <div>&nbsp;</div>])
						ref.current.value = ''
					}
				},
				output
			}
		}
	}
}
