# @just-web/react

## 9.0.0

### Major Changes

- 4406716: Rename `entries()` to `values()`.

  It was not consistent with `Array.entries()`.

### Patch Changes

- 4406716: Update `@just-web` and `type-plus`

## 8.0.0

### Major Changes

- b5965ae: Remove `reactPlugin`, `lazyImport`, `AppContextProvider` and `useAppContext` from `@just-web/react` package.

  `reactPlugin` is replaced by `reactGizmo`,
  `AppContextProvider` and `useAppContext` are replaced by `JustAppProvider`,
  `useJustAppContext` and `createJustAppContext`.

  They work in MFE environment where you will have multiple apps on the same page.

### Minor Changes

- 43a02a6: Add `justAppProvider`, `createJustAppContext()`, and `useJustAppContext()`.
- c352f6b: Add `useJustTestAppContext()`
  Add `JustReactTestApp` type

  migrate `NoRenderWhenModifyState` story

### Patch Changes

- 4afc511: Relax the generic type of `JustAppProvider<App>` and `useJustAppContext<App>()`
  from `JustReactApp` to `JustApp`.

  This allows you to use the `JustAppProvider` and `useJustAppContext` without using `reactGizmo`.

  Rename `JustAppProvider` props from `app` to `value`.
  This make it consistent with the `React.Context.Provider` props.

- 98ab7ec: Update type-plus

## 7.0.0

### Major Changes

- a5b8d4b: replace `storeContexts` with `providers`.

  Providers allows plugin to add any react providers to the app.

## 6.0.3

### Patch Changes

- b8c5e73: Update peer deps

## 6.0.2

### Patch Changes

- ac35820: Fix `exports` fields.
  `types` should go first,
  `default` should go last, and point to CJS code.

  Also added `main` and `module` to improve compatibility.

- e2d1489: Update just-web. While it is a major version bump, it doesn't break anything in this package.

## 6.0.1

### Patch Changes

- a951c8f: Adjust exports field order.
  And set `default` to cjs.

## 6.0.0

### Major Changes

