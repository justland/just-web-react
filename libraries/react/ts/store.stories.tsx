import { createStore, type Store } from '@just-web/states'
import type { StoryObj } from '@storybook/react'
import { useEffect, useState, type PropsWithChildren } from 'react'
import { useStore } from './store.js'
import { Card } from './testing/card.js'

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
			<button className="button" onClick={() => setValue(v => v + 1)}>
				Invoke setValue
			</button>
		</Card>
	)
}

export const ParentVsChild = () => {
	return <Parent store={createStore({ counter: 0 })} />
}

export const UpdateFromSibling = () => {
	const store = createStore({ counter: 0 })
	return (
		<div className="flex flex-col gap-2">
			<WithUpdater name="parent" store={store}>
				<WithUpdater name="child" store={store} />
			</WithUpdater>
			<Card>
				<p>Updating from sibling</p>
				<ToggleStoreUpdate store={store} />
			</Card>
		</div>
	)
}

function ToggleStoreUpdate({ store }: { store: Store<{ counter: number }> }) {
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
		<Card>
			<button className="button" onClick={() => setTimer(v => !v)}>
				{timer ? 'stop store update' : 'start store update'}
			</button>
		</Card>
	)
}

export const StoreChangeTriggersRender: Story = {
	decorators: [
		Story => (
			<div className="flex flex-col gap-2">
				<Card>
					<p>
						This story has an <code>setInterval</code> of 0.3 second in a <code>useEffect</code>
					</p>
					<p>
						It demonstrates that when the store is updated outside, the component with <code>useStore</code>{' '}
						will be re-rendered.
					</p>
				</Card>

				<Story />
			</div>
		)
	],
	render: () => {
		const store = createStore({ counter: 0 })
		const values: number[] = []

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
		return <Counter store={store} values={values} />
	}
}

function Counter({ store, values }: { store: Store<{ counter: number }>; values: number[] }) {
	const [value] = useStore(store, s => s.counter)
	values.push(value)
	return (
		<Card>
			<p>
				<code>const [value] = useStore(...); console.log(value)</code>: {value}
			</p>
			Render count:
			<div id="values">{values}</div>
		</Card>
	)
}

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
				className="button"
				onClick={() =>
					setValue(v => {
						console.info(`${name} onClick.setValue`, v, v + 1)
						return v + 1
					})
				}
			>
				invoke setValue
			</button>
			{children}
		</Card>
	)
}

function Parent({ store }: { store: Store<{ counter: number }> }) {
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
		<Card className="flex flex-col gap-1 bg-slate-300">
			<div>parent.value: {value}</div>
			<div>parent.store: {store.get().counter}</div>
			<div className="flex gap-1">
				<button className="button" onClick={() => setTimer(v => !v)}>
					{timer ? 'stop store update' : 'start store update'}
				</button>
				<button
					className="button"
					onClick={() =>
						setValue(v => {
							console.info('parent.setValue', v, '->', v + 1)
							return v + 1
						})
					}
				>
					parent increment
				</button>
			</div>
			<Child store={store} />
		</Card>
	)
}

function Child({ store }: { store: Store<{ counter: number }> }) {
	const [value, setValue] = useStore(
		store,
		s => s.counter,
		(s, v) => {
			s.counter = v
		}
	)
	console.count('re-render child')

	return (
		<Card className="bg-slate-400">
			<div>child.value: {value}</div>
			<div>child.store: {store.get().counter}</div>
			<button
				className="button"
				onClick={() =>
					setValue(v => {
						console.info('child.setValue', v, '->', v + 1)
						return v + 1
					})
				}
			>
				child increment
			</button>
		</Card>
	)
}
