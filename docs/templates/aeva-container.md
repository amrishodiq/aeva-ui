# aeva-container

A layout component with responsive max-width presets, used to center and contain page content with consistent horizontal spacing.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Centered Content (Standard)

```html
<aeva-container size="lg" padding="md">
  <h1>Page Title</h1>
  <p>Standard width content...</p>
</aeva-container>
```

### Full Width Section

```html
<aeva-container size="full" padding="none">
  <div style="background: var(--aeva-primary-color); height: 100px;">
    Edge-to-edge block
  </div>
</aeva-container>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` | Max-width breakpoint |
| `centered` | `boolean` | `true` | Applies `margin: auto` to center the block |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Horizontal internal padding |

## Size Presets

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `full`: 100%

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-container-max-width-lg` | `1024px` | Custom override for 'lg' size |
| `--aeva-container-padding-md` | `1.5rem` | Custom override for 'md' padding |

## Accessibility

- ✅ Purely structural component
- ✅ Uses semantic HTML nesting
- ✅ Ensures comfortable reading widths on large screens

## TypeScript Support

```typescript
import { AevaContainer } from '@aeva/ui';
// Usually used as a declarative wrapper in templates
```
