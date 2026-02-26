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

| Event | Detail | Description |
|-------|--------|-------------|
| `selection-change` | `{ index: number, label: string }` | Fired when a new item is selected |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-list-padding` | `8px` | Padding for the entire container |
| `--aeva-list-gap` | `4px` | Spacing between list items |
| `--aeva-list-border-radius`| - | Corner radius for the list block |

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
