# aeva-stack

A fundamental layout component for arranging items in a linear stack (vertical or horizontal). Replaces complex flexbox CSS with a declarative API.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Vertical Stack (Default)

```html
<aeva-stack spacing="md">
  <aeva-text variant="h2">Title</aeva-text>
  <aeva-text>Description text...</aeva-text>
  <aeva-button>Continue</aeva-button>
</aeva-stack>
```

### Horizontal Align-Center Stack

```html
<aeva-stack direction="horizontal" align="center" spacing="sm">
  <aeva-icon name="info"></aeva-icon>
  <span>Helpful information here</span>
</aeva-stack>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Stack orientation |
| `spacing` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Gap between items |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| ...` | `'start'` | Main-axis justification |
| `wrap` | `boolean` | `false` | Enables flex-wrapping |

## Spacing Tokens

- `none`: 0
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)

## Accessibility

- ✅ Uses native Flexbox `gap`
- ✅ Maintains logical DOM order
- ✅ Perfectly suited for grouping form inputs or control sets

## TypeScript Support

```typescript
import { AevaStack } from '@aeva/ui';
```
