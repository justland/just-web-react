import { Store } from '@just-web/states'
import { definePlugin, PluginContext } from '@just-web/types'
import { Context } from 'react'

export const reactPlugin = definePlugin(() => ({
  name: '@just-web/react',
  init: () => {
    const reactContexts: Array<{ Context: Context<any>; init: any }> = []

    return [
      {
        react: {
          storeContexts: {
            register<T>(context: Context<Store<T>>, init: T) {
              reactContexts.push({ Context: context, init })
            },
            entries(): Iterable<{ Context: Context<any>; init: any }> {
              return {
                *[Symbol.iterator]() {
                  for (let i = 0; i < reactContexts.length; i++) {
                    yield reactContexts[i]
                  }
                  return reactContexts.length
                }
              }
            }
          }
        }
      }
    ]
  }
}))

export type ReactPluginContext = PluginContext<typeof reactPlugin>
