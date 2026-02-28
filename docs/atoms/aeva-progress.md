# aeva-progress

A versatile progress indicator supporting both horizontal and circular designs, with finite and infinite (loading) modes.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Horizontal Finite

```html
<aeva-progress 
  shape="horizontal" 
  mode="finite" 
  progress="65" 
  label="Uploading...">
</aeva-progress>
```

### Circular Infinite (Loading)

```html
<aeva-progress 
  shape="circular" 
  mode="infinite" 
  size="md">
</aeva-progress>
```

### With Custom Size and Style

```html
<aeva-progress 
  shape="circular" 
  progress="45" 
  size="lg"
  style="--aeva-progress-color: #10b981;">
</aeva-progress>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `shape` | `'circular' \| 'horizontal'` | `'horizontal'` | Visual form factor |
| `mode` | `'finite' \| 'infinite'` | `'finite'` | Finite (controlled) or Infinite (spinner) |
| `progress` | `number` | `0` | Current value (finite mode only) |
| `min` | `number` | `0` | Minimum progress value |
| `max` | `number` | `100` | Maximum progress value |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Predefined size variants |
| `label` | `string` | `''` | Text label displayed with the indicator |
| `show-percentage`| `boolean` | `true` | Show central percentage text (circular only) |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| - | - | This component does not dispatch custom events |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-progress-color` | Primary color of progress bar/stroke | - |
| `--aeva-progress-bg` | Background track color | - |
| `--aeva-progress-thickness` | Width of the line/stroke | - |
| `--aeva-progress-border-radius` | Rounding for horizontal bar | - |
| `--aeva-progress-animation-duration`| Speed of infinite animation | - |
| `--aeva-progress-label-color` | Color of the accompanying label | - |

## Accessibility

- ✅ Semantic `role="progressbar"`
- ✅ `aria-valuenow`, `min`, and `max` managed automatically
- ✅ Provides `aria-valuetext` for screen readers
- ✅ Label support for descriptive progress indicators

## TypeScript Support

```typescript
import { AevaProgress } from '@aeva/ui';

const pg = document.querySelector('aeva-progress') as AevaProgress;
pg.progress = 80;
```
