# aeva-switch

A premium toggle switch for boolean inputs, featuring bouncy spring physics and support for glassmorphism styles.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-switch label="Enable Notifications" checked></aeva-switch>
```

### Glassmorphism Variant

```html
<aeva-switch 
  variant="glass" 
  label="Dark Mode" 
  size="lg">
</aeva-switch>
```

### Event Handling

```html
<aeva-switch id="privacy-toggle"></aeva-switch>

<script>
  document.getElementById('privacy-toggle').addEventListener('change', (e) => {
    console.log('Switch is now:', e.detail.checked);
  });
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Current toggle state |
| `disabled` | `boolean` | `false` | Prevents interaction and dims appearance |
| `label` | `string` | `''` | Text displayed next to the switch |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `variant` | `'default' \| 'glass'` | `'default'` | Visual style variant |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked: boolean }` | Fired when the switch state is toggled |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-switch-track-bg` | - | Track color when OFF |
| `--aeva-switch-track-checked-bg`| - | Track color when ON |
| `--aeva-switch-thumb-bg` | - | Color of the switch knob |
| `--aeva-switch-thumb-shadow` | - | Shadow for the switch knob |
| `--aeva-switch-transition` | - | Fallback transition timing |

### Size Overrides
- `--aeva-switch-width`
- `--aeva-switch-height`
- `--aeva-switch-thumb-size`

## Accessibility

- ✅ Semantic keyboard support (Space/Enter to toggle)
- ✅ `role="switch"` (planned, currently uses native checkbox for state)
- ✅ Minimum 44x44px touch target
- ✅ Focus indicators with `focus-visible`
- ✅ High contrast between ON/OFF states

## TypeScript Support

```typescript
import { AevaSwitch } from '@aeva/ui';

const toggle = document.querySelector('aeva-switch') as AevaSwitch;
toggle.checked = true;
```
