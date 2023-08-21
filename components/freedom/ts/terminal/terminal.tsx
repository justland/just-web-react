import {
	createContext,
	forwardRef,
	memo,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type ChangeEventHandler,
	type Dispatch,
	type HTMLAttributes,
	type JSXElementConstructor,
	type KeyboardEvent,
	type ReactNode,
	type RefObject,
	type SetStateAction
} from 'react'
import { useForwardedRef } from '../utils/use_forwarded_ref.js'

export interface PromptNodeProps {
	/**
	 * Children of the prompt is either the `<TerminalInput>`,
	 * or `ReactNode` when the prompt is used in the output.
	 */
	children?: ReactNode | undefined
	className?: string | undefined
	style?: HTMLAttributes<HTMLElement>['style']
}

export type PromptNode = string | JSXElementConstructor<PromptNodeProps>

export type TerminalWidgetContextProps = {
	disabled?: boolean
	inputRef: RefObject<HTMLInputElement>
	output: Array<ReactNode>
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined
	onKeyDown?: ((event: KeyboardEvent<HTMLInputElement>) => void | Promise<void>) | undefined
	Prompt: JSXElementConstructor<PromptNodeProps>
	processing: boolean
	setProcessing: Dispatch<SetStateAction<boolean>>
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
	 *
	 */
	disabled?: boolean
	/**
	 * Event handler for the termanal input's `onChange` event.
	 */
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined
	/**
	 * Event handler for the termanal input's `onKeyDown` event.
	 */
	onKeyDown?: ((event: KeyboardEvent<HTMLInputElement>) => void | Promise<void>) | undefined
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
		const [processing, setProcessing] = useState(false)

		return (
			<TerminalWidgetContext.Provider
				value={{ ...rest, output, Prompt, inputRef, processing, setProcessing }}
			>
				<TerminalWidgetContainer className={className}>{children}</TerminalWidgetContainer>
			</TerminalWidgetContext.Provider>
		)
	})
)

interface TerminalWidgetContainerProps {
	children?: ReactNode | undefined
	className?: string | undefined
}

function TerminalWidgetContainer({ children, className }: TerminalWidgetContainerProps) {
	const { output } = useContext(TerminalWidgetContext)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight
		}
	}, [containerRef, output])

	return (
		<div className={className} ref={containerRef}>
			{children || (
				<>
					<TerminalOutputArea />
					<TerminalPromptArea />
				</>
			)}
		</div>
	)
}

export function usePrompt(Prompt: PromptNode) {
	if (typeof Prompt === 'string') {
		return useCallback(
			({ children, ...rest }: PromptNodeProps) => {
				return (
					<div {...rest}>
						<span>{Prompt}</span>
						{children}
					</div>
				)
			},
			[Prompt]
		)
	}
	return useCallback(({ children }: PromptNodeProps) => <Prompt>{children}</Prompt>, [])
}

export interface TerminalOutputAreaProps {
	className?: string
	children?: ReactNode | ((bag: { output: Array<ReactNode> }) => ReactNode)
}

export function TerminalOutputArea({ className, children }: TerminalOutputAreaProps) {
	const { output } = useContext(TerminalWidgetContext)
	const resolvedChildren = typeof children === 'function' ? children({ output }) : children
	return (
		<div className={className} role="log" aria-label="Terminal output">
			{resolvedChildren || output.map((line, i) => <div key={i}>{line}</div>)}
		</div>
	)
}

export interface TerminalPromptAreaProps {
	className?: string | undefined
	input?: ReactNode | undefined
}

export function TerminalPromptArea({ className, input }: TerminalPromptAreaProps) {
	const { Prompt, processing } = useContext(TerminalWidgetContext)
	const style = processing ? { display: 'none' } : undefined

	return (
		<Prompt className={className} style={style}>
			{input || <TerminalInput />}
		</Prompt>
	)
}

export interface TerminalInputProps {
	className?: string | undefined
}

export function TerminalInput({ className }: TerminalInputProps) {
	const { inputRef, disabled, processing, onChange, onKeyDown, setProcessing } =
		useContext(TerminalWidgetContext)

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [inputRef, processing])

	return (
		<input
			aria-label="Terminal input"
			autoComplete="off"
			onChange={onChange}
			onKeyDown={async e => {
				if (onKeyDown) {
					setProcessing(true)
					await onKeyDown(e)
					setProcessing(false)
				}
			}}
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
