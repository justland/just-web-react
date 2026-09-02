---
'@just-web/react-commands': patch
'@just-web/react-intl': patch
'react-freedom': patch
'@just-web/react': patch
---

Build with tsdown 0.22 (was 0.17.4, which npm now marks deprecated).

No source or public API changes; the emitted `dist/` is rebuilt by a newer
bundler, so this is a patch rather than a feature.

Two config migrations came with it: `external` is deprecated in favour of
`deps.neverBundle`, and CSS handling moved out of the core into the separate
`@tsdown/css` package, without which a `.module.css` import fails the build
outright.
