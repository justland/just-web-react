---
'@just-web/react-commands': patch
'react-freedom': patch
'@just-web/react': patch
---

Update dependencies.

Moving some used dependencies to normal `dependencies`,
while keeping thme in `peerDependencies`.

They are `@just-web` plugins which should be installed by the app,
so they should remain as `peerDependencies`.

Moving them from `devDependencies` to `dependencies` so that proper version bump can be done correctly.
