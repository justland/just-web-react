import {
	createContext,
	forwardRef,
	memo,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	type ChangeEventHandler,
	type KeyboardEventHandler,
	type RefObject,
	type ReactNode
} from 'react'

export type TerminalWidgetContextProps = {
	output: Array<ReactNode>
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined
	onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined
	inputRef?: RefObject<HTMLInputElement> | undefined
}

export const TerminalWidgetContext = createContext<TerminalWidgetContextProps>(null as any)

export interface TerminalProps {
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined
	onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined
	output: Array<ReactNode>
}

export const TerminalWidget = memo(
	forwardRef<{ focus: () => void }, TerminalProps>((props, ref) => {
		const inputRef = useRef<HTMLInputElement>(null)
		useImperativeHandle(ref, () => ({
			focus() {
				inputRef.current?.focus()
			}
		}))

		useEffect(() => {
			if (!inputRef.current) return
			inputRef.current.focus()
		}, [inputRef])
		return (
			<TerminalWidgetContext.Provider value={{ ...props, inputRef }}>
				<>
					<TerminalOutput />
					<div>
						<div>
							$ <TerminalInput />
						</div>
					</div>
				</>
			</TerminalWidgetContext.Provider>
		)
	})
)
export interface TerminalOutputProps {
	className?: string
	children?: ReactNode | ((bag: { output: Array<ReactNode> }) => ReactNode)
}

export function TerminalOutput({ className, children }: TerminalOutputProps) {
	const { output } = useContext(TerminalWidgetContext)
	const resolvedChildren = typeof children === 'function' ? children({ output }) : children
	return (
		<div className={className}>{resolvedChildren || output.map((line, i) => <div key={i}>{line}</div>)}</div>
	)
}

export function TerminalInput() {
	const { inputRef, onChange, onKeyDown } = useContext(TerminalWidgetContext)

	return <input onChange={onChange} onKeyDown={onKeyDown} ref={inputRef} />
}

export const Terminal = Object.assign(TerminalWidget, {
	Widget: TerminalWidget,
	Input: TerminalInput
})
