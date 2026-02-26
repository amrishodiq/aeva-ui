# aeva-step

A directional step indicator component, used as a sub-component within `aeva-process`.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Simple Step

```html
<aeva-step 
  label="Shipping" 
  status="completed" 
  index="0">
</aeva-step>
```

### With Description and Custom Icon

```html
<aeva-step 
  label="Payment" 
  description="Select your card" 
  status="active">
  <svg slot="icon" viewBox="0 0 24 24">...</svg>
</aeva-step>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `status` | `'pending' \| 'active' \| 'completed' \| 'error'` | `'pending'` | Current state of this step |
| `label` | `string` | `''` | Primary title text |
| `description`| `string` | `''` | Secondary descriptive text |
| `index` | `number` | - | The step number (0-indexed) |
| `direction` | `'horizontal' \| 'vertical'`| `'horizontal'` | Layout flow (inherited from parent) |
| `last` | `boolean` | `false` | Whether this is the final step (hides connector) |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Area for additional content below labels |
| `icon` | Replace the center circle content (number/checkmark) |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-step-circle-size` | `32px` | Size of the step node |
| `--aeva-step-circle-bg` | - | Background of the step node |
| `--aeva-step-line-thickness`| `2px` | Thickness of connector lines |
| `--aeva-step-line-color` | - | Color of connector lines |
| `--aeva-step-color-pending` | - | Color for pending state |
| `--aeva-step-color-active` | - | Color for active state |
| `--aeva-step-color-completed` | - | Color for completed state |
| `--aeva-step-color-error` | - | Color for error state |

## Accessibility

- ✅ Built-in status icons (checkmark/cross) for color-blind accessibility
- ✅ Automatic numbering when no icon is provided
- ✅ High-contrast state indicators
- ✅ Scale animation for active steps

## TypeScript Support

```typescript
import { AevaStep } from '@aeva/ui';

const step = document.querySelector('aeva-step') as AevaStep;
step.status = 'completed';
```
