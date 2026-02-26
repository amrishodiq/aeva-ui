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

## Features

- ✅ **Automatic Status management**: Automatically marks previous steps as `completed`, the current index as `active`, and future steps as `pending`.
- ✅ **Index Propagation**: Automatically assigns step numbers to children.
- ✅ **Responsive Connectors**: Manages connector lines between steps based on layout direction.

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-process-gap` | - | Horizontal spacing in 'horizontal' mode |

## Accessibility

- ✅ Semantic progression flow
- ✅ High contrast visual state indicators
- ✅ Synchronized step numbering

## TypeScript Support

```typescript
import { AevaProcess } from '@aeva/ui';

const process = document.querySelector('aeva-process') as AevaProcess;
process.current = 2; // Marks previous steps as done
```
