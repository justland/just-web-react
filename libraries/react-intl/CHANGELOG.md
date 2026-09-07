# @just-web/react-intl

## 1.2.3

### Patch Changes

- 34b9634: Pin the `type-plus` devDependency to the exact version `8.0.0-beta.10` and move the
  `typescript` devDependency range from `^5.0.4` to `^5.7.3` so it satisfies
  `type-plus@8`'s new `typescript >= 5.6.0` peer.
  
  `type-plus` is a devDependency here and does not appear in the published declarations,
  so consumers inherit nothing from this — hence a patch rather than a major.
  
  Why an exact version and not a caret: `^8.0.0-beta.10` admits every later `8.0.0`
  prerelease plus `8.0.0` and `8.1.0`, and breaking changes land between `type-plus@8`
  betas. An exact version keeps each bump a reviewable pull request. Revert to a caret
  once `8.0.0` is stable.
- Updated dependencies [34b9634]
  - @just-web/react@10.0.0

## 1.2.2

### Patch Changes

- f60d22f: Build with tsdown 0.22 (was 0.17.4, which npm now marks deprecated).
  
  No source or public API changes; the emitted `dist/` is rebuilt by a newer
  bundler, so this is a patch rather than a feature.
  
  Two config migrations came with it: `external` is deprecated in favour of
  `deps.neverBundle`, and CSS handling moved out of the core into the separate
  `@tsdown/css` package, without which a `.module.css` import fails the build
  outright.

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
