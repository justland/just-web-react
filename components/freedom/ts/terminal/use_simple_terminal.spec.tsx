import { testHook } from '../testing/test_hook.js'
import { useSimpleTerminal } from './use_simple_terminal.js'

describe('history', () => {
	it('provides an empty history to begin', () => {
		testHook(() => {
			const { register } = useSimpleTerminal()
			const { history } = register()
			expect(history).toEqual([])
		})
	})

	it('can specify initial text', () => {
		testHook(() => {
			const { register } = useSimpleTerminal({ initial: ['foo'] })
			const { history } = register()
			expect(history).toEqual(['foo'])
		})
	})
})
