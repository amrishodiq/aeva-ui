# aeva-bento-grid

A layout component that provides predefined asymmetric "Bento Box" grid patterns. Perfect for modern feature showcases and dashboard landing pages.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Feature Preset

The 'feature' preset creates 1 large 2x2 block followed by smaller 1x1 blocks.

```html
<aeva-bento-grid preset="feature">
  <aeva-card>Large Feature</aeva-card>
  <aeva-card>Small 1</aeva-card>
  <aeva-card>Small 2</aeva-card>
  <aeva-card>Small 3</aeva-card>
</aeva-bento-grid>
```

### Dashboard Preset

Creates a varied layout suitable for complex analytics views.

```html
<aeva-bento-grid preset="dashboard">
  <aeva-card>Primary Chart</aeva-card>
  <aeva-card>Stat 1</aeva-card>
  <aeva-card>Stat 2</aeva-card>
  <aeva-card>Medium 1</aeva-card>
  <aeva-card>Medium 2</aeva-card>
</aeva-bento-grid>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `preset` | `'feature' \| 'masonry' \| 'dashboard' \| 'sidebar' \| 'spotlight' \| 'custom'` | `'feature'` | The grid pattern to apply |

## Preset Patterns

- **feature**: 1st child spans 2x2.
- **masonry**: Uses 3 columns with varying row spans for items 1 and 3.
- **dashboard**: 1st child spans 4x2 in a 6-column grid.
- **sidebar**: 1st child spans 2x3 (a large content area) next to a column of small items.
- **spotlight**: 1st child spans full width (4 columns) as a hero.

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-bento-grid-gap` | `1rem` | Spacing between cells |
| `--aeva-bento-grid-min-height`| `200px` | Base height for grid rows |

## Accessibility

- ✅ Preserves logical DOM order for screen readers
- ✅ Responsive: Collapses to a single column on mobile (< 768px)
- ✅ Handles varied content heights gracefully

## TypeScript Support

```typescript
import { AevaBentoGrid } from '@aeva/ui';
```
