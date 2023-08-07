import {
	useRef,
	useState,
	type JSXElementConstructor,
	type KeyboardEvent as ReactKeyboardEvent,
	type ReactNode
} from 'react'
import { resolvePrompt } from './terminal.js'

export interface useSimpleTerminalProps {
	initial?: Array<ReactNode>
	echoInput?: boolean
	prompt?:
		| string
		| JSXElementConstructor<{
				output?: ReactNode
				children?: ReactNode
		  }>
}

/**
 * A hook for a shell emulator.
 */
export function useShell(props?: useSimpleTerminalProps) {
	const { initial = [], echoInput = true, prompt = '>' } = props ?? {}

	const ref = useRef<HTMLInputElement>(null)
	const [output, setOutput] = useState<Array<ReactNode>>(initial)

	const Prompt = resolvePrompt({ prompt })
	let parseFn: (text: string) => Promise<ReactNode> | ReactNode = text => text
	return {
		register() {
			return {
				ref,
				prompt: Prompt,
				async onKeyDown(e: ReactKeyboardEvent<HTMLElement>) {
					if (e.key === 'Enter') {
						if (echoInput) {
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
