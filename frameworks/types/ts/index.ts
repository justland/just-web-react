// import { AsyncContext } from 'async-fp'

// May not need.
// Core framework module maybe able to use the same PluginModule type
// export type FrameworkModule = {
//   extendContext: AsyncContext.Transformer<any, any>,
//   start<StartContext extends Record<string | symbol, any>>(context: StartContext): Promise<void>
// }

export namespace PluginModule {
  /**
   * `initialize()` function gets the `context` it needs from the application,
   * and returns two things:
   *
   * `PluginContext` which will be added to the application instance.
   * `StartContext` which will be passed to the `start()` function if present.
   *
   * These types are inferred automatically so you don't need to specify them explicitly.
   */
  export type initialize<
    in NeedContext extends Record<string | symbol, any>,
    out PluginContext extends Record<string | symbol, any>,
    out StartContext extends Record<string | symbol, any>
    > = (context: NeedContext) => Promise<[PluginContext?, StartContext?]>
  export type start<
    in StartContext extends Record<string | symbol, any>
    > = (context: StartContext) => Promise<void>
}

/**
 * Helper to define the `initialize()` function.
 *
 * `initialize()` function gets the `context` it needs from the application,
 * and returns two things:
 *
 * `PluginContext` which will be added to the application instance.
 * `StartContext` which will be passed to the `start()` function if present.
 *
 * These types are inferred automatically so you don't need to specify them explicitly.
 */
export function defineInitialize<
  NeedContext extends Record<string | symbol, any>,
  PluginContext extends Record<string | symbol, any>,
  StartContext extends Record<string | symbol, any>
>(initialize: PluginModule.initialize<NeedContext, PluginContext, StartContext>) {
  return initialize
}

export function defineStart<
  StartContext extends Record<string | symbol, any>
>(start: PluginModule.start<StartContext>) {
  return start
}
