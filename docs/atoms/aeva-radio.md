# aeva-radio

A custom circular radio button component designed for framework-agnostic selection groups.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<div role="radiogroup">
  <aeva-radio name="theme" value="light" checked></aeva-radio>
  <label>Light Theme</label>
  
  <aeva-radio name="theme" value="dark"></aeva-radio>
  <label>Dark Theme</label>
</div>

<script>
  document.querySelectorAll('aeva-radio').forEach(r => {
    r.addEventListener('change', (e) => {
      console.log(`${e.detail.name} changed to ${e.detail.value}`);
    });
  });
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the radio is currently selected |
| `disabled` | `boolean` | `false` | Prevents interaction and dims appearance |
| `name` | `string` | `''` | Name for grouping; auto-unchecks others |
| `value` | `string` | `''` | Data value associated with this option |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked, value, name }` | Fired when the radio becomes checked |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-radio-size` | `20px` | Size of the radio circle |
| `--aeva-radio-unchecked-bg` | - | Background color when off |
| `--aeva-radio-unchecked-stroke`| - | Border color when off |
| `--aeva-radio-checked-bg` | - | Background color when on |
| `--aeva-radio-checked-stroke` | - | Border color when on |
| `--aeva-radio-checkmark-color` | - | Color of the center indicator |
| `--aeva-radio-transition` | - | Animation timing |
| `--aeva-radio-disabled-opacity`| - | Dimming when disabled |

## Accessibility

- ✅ Semantic `role="radio"` and `aria-checked`
- ✅ Minimum 44x44px touch target (WCAG compliant)
- ✅ Automatic group management (unchecks brothers when clicked)
- ✅ Keyboard support and focus indicators
- ✅ Reduced motion support

## TypeScript Support

```typescript
import { AevaRadio } from '@aeva/ui';

const radio = document.querySelector('aeva-radio') as AevaRadio;
radio.checked = true;
```
