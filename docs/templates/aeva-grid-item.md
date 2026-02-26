# aeva-grid-item

A sub-component for `aeva-grid` that allows individual grid cells to span multiple rows or columns, enabling complex "Bento Box" layouts.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Spanning Columns and Rows

```html
<aeva-grid columns="3" gap="md">
  <!-- This item spans 2 columns and 2 rows -->
  <aeva-grid-item col-span="2" row-span="2">
    <aeva-card height="100%">Featured Story</aeva-card>
  </aeva-grid-item>

  <aeva-grid-item>
    <aeva-card>Small Card</aeva-card>
  </aeva-grid-item>

  <aeva-grid-item>
    <aeva-card>Another Card</aeva-card>
  </aeva-grid-item>
</aeva-grid>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `col-span` | `number` | `1` | Number of columns to span |
| `row-span` | `number` | `1` | Number of rows to span |
| `col-start`| `number` | - | Manual 1-indexed column start |
| `row-start`| `number` | - | Manual 1-indexed row start |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-grid-item-min-height`| `auto` | Ensures items have a base height |

## Usage Tips

- Use `col-span` and `row-span` for most dashboard layouts.
- Use `col-start` and `row-start` only when you need absolute placement (non-consecutive items).
- Always wrap in an `aeva-grid` for placement logic to take effect.

## Accessibility

- ✅ High quality DOM ordering
- ✅ Semantic grouping of contents

## TypeScript Support

```typescript
import { AevaGridItem } from '@aeva/ui';

const item = document.querySelector('aeva-grid-item') as AevaGridItem;
item.colSpan = 3;
```
