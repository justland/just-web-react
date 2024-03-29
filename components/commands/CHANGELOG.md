# @just-web/react-commands

## 9.0.4

### Patch Changes

- 6a0df6d: Change to use `react` instead of `react-jsx`.

  Due to this issue: https://github.com/facebook/react/issues/25857

- Updated dependencies [6a0df6d]
  - @just-web/react@9.0.4

## 9.0.3

### Patch Changes

- d0dc295: Update just-web
- ae7a462: Move just-web packages to peerDeps.
  They need to be supplied by the host application,
  thus they are peerDeps and not deps.
- Updated dependencies [d0dc295]
  - @just-web/react@9.0.3

## 9.0.2

### Patch Changes

- 8dfabf6: Update type-plus
- 389e84c: Update `just-web`
- Updated dependencies [8dfabf6]
- Updated dependencies [389e84c]
  - @just-web/react@9.0.2

## 9.0.1

### Patch Changes

- Updated dependencies [6af95aa]
  - @just-web/react@9.0.1

## 9.0.0

### Patch Changes

- 4406716: Update `@just-web` and `type-plus`
- Updated dependencies [4406716]
- Updated dependencies [4406716]
  - @just-web/react@9.0.0

## 8.0.0

### Major Changes

- 8cf4ba9: add `reactCommandsGizmo`
  remove `reactCommandsPlugin`
  Update `<CommandPalette/>` for v7

### Patch Changes

- 98ab7ec: Update type-plus
- Updated dependencies [4afc511]
- Updated dependencies [43a02a6]
- Updated dependencies [98ab7ec]
- Updated dependencies [b5965ae]
- Updated dependencies [c352f6b]
  - @just-web/react@8.0.0

## 7.0.4

### Patch Changes

- Updated dependencies [a5b8d4b]
  - @just-web/react@7.0.0

## 7.0.3

### Patch Changes

- b8c5e73: Update peer deps
- Updated dependencies [b8c5e73]
  - @just-web/react@6.0.3

## 7.0.2

### Patch Changes

- ac35820: Fix `exports` fields.
  `types` should go first,
  `default` should go last, and point to CJS code.

  Also added `main` and `module` to improve compatibility.

- e2d1489: Update just-web. While it is a major version bump, it doesn't break anything in this package.
- Updated dependencies [ac35820]
- Updated dependencies [e2d1489]
  - @just-web/react@6.0.2

## 7.0.1

### Patch Changes

- a951c8f: Adjust exports field order.
  And set `default` to cjs.
- Updated dependencies [a951c8f]
  - @just-web/react@6.0.1

## 7.0.0

### Patch Changes

- Updated dependencies [694069a]
  - @just-web/react@6.0.0

## 6.0.1

### Patch Changes

- b8337bb: Update dependencies.

  Moving some used dependencies to normal `dependencies`,
  while keeping thme in `peerDependencies`.

  They are `@just-web` plugins which should be installed by the app,
  so they should remain as `peerDependencies`.

  Moving them from `devDependencies` to `dependencies` so that proper version bump can be done correctly.

- Updated dependencies [b8337bb]
  - @just-web/react@5.0.1

## 6.0.0

### Minor Changes

- 76c5698: Connect `showCommandPalette`.
  Add ESM support

### Patch Changes

- 9897bd9: Adjust `import type`
- Updated dependencies [9897bd9]
- Updated dependencies [11e8e16]
  - @just-web/react@5.0.0

## 5.0.1

### Patch Changes

- b6249217: Internalize the `open` state.
  There is no need to use a module (or app) scope store to store this.

  Now the command is registered when the command palette first rendered.

- Updated dependencies [a82e080a]
  - @just-web/app@4.0.1
  - @just-web/react@4.0.1
  - @just-web/browser-keyboard@4.0.1
  - @just-web/commands@4.0.1
  - @just-web/keyboard@4.0.1
  - @just-web/log@4.0.1
  - @just-web/os@4.0.1
  - @just-web/states@4.0.1
  - @just-web/types@4.0.1

## 5.0.0

### Patch Changes

