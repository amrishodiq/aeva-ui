# aeva-list-item

A versatile list item component designed to follow the Atomic Design pattern. Supports icons, titles, descriptions, and interactive ripple effects.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-list-item label="Basic Item"></aeva-list-item>
```

### With Description and Icons

```html
<aeva-list-item label="Security Settings">
  <svg slot="icon-left" viewBox="0 0 24 24">...</svg>
  <span slot="description">Manage your password and security</span>
  <svg slot="icon-right" viewBox="0 0 24 24">...</svg>
</aeva-list-item>
```

### Active State

```html
<aeva-list-item label="Selected Item" active></aeva-list-item>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | Main text for the list item |
| `icon` | `string` | `''` | Name of icon from library or material-icons |
| `active` | `boolean` | `false` | Whether the item is in active/selected state |
| `icon-only`| `boolean` | `false` | Hides text, shows centered icon as a circle |

## Slots

| Slot | Description |
|------|-------------|
| `icon-left` | Leading content area (usually an icon) |
| `title` | Main text area (overrides `label`) |
| `description` | Secondary text area below the title |
| `icon-right` | Trailing content area |
| `(default)` | Alternative slot for main text content |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `list-item-click` | `{ index: number, label: string }` | Fired when the item is clicked |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-list-item-padding` | `12px 16px` | Item internal padding |
| `--aeva-list-item-gap` | `16px` | Gap between elements |
| `--aeva-list-item-bg` | `transparent`| Default background |
| `--aeva-list-item-hover-bg` | - | Background on hover |
| `--aeva-list-item-active-bg`| - | Background when active |
| `--aeva-list-item-color` | - | Main text color |
| `--aeva-list-item-active-color`| - | Text color when active |
| `--aeva-list-item-transition` | 0.2s ... | Animation timing |
| `--aeva-list-item-border-radius`| `8px` | Corner radius |

## Accessibility

- ✅ Semantic `role="option"` support
- ✅ `aria-selected` managed automatically
- ✅ Built-in interactive ripple effect
- ✅ Focus indicators with `focus-visible`
- ✅ Screen-reader friendly structure

## TypeScript Support

```typescript
import { AevaListItem } from '@aeva/ui';

const item = document.querySelector('aeva-list-item') as AevaListItem;
item.active = true;
item.focus();
```
