# aeva-checkbox

A custom-designed rectangular checkbox component with smooth animations and full accessibility support.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-checkbox id="privacy" name="accepted" value="true"></aeva-checkbox>
<label for="privacy">I accept the terms and conditions</label>

<script>
  document.getElementById('privacy').addEventListener('change', (e) => {
    console.log('Is checked:', e.detail.checked);
  });
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | The toggle state of the checkbox |
| `disabled` | `boolean` | `false` | Prevents interaction and dims appearance |
| `name` | `string` | `''` | Form name attribute |
| `value` | `string` | `''` | Form value attribute |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked, value, name }` | Fired when the checked state is toggled |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-checkbox-size` | Dimension of the checkbox | `20px` |
| `--aeva-checkbox-border-radius` | Corner radius of the box | `6px` |
| `--aeva-checkbox-unchecked-bg` | Background color when off | - |
| `--aeva-checkbox-unchecked-stroke`| Border color when off | - |
| `--aeva-checkbox-checked-bg` | Background color when on | - |
| `--aeva-checkbox-checked-stroke` | Border color when on | - |
| `--aeva-checkbox-checkmark-color` | Color of the checkmark icon | - |
| `--aeva-checkbox-transition` | Animation timing | - |
| `--aeva-checkbox-disabled-opacity`| Opacity in disabled state | - |

## Accessibility

- ✅ Semantic `role="checkbox"`
- ✅ `aria-checked` and `aria-disabled` managed automatically
- ✅ Minimum 44x44px touch target (WCAG 2.1 compliance)
- ✅ Reduced motion support via CSS media queries
- ✅ Focus indicators for keyboard users

## TypeScript Support

```typescript
import { AevaCheckbox } from '@aeva/ui';

const checkbox = document.querySelector('aeva-checkbox') as AevaCheckbox;
checkbox.checked = true;
checkbox.addEventListener('change', (e) => {
  const isChecked = e.detail.checked;
  console.log(`Checkbox is now ${isChecked ? 'ON' : 'OFF'}`);
});
```
