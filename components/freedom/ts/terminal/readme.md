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

In terms of layout, `TerminalWidget` contains `TerminalOutput` and `TerminalInput`:

```ts
function TerminalWidget() {
  return (
    <>
      <TerminalOutput />
      <TerminalInput />
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
        <Terminal.Output className="your-style"/>
        <Terminal.Input className="your-style"/>
      </div>
    </Terminal>
  )
}
```

### `TerminalOutput`

> 🚧 `<TerminalOutput/>`
> 🚧 `<Terminal.Output/>` (alias)

`TerminalOutput` renders the output of the shell.

You can render each output entry by overrideing the children of the `TerminalOutput` component:

```ts
function App() {
  return (
    <Terminal>
      <Terminal.Output>
        {({ output})} => output.map((line => <div className="your-style">{line}</div>))
      </Terminal.Output>
    </Terminal>
  )
}
```

### `TerminalInput`

> 🚧 `<TerminalInput/>`
> 🚧 `<Terminal.Input/>` (alias)

`TerminalInput` renders the shell prompt and input.

The `Prompt` is provided by the shell (from `useShell()`).

- 💡 `TerminalApp`: The overall terminal application.
  - Allows you to manage tabs and panes. Arrange and navigate between them.
  - Defines general styles and themes that will be applied to each pane.
- 💡 `TerminalAppContext`:
- 🚧 `Terminal`
- `TerminalProvider`
- 💡 `TerminalWindow`
- 💡 `TerminalTabBar`
- 💡 `TerminalTabPanel`
- 💡 `TerminalPane`
- 💡 `TerminalPtyProvider`
- 💡 `TerminalStatusBar`
- 🚧 `TerminalWidget`: A single terminal widget.
  - Each terminal widget handles a specific shell application.
- 🚧 `TerminalWidgetContext`: The React Context provided by the `TerminalWidget`.
  - You can use this to build your custom terminal components if desired.
- 🚧 `TerminalOutput`: Component showing the shell output.
- 🚧 `TerminalInput`: The component showing the shell prompt and input.

> ❌ `useTerminalManager()`

The `useTerminalManager()` hook provides logic to manage the behavior of the `Terminal`.

Creating windows, tab, and pane should be controlled by the application,
not the terminal itself.

NOTE: yes, the name `useTerminalManager` is a bad name.
If there is a better name, please let us know.

## Hooks

> 🚧 `useShell()`

The `useShell()` hook provides a basic shell to interact with the terminal.
This hook provides a basic shell to interact with the terminal.

## References

- [Anatomy of a Terminal Emulator](https://poor.dev/terminal-anatomy/)

[react-freedom]: https://www.npmjs.com/package/react-freedom
