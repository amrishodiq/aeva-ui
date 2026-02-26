# aeva-grid

A powerful grid system based on CSS Grid, designed for building responsive multi-column layouts and complex dashboards easily.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Fixed 3-Column Grid

```html
<aeva-grid columns="3" gap="lg">
  <aeva-card>Item 1</aeva-card>
  <aeva-card>Item 2</aeva-card>
  <aeva-card>Item 3</aeva-card>
</aeva-grid>
```

### Auto-responsive Grid (Cards)

```html
<aeva-grid columns="auto-fit" gap="md" style="--aeva-grid-auto-min-width: 280px;">
  <!-- Cards will wrap automatically based on 280px minimum -->
  <aeva-card>Card A</aeva-card>
  <aeva-card>Card B</aeva-card>
  <aeva-card>Card C</aeva-card>
</aeva-grid>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `'1' \| '2' \| '3' \| '4' \| '6' \| '12' \| 'auto-fit' \| 'auto-fill'` | `'3'` | Column configuration |
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Spacing between grid items |
| `align-items`| `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Vertical alignment of items |
| `justify-items`| `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Horizontal alignment of items |

## Responsive Behavior

- `columns="2-12"`: Automatically collapses to **1 column** on mobile (< 768px) and **2 columns** on tablets.
- `auto-fit/auto-fill`: Uses CSS `repeat(auto-fit, minmax(...))` for intrinsic responsiveness.

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-grid-gap-md` | `1rem` | Spacing value for 'md' gap |
| `--aeva-grid-auto-min-width`| `250px` | Min-width for auto columns |
| `--aeva-grid-auto-max-width`| `1fr` | Max-width for auto columns |

## Accessibility

- ✅ Works with standard focus order (DOM order)
- ✅ `display: grid` preserved for screen readers
- ✅ Logical layout flow by default

## TypeScript Support

```typescript
import { AevaGrid } from '@aeva/ui';
```
