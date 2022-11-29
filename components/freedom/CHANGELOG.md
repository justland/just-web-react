# react-freedom

## 0.0.2

### Patch Changes

- b8337bb: Update dependencies.

  Moving some used dependencies to normal `dependencies`,
  while keeping thme in `peerDependencies`.

  They are `@just-web` plugins which should be installed by the app,
  so they should remain as `peerDependencies`.

  Moving them from `devDependencies` to `dependencies` so that proper version bump can be done correctly.

## 0.0.1

### Patch Changes

- 9e0fd69: Support ESM
