import { createStore } from '@just-web/states'
import type { PropsWithChildren } from 'react'
import Modal from 'react-modal'
import { createStoreContext, useStoreContext } from './index.js'
import { Card } from './testing/card.js'

export default {
	component: useStoreContext
}

// https://leewarrick.com/blog/the-problem-with-context/
const CounterContext = createStoreContext<{ counter: number; message: string }>()

export const UseContext = () => {
	const store = createStore({ counter: 0, message: 'hello from context inside' })
	return (
		<CounterContext.Provider value={store}>
			<div className="flex flex-col gap-1">
				<h2>No renders! 😆</h2>
				<p>If there is render, the message below will change color</p>
				<Message />
				<Message />
				<Message />
				<CounterDisplay />
				<CounterIncrement />
			</div>
		</CounterContext.Provider>
	)
}

function CounterDisplay() {
	const [counter] = useStoreContext(CounterContext, s => s.counter)
	return <Card>Counter Display component: {counter}</Card>
}

function CounterIncrement() {
	const [counter, setValue] = useStoreContext(
		CounterContext,
		s => s.counter,
		(s, v) => {
			s.counter = v
		}
	)
	return (
		<Card>
			<div>counter value within increment component: {counter}</div>
			<button className="button" onClick={() => setValue(counter + 1)}>
				Invoke setValue
			</button>
		</Card>
	)
}

function Message() {
	const [message] = useStoreContext(CounterContext, s => s.message)
	// the text will render to a random color for
	// each instance of the Message component
	const getColor = () => Math.floor(Math.random() * 255)
	const style = {
		color: `rgb(${getColor()},${getColor()},${getColor()})`
	}
	return (
		<div>
			<h4 style={style}>{message}</h4>
		</div>
	)
}

export const SelfContainedModal = () => {
	return (
		<ModalApp>
			<SomeModal />
		</ModalApp>
	)
}

const ModalContext = createStoreContext<{ showModal: boolean }>()

function ModalApp(props: PropsWithChildren<Record<string, unknown>>) {
	const store = createStore({ showModal: false })
	return <ModalContext.Provider value={store} {...props} />
}

function SomeModal() {
	const [showModal, setShowModal] = useStoreContext(
		ModalContext,
		s => s.showModal,
		(s, v) => {
			s.showModal = v
		}
	)
	return (
		<>
			<div>
				After opening the modal, move away to another story. When you come back, the modal is no longer
				opened.
			</div>
			<button className="button" onClick={() => setShowModal(true)}>
				open modal
			</button>
			<Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
				<div>I am a modal</div>
			</Modal>
		</>
	)
}
