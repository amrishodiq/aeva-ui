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

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-code-bg` | `#1e1e1e` | Main code area background |
| `--aeva-code-header-bg` | `#323232` | Window header background |
| `--aeva-code-font-family` | Fira Code... | Monospace font stack |
| `--aeva-code-font-size` | `0.95rem` | Font size |
| `--aeva-code-border-radius`| `22px` | Total window corner radius |
| `--aeva-code-text-color` | `#d4d4d4` | Default text color |
| `--aeva-code-dot-red` | `#ff5f56` | Color for the close dot |
| `--aeva-code-dot-yellow` | `#ffbd2e` | Color for the minimize dot |
| `--aeva-code-dot-green` | `#27c93f` | Color for the expand dot |

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
