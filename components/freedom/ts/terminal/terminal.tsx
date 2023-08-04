import {
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	type Dispatch,
	type PropsWithChildren
} from 'react'

const TerminalContext = createContext<{
	history: Array<string | JSX.Element>
	className?: string
	setHistory: Dispatch<SetStateAction<Array<string | JSX.Element>>>
	caretPosition: number
	setCaretPosition: Dispatch<SetStateAction<number>>
	prompt: string
	currentText: string
	setCurrentText: Dispatch<SetStateAction<string>>
	onSubmit(text: string): Promise<void | string | JSX.Element> | void | string | JSX.Element
}>(null as any)

export interface TerminalContainerProps
	extends PropsWithChildren<{
		className?: string
		prompt?: string
		onSubmit(text: string): Promise<void | string | JSX.Element> | void | string | JSX.Element
	}> {}

export function TerminalContainer({ className, prompt = '>', children, onSubmit }: TerminalContainerProps) {
	const [history, setHistory] = useState<Array<string | JSX.Element>>([])
	const [caretPosition, setCaretPosition] = useState(0)
	const [currentText, setCurrentText] = useState('')
	return (
		<TerminalContext.Provider
			value={{
				className,
				history,
				setHistory,
				caretPosition,
				setCaretPosition,
				currentText,
				setCurrentText,
				prompt,
				onSubmit
			}}
		>
			{children}
		</TerminalContext.Provider>
	)
}

export interface TerminalBodyProps {
	className?: string
}

export function TerminalBody() {
	const { prompt, history, setHistory, className, currentText, onSubmit } = useContext(TerminalContext)
	const input = useRef<HTMLInputElement>(null)
	const onInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const result = await onSubmit(input.current?.value ?? '')
			if (result) {
				setHistory(v => [...v, result])
			}
		}
	}

	useEffect(() => {
		input.current?.focus()
	}, [])

	useEffect(() => {
		if (input.current) {
			input.current.value = currentText
		}
	}, [currentText])

	return (
		<div className={className}>
			{history.map((line, i) => (
				<div key={i}>{line}</div>
			))}
			<div key="input">
				<span>{prompt}</span>
				<input ref={input} onKeyDown={e => onInputKeyDown(e)}></input>
			</div>
		</div>
	)
}

export const Terminal = Object.assign(TerminalContainer, {
	Body: TerminalBody
})
