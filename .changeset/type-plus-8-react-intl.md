---
'@just-web/react-intl': patch
---

Pin the `type-plus` devDependency to the exact version `8.0.0-beta.10` and move the
`typescript` devDependency range from `^5.0.4` to `^5.7.3` so it satisfies
`type-plus@8`'s new `typescript >= 5.6.0` peer.

`type-plus` is a devDependency here and does not appear in the published declarations,
so consumers inherit nothing from this — hence a patch rather than a major.

Why an exact version and not a caret: `^8.0.0-beta.10` admits every later `8.0.0`
prerelease plus `8.0.0` and `8.1.0`, and breaking changes land between `type-plus@8`
betas. An exact version keeps each bump a reviewable pull request. Revert to a caret
once `8.0.0` is stable.
