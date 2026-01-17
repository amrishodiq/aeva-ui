# aeva-button

A versatile button component with multiple variants, sizes, and states. Supports text, icons, and combinations with full accessibility support.

## Installation

```bash
npm install @aeva/ui
```

## Basic Usage

```html
<script type="module">
  import '@aeva/ui';
</script>

<aeva-button>Click Me</aeva-button>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether the button is in loading state |
| `full-width` | `boolean` | `false` | Whether the button should take full width |
| `icon-only` | `boolean` | `false` | Whether this is an icon-only button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type attribute |
| `aria-label` | `string \| null` | `null` | Aria label for accessibility (required for icon-only buttons) |

## Variants

### Primary
Default variant for main actions.

```html
<aeva-button variant="primary">Primary Button</aeva-button>
```

### Secondary
For secondary actions.

```html
<aeva-button variant="secondary">Secondary Button</aeva-button>
```

### Outline
Transparent with border for subtle actions.

```html
<aeva-button variant="outline">Outline Button</aeva-button>
```

### Ghost
Minimal style with no background.

```html
<aeva-button variant="ghost">Ghost Button</aeva-button>
```

### Danger
For destructive actions.

```html
<aeva-button variant="danger">Delete</aeva-button>
```

## Sizes

```html
<aeva-button size="sm">Small</aeva-button>
<aeva-button size="md">Medium</aeva-button>
<aeva-button size="lg">Large</aeva-button>
```

## Icon Support

### Icon Left

```html
<aeva-button>
  <svg slot="icon-left" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
  </svg>
  Add Item
</aeva-button>
```

### Icon Right

```html
<aeva-button>
  Next
  <svg slot="icon-right" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
  </svg>
</aeva-button>
```

### Icon Only

```html
<aeva-button icon-only aria-label="Search">
  <svg slot="icon-only" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </svg>
</aeva-button>
```

**Important:** Always provide `aria-label` for icon-only buttons for accessibility.

## States

### Disabled

```html
<aeva-button disabled>Disabled Button</aeva-button>
```

### Loading

```html
<aeva-button loading>Processing...</aeva-button>
```

### Full Width

```html
<aeva-button full-width>Full Width Button</aeva-button>
```

## CSS Customization

The button component exposes 40+ CSS custom properties for theming.

### Basic Customization

```css
aeva-button {
  --aeva-button-primary-bg: #10b981;
  --aeva-button-primary-hover-bg: #059669;
  --aeva-button-border-radius: 8px;
}
```

### All CSS Variables

#### General

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-button-font-family` | System fonts | Font family |
| `--aeva-button-border-radius` | `50vh` | Border radius (fully rounded by default) |
| `--aeva-button-transition` | `all 0.2s ease-in-out` | Transition timing |
| `--aeva-button-gap` | `8px` | Gap between icon and text |

#### Focus Ring

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-button-focus-ring-color` | `#667eea` | Focus ring color |
| `--aeva-button-focus-ring-width` | `3px` | Focus ring width |
| `--aeva-button-focus-ring-offset` | `2px` | Focus ring offset |

#### Primary Variant

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-button-primary-bg` | `#667eea` | Background color |
| `--aeva-button-primary-color` | `#ffffff` | Text color |
| `--aeva-button-primary-hover-bg` | `#5568d3` | Hover background |
| `--aeva-button-primary-active-bg` | `#4451b8` | Active background |

#### Secondary Variant

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-button-secondary-bg` | `#6c757d` | Background color |
| `--aeva-button-secondary-color` | `#ffffff` | Text color |
| `--aeva-button-secondary-hover-bg` | `#5a6268` | Hover background |
| `--aeva-button-secondary-active-bg` | `#545b62` | Active background |

#### Outline Variant

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-button-outline-border-color` | `#667eea` | Border color |
| `--aeva-button-outline-color` | `#667eea` | Text color |
| `--aeva-button-outline-hover-bg` | `rgba(102, 126, 234, 0.1)` | Hover background |
| `--aeva-button-outline-active-bg` | `rgba(102, 126, 234, 0.2)` | Active background |

#### Ghost Variant

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-button-ghost-color` | `#667eea` | Text color |
| `--aeva-button-ghost-hover-bg` | `rgba(102, 126, 234, 0.1)` | Hover background |
| `--aeva-button-ghost-active-bg` | `rgba(102, 126, 234, 0.2)` | Active background |

