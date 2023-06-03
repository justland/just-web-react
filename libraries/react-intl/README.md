# @just-web/react-intl

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[@just-web/react-intl] provides [react-intl] support for [@just-web] applications.

It re-exports [react-intl] so that you can access all functionality of [react-intl] directly.

## Install

[@just-web/react-intl] needs [@just-web/react](../react/README.md)

```sh
# npm
npm install @just-web/react-intl @just-web/react

# yarn
yarn add @just-web/react-intl @just-web/react

# pnpm
pnpm install @just-web/react-intl @just-web/react

#rush
rush add -p @just-web/react-intl @just-web/react
```

## Usage

```tsx
import { justApp } from '@just-web/app'
import { reactGizmo } from '@just-web/react'
import { reactIntlGizmoFn } from '@just-web/react-intl'

const app = await justApp({ name: 'your-awesome-app' })
  .with(reactGizmo)
  .with(reactIntlGizmoFn({ config: { locale: 'en', messages: {} } }))
  .create()

app.react_intl.intl.formatMessage({ defaultMessage: 'hello world' })

function App() {
  <JustAppProvider app={app}><Component/></JustAppProvider>
}

function Component() {
  const intl = useIntl()
  // or
  // const app = useJustAppContext()
  // const intl = app.react_intl.intl

  return <div>{intl.formatMessage({ defaultMessage: 'hello world' })}</div>
}
```

[@just-web]: https://github.com/justland/just-web
[@just-web/react-intl]: https://github.com/justland/just-web/tree/main/plugins/react-intl
[downloads-image]: https://img.shields.io/npm/dm/@just-web/react-intl.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-web/react-intl
[npm-image]: https://img.shields.io/npm/v/@just-web/react-intl.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-web/react-intl
[react-intl]: https://formatjs.io/
