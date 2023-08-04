import { createContext, type PropsWithChildren } from 'react'
import type { AnyFunction } from 'type-plus'

export interface TerminalContainerProps
	extends PropsWithChildren<{
		commands: Record<string | symbol, string | JSX.Element | AnyFunction>
	}> {}

export function TerminalContainer({ children }: PropsWithChildren<Record<string, unknown>>) {
	return <TerminalProvider>{children}</TerminalProvider>
}

const TerminalContext = createContext(undefined)

export function TerminalProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
	return <TerminalContext.Provider value={undefined}>{children}</TerminalContext.Provider>
}

export function TerminalHeader() {}

export interface TerminalBodyProps
	extends PropsWithChildren<{
		className?: string
	}> {}

export function TerminalBody({ children, className }: TerminalBodyProps) {
	return <div className={className}>{children}</div>
}

export interface TerminalLineProps
	extends PropsWithChildren<{
		className?: string
	}> {}

export function TerminalLine({ children, className }: TerminalLineProps) {
	return <code className={className}>{children}</code>
}

export interface TerminalInputProps
	extends PropsWithChildren<{
		className?: string
	}> {}

export function TerminalInput({ children, className }: TerminalInputProps) {
	return <code className={className}>{children}</code>
}

export function TerminalFooter() {}

export const Terminal = Object.assign(TerminalContainer, {
	Header: TerminalHeader,
	Body: TerminalBody,
	Line: TerminalLine,
	Input: TerminalInput,
	Footer: TerminalFooter
})
