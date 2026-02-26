# aeva-tooltip

A lightweight tooltip component that provides contextual information on hover or focus.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-tooltip content="Copy to clipboard">
  <aeva-button icon-only>
    <svg>...</svg>
  </aeva-button>
</aeva-tooltip>
```

### Custom Positioning

```html
<aeva-tooltip content="Useful tip!" position="right">
  <span>Hover me</span>
</aeva-tooltip>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | `string` | `''` | The text to display inside the tooltip |
| `position`| `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Preferred tooltip position |
| `delay` | `number` | `200` | Show delay in milliseconds |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-tooltip-bg` | `#1f2937` | Background color |
| `--aeva-tooltip-color` | `#ffffff` | Text color |
| `--aeva-tooltip-border-radius`| `6px` | Corner radius |
| `--aeva-tooltip-font-size` | `12px` | Text size |
| `--aeva-tooltip-padding` | `6px 10px` | Internal padding |

## Accessibility

- ✅ Automatically handles `aria-describedby` linkage
- ✅ Triggered by both mouse hover and keyboard focus
- ✅ Non-blocking for screen readers
- ✅ Collision detection (planned)

## TypeScript Support

```typescript
import { AevaTooltip } from '@aeva/ui';

const tooltip = document.querySelector('aeva-tooltip') as AevaTooltip;
tooltip.content = "New dynamic message";
```
