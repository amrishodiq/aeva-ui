# aeva-list

A powerful container for `aeva-list-item` elements, managing single-selection state and advanced keyboard navigation.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Simple List

```html
<aeva-list id="my-list">
  <aeva-list-item label="Apple"></aeva-list-item>
  <aeva-list-item label="Banana"></aeva-list-item>
  <aeva-list-item label="Cherry"></aeva-list-item>
</aeva-list>

<script>
  document.getElementById('my-list').addEventListener('selection-change', (e) => {
    console.log('Selected:', e.detail.label);
  });
</script>
```

### Pre-selected Item

```html
<aeva-list active="1">
  <aeva-list-item label="First"></aeva-list-item>
  <aeva-list-item label="Second (Active)"></aeva-list-item>
</aeva-list>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `active` | `number` | `-1` | The index of the currently selected item |

## Events

| Event | Component | Detail | Description |
|-------|-----------|--------|-------------|
| `selection-change` | `aeva-list` | `{ index: number, label: string }` | Fired when a new item is selected |
| `list-item-click` | `aeva-list-item` | `{ index: number, label: string }` | Fired when an item is clicked |

## CSS Customization

### aeva-list
| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-list-padding` | Padding for the entire container | `8px` |
| `--aeva-list-gap` | Spacing between list items | `4px` |
| `--aeva-list-border-radius`| Corner radius for the list block | - |

### aeva-list-item
| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-list-item-bg` | Background color of the item | `transparent` |
| `--aeva-list-item-hover-bg` | Background color on hover | `rgba(0,0,0,0.04)` |
| `--aeva-list-item-active-bg` | Background color when active | `rgba(102,126,234,0.08)` |
| `--aeva-list-item-border-radius` | Corner radius for the item | `8px` |

## Accessibility

- ✅ Full Keyboard Navigation (Up/Down arrows, Home/End)
- ✅ Semantic `role="listbox"` and `aria-selected` management
- ✅ Automatic focus delegation to items
- ✅ Visual and screen-reader state synchronization

## TypeScript Support

```typescript
import { AevaList } from '@aeva/ui';

const list = document.querySelector('aeva-list') as AevaList;
list.active = 2; // Programmatically select the third item
```
