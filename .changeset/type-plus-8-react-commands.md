---
'@just-web/react-commands': major
---

Pin `type-plus` to the exact version `8.0.0-beta.10` (published `9.1.2` shipped `type-plus: ^7.0.1`).

Breaking for consumers: the emitted declarations import `AnyFunction` from `type-plus`,
so anyone consuming this package's types resolves `type-plus@8`, which declares
`peerDependencies: { typescript: '>= 5.6.0' }`. `type-plus` 5, 6 and 7 declared no
TypeScript peer at all, so this is a new install-time constraint.

The package's own `typescript` devDependency range moved from `^5.0.0` to `^5.7.3` to
match the repository root and satisfy the new peer. That independently raises the floor
for anyone compiling against the shipped `src`.

Why an exact version and not a caret: `^8.0.0-beta.10` resolves to
`>=8.0.0-beta.10 <9.0.0-0`, which admits every later `8.0.0` prerelease as well as
`8.0.0` and `8.1.0`. `type-plus@8` is a prerelease line where breaking changes land
between betas — `beta.10` to `beta.11` changed `Equal`'s signature and removed
`isType.f`. An exact version makes each bump a reviewable pull request instead of
something a lockfile refresh can do silently. Revert to a caret once `8.0.0` is stable.
