---
'@just-web/react': major
---

Add `AppContextProvider` and `reactPlugin`.

The `AppContextProvider` replaces `AppContext.Provider`,
and it will work with `reactPlugin` and creates providers for any registered store contexts.

```ts
const FeatureAContext = createStoreContext<{ a: number }>()
const FeatureBContext = createStoreContext<{ b: number }>()

const FeatureA = () => {
  const [a] = useStoreContext(FeatureAContext, (s) => s.a)
  return <div>Feature A: {a}</div>
}

const FeatureB = () => {
  const [b] = useStoreContext(FeatureBContext, (s) => s.b)
  return <div>Feature B: {b}</div>
}

export function WithContexts() {
  const app = createTestApp().extend(reactPlugin())

  // these are normaly registered by the features in their plugins
  app.react.storeContexts.register(FeatureAContext, { a: 1 })
  app.react.storeContexts.register(FeatureBContext, { b: 2 })

  return (
    <AppContextProvider value={app}>
      <FeatureA />
      <FeatureB />
    </AppContextProvider>
  )
}
```
