# aeva-masonry

A true Masonry (Pinterest-style) layout component that arranges items in columns while preserving their natural height. Uses high-performance CSS columns.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Auto-responsive Masonry

```html
<aeva-masonry columns="auto" gap="md">
  <aeva-card>Short card</aeva-card>
  <aeva-card>Very long content card...</aeva-card>
  <aeva-card>Medium card</aeva-card>
</aeva-masonry>
```

### Fixed Column Masonry

```html
<aeva-masonry columns="3" gap="20">
  <!-- Content cards -->
</aeva-masonry>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `'auto' \| '1' \| '2' \| '3' \| '4' \| '5'` | `'auto'` | Number of columns |
| `gap` | `string \| number` | `16` | Spacing between items (px or tokens like 'md') |

## Gap Tokens

You can pass standard tokens to the `gap` property:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px

## Features

- ✅ **No Breaking**: Automatically prevents items from breaking across columns.
- ✅ **Viewport Optimized**: 'auto' mode intelligently adjusts columns from 1 (mobile) to 4+ (wide screens).
- ✅ **Dynamic Content**: Handles images and varying text lengths without layout shifts.

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-masonry-gap` | `16px` | Internal gap value |

## Accessibility

- ✅ Maintains logical top-down column priority
- ✅ Works with any block-level child components

## TypeScript Support

```typescript
import { AevaMasonry } from '@aeva/ui';
```