- 694069a: Add `AppContextProvider` and `reactPlugin`.

  The `AppContextProvider` replaces `AppContext.Provider`,
  and it will work with `reactPlugin` and creates providers for any registered store contexts.

  ```ts
  const FeatureAContext = createStoreContext<{ a: number }>()
  const FeatureBContext = createStoreContext<{ b: number }>()

  const FeatureA = () => {
  	const [a] = useStoreContext(FeatureAContext, s => s.a)
  	return <div>Feature A: {a}</div>
  }

  const FeatureB = () => {
  	const [b] = useStoreContext(FeatureBContext, s => s.b)
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

## 5.0.1

### Patch Changes

- b8337bb: Update dependencies.

  Moving some used dependencies to normal `dependencies`,
  while keeping thme in `peerDependencies`.

  They are `@just-web` plugins which should be installed by the app,
  so they should remain as `peerDependencies`.

  Moving them from `devDependencies` to `dependencies` so that proper version bump can be done correctly.

## 5.0.0

### Major Changes

- 11e8e16: Support `ESM`.

  Update to `@just-web` 5.

### Patch Changes

- 9897bd9: Adjust `import type`

## 4.0.1

### Patch Changes

- Updated dependencies [a82e080a]
  - @just-web/app@4.0.1
  - @just-web/log@4.0.1
  - @just-web/states@4.0.1
  - @just-web/types@4.0.1

## 4.0.0

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [1e92661d]
- Updated dependencies [7b3b99c0]
- Updated dependencies [5729f2c0]
- Updated dependencies [e9e5e2f0]
- Updated dependencies [9b004db7]
  - @just-web/app@4.0.0
  - @just-web/log@4.0.0
  - @just-web/types@4.0.0
  - @just-web/states@4.0.0

## 3.1.1

### Patch Changes

- @just-web/app@3.1.1
- @just-web/log@3.1.1
- @just-web/states@3.1.1
- @just-web/types@3.1.1

## 3.1.0

### Minor Changes

- 4cf08aff: Add `AppContext` and `useAppContext()`.

  It should be used in most cases,
  either you are writing MFE or not.

### Patch Changes

- Updated dependencies [3be5a2a2]
- Updated dependencies [ca54af50]
- Updated dependencies [085a2d1e]
  - @just-web/types@3.1.0
  - @just-web/log@3.1.0
  - @just-web/app@3.1.0
  - @just-web/states@3.1.0

## 3.0.0

### Patch Changes

- 54c4842: Fix `useStore()` to work on all cases
  Now the store and state are updated at the same time.
  The `useEffect()` case is still lagged behind, but that should be as expected.
- 7180f82: Update `type-plus` to 4.13.2.
- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

- Updated dependencies [7180f82]
- Updated dependencies [f2f1a69]
- Updated dependencies [0ff86d0]
- Updated dependencies [0c21f10]
  - @just-web/app@3.0.0
  - @just-web/log@3.0.0
  - @just-web/types@3.0.0
  - @just-web/states@3.0.0

## 2.1.2

### Patch Changes

- deceff5: Export `createStoreContext()` and `useStoreContext()`.

## 2.1.1

### Patch Changes

- 372ab7e: `@just-web/app`: starts newly added plugin when calling `start()` again.
  `@just-web/react`: fix `lazyImport()` to start the plugin correctly.

  The signature of `lazyImport()` changed.
  But since this is so new, keep it as a patch.

- Updated dependencies [3905f21]
- Updated dependencies [372ab7e]
  - @just-web/app@2.0.1
  - @just-web/log@2.0.1
  - @just-web/states@2.0.1
  - @just-web/types@2.0.1

## 2.1.0

### Minor Changes

- 4b05ca8: Add `createStoreContext()` and `useStoreContext()`

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
- Updated dependencies [8d9a1b9]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0
  - @just-web/app@2.0.0
  - @just-web/states@2.0.0

## 2.0.4

### Patch Changes

- @just-web/app@1.1.1
- @just-web/log@1.1.1
- @just-web/states@1.1.1
- @just-web/types@1.1.1

## 2.0.3

### Patch Changes

- @just-web/app@1.1.0
- @just-web/log@1.1.0
- @just-web/states@1.1.0
- @just-web/types@1.1.0

## 2.0.2

### Patch Changes

- @just-web/app@1.0.2
- @just-web/log@1.0.2
- @just-web/states@1.0.2
- @just-web/types@1.0.2

## 2.0.1

### Patch Changes

- Updated dependencies [9853c63]
  - @just-web/app@1.0.1
  - @just-web/log@1.0.1
  - @just-web/states@1.0.1
  - @just-web/types@1.0.1

## 2.0.0

### Patch Changes

- 564addf: Upgrade type-plus to 4.13.1

  Update `init()` and `start()` logs.

  Code comments are not kept so it that JSDocs will be available

- Updated dependencies [8c3183e]
- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/app@1.0.0
  - @just-web/log@1.0.0
  - @just-web/states@1.0.0
  - @just-web/types@1.0.0

## 1.0.7

### Patch Changes

- @just-web/app@0.2.7

## 1.0.6

### Patch Changes

- @just-web/app@0.2.6

## 1.0.5

### Patch Changes

- Updated dependencies [d3e0770]
  - @just-web/app@0.2.5

## 1.0.4

### Patch Changes

- @just-web/app@0.2.4

## 1.0.3

### Patch Changes

- Updated dependencies [88ee900]
  - @just-web/app@0.2.3

## 1.0.2

### Patch Changes

- Updated dependencies [8b3eee7]
  - @just-web/app@0.2.2

## 1.0.1

### Patch Changes

- e8671c1: Rename `logContext` to `log` to match other props in the application.

  Update deps to fix bundling.
  `play-react` is not working again.

- Updated dependencies [e8671c1]
  - @just-web/app@0.2.1

## 1.0.0

### Minor Changes

- b056a08: Add micro-app support

### Patch Changes

- Updated dependencies [b056a08]
  - @just-web/app@0.2.0

## 0.1.1

### Patch Changes

- f2a3e89: Upgrade `iso-error` and `type-plus`.
  Downgrade package to ES2019 to better support webpack4 and older storybook environment.
- Updated dependencies [f2a3e89]
  - @just-web/app@0.1.1
