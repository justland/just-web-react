import { renderHook } from '@testing-library/react-hooks'
import { useShell } from '../index.js'

describe('history', () => {
	it('provides an empty history to begin', () => {
		const { result } = renderHook(() => useShell())
		const { output } = result.current.register()
		expect(output).toEqual([])
	})

	it('can specify initial text', () => {
		const { result } = renderHook(() => useShell({ initial: ['foo'] }))
		const { output } = result.current.register()
		expect(output).toEqual(['foo'])
	})
})
