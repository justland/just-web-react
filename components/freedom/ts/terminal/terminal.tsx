import {
	createContext,
	forwardRef,
	useContext,
	useEffect,
	useRef,
	type ForwardedRef,
	type KeyboardEventHandler,
	type PropsWithChildren,
	type ReactNode
} from 'react'

type TerminalContext = {
	className?: string
	prompt: string
	history: Array<ReactNode>
	ref: ForwardedRef<HTMLInputElement>
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

const TerminalContext = createContext<TerminalContext>(null as any)

export interface TerminalContainerProps
	extends PropsWithChildren<{
		className?: string
		prompt?: string
		history: Array<ReactNode>
		onKeyDown?: KeyboardEventHandler<HTMLInputElement>
	}> {}

export const TerminalContainer = forwardRef<HTMLInputElement, TerminalContainerProps>((props, ref) => {
	const { children, ...rest } = props
	return (
		<TerminalContext.Provider
			value={{
				prompt: '>',
				...rest,
				ref: ref!
			}}
		>
			{children}
		</TerminalContext.Provider>
	)
})

TerminalContainer.displayName = 'Terminal'

export interface TerminalBodyProps {
	className?: string
}

function useForwardedRef<T>(ref: ForwardedRef<T>) {
	const innerRef = useRef<T>(null)

	useEffect(() => {
		if (!ref) return
		if (typeof ref === 'function') {
			ref(innerRef.current)
		} else {
			ref.current = innerRef.current
		}
	})

	return innerRef
}

export function TerminalBody() {
	const { prompt, history, className, ref, onKeyDown } = useContext(TerminalContext)

	const innerRef = useForwardedRef(ref)

	useEffect(() => {
		innerRef?.current?.focus()
	}, [ref])

	return (
		<div className={className}>
			{history.map((line, i) => (
				<div key={i}>{line}</div>
			))}
			<div key="input">
				<span>{prompt}</span>
				<input ref={innerRef} onKeyDown={onKeyDown}></input>
			</div>
		</div>
	)
}

export const Terminal = Object.assign(TerminalContainer, {
	Body: TerminalBody
})
