import { definePlugin, PluginContext } from '@just-web/types'
import type { JSXElementConstructor, ReactNode } from 'react'

const reactPlugin = definePlugin(() => ({
  name: '@just-web/react',
  init: () => {
    const components: Array<JSXElementConstructor<{ children: ReactNode }>> = []
    return [
      {
        react: {
          providers: {
            register(Component: JSXElementConstructor<{ children: ReactNode }>) {
              components.push(Component)
            },
            entries(): Iterable<JSXElementConstructor<{ children: ReactNode }>> {
              return {
                *[Symbol.iterator]() {
                  for (let i = 0; i < components.length; i++) {
                    yield components[i]
                  }
                  return components.length
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

export default reactPlugin
