---
'@just-web/react': patch
---

Relax the generic type of `JustAppProvider<App>` and `useJustAppContext<App>()`
from `JustReactApp` to `JustApp`.

This allows you to use the `JustAppProvider` and `useJustAppContext` without using `reactGizmo`.

Rename `JustAppProvider` props from `app` to `value`.
This make it consistent with the `React.Context.Provider` props.
