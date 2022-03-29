
export interface Command {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   */
  id: string,
  description: string,
  handler(): void
}

export interface KeyBinding {
  id: string,
  key?: string,
  mac?: string,
  when?: string
}
