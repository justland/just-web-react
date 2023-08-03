import { PropsWithChildren, createContext } from 'react'

export function TerminalContainer({ children }: PropsWithChildren<Record<string, unknown>>) {
	return <TerminalProvider>{children}</TerminalProvider>
}

const TerminalContext = createContext(undefined)

export function TerminalProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
	return <TerminalContext.Provider value={undefined}>{children}</TerminalContext.Provider>
}

export function TerminalHeader() {}

export function TerminalBody() {}

export function TerminalFooter() {}

export const Terminal = Object.assign(TerminalContainer, {})
