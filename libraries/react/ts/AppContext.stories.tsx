import { createApp, createTestApp } from '@just-web/app'
import { LogContext, TestLogContext } from '@just-web/log'
import osPlugin, { OSContext } from '@just-web/os'
import { createStore } from '@just-web/states'
import { definePlugin } from '@just-web/types'
import { ComponentMeta } from '@storybook/react'
import reactPlugin, {
  AppContextProvider,
  createStoreContext,
  ReactPluginContext,
  useAppContext,
  useStoreContext
} from './index.js'

export default {
  component: AppContextProvider
} as ComponentMeta<typeof AppContextProvider>

const LogChild = () => {
  const c = useAppContext<LogContext>()
  return <div>Keys in `ctx.log``: {Object.keys(c.log).join(', ')}</div>
}

export const GetContext = () => {
  const app = createApp({ name: 'app' })
  return (
    <AppContextProvider value={app}>
      <LogChild />
    </AppContextProvider>
  )
}

GetContext.parameters = {
  visual: false
}

const DefaultType = () => {
  const c = useAppContext()
  return (
    <div>
      <p>App name: {c.name}</p>
      <p>App id: {c.id}</p>
      <p>has log context: {c.log ? 'true' : 'false'}</p>
    </div>
  )
}

export const DefaultTypeToAppBaseContext = () => {
  const app = createApp({ name: 'app' })
  return (
    <AppContextProvider value={app}>
      <DefaultType />
    </AppContextProvider>
  )
}

const CustomType = () => {
  const c = useAppContext<OSContext>()
  return (
    <div>
      <p>App name: {c.name}</p>
      <p>App id: {c.id}</p>
      <p>has os context: {c.os ? 'true' : 'false'}</p>
    </div>
  )
}

export const CustomContext = () => {
  const app = createApp({ name: 'app' }).extend(osPlugin())
  return (
    <AppContextProvider value={app}>
      <CustomType />
    </AppContextProvider>
  )
}

const AddLog = () => {
  const c = useAppContext<TestLogContext>()

  return (
    <>
      <div>Number of logs: {c.log.reporter.logs.length}</div>
      <button onClick={() => c.log.info('write another log')}>Write log will not trigger render</button>
    </>
  )
}

export const ModifyingAppState = () => {
  const app = createTestApp()
  return (
    <AppContextProvider value={app}>
      <AddLog />
    </AppContextProvider>
  )
}

const FeatureAContext = createStoreContext<{ a: number }>()

const FeatureA = () => {
  const [a] = useStoreContext(FeatureAContext, (s) => s.a)
  return <div>Feature A: {a}</div>
}

const featureAPlugin = definePlugin(() => ({
  name: 'featureA',
  init: (ctx: ReactPluginContext) => {
    ctx.react.providers.register(({ children }) => (
      <FeatureAContext.Provider value={createStore({ a: 1 })}>{children}</FeatureAContext.Provider>
    ))
    return []
  }
}))

const FeatureBContext = createStoreContext<{ b: number }>()
const FeatureB = () => {
  const [b] = useStoreContext(FeatureBContext, (s) => s.b)
  return <div>Feature B: {b}</div>
}

const featureBPlugin = definePlugin(() => ({
  name: 'featureB',
  init: (ctx: ReactPluginContext) => {
    ctx.react.providers.register(({ children }) => (
      <FeatureBContext.Provider value={createStore({ b: 2 })}>{children}</FeatureBContext.Provider>
    ))
    return []
  }
}))

const FeatureButtons = () => {
  const [, setA] = useStoreContext(
    FeatureAContext,
    (s) => s.a,
    (s, v) => {
      s.a = v
    }
  )
  const [, setB] = useStoreContext(
    FeatureBContext,
    (s) => s.b,
    (s, v) => {
      s.b = v
    }
  )

  return (
    <>
      <button onClick={() => setA((v) => v + 1)}>Feature A ++</button>
      <button onClick={() => setB((v) => v + 1)}>Feature B ++</button>
    </>
  )
}

export function WithContexts() {
  const app = createTestApp().extend(reactPlugin()).extend(featureAPlugin()).extend(featureBPlugin())

  return (
    <AppContextProvider value={app}>
      <FeatureA />
      <FeatureB />
      <FeatureButtons />
    </AppContextProvider>
  )
}
