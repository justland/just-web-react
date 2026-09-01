# @just-web/react-intl

## 1.2.1

### Patch Changes

- b5e84ec: Point the package entry points at the files the build actually emits.
  
  `@just-web/react-intl` declared `main`, `module`, `types` and `exports` under `./cjs/` and
  `./esm/`, and listed only those directories in `files` — so the published tarball contained no
  build output at all and the package could not be imported.
  
  `@just-web/react-commands` declared its ESM entry as `.js` and its types as `.d.ts`; the emitted
  files are `.mjs`, `.d.mts` and `.d.cts`, so `import` and type resolution both failed.
  
  `react-freedom` declared its ESM types as `./dist/index.d.ts`, which is not emitted; they are now
  `./dist/index.d.mts`.

## 1.2.0

### Minor Changes

- 60e8855: Update `@just-web` dependencies.
- f507a48: Build with `tsdown`

## 1.1.1

### Patch Changes

- 6a0df6d: Change to use `react` instead of `react-jsx`.

  Due to this issue: https://github.com/facebook/react/issues/25857

## 1.1.0

### Minor Changes

- 8742f48: Support optional formatjs gizmo.

## 1.0.0

### Major Changes

- 92b135c: Initial release

### Patch Changes

- 389e84c: Update `just-web`
