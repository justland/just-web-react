---
'react-freedom': minor
---

Move prompt style inside shell.

`TerminalPrompt` is replaced with `TerminalPromptArea`,
which no longer take in `className` and `children` props.

Instead, it takes in `input` which will defaults to `<TerminalInput>`.

It is done so, as it does not contribute to the styling and layout of the prompt.
It contributes to the layout of the Terminal itself as a placeholder.

`PromptNode` will also not accept `className` prop for the same reason,

so that the style of the prompt is solely described by the shell.
This allows the prompt to be styled correctly when used to render output (`echoPrompt`).
