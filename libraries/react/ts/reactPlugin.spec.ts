import { createTestApp } from '@just-web/app'
import { createStore } from '@just-web/states'
import { createContext } from 'react'
import reactPlugin, { createStoreContext } from './index.js'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

describe('reactPlugin', () => {
  describe('providers', () => {
    it('can register StorContextProvider', () => {
      const { react } = setupPluginTest()
      const SC = createStoreContext<{ a: string }>()
      react.providers.register(SC.Provider, { value: createStore({ a: '1' }) })
    })
    it('can register ReactContextProvider', () => {
      const { react } = setupPluginTest()
      const RC = createContext<{ a: string }>({ a: '1' })
      react.providers.register(RC.Provider, { value: { a: '1' } })
    })
    it('can register tanstack react query provider', () => {
      const { react } = setupPluginTest()
      react.providers.register(QueryClientProvider, { client: new QueryClient() })
    })
  })
})

function setupPluginTest() {
  return createTestApp().extend(reactPlugin())
}
