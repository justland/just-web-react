import { createStore, Store } from '@just-web/states'
import { Updater } from '@just-web/states'
import { useCallback, useEffect, useState } from 'react'
import { isType } from 'type-plus'

/**
 * Use a value in the store for `useState()`.
 * @param getState a function to get the value to be used in `useState()`.
 * @param updateStore optional function to update the store value when the state changes
 */
export function useStore<S extends Record<any, any>, V>(
  store: Store<S>,
  getState: (s: S) => V,
  updateStore?: (draft: S, value: V) => ReturnType<Updater<S>>
): [value: V, setValue: (value: V | ((value: V) => V)) => void] {
  const [value, setValue] = useState(() => getState(store.get()))

  useEffect(() => store.onChange((s) => setValue(getState(s))), [])

  const s = createStore<{ a: number }>({ a: 1 })
  s.set((d) => {
    d.a += 1
  })
  return [
    value,
    useCallback((updater) => {
      if (updateStore) {
        store.set((s) =>
          updateStore(
            s,
            isType<(value: V) => V>(updater, (u) => typeof u === 'function')
              ? updater(getState(s))
              : updater
          )
        )

        return setValue(getState(store.get()))
      }
      return setValue(updater)
    }, [])
  ]
}
