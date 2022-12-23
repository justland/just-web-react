import { definePlugin, PluginContext } from '@just-web/types'
import type { ComponentProps, JSXElementConstructor } from 'react'

const reactPlugin = definePlugin(() => ({
  name: '@just-web/react',
  init: () => {
    const providers: Array<{
      Provider: JSXElementConstructor<any> | keyof JSX.IntrinsicElements
      props: Record<string, unknown>
    }> = []
    return [
      {
        react: {
          providers: {
            register<T extends JSXElementConstructor<any> | keyof JSX.IntrinsicElements>(
              Provider: T,
              props: Omit<ComponentProps<T>, 'children'>
            ) {
              providers.push({ Provider, props })
            },
            entries(): Iterable<{
              Provider: JSXElementConstructor<any> | keyof JSX.IntrinsicElements
              props: Record<string, unknown>
            }> {
              return {
                *[Symbol.iterator]() {
                  for (let i = 0; i < providers.length; i++) {
                    yield providers[i]
                  }
                  return providers.length
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
