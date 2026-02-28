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

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| - | - | This component does not dispatch custom events |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-tooltip-bg` | Background color | `#1f2937` |
| `--aeva-tooltip-color` | Text color | `#ffffff` |
| `--aeva-tooltip-border-radius`| Corner radius | `6px` |
| `--aeva-tooltip-font-size` | Text size | `12px` |
| `--aeva-tooltip-padding` | Internal padding | `6px 10px` |

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
