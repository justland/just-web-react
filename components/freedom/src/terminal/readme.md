# Terminal

The `<Terminal/>` in [react-freedom] is a headless terminal.

## Legends

- 💡: just an idea. We think about it but no plan to implement it yet. Any discussion is welcome.
- ❌: outside of terminal. These are things related to the terminal, but should be implemented by the consuming application.
- 🚧: work in progress. These are things being implemented at the moment.
  - They are in useable form, but likely in beta quality.
- 🌟: ready for production.

## Components

A modern terminal allows you to create new windows, tabs, and panes.

The `<Terminal/>` in [react-freedom] currently does not support any of these features.

But it is beneficial to understand them and provides components with concise and stable namings.

Here are the components identified in a terminal application:

### `Terminal`

> 🚧 `<Terminal/>`

This is the overall terminal component.

```ts
import { Terminal, useShell } from 'react-freedom'

export function App () {
  const { register } = useShell()

  return <Terminal {...register()}/>
}
```

Currently, it is alias of the `<TerminalWidget/>` component.

It also serves as the namespace of other terminal components so that they can be accessed easily.

### `TerminalWidget`

> 🚧 `<TerminalWidget/>`
> 🚧 `<Terminal/>` (alias)

A single terminal widget. Each terminal widget handles a specific shell application.

In terms of layout, `TerminalWidget` contains `TerminalOutputArea` and `TerminalPromptArea`:

```ts
function TerminalWidget() {
  return (
    <>
      <Terminal.OutputArea />
      <Terminal.PromptArea />
    </>
  )
}
```

You can change the layout and style of the terminal widget by providing your own children.

```ts
function App() {
  return (
    <Terminal>
      <div className="your-style">
        <div>Some other content</div>
        <Terminal.OutputArea className="your-style"/>
        <Terminal.PromptArea className="your-style"/>
      </div>
    </Terminal>
  )
}
```

### `TerminalOutputArea`

> 🚧 `<TerminalOutputArea/>`
> 🚧 `<Terminal.OutputArea/>` (alias)

`TerminalOutputArea` renders the output of the shell.

You can render each output entry by overrideing the children of the `TerminalOutputArea` component:

```ts
function App() {
  return (
    <Terminal>
      <Terminal.OutputArea>
        {({ output })} => output.map((line => <div className="your-style">{line}</div>))
      </Terminal.OutputArea>
    </Terminal>
  )
}
```

### `TerminalPromptArea`

> 🚧 `<TerminalPromptArea />`
> 🚧 `<Terminal.PromptArea />` (alias)

`TerminalPromptArea` renders the shell prompt and input.

### `TerminalInput`

> 🚧 `<TerminalInput/>`
> 🚧 `<Terminal.Input/>` (alias)

`TerminalInput` renders the shell prompt and input.

The `Prompt` is provided by the shell (from `useShell()`).

## Hooks

> 🚧 `useShell()`

The `useShell()` hook provides a basic shell to interact with the terminal.
This hook provides a basic shell to interact with the terminal.

## Others

- 💡 `TerminalApp`: The overall terminal application.
  - Allows you to manage tabs and panes. Arrange and navigate between them.
  - Defines general styles and themes that will be applied to each pane.
- 💡 `TerminalAppContext`:
- 💡 `TerminalWindow`
- 💡 `TerminalTabBar`
- 💡 `TerminalTabPanel`
- 💡 `TerminalPane`
- 💡 `TerminalPtyProvider`
- 💡 `TerminalStatusBar`

> ❌ `useTerminalManager()`

The `useTerminalManager()` hook provides logic to manage the behavior of the `Terminal`.

Creating windows, tab, and pane should be controlled by the application,
not the terminal itself.

NOTE: yes, the name `useTerminalManager` is a bad name.
If there is a better name, please let us know.

## References

- [Anatomy of a Terminal Emulator](https://poor.dev/terminal-anatomy/)

[react-freedom]: https://www.npmjs.com/package/react-freedom
