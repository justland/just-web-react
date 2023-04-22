import { createStore, Store } from '@just-web/states'
import { FC, PropsWithChildren, useEffect, useState, VFC } from 'react'
import { useStore } from './store.js'
import { Card } from './testing/card.js'
import { StoryObj } from '@storybook/react'

function WithUpdater({
	name = 'Using updater in `useStore()`',
	store,
	children
}: PropsWithChildren<{ name?: string; store: Store<{ counter: number }> }>) {
	const [updateValue, setUpdateValue] = useState<{ count: number; value: number }>({ count: 0, value: 0 })

	const [value, setValue] = useStore(
		store,
		s => s.counter,
		(s, v) => {
			s.counter = v
			setUpdateValue(u => ({ count: u.count + 1, value: v }))
		}
	)
	console.count(`${name} render`)
	return (
		<Card>
			<p>{name}</p>
			<p>
				<code>store.get().counter</code>: {store.get().counter}
			</p>
			<p>
				<code>const [value] = useStore(...); console.log(value)</code>: {value}
			</p>
			<p>
				<code>useStore(,, updater)</code> receives: {updateValue.value} (count: {updateValue.count})
			</p>
			<button
				className="rounded bg-slate-500 p-2"
				onClick={() =>
					setValue(v => {
						console.info(`${name} onClick.setValue`, v, v + 1)
						return v + 1
					})
				}
			>
				{name} setValue
			</button>
			{children}
		</Card>
	)
}

const UseStore: FC<{ name?: string; store: Store<{ counter: number }> }> = ({
	name = 'UseStore',
	store,
	children
}) => {
	const [value, setValue] = useStore(
		store,
		s => s.counter,
		(s, v) => {
			console.info(`${name} useStore.update`, s.counter, v)
			s.counter = v
		}
	)

	console.count(`${name} render`)
	return (
		<>
			<div>
				{name} state value: {value}
			</div>
			<div>
				{name} store value: {store.get().counter}
			</div>
			<button
				onClick={() =>
					setValue(v => {
						console.info(`${name} onClick.setValue`, v, v + 1)
						return v + 1
					})
				}
			>
				{name} setValue
			</button>
			{children}
		</>
	)
}

function WithUseEffect({ store }: { store: Store<{ counter: number }> }) {
	const [value, setValue] = useStore(store, s => s.counter)
	useEffect(() => {
		store.set(s => {
			console.info('useEffect store.set:', s.counter, value)
			s.counter = value
		})
	}, [value])

	console.count('render')
	return (
		<Card>
			<p>
				<code>store.get().counter</code>: {store.get().counter}
				<p>
					This value is lack behind by one when using `setValue`, because change occurs within `useEffect()`
					and the store value is not tracked by React
				</p>
			</p>
			<p>
				<code>const [value] = useStore(...); console.log(value)</code>: {value}
			</p>
			<button className="rounded bg-slate-500 p-2" onClick={() => setValue(v => v + 1)}>
				Invoke setValue
			</button>
		</Card>
	)
}

export default {
	component: useStore
}

type Story = StoryObj<typeof useStore>

export const UpdateWithUpdater = () => <WithUpdater store={createStore({ counter: 0 })} />

export const UpdateWithUseEffect: Story = {
	decorators: [
		Story => (
			<div className="flex gap-1 flex-col">
				<Card>
					<p>
						This story shows that using <code>setValue + useEffect</code>
						the data is lag behind.
					</p>
					<p>
						That is why using the <code>updater</code> inside <code>useStore(,,updater)</code>
						is the better way to go
					</p>
				</Card>
				<Story />
			</div>
		)
	],
	render: () => <WithUseEffect store={createStore({ counter: 0 })} />
}

const Child = ({ store }: { store: Store<{ counter: number }> }) => {
	const [value, setValue] = useStore(
		store,
		s => s.counter,
		(s, v) => {
			s.counter = v
		}
	)
	console.count('re-render child')

	return (
		<>
			<div>child.value: {value}</div>
			<div>child.store: {store.get().counter}</div>
			<button
				onClick={() =>
					setValue(v => {
						console.info('child.setValue', v, '->', v + 1)
						return v + 1
					})
				}
			>
				child increment
			</button>
		</>
	)
}
const Parent = ({ store }: { store: Store<{ counter: number }> }) => {
	const [value, setValue] = useStore(
		store,
		s => s.counter,
		(s, v) => {
			s.counter = v
		}
	)
	console.count('re-render parent')

	const [timer, setTimer] = useState(false)
	const [timerId, setTimerId] = useState<any>()
	useEffect(() => {
		if (timer) {
			setTimerId(
				setInterval(
					() =>
						store.set(s => {
							s.counter = s.counter + 1
						}),
					1000
				)
			)
		} else {
			clearInterval(timerId)
		}
		return () => clearInterval(timerId)
	}, [timer])

	return (
		<>
			<button onClick={() => setTimer(v => !v)}>{timer ? 'stop store update' : 'start store update'}</button>
			<div>parent.value: {value}</div>
			<div>parent.store: {store.get().counter}</div>
			<button
				onClick={() =>
					setValue(v => {
						console.info('parent.setValue', v, '->', v + 1)
						return v + 1
					})
				}
			>
				parent increment
			</button>
			<Child store={store} />
		</>
	)
}

export const ParentChild_1 = () => {
	return <Parent store={createStore({ counter: 0 })} />
}
const ToggleStoreUpdate = ({ store }: { store: Store<{ counter: number }> }) => {
	const [timer, setTimer] = useState(false)
	// const [timerId, setTimerId] = useState<any>()
	useEffect(() => {
		if (timer) {
			const id = setInterval(
				() =>
					store.set(s => {
						console.info(`timer store.set:`, s.counter, s.counter + 1)
						s.counter = s.counter + 1
					}),
				1000
			)
			return () => clearInterval(id)
		}
	}, [timer])
	return (
		<div>
			<button onClick={() => setTimer(v => !v)}>{timer ? 'stop store update' : 'start store update'}</button>
		</div>
	)
}
export const ParentChild_2 = () => {
	const store = createStore({ counter: 0 })
	return (
		<>
			<UseStore name="parent" store={store}>
				<UseStore name="child" store={store} />
			</UseStore>
			<ToggleStoreUpdate store={store} />
		</>
	)
}

export const StoreChangeTriggerRender = () => {
	const store = createStore({ counter: 0 })
	const values: number[] = []
	const Counter = () => {
		const [value] = useStore(store, s => s.counter)
		values.push(value)
		return (
			<>
				<div>{value}</div>
				<div id="values">{values}</div>
			</>
		)
	}

	useEffect(() => {
		const id = setInterval(
			() =>
				store.set(s => {
					s.counter++
				}),
			300
		)
		return () => clearInterval(id)
	}, [])
	return <Counter />
}
