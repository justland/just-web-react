import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { resolvePrompt, type PromptNode } from './terminal.js'

export interface UseShellProps {
	initial?: Array<ReactNode>
	echoPrompt?: boolean
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
	let parseFn: (text: string) => Promise<ReactNode> | ReactNode = text => text
	return {
		register() {
			return {
				ref,
				prompt: Prompt,
				async onKeyDown(e: ReactKeyboardEvent<HTMLElement>) {
					if (e.key === 'Enter') {
						if (echoPrompt) {
							// eslint-disable-next-line react/jsx-key
							setOutput(h => [...h, <Prompt output={ref.current?.value} />])
						}

						if (parseFn) {
							const result = await parseFn(ref.current?.value ?? '')
							setOutput(h => [...h, result ? result : <div>&nbsp;</div>])
						}
						if (ref.current) ref.current.value = ''
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
