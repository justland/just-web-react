import { createStore } from '@just-web/states'
import { act, create } from 'react-test-renderer'
import { expect, test } from 'vitest'
import { useStore } from './index.js'

test('store change with same value will not trigger render', async () => {
	const store = createStore({ counter: 0 })

	const values: number[] = []
	const Counter = () => {
		const [value] = useStore(store, s => s.counter)
		values.push(value)
		return (
			<>
				<div>{value}</div>
			</>
		)
	}

	create(<Counter />)

	act(() => store.update(s => s))

	expect(values).toEqual([0])
})
