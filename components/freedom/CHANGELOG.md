# react-freedom

## 1.1.3

### Patch Changes

- ec8a77e: Terminal: focus prompt when clicked.

## 1.1.2

### Patch Changes

- 3bffce4: Hide prompt when processing keydown asynchronously.
- dd21afa: Add `aria-label` to input and output.
- 86baf57: Fix scroll to bottom.

  The `Prompt` will receive the `className` and `style` props.

## 1.1.1

### Patch Changes

- e43bb05: Scroll to bottom automatically.

## 1.1.0

### Minor Changes

- 1fa1706: Expose `setOutput`

### Patch Changes

- f1a2501: Clean up `onKeyDown`, `onParse`, and `commands` behavior:

  - prompt will be echoed before anything when `echoPrompt` is true.
  - `onKeyDown` will be triggered after that.
  - If it call `e.stopPropagation()`, `onParse` or `commands` will not be triggered.
  - `commands` look up will occur if `commands` is provided (skip if not provided).
  - `onParse` will be trigger if no command matches the input.
  - `Unknown command: ...` will be emitted after that. If `onParse` is provided, `Unknown command: ...` will not be emitted, even if `onParse` does not return anything.

## 1.0.1

### Patch Changes

- 2b9f775: Fix react prompt.
  It was not accepting and process input.

## 1.0.0

### Major Changes

- 84df640: `react-freedom` first major release.

  The package is changed to do dual CJS and ESM packages.

  `Editor` is removed from public api as it is not ready.

  Export `useForwardedRef` hook.

  Renamed `<TerminalOutput />` to `<TerminalOutputArea />`

### Patch Changes

- 3452c37: Expose `onChange` along with `onKeyDown`

## 0.2.1

### Patch Changes

- 4315fb8: `react-freedom`: Add Terminal disabled support.

## 0.2.0

### Minor Changes

- 7d29817: Move prompt style inside shell.

  `TerminalPrompt` is replaced with `TerminalPromptArea`,
  which no longer take in `className` and `children` props.

  Instead, it takes in `input` which will defaults to `<TerminalInput>`.

  It is done so, as it does not contribute to the styling and layout of the prompt.
  It contributes to the layout of the Terminal itself as a placeholder.

  `PromptNode` will also not accept `className` prop for the same reason,

  so that the style of the prompt is solely described by the shell.
  This allows the prompt to be styled correctly when used to render output (`echoPrompt`).

### Patch Changes

- 3e618b8: Support completion

## 0.1.1

### Patch Changes

- 03799b8: Fix TerminalWidgetProps name
- fcba196: Add `TerminalInputProps`

## 0.1.0

### Minor Changes

- e659316: Add `Terminal`

## 0.0.3

### Patch Changes

- ac35820: Fix `exports` fields.
  `types` should go first,
  `default` should go last, and point to CJS code.

  Also added `main` and `module` to improve compatibility.

## 0.0.2

### Patch Changes

- b8337bb: Update dependencies.

  Moving some used dependencies to normal `dependencies`,
  while keeping theme in `peerDependencies`.

  They are `@just-web` plugins which should be installed by the app,
  so they should remain as `peerDependencies`.

  Moving them from `devDependencies` to `dependencies` so that proper version bump can be done correctly.

## 0.0.1

### Patch Changes

- 9e0fd69: Support ESM
