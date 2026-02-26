# aeva-toast

A temporary notification component that slides in to provide quick feedback. Supports multiple variants, custom positions, and auto-dismissal.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Toast

```html
<aeva-toast id="welcome" duration="5000">
  Welcome back, User!
</aeva-toast>

<script>
  const toast = document.getElementById('welcome');
  toast.open = true; // Show for 5 seconds
</script>
```

### Styled Variants

```html
<aeva-toast id="success" variant="success" position="top-right">
  Profile updated successfully.
</aeva-toast>

<aeva-toast id="error" variant="error">
  Failed to save changes.
</aeva-toast>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls visibility |
| `variant` | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Visual style and icon preset |
| `position`| `top-right \| top-center ...` | `'top-right'` | Screen docking position |
| `duration`| `number` | `3000` | Display time in ms (0 to stay open) |
| `closable`| `boolean` | `true` | Shows a close 'X' button |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `open` | - | Fired when the toast is displayed |
| `close` | - | Fired when the toast starts closing |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-toast-bg` | Glass style | Background (supports blur) |
| `--aeva-toast-padding` | `1rem 1.25rem` | Internal padding |
| `--aeva-toast-min-width`| `300px` | Minimum width block |
| `--aeva-toast-blur` | `8px` | Backdrop blur intensity |

## Accessibility

- ✅ Semantic `role="alert"` and `aria-live="polite"`
- ✅ Automatically handles focus management/dismissal
- ✅ High contrast variant-specific icons
- ✅ Responsive docking on mobile screens

## TypeScript Support

```typescript
import { AevaToast } from '@aeva/ui';

const toast = document.querySelector('aeva-toast') as AevaToast;
toast.open = true;
await toast.close(); // Programmatic dismiss with animation
```
