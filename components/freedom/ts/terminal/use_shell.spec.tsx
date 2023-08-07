import { useShell } from '../index.js'
import { testHook } from '../testing/test_hook.js'

describe('history', () => {
	it('provides an empty history to begin', () => {
		testHook(() => {
			const { register } = useShell()
			const { output: history } = register()
			expect(history).toEqual([])
		})
	})

	it('can specify initial text', () => {
		testHook(() => {
			const { register } = useShell({ initial: ['foo'] })
			const { output: history } = register()
			expect(history).toEqual(['foo'])
		})
	})
})
