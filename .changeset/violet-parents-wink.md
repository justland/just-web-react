---
'@just-web/react': patch
---

Remove `reactPlugin`, `lazyImport`, `AppContextProvider` and `useAppContext` from `@just-web/react` package.

`reactPlugin` is replaced by `reactGizmo`,
`AppContextProvider` and `useAppContext` are replaced by `JustAppProvider`,
`useJustAppContext` and `createJustAppContext`.

They work in MFE environment where you will have multiple apps on the same page.
