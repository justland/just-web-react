import { render } from '@testing-library/react'

export function testHook(fn: () => unknown) {
	const Wrapper = () => (fn(), (<></>))
	render(<Wrapper />)
}
