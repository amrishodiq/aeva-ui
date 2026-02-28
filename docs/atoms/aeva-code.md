# aeva-code

A premium code block component with MacOS-style window decorations and built-in copy-to-clipboard functionality.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-code 
  language="javascript" 
  title="hello.js" 
  code="console.log('Hello Aeva!');">
</aeva-code>
```

### Slot-based Usage

```html
<aeva-code language="html" title="index.html">
  &lt;div class="hero"&gt;
    &lt;h1&gt;Welcome&lt;/h1&gt;
  &lt;/div&gt;
</aeva-code>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `code` | `string` | `''` | The code string to display |
| `language` | `string` | `'html'` | Language for syntax highlighting classes |
| `title` | `string` | `''` | Optional filename or title in the window header |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Fallback area for code content if the `code` property is not used |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| - | - | This component does not dispatch custom events |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-code-bg` | Main code area background | `#1e1e1e` |
| `--aeva-code-header-bg` | Window header background | `#323232` |
| `--aeva-code-font-family` | Monospace font stack | - |
| `--aeva-code-font-size` | Font size | `0.95rem` |
| `--aeva-code-border-radius`| Total window corner radius | `22px` |
| `--aeva-code-text-color` | Default text color | `#d4d4d4` |
| `--aeva-code-dot-red` | Color for the close dot | `#ff5f56` |
| `--aeva-code-dot-yellow` | Color for the minimize dot | `#ffbd2e` |
| `--aeva-code-dot-green` | Color for the expand dot | `#27c93f` |

## Accessibility

- ✅ Keyboard focusable copy button
- ✅ High-contrast focus indicators
- ✅ Proper semantic nesting using `pre` and `code` tags
- ✅ Contrast-safe default colors for dark mode

## TypeScript Support

```typescript
import { AevaCode } from '@aeva/ui';

const codeBlock = document.querySelector('aeva-code') as AevaCode;
codeBlock.code = "const x = 10;";
codeBlock.language = "typescript";
```
