import { createTestApp } from '@just-web/app'
import { createStore } from '@just-web/states'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext } from 'react'
import reactPlugin, { createStoreContext } from './index.js'

describe('reactPlugin', () => {
	describe('providers', () => {
		it('can register StorContextProvider', () => {
			const { react } = setupPluginTest()
			const SC = createStoreContext<{ a: string }>()
			react.providers.register(({ children }) => (
				<SC.Provider value={createStore({ a: '1' })}>{children}</SC.Provider>
			))
		})
		it('can register ReactContextProvider', () => {
			const { react } = setupPluginTest()
			const RC = createContext<{ a: string }>({ a: '1' })
			react.providers.register(({ children }) => <RC.Provider value={{ a: '1' }}>{children}</RC.Provider>)
		})
		it('can register tanstack react query provider', () => {
			const { react } = setupPluginTest()
			react.providers.register(({ children }) => (
				<QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
			))
		})
	})
})

function setupPluginTest() {
	return createTestApp().extend(reactPlugin())
}
