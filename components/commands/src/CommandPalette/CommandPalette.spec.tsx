import { justTestApp } from '@just-web/app/testing'
import { type CommandsGizmoOptions, commandsGizmoFn } from '@just-web/commands'
import { type KeyboardGizmoOptions, keyboardGizmoFn } from '@just-web/keyboard'
import { osTestGizmoFn } from '@just-web/os/testing'
import { JustAppProvider, reactGizmo } from '@just-web/react'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { CommandPalette, reactCommandsGizmo } from '../index.js'

let container: HTMLDivElement

beforeEach(() => {
	container = document.createElement('div')
	document.body.appendChild(container)
})

afterEach(() => {
	unmountComponentAtNode(container)
	container.remove()
})

async function setupApp(options: { keyboard?: KeyboardGizmoOptions; commands?: CommandsGizmoOptions }) {
	const app = await justTestApp({ name: 'test' })
		.with(keyboardGizmoFn(options.keyboard))
		.with(commandsGizmoFn(options.commands))
		.with(osTestGizmoFn({ isMac: () => false }))
		.with(reactGizmo)
		.with(reactCommandsGizmo)
		.create()
	act(() => {
		render(
			<JustAppProvider value={app}>
				<CommandPalette />
			</JustAppProvider>,
			container
		)
	})
	return app
}

function suggestions() {
	return Array.from(document.querySelectorAll('[role="option"]'))
}

it('shows the contributed commands with their key bindings when opened', async () => {
	const app = await setupApp({
		commands: {
			contributions: [
				{ id: 'core.simple' },
				{ id: 'core.keyed', name: 'Keyed' },
				{ id: 'core.hidden', commandPalette: false }
			],
			handlers: { 'core.simple': () => {}, 'core.keyed': () => {}, 'core.hidden': () => {} }
		},
		keyboard: { keyBindingContributions: [{ id: 'core.keyed', key: 'ctrl+k' }] }
	})

	expect(suggestions()).toHaveLength(0)

	await act(async () => {
		app.commands.showCommandPalette()
	})

	await vi.waitFor(() => expect(suggestions()).toHaveLength(2))
	expect(suggestions().map((s) => s.textContent)).toEqual(['core.simple', 'core.keyedctrl+k'])
})

it('invokes the selected command', async () => {
	const handler = vi.fn()
	const app = await setupApp({
		commands: { contributions: [{ id: 'core.run' }], handlers: { 'core.run': handler } }
	})

	await act(async () => {
		app.commands.showCommandPalette()
	})
	await vi.waitFor(() => expect(suggestions()).toHaveLength(1))

	await act(async () => {
		;(suggestions()[0] as HTMLElement).click()
	})
	await vi.waitFor(() => expect(handler).toHaveBeenCalled())
})
