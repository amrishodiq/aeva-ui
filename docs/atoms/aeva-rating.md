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

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-rating-color` | `#fbbf24` | Color of filled stars |
| `--aeva-rating-empty-color` | `#e5e7eb` | Color of empty stars |
| `--aeva-rating-hover-color` | `#f59e0b` | Color when hovering stars |
| `--aeva-rating-label-color` | - | Color of the numeric label |

### Size Tokens
- `--aeva-rating-size-sm`: `16px`
- `--aeva-rating-size-md`: `24px`
- `--aeva-rating-size-lg`: `32px`

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
