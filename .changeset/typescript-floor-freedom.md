---
'react-freedom': patch
---

Move the `typescript` devDependency range from `^5.0.0` to `^5.7.3` so every workspace
package agrees with the repository root. `react-freedom` does not use `type-plus`; this
is alignment only, and the published contract is unchanged.
