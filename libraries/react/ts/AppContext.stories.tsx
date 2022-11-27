import { createApp, createTestApp } from '@just-web/app'
import { LogContext, TestLogContext } from '@just-web/log'
import osPlugin, { OSContext } from '@just-web/os'
import { AppContext, useAppContext } from './AppContext.js'

export default {
  component: AppContext
}

const LogChild = () => {
  const c = useAppContext<LogContext>()
  return <div>Keys in `ctx.log``: {Object.keys(c.log).join(', ')}</div>
}

export const GetContext = () => {
  const app = createApp({ name: 'app' })
  return <AppContext.Provider value={app}>
    <LogChild />
  </AppContext.Provider>
}

GetContext.parameters = {
  visual: false
}

const DefaultType = () => {
  const c = useAppContext()
  return <div>
    <p>App name: {c.name}</p>
    <p>App id: {c.id}</p>
    <p>has log context: {c.log ? 'true' : 'false'}</p>
  </div>
}

export const DefaultTypeToAppBaseContext = () => {
  const app = createApp({ name: 'app' })
  return <AppContext.Provider value={app}>
    <DefaultType />
  </AppContext.Provider>
}

const CustomType = () => {
  const c = useAppContext<OSContext>()
  return <div>
    <p>App name: {c.name}</p>
    <p>App id: {c.id}</p>
    <p>has os context: {c.os ? 'true' : 'false'}</p>
  </div>
}

export const CustomContext = () => {
  const app = createApp({ name: 'app' }).extend(osPlugin())
  return <AppContext.Provider value={app}>
    <CustomType />
  </AppContext.Provider>
}

const AddLog = () => {
  const c = useAppContext<TestLogContext>()

  return <>
    <div>Number of logs: {c.log.reporter.logs.length}</div>
    <button onClick={() => c.log.info('write another log')}>Write log will not trigger render</button>
  </>
}

export const ModifyingAppState = () => {
  const app = createTestApp()
  return <AppContext.Provider value={app}>
    <AddLog />
  </AppContext.Provider>
}