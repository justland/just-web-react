
import type { LogContext } from '@just-web/log'
import type { Registry, WithAdder } from '@just-web/states'
import { createRegistry, withAdder } from '@just-web/states'
import { sentenceCase } from 'sentence-case'
import { record } from 'type-plus'

export type CommandContribution = {
  /**
   * The command id. e.g. `just-web.showCommandPalette`
   */
  command: string,
  /**
   * Name of the command such as `Show command palette`.
   * If not specified,
   * it is default to Sentence Case of the second part of the `id`.
   */
  name?: string,
  /**
   * Detail description about the command.
   * It will support some formatting such as markdown,
   * but not confirmed yet.
   */
  description?: string,
  /**
   * By default, all commands will be available to the command palette.
   * Set this to false to prevent it from appearing in the command palette.
   */
  commandPalette?: false,
  /**
   * Category can be used by the UI to group or filter the command.
   */
  category?: string,

  icon?: {
    light: string,
    /**
     * If not specified, the `light` icon will be used.
     */
    dark?: string
  },
  // ? no use case yet
  // enabled?: boolean,
  // when?: string,
}

export interface CommandContributionRegistry
  extends Registry<string, CommandContribution>, WithAdder<CommandContribution> { }

export namespace commandContributionRegistry {
  export type Context = LogContext

  export type Options = Array<CommandContribution>
}

export function commandContributionRegistry(
  ctx: commandContributionRegistry.Context,
  options?: commandContributionRegistry.Options,
): CommandContributionRegistry {
  return withAdder(
    createRegistry<string, CommandContribution>(getInitRecord(options)),
    function (r, cmd) {
      const key = cmd.command
      const log = ctx.log.getLogger('@just-web/contributions')
      if (r[key]) return log.error(`Registering a duplicate command contribution, ignored: ${key}`)
      r[key] = cmd
    })
}

function getInitRecord(options?: commandContributionRegistry.Options) {
  return (options ?? []).reduce((p, c) => {
    p[c.command] = c
    return p
  }, record<string, CommandContribution>())
}

export function formatCommand(cmd: CommandContribution) {
  return {
    command: cmd.command,
    name: cmd.name ?? generateName(cmd.command),
    description: cmd.description
  }
}

function generateName(command: string) {
  const i = command.indexOf('.')
  return sentenceCase(command.slice(i))
}