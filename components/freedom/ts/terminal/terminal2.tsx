import {
	forwardRef,
	useImperativeHandle,
	useRef,
	type ChangeEventHandler,
	useEffect,
	createContext,
	useContext,
	memo
} from 'react'

export type TerminalWidgetContextProps = {
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined
	inputRef?: React.RefObject<HTMLInputElement>
}

export const TerminalWidgetContext = createContext<TerminalWidgetContextProps>(null as any)

export interface TerminalProps {
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

export const TerminalWidget = memo(
	forwardRef<{ focus: () => void }, TerminalProps>((props, ref) => {
		const inputRef = useRef<HTMLInputElement>(null)
		useImperativeHandle(ref, () => ({
			focus() {
				inputRef.current?.focus()
			}
		}))

		// useEffect(() => {
		// 	if (!inputRef.current) return
		// 	inputRef.current.focus()
		// }, [inputRef])
		return (
			// <TerminalWidgetContext.Provider value={{ onChange: props.onChange, inputRef }}>
				<div>
					<div>output</div>
					<div>
						<div>
							$ <input onChange={props.onChange} ref={inputRef} />
						</div>
					</div>
				</div>
			// </TerminalWidgetContext.Provider>
		)
	})
)

export function TerminalInput() {
	const { onChange, inputRef } = useContext(TerminalWidgetContext)

	return <input onChange={onChange} ref={inputRef} />
}

export const Terminal = Object.assign(TerminalWidget, {})
