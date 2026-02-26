# aeva-section

A flexible structural component for organizing page sections into header, body, and footer areas. Supports sticky parts and consistent spacing.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Standard Section

```html
<aeva-section padding="md" gap="sm">
  <div slot="header">
    <h2>Section Title</h2>
  </div>
  
  <p>Main body content goes here...</p>

  <div slot="footer">
    <aeva-button>Action</aeva-button>
  </div>
</aeva-section>
```

### Full-Height Sticky Board

```html
<aeva-section full-height sticky-header sticky-footer>
  <div slot="header" style="background: white;">Toolbar</div>
  <div style="height: 2000px;">Scrollable main area</div>
  <div slot="footer" style="background: #f9f9f9;">Status bar</div>
</aeva-section>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'none'` | Spacing between slots |
| `padding` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'none'` | Outer padding of the section |
| `full-height` | `boolean` | `false` | Sets `height: 100%` on the container |
| `sticky-header`| `boolean` | `false` | Makes the header stick to the top |
| `sticky-footer`| `boolean` | `false` | Makes the footer stick to the bottom |

## Slots

| Slot | Description |
|------|-------------|
| `header` | Top content area |
| `(default)`| Main body content |
| `body` | Explicit body area (alternative to default) |
| `footer` | Bottom content area |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-section-header-padding` | `0` | Header-specific padding |
| `--aeva-section-body-padding` | `0` | Body-specific padding |
| `--aeva-section-footer-padding` | `0` | Footer-specific padding |

## Accessibility

- ✅ Semantic `div` structure
- ✅ Supports secondary `section` roles
- ✅ Handles overflow internally in the body slot

## TypeScript Support

```typescript
import { AevaSection } from '@aeva/ui';
```
