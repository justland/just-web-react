import type { Store, Updater } from '@just-web/states'
import { createStore } from '@just-web/states'
import { useCallback, useEffect, useState } from 'react'
import { isType } from 'type-plus'

/**
 * Use a value in the store for `useState()`.
 * @param getState a function to get the value to be used in `useState()`.
 * @param updater optional function to update the store value when the state changes
 */
export function useStore<S extends Record<any, any>, V>(
	store: Store<S>,
	getState: (s: S) => V,
	updater?: (draft: S, value: V) => ReturnType<Updater<S>>
): [value: V, setValue: (value: V | ((value: V) => V)) => void] {
	const [value, setValue] = useState(() => getState(store.get()))

	useEffect(() => store.onChange(s => setValue(getState(s))), [])

	const s = createStore<{ a: number }>({ a: 1 })
	s.set(d => {
		d.a += 1
	})
	return [
		value,
		useCallback(up => {
			if (updater) {
				store.set(s =>
					updater(
						s,
						isType<(value: V) => V>(up, u => typeof u === 'function') ? up(getState(s)) : up
					)
				)

				return setValue(getState(store.get()))
			}
			return setValue(up)
		}, [])
	]
}
