import { a } from 'assertron'
import { create } from 'react-test-renderer'
import { useJustAppContext } from './index.js'

it('throws if AppContext.Provider does not exist in DOM tree', () => {
	const Comp = () => {
		a.throws(
			() => useJustAppContext(),
			err => err.message === 'A JustApp context provider must be used before using useJustAppContext()'
		)
		return <></>
	}
	create(<Comp />)
})

