import {
	createContext,
	forwardRef,
	memo,
	useCallback,
	useContext,
	useEffect,
	type ChangeEventHandler,
	type JSXElementConstructor,
	type KeyboardEventHandler,
	type ReactNode,
	type RefObject
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

export type TerminalWidgetContextProps = {
	disabled?: boolean
	inputRef?: RefObject<HTMLInputElement> | undefined
	output: Array<ReactNode>
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined
	onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined
	Prompt: PromptNode
}

export const TerminalWidgetContext = createContext<TerminalWidgetContextProps>(null as any)

export interface TerminalWidgetProps {
	/**
	 * Provide your own terminal layout and customization.
	 *
	 * You should at least provide a `<TerminalOutputArea />` and `<TerminalPromptArea />`.
	 */
	children?: ReactNode | undefined
	/**
	 * Class name of the terminal.
	 */
	className?: string | undefined
	/**
	 * Indicate the terminal is in disabled state.
	 */
	disabled?: boolean
	/**
	 * Event handler for the termanal input's `onChange` event.
	 */
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined
	/**
	 * Event handler for the termanal input's `onKeyDown` event.
	 */
	onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined
	/**
	 * Output value to be rendered by the Terminal.
	 */
	output: Array<ReactNode>
	prompt: PromptNode
}

export const TerminalWidget = memo(
	forwardRef<HTMLInputElement, TerminalWidgetProps>((props, ref) => {
		const { children, className, prompt, output, ...rest } = props

		const Prompt = usePrompt(prompt)
		const inputRef = useForwardedRef(ref)

		useEffect(() => {
			if (inputRef.current) {
				inputRef.current.focus()
			}
		}, [inputRef])
		return (
			<TerminalWidgetContext.Provider value={{ ...rest, output, Prompt, inputRef }}>
				<div className={className}>
					{children || (
						<>
							<TerminalOutputArea />
							<TerminalPromptArea />
						</>
					)}
				</div>
			</TerminalWidgetContext.Provider>
		)
	})
)

export function usePrompt(Prompt: PromptNode) {
	return useCallback(
		({ children }: PromptNodeProps) => {
			if (typeof Prompt === 'string') {
				return (
					<div>
						<span>{Prompt}</span>
						{children || <TerminalInput />}
					</div>
				)
			}
			return <Prompt>{children || <TerminalInput />}</Prompt>
		},
		[Prompt]
	)
}

export interface TerminalOutputAreaProps {
	className?: string
	children?: ReactNode | ((bag: { output: Array<ReactNode> }) => ReactNode)
}

export function TerminalOutputArea({ className, children }: TerminalOutputAreaProps) {
	const { output } = useContext(TerminalWidgetContext)
	const resolvedChildren = typeof children === 'function' ? children({ output }) : children
	return (
		<div className={className}>{resolvedChildren || output.map((line, i) => <div key={i}>{line}</div>)}</div>
	)
}

export interface TerminalPromptAreaProps {
	className?: string | undefined
	input?: ReactNode | undefined
}

export function TerminalPromptArea({ className, input }: TerminalPromptAreaProps) {
	const { Prompt } = useContext(TerminalWidgetContext)
	return (
		<div className={className}>
			<Prompt>{input || <TerminalInput />}</Prompt>
		</div>
	)
}

export interface TerminalInputProps {
	className?: string | undefined
}

export function TerminalInput({ className }: TerminalInputProps) {
	const { inputRef, disabled, onChange, onKeyDown } = useContext(TerminalWidgetContext)

	return (
		<input
			autoComplete="off"
			onChange={onChange}
			onKeyDown={onKeyDown}
			className={className}
			ref={inputRef}
			disabled={disabled}
		/>
	)
}

export const Terminal = Object.assign(TerminalWidget, {
	Widget: TerminalWidget,
	Input: TerminalInput,
	OutputArea: TerminalOutputArea,
	PromptArea: TerminalPromptArea,
	WidgetContext: TerminalWidgetContext
})
