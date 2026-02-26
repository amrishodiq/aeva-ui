# aeva-accordion-item

A versatile accordion item component for collapsible content sections. Designed to work within an `aeva-accordion` container or as a standalone component.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-accordion-item label="Click to expand">
  <p>This is the collapsible content area.</p>
</aeva-accordion-item>
```

### With Custom Header

```html
<aeva-accordion-item>
  <div slot="header" style="display: flex; align-items: center; gap: 8px;">
    <strong>Advanced Settings</strong>
    <aeva-badge variant="info" size="sm">Beta</aeva-badge>
  </div>
  <p>Control advanced system parameters here.</p>
</aeva-accordion-item>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | The text displayed in the header |
| `open` | `boolean` | `false` | Whether the item is expanded |
| `disabled` | `boolean` | `false` | Whether the item interaction is disabled |
| `no-border`| `boolean` | `false` | Removes the bottom border |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | The main content revealed when expanded |
| `header` | Optional slot to completely override the header content |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `toggle` | `{ open: boolean }` | Fired when the item is expanded or collapsed |

## CSS Customization

### Layout & Appearance

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-accordion-item-border-width` | `0px` | Bottom border width |
| `--aeva-accordion-item-border-color` | - | Bottom border color |
| `--aeva-accordion-header-padding` | - | Padding for the header button |
| `--aeva-accordion-content-padding` | - | Padding for the revealed content |
| `--aeva-accordion-transition` | - | Transition timing for hover/expand |
| `--aeva-accordion-header-hover-bg` | - | Background color on header hover |

## Accessibility

- ✅ Semantic `button` used for header interaction
- ✅ `aria-expanded` state managed automatically
- ✅ Keyboard support (Space/Enter to toggle)
- ✅ `role="region"` for content area
- ✅ Smooth spring-based animations with reduced motion fallback

## TypeScript Support

```typescript
import { AevaAccordionItem } from '@aeva/ui';

const item = document.querySelector('aeva-accordion-item') as AevaAccordionItem;
item.open = true;
item.addEventListener('toggle', (e) => {
  console.log('Expanded:', e.detail.open);
});
```