- 1e92661d: Update `type-plus` to `4.15.2`.
- 9b004db7: Update `type-plus` to use `MaybePromise.transform()`
- Updated dependencies [1e92661d]
- Updated dependencies [1e92661d]
- Updated dependencies [7b3b99c0]
- Updated dependencies [0987acac]
- Updated dependencies [5729f2c0]
- Updated dependencies [e9e5e2f0]
- Updated dependencies [24558c6f]
- Updated dependencies [9b004db7]
  - @just-web/app@4.0.0
  - @just-web/log@4.0.0
  - @just-web/types@4.0.0
  - @just-web/react@4.0.0
  - @just-web/states@4.0.0
  - @just-web/browser-keyboard@4.0.0
  - @just-web/commands@4.0.0
  - @just-web/keyboard@4.0.0
  - @just-web/os@4.0.0

## 4.0.2

### Patch Changes

- Updated dependencies [d93f524c]
- Updated dependencies [adebc089]
- Updated dependencies [cf41bf89]
  - @just-web/commands@3.1.1
  - @just-web/browser-keyboard@3.1.1
  - @just-web/app@3.1.1
  - @just-web/keyboard@3.1.1
  - @just-web/log@3.1.1
  - @just-web/os@3.1.1
  - @just-web/states@3.1.1
  - @just-web/types@3.1.1
  - @just-web/react@3.1.1

## 4.0.1

### Patch Changes

- Updated dependencies [3be5a2a2]
- Updated dependencies [4cf08aff]
- Updated dependencies [ca54af50]
- Updated dependencies [085a2d1e]
  - @just-web/types@3.1.0
  - @just-web/react@3.1.0
  - @just-web/log@3.1.0
  - @just-web/app@3.1.0
  - @just-web/browser-keyboard@3.1.0
  - @just-web/commands@3.1.0
  - @just-web/keyboard@3.1.0
  - @just-web/os@3.1.0
  - @just-web/states@3.1.0

## 4.0.0

### Patch Changes

- 7180f82: Update `type-plus` to 4.13.2.
- 0c21f10: Update deps from `workspace:^*` to `workspace:^`.

  `workspace:^*` is incorrect as during publish, the version is not replaced.

- Updated dependencies [edbca92]
- Updated dependencies [5eb37cd]
- Updated dependencies [7180f82]
- Updated dependencies [7180f82]
- Updated dependencies [f2f1a69]
- Updated dependencies [0ff86d0]
- Updated dependencies [7180f82]
- Updated dependencies [0c21f10]
  - @just-web/commands@3.0.0
  - @just-web/app@3.0.0
  - @just-web/log@3.0.0
  - @just-web/types@3.0.0
  - @just-web/react@3.0.0
  - @just-web/states@3.0.0
  - @just-web/browser-keyboard@3.0.0
  - @just-web/keyboard@3.0.0
  - @just-web/os@3.0.0

## 3.0.2

### Patch Changes

- Updated dependencies [deceff5]
  - @just-web/react@2.1.2

## 3.0.1

### Patch Changes

- Updated dependencies [3905f21]
- Updated dependencies [372ab7e]
  - @just-web/app@2.0.1
  - @just-web/react@2.1.1
  - @just-web/browser-keyboard@2.0.1
  - @just-web/commands@2.0.1
  - @just-web/keyboard@2.0.1
  - @just-web/log@2.0.1
  - @just-web/os@2.0.1
  - @just-web/states@2.0.1
  - @just-web/types@2.0.1

## 3.0.0

### Major Changes

