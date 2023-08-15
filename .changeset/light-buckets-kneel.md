---
'react-freedom': patch
---

Clean up `onKeyDown`, `onParse`, and `commands` behavior:

- prompt will be echoed before anything when `echoPrompt` is true.
- `onKeyDown` will be triggered after that.
- If it call `e.stopPropagation()`, `onParse` or `commands` will not be triggered.
- `commands` look up will occur if `commands` is provided (skip if not provided).
- `onParse` will be trigger if no command matches the input.
- `Unknown command: ...` will be emitted after that. If `onParse` is provided, `Unknown command: ...` will not be emitted, even if `onParse` does not return anything.