#### Danger Variant

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-button-danger-bg` | `#dc3545` | Background color |
| `--aeva-button-danger-color` | `#ffffff` | Text color |
| `--aeva-button-danger-hover-bg` | `#c82333` | Hover background |
| `--aeva-button-danger-active-bg` | `#bd2130` | Active background |

#### Disabled State

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-button-disabled-opacity` | `0.5` | Opacity when disabled |
| `--aeva-button-disabled-cursor` | `not-allowed` | Cursor when disabled |

#### Sizes

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-button-padding-sm` | `8px 32px` | Small button padding |
| `--aeva-button-font-size-sm` | `14px` | Small button font size |
| `--aeva-button-padding-md` | `12px 48px` | Medium button padding |
| `--aeva-button-font-size-md` | `16px` | Medium button font size |
| `--aeva-button-padding-lg` | `16px 64px` | Large button padding |
| `--aeva-button-font-size-lg` | `18px` | Large button font size |

#### Icon-Only Sizes

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-button-icon-padding-sm` | `10px` | Small icon button padding |
| `--aeva-button-icon-width-sm` | `44px` | Small icon button width |
| `--aeva-button-icon-padding-md` | `12px` | Medium icon button padding |
| `--aeva-button-icon-width-md` | `44px` | Medium icon button width |
| `--aeva-button-icon-padding-lg` | `14px` | Large icon button padding |
| `--aeva-button-icon-width-lg` | `48px` | Large icon button width |

## Advanced Examples

### Custom Theme

```css
/* Green theme */
aeva-button {
  --aeva-button-primary-bg: #10b981;
  --aeva-button-primary-hover-bg: #059669;
  --aeva-button-primary-active-bg: #047857;
  --aeva-button-border-radius: 8px;
  --aeva-button-gap: 12px;
}
```

### Scoped Customization

```css
/* Only buttons in .hero section */
.hero aeva-button {
  --aeva-button-padding-md: 16px 64px;
  --aeva-button-font-size-md: 18px;
}
```

### Complex Button

```html
<aeva-button variant="danger" size="lg" full-width>
  <svg slot="icon-left" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
  </svg>
  Delete Account
</aeva-button>
```

## Accessibility

- ✅ Minimum 44x44px hit area (WCAG 2.1 Level AAA)
- ✅ Focus ring with 3px outline and 2px offset
- ✅ `aria-label` support for icon-only buttons
- ✅ `aria-busy="true"` during loading state
- ✅ Proper disabled state handling
- ✅ Keyboard navigation support

## Browser Support

- Chrome 79+ (2019)
- Firefox 71+ (2019)
- Safari 13+ (2019)
- Edge 79+ (2020)

**Enhanced features** (color-mix for dynamic shadows):
- Chrome 111+ (2023)
- Firefox 113+ (2023)
- Safari 16.2+ (2022)
- Edge 111+ (2023)

## Slots

| Slot | Description |
|------|-------------|
| (default) | Button text content |
| `icon-left` | Icon on the left side of text |
| `icon-right` | Icon on the right side of text |
| `icon-only` | Icon for icon-only button (use with `icon-only` attribute) |

## Best Practices

1. **Icon-only buttons**: Always provide `aria-label`
   ```html
   <aeva-button icon-only aria-label="Close">
     <svg slot="icon-only">...</svg>
   </aeva-button>
   ```

2. **Loading state**: Use for async operations
   ```html
   <aeva-button loading>Saving...</aeva-button>
   ```

3. **Danger variant**: Use for destructive actions
   ```html
   <aeva-button variant="danger">Delete</aeva-button>
   ```

4. **Don't mix slots**: Avoid using `icon-only` with other slots
   ```html
   <!-- ❌ Bad -->
   <aeva-button>
     <svg slot="icon-only">...</svg>
     <svg slot="icon-left">...</svg>
     Text
   </aeva-button>
   
   <!-- ✅ Good -->
   <aeva-button icon-only>
     <svg slot="icon-only">...</svg>
   </aeva-button>
   ```

## TypeScript

The component is fully typed and exports its interface:

```typescript
import type { AevaButton } from '@aeva/ui';

const button = document.querySelector('aeva-button') as AevaButton;
button.variant = 'primary';
button.loading = true;
```
