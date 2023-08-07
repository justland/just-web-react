import {
	createContext,
	forwardRef,
	useContext,
	useEffect,
	type ForwardedRef,
	type JSXElementConstructor,
	type KeyboardEventHandler,
	type ReactNode
} from 'react'
import { useForwardedRef } from '../utils/use_forwarded_ref.js'

export const TerminalWidgetContext = createContext<{
	className?: string
	Prompt: string | JSXElementConstructor<{ children: ReactNode }>
	output: Array<ReactNode>
	ref: ForwardedRef<HTMLInputElement>
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}>(null as any)

export interface TerminalContainerProps {
	children?: ReactNode
	className?: string
	prompt: string | JSXElementConstructor<{ children: ReactNode }>
	output: Array<ReactNode>
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

export const TerminalWidget = forwardRef<HTMLInputElement, TerminalContainerProps>((props, ref) => {
	const { children, className, prompt, ...rest } = props
	return (
		<TerminalWidgetContext.Provider
			value={{
				...rest,
				Prompt: resolvePrompt({ prompt }),
				ref
			}}
		>
			<div className={className}>
				{children || (
					<>
						<TerminalOutput />
						<TerminalInput />
					</>
				)}
			</div>
		</TerminalWidgetContext.Provider>
	)
})

TerminalWidget.displayName = 'Terminal'

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

export function resolvePrompt({
	prompt
}: {
	prompt: string | JSXElementConstructor<{ children: ReactNode }>
}) {
	if (typeof prompt === 'function') return prompt

	return function Prompt({ children }: { children: ReactNode }) {
		return (
			<>
				<span>{prompt}</span>
				<span>{children}</span>
			</>
		)
	}
}

export function TerminalInput({ className }: { className?: string }) {
	const { Prompt, ref, output, onKeyDown } = useContext(TerminalWidgetContext)
	const innerRef = useForwardedRef(ref)

	useEffect(() => {
		innerRef?.current?.focus()
	}, [ref, output])

	const input = <input ref={innerRef} className={className} onKeyDown={onKeyDown}></input>
	return (
		<div key="input">
			<Prompt>{input}</Prompt>
		</div>
	)
}

export const Terminal = Object.assign(TerminalWidget, {
	Output: TerminalOutput,
	Input: TerminalInput
})