- 8d9a1b9: Replace `@just-web/contributions` with `@just-web/keyboard` and `@just-web/commands`

  `contributions.keyBindings` -> `keyboard.keyBindingContributions`
  `contributions.commands` -> `commands.contributions`
  `commands.register()` -> `commands.handlers.register()`
  `commands.invoke()` -> `commands.handlers.invoke()`
  `commands.keys()` -> `commands.handlers.keys()`

  The contribution is a concept that should spread around plugins,
  where which plugin indicates they have contributions to declare.

  This makes the dependencies easier to manage.

  Fixing [#101](https://github.com/justland/just-web/issues/101)

### Patch Changes

- Updated dependencies [89f4a41]
- Updated dependencies [cdd4f6b]
- Updated dependencies [4b05ca8]
- Updated dependencies [8d9a1b9]
- Updated dependencies [a106645]
  - @just-web/log@2.0.0
  - @just-web/types@2.0.0
  - @just-web/react@2.1.0
  - @just-web/browser-keyboard@2.0.0
  - @just-web/commands@2.0.0
  - @just-web/keyboard@2.0.0
  - @just-web/app@2.0.0
  - @just-web/states@2.0.0
  - @just-web/os@2.0.0

## 2.0.4

### Patch Changes

- @just-web/app@1.1.1
- @just-web/browser-contributions@1.1.1
- @just-web/commands@1.1.1
- @just-web/contributions@1.1.1
- @just-web/log@1.1.1
- @just-web/os@1.1.1
- @just-web/states@1.1.1
- @just-web/types@1.1.1
- @just-web/react@2.0.4

## 2.0.3

### Patch Changes

- @just-web/app@1.1.0
- @just-web/browser-contributions@1.1.0
- @just-web/commands@1.1.0
- @just-web/contributions@1.1.0
- @just-web/log@1.1.0
- @just-web/os@1.1.0
- @just-web/states@1.1.0
- @just-web/types@1.1.0
- @just-web/react@2.0.3

## 2.0.2

### Patch Changes

- f95730b: Pass through most of `react-command-palatte` props.

  Not all props are declared, but all are pass through.
  The not declared props really shouldn't be used,
  but keep it open for the time being.

- Updated dependencies [14cb2de]
  - @just-web/contributions@1.0.2
  - @just-web/browser-contributions@1.0.2
  - @just-web/commands@1.0.2
  - @just-web/app@1.0.2
  - @just-web/log@1.0.2
  - @just-web/os@1.0.2
  - @just-web/states@1.0.2
  - @just-web/types@1.0.2
  - @just-web/react@2.0.2

## 2.0.1

### Patch Changes

- 640a299: export some missing types
- Updated dependencies [9853c63]
  - @just-web/app@1.0.1
  - @just-web/react@2.0.1
  - @just-web/browser-contributions@1.0.1
  - @just-web/commands@1.0.1
  - @just-web/contributions@1.0.1
  - @just-web/log@1.0.1
  - @just-web/os@1.0.1
  - @just-web/states@1.0.1
  - @just-web/types@1.0.1

## 2.0.0

### Patch Changes

- 8c3183e: Use `useCallback()` for the callbacks.
- 8c3183e: Update `react-command-palette` to `0.21.1`.

  The "Using UNSAFE_componentWillReceiveProps in strict mode" is not fixed.

  That is caused by https://github.com/moroshko/react-autosuggest/issues/624
  and likely will not be fixed.

  Will soon need to look for alternatives.

- 564addf: Upgrade type-plus to 4.13.1

  Update `init()` and `start()` logs.

  Code comments are not kept so it that JSDocs will be available

- Updated dependencies [8c3183e]
- Updated dependencies [b262ab5]
- Updated dependencies [8c3183e]
- Updated dependencies [564addf]
- Updated dependencies [c228a89]
- Updated dependencies [8c3183e]
  - @just-web/os@1.0.0
  - @just-web/commands@1.0.0
  - @just-web/app@1.0.0
  - @just-web/contributions@1.0.0
  - @just-web/log@1.0.0
  - @just-web/states@1.0.0
  - @just-web/react@2.0.0
  - @just-web/types@1.0.0
  - @just-web/browser-contributions@1.0.0

## 1.0.7

### Patch Changes

- @just-web/app@0.2.7
- @just-web/react@1.0.7

## 1.0.6

### Patch Changes

- @just-web/app@0.2.6
- @just-web/react@1.0.6

## 1.0.5

### Patch Changes

- Updated dependencies [d3e0770]
  - @just-web/app@0.2.5
  - @just-web/react@1.0.5

## 1.0.4

### Patch Changes

- @just-web/app@0.2.4
- @just-web/react@1.0.4

## 1.0.3

### Patch Changes

- Updated dependencies [88ee900]
  - @just-web/app@0.2.3
  - @just-web/react@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies [8b3eee7]
  - @just-web/app@0.2.2
  - @just-web/react@1.0.2

## 1.0.1

### Patch Changes

- e8671c1: Rename `logContext` to `log` to match other props in the application.

  Update deps to fix bundling.
  `play-react` is not working again.

- Updated dependencies [e8671c1]
  - @just-web/app@0.2.1
  - @just-web/react@1.0.1

## 1.0.0

### Minor Changes

- b056a08: Add micro-app support

### Patch Changes

- Updated dependencies [b056a08]
  - @just-web/app@0.2.0
  - @just-web/react@1.0.0

## 0.1.1

### Patch Changes

- f2a3e89: Upgrade `iso-error` and `type-plus`.
  Downgrade package to ES2019 to better support webpack4 and older storybook environment.
- Updated dependencies [f2a3e89]
  - @just-web/app@0.1.1
  - @just-web/react@0.1.1
