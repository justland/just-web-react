---
'@just-web/react-commands': patch
---

Move just-web packages to peerDeps.
They need to be supplied by the host application,
thus they are peerDeps and not deps.

