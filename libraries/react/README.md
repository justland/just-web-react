# @just-web/react <!-- omit in toc -->

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/react] provides the features needed to use [just-web] app with [React].

## Install <!-- omit in toc -->

```sh
# npm
npm install @just-web/react

# yarn
yarn add @just-web/react

# pnpm
pnpm install @just-web/react

#rush
rush add -p @just-web/react
```

## Usage

We will be focusing on how to use [just-web] app with [React] here.

If you want to know more about [just-web] app, you can check out the documentation of [@just-web/app].

Following the example from [@just-web/app],
let's make the sing-along app into a [React] app.

Let's start with a simple example: a SPA.

To create a [React] SPA, you need two things from [@just-web/react]:

- `<JustAppProvider/>`: the [React] context provider for `JustApp`.
- `useJustAppContext()`: the [React] context hook to get the `JustApp` instance.

```tsx
import { JustAppProvider } from '@just-web/react'
import ReactDOM from 'react-dom'
import { YourComponent } from './your_component'
import { singAlongApp } from './sing_along_app'

void (async () => {
  const app = await singAlongApp.with(reactGizmo).create()

  ReactDOM.render(
    <JustAppProvider value={app}>
      <YourComponent />
    </JustAppProvider>,
    document.getElementById('root')
  )
})()

// your_component.tsx
import { useJustAppContext } from '@just-web/react'
import type { SingAlongApp } from './sing_along_app'

export function YourComponent() {
  const app = useJustAppContext<SingAlongApp>()

  return (
    <div>
      <MusicPlayer start={() => app.miku.sing()} />
    </div>
  )
}
```

---

For Micro Frontends (MFEs), just `JustAppProvider` and `useJustAppContext()` may not be sufficient.
Especially if you have components from different MFEs intertwined together.

In that case, you will also need:

- `createJustAppContext()`: to create a [React] context for each MFE.
- `reactGizmo`: to register the specific [React] context for each MFE.

In the example below, we have two MFEs: `miku` and `rin`.

Each of them is a MFE with its own `JustApp` instance.

They need to add `reactGizmo`, and register their own [React] context.

They are doing it differently to show two different ways of doing it.

```tsx
const MikuAppContext = createJustAppContext<MikuApp>()
const mikuApp = await singAlongApp.with(reactGizmo)
  .create(app => app.react.providers.register(({ children }) => (
    <MikuAppContext.Provider value={app}>
      {children}
    </MikuAppContext.Provider>
  )))

const RinAppContext = createJustAppContext<RinApp>()
const rinAppIncubator = singAlongApp.with(reactGizmo)
  .init(app => app.react.providers.register(({ children }) => (
    <RinAppContext.Provider value={app}>
      {children}
    </RinAppContext.Provider>
  )))
const rinApp = await rinAppIncubator.create()
```

Then, in the [React] app,
you can use the `JustAppProvider` for both `mikuApp` and `rinApp`,
and they will work together.

```ts
ReactDOM.render(
  <JustAppProvider value={mikuApp}>
    <MikuSinging />
    <JustAppProvider value={rinApp}>
      <MikuDancing />
      <RinSinging />
    </JustAppProvider>
  </JustAppProvider>,
  document.getElementById('root')
)
```

Inside your components,
you can still use `useJustAppContext()` with the `JustAppContext` you have created to get your specific app.

```tsx
import { useJustAppContext } from '@just-web/react'
import { MikuAppContext } from './miku_app'

export function MikuSinging() {
  const app = useJustAppContext(MikuAppContext)

  return (
    <div>
      <MusicPlayer start={() => app.miku.sing()} />
    </div>
  )
}
```

Alternatively, you can use `<MikuAppContext.Provider>` or `<RinAppContext.Provider>` too,
but typically there is no need to do so.
In fact, you can keep them off your package exports.

The host app only need the `mikuApp`, `rinApp`, and the `JustAppProvider` and everything will work.

## useStore

[useStore()] Allows you to use `store` from `@just-web/states`.

It is similar to `useState()` in [React],
but work on a store instead of a local state.

```tsx
import { createStore } from '@just-web/states'
import { useStore } from '@just-web/react'

const store = createStore({ counter: 0 })

const Component = () => {
  const [counter, setCounter] = useStore(
    store,
    // get which part of the store to use as state
    s => s.counter,
    // updateStore when state changes
    s=>{ s.counter = counter }
  )

  return <div>{counter}</div>
}
```

## useStoreContext

[useStore()] is useful to consume an app-level store:

```tsx
// from another file
import { store } from './store'

// or create at the module scope
const store = createStore(...)

const Component = () => {
  const [] = useStore(store, ...)
}
```

But it doesn't work well if we want to have a local store that live and die with the DOM.

In [React], that's when you can use `createContext()` and `useContext()`.

Here, we can use [createStoreContext()] and [useStoreContext()] to achieve the same thing with [Store].

And the usage is much simpler and efficient thanks to the underlying [immer] implementation.

```tsx
import { createStoreContext, useStoreContext } from '@just-web/react'
import { createStore } from '@just-web/states'

type YourStore = { counter: number }

const YourContext = createStoreContext<YourStore>() // no default value

const YourProvider = (props) => {
  const store = createStore<YourStore>({ counter: 0 })
  return <YourContext.Provider value={store} {...props}/>
}

const YourConsumer = () => {
  const [counter, setCounter] = useStoreContext(
    YourContext,
    s => s.counter,
    (s, v) => { s.counter = v }
  )

  return (
    <>
      <div>counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </>
  )
}
```

## reactGizmo

As seen in the example above,
`reactGizmo` provides a `react.providers` where you can register [React] context providers.

You can use it to add other providers to the app.

For example, i18n, theme, etc.

```tsx
import { createApp } from '@just-web/app'
import reactPlugin, { AppContextProvider } from '@just-web/react'

function YourApp() {
  const app = createApp({...}).extned(reactPlugin)
  app.react.providers.register(({ children }) => <YourProvider {...}>{children}</YourProvider>)

  return (
    <JustAppProvider value={app}>
      ...
    </JustAppProvider>
  )
}
```

The providers will be added to the app in the order they are registered,
inside the `<JustAppProvider>`.

This allows any gizmo to add their needed providers to the app,
without having the app to know about them.

[@just-web/app]: https://github.com/justland/just-web/tree/main/frameworks/app
[@just-web/react]: https://github.com/justland/just-web/tree/main/frameworks/react
[createStoreContext()]: https://github.com/justland/just-web/blob/main/libraries/react/src/store_context.ts
[downloads-image]: https://img.shields.io/npm/dm/@just-web/react.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/react
[immer]: https://www.npmjs.com/package/immer
[just-web]: https://github.com/justland/just-web
[npm-image]: https://img.shields.io/npm/v/@just-web/react.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/react
[React]: https://reactjs.org/
[Store]: https://github.com/justland/just-web/tree/main/frameworks/states/ts/store.ts
[useStore()]: https://github.com/justland/just-web/blob/main/libraries/react/src/store.ts
[useStoreContext()]: https://github.com/justland/just-web/blob/main/libraries/react/src/store_context.ts
