# aeva-badge

A lightweight badge component for status indicators, tags, or labels. Supports various colors, sizes, and optional "deletable" functionality.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-badge variant="success">Active</aeva-badge>
<aeva-badge variant="danger" size="sm">Error</aeva-badge>
```

### With Icon

```html
<aeva-badge variant="primary">
  <svg slot="icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L1 21h22L12 2z"/>
  </svg>
  Warning
</aeva-badge>
```

### Deletable Badge

```html
<aeva-badge deletable id="tag-1">Removable Tag</aeva-badge>

<script>
  document.getElementById('tag-1').addEventListener('badge-delete', (e) => {
    console.log('Badge removed:', e.detail.badge);
  });
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `deletable` | `boolean` | `false` | Shows a close button to remove the badge |
| `delete-label` | `string` | `'Remove badge'` | Aria label for the delete button |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | The badge text/content |
| `icon` | Slot for an icon or small image at the start |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `badge-delete` | `{ badge: AevaBadge }` | Fired when the delete button is clicked |

## CSS Customization

### Sizes
| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-badge-padding-sm` | Small badge padding | - |
| `--aeva-badge-font-size-sm` | Small badge font size | - |
| `--aeva-badge-padding-md` | Medium badge padding | - |
| `--aeva-badge-font-size-md` | Medium badge font size | - |
| `--aeva-badge-padding-lg` | Large badge padding | - |
| `--aeva-badge-font-size-lg` | Large badge font size | - |

### Styling
| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-badge-border-radius` | Corner radius | - |
| `--aeva-badge-gap` | Space between icon and text | - |
| `--aeva-badge-transition` | State transition timing | - |
| `--aeva-badge-delete-size` | Size of delete button | - |
| `--aeva-badge-delete-hover-bg` | Delete button hover background | - |

## Accessibility

- ✅ Accessible `delete-label` for screen readers
- ✅ Hover and active states for interactive badges
- ✅ High contrast support
- ✅ Proper semantic nesting

## TypeScript Support

```typescript
import { AevaBadge } from '@aeva/ui';

const badge = document.querySelector('aeva-badge') as AevaBadge;
badge.variant = 'success';
badge.deletable = true;
```
