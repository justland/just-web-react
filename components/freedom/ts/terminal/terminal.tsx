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

export interface PromptNodeProps {
	/**
	 * Children of the prompt is either the `<TerminalInput>`,
	 * or `ReactNode` when the prompt is used in the output.
	 */
	children?: ReactNode | undefined
}

export type PromptNode = string | JSXElementConstructor<PromptNodeProps>

export const TerminalWidgetContext = createContext<{
	className?: string | undefined
	Prompt: PromptNode
	output: Array<ReactNode>
	ref: ForwardedRef<HTMLInputElement>
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}>(null as any)

export interface TerminalWidgetProps {
	children?: ReactNode | undefined
	className?: string | undefined
	prompt: PromptNode
	output: Array<ReactNode>
	onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined
}

export const TerminalWidget = forwardRef<HTMLInputElement, TerminalWidgetProps>((props, ref) => {
	const { children, className, prompt, ...rest } = props
	return (
		<TerminalWidgetContext.Provider
			value={{
				...rest,
				Prompt: resolvePrompt(prompt),
				ref
			}}
		>
			<div className={className}>
				{children || (
					<>
						<TerminalOutput />
						<TerminalPromptArea />
					</>
				)}
			</div>
		</TerminalWidgetContext.Provider>
	)
})

TerminalWidget.displayName = 'TerminalWidget'

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

export function resolvePrompt(prompt: PromptNode) {
	if (typeof prompt === 'function') return prompt

	return function Prompt({ children }: PromptNodeProps) {
		const resolvedChildren =
			typeof children === 'string' ? <span>{children}</span> : children || <TerminalInput />
		return (
			<div>
				<span>{prompt}</span>
				{resolvedChildren}
			</div>
		)
	}
}

export interface TerminalPromptProps {
	input?: ReactNode | undefined
}

export function TerminalPromptArea({ input }: TerminalPromptProps) {
	const { Prompt } = useContext(TerminalWidgetContext)
	return <Prompt>{input}</Prompt>
}

export interface TerminalInputProps {
	className?: string | undefined
}

export function TerminalInput({ className }: TerminalInputProps) {
	const { ref, onKeyDown } = useContext(TerminalWidgetContext)
	const innerRef = useForwardedRef(ref)

	useEffect(() => {
		if (innerRef.current) {
			innerRef.current.focus()
		}
	}, [ref])

	return <input ref={innerRef} className={className} onKeyDown={onKeyDown} />
}

export const Terminal = Object.assign(TerminalWidget, {
	Input: TerminalInput,
	Output: TerminalOutput,
	PromptArea: TerminalPromptArea,
	Widget: TerminalWidget,
	WidgetContext: TerminalWidgetContext
})
