import { a } from 'assertron'
import { create } from 'react-test-renderer'
import { useAppContext } from './index.js'

describe(`${useAppContext.name}()`, () => {
	it('throws if AppContext.Provider does not exist in DOM tree', () => {
		const Comp = () => {
			a.throws(
				() => useAppContext(),
				err => err.message === 'AppContext.Provider must be used before using useAppContext()'
			)
			return <></>
		}
		create(<Comp />)
	})
})
