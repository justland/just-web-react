---
'@just-web/react-commands': patch
'react-freedom': patch
'@just-web/react': patch
---

Fix `exports` fields.
`types` should go first,
`default` should go last, and point to CJS code.

Also added `main` and `module` to improve compatibility.
