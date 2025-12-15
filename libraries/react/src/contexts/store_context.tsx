import type { Store } from '@just-web/states'
import { createContext } from 'react'

/**
 * Creates a `Store<T>`context to be used in `useStoreContext()`
 * @type T Type of the store value.
 */
export function createStoreContext<T extends Record<any, any>>() {
	return createContext<Store<T>>(undefined as any)
}
