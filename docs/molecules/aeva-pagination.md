# aeva-pagination

A feature-rich pagination component supporting both numeric page buttons and minimal dot indicators. Features bouncy hover animations and premium focus effects.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Numeric Type

```html
<aeva-pagination 
  total="100" 
  current="1" 
  page-size="10">
</aeva-pagination>
```

### Dots Type (Carousel Style)

```html
<aeva-pagination 
  variant="dots" 
  total="5" 
  current="1" 
  page-size="1">
</aeva-pagination>
```

### Event Handling

```html
<aeva-pagination id="pager" total="50"></aeva-pagination>

<script>
  document.getElementById('pager').addEventListener('change', (e) => {
    console.log('Navigated to page:', e.detail.page);
  });
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'number' \| 'dots'` | `'number'` | Visual style of the pagination |
| `total` | `number` | `0` | Total number of items to paginate |
| `current` | `number` | `1` | The currently active page (1-based) |
| `page-size` | `number` | `10` | Items per page (used to calc total pages) |
| `sibling-count`| `number` | `1` | Number of buttons to show around the current page |
| `boundary-count`| `number` | `1` | Number of buttons to show at the start/end |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ page: number }` | Fired when the active page is changed |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-pagination-gap` | - | Spacing between buttons/dots |
| `--aeva-pagination-btn-size` | - | Width/Height of page buttons |
| `--aeva-pagination-btn-bg` | - | Background of inactive buttons |
| `--aeva-pagination-btn-color` | - | Text/Dot color |
| `--aeva-pagination-btn-hover-bg`| - | Background on hover |
| `--aeva-pagination-btn-active-bg`| - | Background of the active page |
| `--aeva-pagination-btn-active-color`| - | Text color of the active page |

## Accessibility

- ✅ Semantic `button` elements for all interactive nodes
- ✅ `aria-label` for navigation arrows and dots
- ✅ Visual `active` state synchronized with `aria-current` (planned)
- ✅ High contrast focus rings and transformed hover states

## TypeScript Support

```typescript
import { AevaPagination } from '@aeva/ui';

const pager = document.querySelector('aeva-pagination') as AevaPagination;
pager.current = 5;
```
