import { definePlugin } from '@just-web/types'
import { CommandsContext, showCommandPalette } from '@just-web/commands'
import type { KeyboardContext } from '@just-web/keyboard'

export * from './CommandPalette/index.js'

export default definePlugin(() => ({
  name: '@just-web/react-commands',
  init: (ctx: CommandsContext & Partial<KeyboardContext>) => {
    showCommandPalette.connect(ctx)
  }
}))
