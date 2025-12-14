import { expect, it } from 'vitest'
import { CommandPalette, reactCommandsGizmo } from './index.js'

it('exports CommandPalette', () => {
	expect(CommandPalette).toBeDefined()
})

it('exports reactCommandsGizmo', () => {
	expect(reactCommandsGizmo).toBeDefined()
})
