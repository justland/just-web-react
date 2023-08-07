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
}

/**
 * A hook for a shell emulator.
 */
export function useShell(props?: UseShellProps) {
	const { initial = [], echoPrompt = true, prompt = '>' } = props ?? {}

	const ref = useRef<HTMLInputElement>(null)
	const [output, setOutput] = useState<Array<ReactNode>>(initial)

	const Prompt = resolvePrompt(prompt)
	let parseFn: (text: string) => Promise<ReactNode> | ReactNode = text =>
		text ? `Unknown command: ${text.split(' ')[0]}` : ''
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

						if (parseFn) {
							const result = await parseFn(ref.current.value ?? '')
							setOutput(h => [...h, result ? result : <div>&nbsp;</div>])
						}
						ref.current.value = ''
					}
				},
				output
			}
		},
		onParse(fn: (text: string) => Promise<ReactNode> | ReactNode) {
			parseFn = fn
		}
	}
}
