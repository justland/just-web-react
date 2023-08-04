import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'

export function useSimpleTerminal() {
	const ref = useRef<HTMLInputElement>(null)
	const [history, setHistory] = useState<Array<ReactNode>>([])
	const [currentText, setCurrentLine] = useState('')

	let parseFn: (text: string) => Promise<ReactNode> | ReactNode
	return {
		register() {
			return {
				ref,
				async onKeyDown(e: ReactKeyboardEvent<HTMLElement>) {
					if (e.key === 'Enter') {
						const result = await parseFn?.(ref.current?.value ?? '')
						if (result) {
							setHistory(h => [...h, result])
						}
					}
				},
				history,
				currentText
			}
		},
		getValue() {
			return ref.current?.value ?? ''
		},
		onParse(fn: (text: string) => void) {
			parseFn = fn
		}
	}
}