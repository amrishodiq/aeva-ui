# aeva-ripple

A lightweight, reusable Material Design-style ripple effect component. It automatically attaches to its parent element to provide visual feedback on click/touch.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

Simply drop the component inside any element with `position: relative` or `position: absolute`.

```html
<button style="position: relative; overflow: hidden;">
  Click me
  <aeva-ripple></aeva-ripple>
</button>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | `number` | `600` | Animation duration in milliseconds |
| `opacity` | `number` | `0.15` | Maximum opacity of the ripple |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-ripple-color` | `currentColor`| Color of the expanding circle |
| `--aeva-ripple-duration` | `600ms` | CSS fallback for duration |
| `--aeva-ripple-opacity` | `0.15` | CSS fallback for opacity |

## Features

- ✅ **Automatic Parent Detection**: Automatically listens for events on its immediate parent element.
- ✅ **Dynamic Centering**: Calculates expansion start point based on exact cursor/touch location.
- ✅ **Clean Performance**: Renders in Shadow DOM and cleans up temporary elements immediately after animation ends.
- ✅ **Inherits Styles**: Automatically respects parent's `border-radius`.

## Accessibility

- ✅ Non-interactive component (does not receive focus)
- ✅ Purely decorative visual feedback
- ✅ Hardware accelerated animations

## TypeScript Support

```typescript
import { AevaRipple } from '@aeva/ui';

// No manual initialization needed, just add to DOM
```
