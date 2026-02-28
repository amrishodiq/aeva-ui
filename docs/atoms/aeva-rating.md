# aeva-rating

A high-quality rating component for user feedback, featuring smooth animations and support for half-stars.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Read-only Mode

```html
<aeva-rating value="4.5" size="md"></aeva-rating>
```

### Interactive Mode

```html
<aeva-rating 
  id="feedback" 
  interactive 
  allow-half 
  show-label>
</aeva-rating>

<script>
  document.getElementById('feedback').addEventListener('rating-change', (e) => {
    console.log('New rating:', e.detail.value);
  });
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number` | `0` | Current rating value (0 to max) |
| `max` | `number` | `5` | Maximum number of stars |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Star size variant |
| `interactive` | `boolean` | `false` | Enables user interaction |
| `show-label` | `boolean` | `false` | Displays numeric value next to stars |
| `allow-half` | `boolean` | `true` | Allows selecting/displaying half-stars |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `rating-change` | `{ value: number }` | Fired when the rating is changed by the user |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-rating-color` | Color of filled stars | `#fbbf24` |
| `--aeva-rating-empty-color` | Color of empty stars | `#e5e7eb` |
| `--aeva-rating-hover-color` | Color when hovering stars | `#f59e0b` |
| `--aeva-rating-label-color` | Color of the numeric label | - |

### Size Tokens
| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-rating-size-sm` | Small star size | `16px` |
| `--aeva-rating-size-md` | Medium star size | `24px` |
| `--aeva-rating-size-lg` | Large star size | `32px` |

## Accessibility

- ✅ Responsive hover effects in interactive mode
- ✅ High contrast between filled and empty states
- ✅ Scale animation on star hover
- ✅ Descriptive label support

## TypeScript Support

```typescript
import { AevaRating } from '@aeva/ui';

const rating = document.querySelector('aeva-rating') as AevaRating;
rating.value = 4.2;
rating.interactive = true;
```
