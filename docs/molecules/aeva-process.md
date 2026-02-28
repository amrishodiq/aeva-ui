# aeva-process

A high-level process container that manages a sequence of `aeva-step` elements. Automates status updates for child steps based on the current progress index.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Horizontal Flow (Default)

```html
<aeva-process current="1">
  <aeva-step label="Account"></aeva-step>
  <aeva-step label="Shipping"></aeva-step>
  <aeva-step label="Payment"></aeva-step>
</aeva-process>
```

### Vertical Flow

```html
<aeva-process current="0" direction="vertical">
  <aeva-step label="Verify Identity" description="Upload your ID"></aeva-step>
  <aeva-step label="Background Check" description="Usually takes 2 days"></aeva-step>
</aeva-process>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the process |
| `current` | `number` | `0` | The index (0-indexed) of the active step |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Container for `aeva-step` components |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| - | - | This component does not dispatch custom events |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-process-gap` | Horizontal spacing in 'horizontal' mode | `var(--aeva-space-lg)` |
| `--aeva-step-circle-size` | Dimension of the step circle | `32px` |
| `--aeva-step-circle-bg` | Background of the step circle | - |
| `--aeva-step-line-thickness` | Thickness of connector lines | `2px` |
| `--aeva-step-line-color` | Color of the connector lines | - |
| `--aeva-step-color-pending` | Indicator color for pending state | - |
| `--aeva-step-color-active` | Indicator color for active state | - |
| `--aeva-step-color-completed` | Indicator color for completed state | - |

## Accessibility

- ✅ Semantic progression flow
- ✅ High contrast visual state indicators
- ✅ Synchronized step numbering
- ✅ Responsive connectors for both vertical and horizontal layouts

## TypeScript Support

```typescript
import { AevaProcess } from '@aeva/ui';

const process = document.querySelector('aeva-process') as AevaProcess;
process.current = 2; // Marks previous steps as done
```
