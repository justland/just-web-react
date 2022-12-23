import type { LogContext } from '@just-web/log'
import type { AppBaseContext } from '@just-web/types'
import { createContext, ReactNode, useContext } from 'react'
import type { ReactPluginContext } from './reactPlugin.js'

const AppContext = createContext<AppBaseContext & LogContext>(undefined as any)

/**
 * AppContext provider.
 * It injects the application to the DOM scope to share accross plugins and components.
 *
 * If your app is a MFE (micro-app) or using plugin that works in MFE,
 * you need to add this to the root of your application DOM so that the plugin can access to the app and features.
 *
 * While in non-MFE application you can rely on global scope or module scope to share state/app,
 * it is recommend to use this so that you can use any plugin that relies on `AppContextProvider` as needed.
 */
export function AppContextProvider<A extends AppBaseContext & LogContext & Partial<ReactPluginContext>>({
  value,
  children
}: {
  value: A
  children: ReactNode
}) {
  const providers = Array.from(value.react?.providers.entries() ?? [])
  return (
    <AppContext.Provider value={value}>
      {providers.reduce((children, Component) => {
        return <Component>{children}</Component>
      }, children)}
    </AppContext.Provider>
  )
}
/**
 * Use the app from `AppContext`.
 *
 * It returns the app instance stored in the DOM scope from `AppContext.Provider`.
 * @type C The app Context you are interested in.
 * This type allow you to specify the context type you are interested in.
 *
 * The consuming code is usually a component in a plugin.
 * You should specify only the type you need as in ISP.
 *
 * It does not perform additional check so it is possible that you get `undefined` error,
 * If the app did not load the plugin you need.
 */
export function useAppContext<C extends Record<string | symbol, any> = AppBaseContext & LogContext>(): C &
  AppBaseContext &
  LogContext {
  const app = useContext(AppContext) as unknown as C & AppBaseContext & LogContext
  if (!app) {
    throw new Error('AppContext.Provider must be used before using useAppContext()')
  }
  return app
}
