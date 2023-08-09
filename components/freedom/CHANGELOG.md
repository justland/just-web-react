# react-freedom

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
