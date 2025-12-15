import type { Store, Updater } from '@just-web/states'
import { type Context, useContext } from 'react'
import { useStore } from './use_store'

/**
 * Uses a store context.
 * @param reactContext The context created from `createStoreContext()`.
 * @param getState The function to get a particular value from the store.
 * @param updateStore Optional. The function to update the store when the returning `setValue()` is called.
 */

export function useStoreContext<S extends Record<any, any>, V>(
	reactContext: Context<Store<S>>,
	getState: (s: S) => V,
	updateStore?: (draft: S, value: V) => ReturnType<Updater<S>>,
): [value: V, setValue: (value: V | ((value: V) => V)) => void] {
	const store = useContext(reactContext)
	if (!store) {
		throw new Error('Context.Provider must be used before using useStoreContext()')
	}
	return useStore(store, getState, updateStore)
}
