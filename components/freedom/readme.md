# react-freedom

[react-freedom](https://npmjs.com/package/react-freedom) provides headless React components with maximum flexibility for building web applications.

## Install <!-- omit in toc -->

```sh
# npm
npm install react-freedom

# yarn
yarn add react-freedom

# pnpm
pnpm install react-freedom

#rush
rush add -p react-freedom
```

## Features

> [`<Terminal/>`](./ts/terminal/readme.md)

A headless terminal component.

```ts
import { Terminal, useShell } from 'react-freedom'

export function App () {
  const { register } = useShell()

  return <Terminal {...register()}/>
}
```
