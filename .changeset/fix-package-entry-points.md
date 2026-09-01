---
"@just-web/react-intl": patch
"@just-web/react-commands": patch
"react-freedom": patch
---

Point the package entry points at the files the build actually emits.

`@just-web/react-intl` declared `main`, `module`, `types` and `exports` under `./cjs/` and
`./esm/`, and listed only those directories in `files` — so the published tarball contained no
build output at all and the package could not be imported.

`@just-web/react-commands` declared its ESM entry as `.js` and its types as `.d.ts`; the emitted
files are `.mjs`, `.d.mts` and `.d.cts`, so `import` and type resolution both failed.

`react-freedom` declared its ESM types as `./dist/index.d.ts`, which is not emitted; they are now
`./dist/index.d.mts`.
