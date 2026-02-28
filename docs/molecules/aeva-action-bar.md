# aeva-action-bar

A flexible layout component for grouping action buttons (Atoms) at the bottom of pages, modals, or forms. Supports glassmorphism and sticky positioning.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Modal Actions (Right-aligned)

```html
<aeva-action-bar align="end">
  <aeva-button variant="ghost">Cancel</aeva-button>
  <aeva-button>Save Changes</aeva-button>
</aeva-action-bar>
```

### Primary & Secondary Groups

```html
<aeva-action-bar align="space-between">
  <div slot="secondary">
    <aeva-button variant="danger">Delete</aeva-button>
  </div>
  <div slot="primary">
    <aeva-button variant="ghost">Cancel</aeva-button>
    <aeva-button>Publish</aeva-button>
  </div>
</aeva-action-bar>
```

### Sticky Glassmorphism

```html
<aeva-action-bar sticky glassmorphism padding="lg">
  <aeva-button fullWidth>Agree and Continue</aeva-button>
</aeva-action-bar>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `layout` | `'horizontal' \| 'vertical' \| 'responsive'` | `'horizontal'` | Box layout direction |
| `align` | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around'` | `'space-between'` | Flexbox justification |
| `gap` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Spacing between items |
| `padding` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Internal padding |
| `sticky` | `boolean` | `false` | Fixes the bar to the bottom of its container |
| `glassmorphism` | `boolean` | `false` | Enables premium blur/transparency effect |

## Slots

| Slot | Description |
|------|-------------|
| `primary` | Main action area (right/bottom) |
| `secondary`| Supplemental action area (left/top) |
| `(default)`| Fallback for primary actions |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| - | - | This component does not dispatch custom events |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-action-bar-bg` | Base background color | `transparent` |
| `--aeva-action-bar-sticky-bg` | Background in sticky/glass mode | `rgba(255, 255, 255, 0.95)` |
| `--aeva-action-bar-sticky-blur` | Blur amount for glass effect | `10px` |
| `--aeva-action-bar-border-top` | Top border style | - |
| `--aeva-action-bar-border-bottom`| Bottom border style | - |
| `--aeva-action-bar-drop-shadow` | Shadow for the bar | - |

## Accessibility

- ✅ Responsive layout automatically switches to vertical on mobile
- ✅ Uses `display: flex` with gap for clean spacing
- ✅ Sticky mode respects parent container boundaries

## TypeScript Support

```typescript
import { AevaActionBar } from '@aeva/ui';

const actionBar = document.querySelector('aeva-action-bar') as AevaActionBar;
actionBar.sticky = true;
actionBar.glassmorphism = true;
```
