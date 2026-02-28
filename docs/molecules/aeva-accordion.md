# aeva-accordion

A container component for `aeva-accordion-item` elements, providing unified state management for single or multiple expansion modes.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage (Single Open)

By default, only one item can be open at a time. Opening a new item will close the previous one.

```html
<aeva-accordion>
  <aeva-accordion-item label="Section 1" open>
    <p>Content for section 1.</p>
  </aeva-accordion-item>
  <aeva-accordion-item label="Section 2">
    <p>Content for section 2.</p>
  </aeva-accordion-item>
</aeva-accordion>
```

### Multiple Open Mode

```html
<aeva-accordion multiple>
  <aeva-accordion-item label="Expandable 1">...</aeva-accordion-item>
  <aeva-accordion-item label="Expandable 2">...</aeva-accordion-item>
</aeva-accordion>
```

### Bordered Variant

```html
<aeva-accordion variant="bordered">
  <aeva-accordion-item label="Bordered Item 1">...</aeva-accordion-item>
  <aeva-accordion-item label="Bordered Item 2">...</aeva-accordion-item>
</aeva-accordion>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'flush' \| 'bordered'` | `'flush'` | Visual style variant |
| `multiple` | `boolean` | `false` | If true, multiple items can be expanded simultaneously |

## Events

| Event | Component | Detail | Description |
|-------|-----------|--------|-------------|
| `toggle` | `aeva-accordion-item` | `{ open: boolean }` | Fired when an item is expanded or collapsed |

## CSS Customization

### aeva-accordion
| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-accordion-bg` | Background color for the container | - |
| `--aeva-accordion-border-radius`| Corner radius for the container | - |

### aeva-accordion-item
| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-accordion-header-padding` | Padding for the header | - |
| `--aeva-accordion-header-hover-bg` | Header background on hover | - |
| `--aeva-accordion-content-padding` | Padding for expanded content | - |
| `--aeva-accordion-item-border-color`| Color for separators | - |

## Accessibility

- ✅ Manages `aeva-accordion-item` states collectively
- ✅ Keyboard-friendly: Tab through items and use Space/Enter to toggle
- ✅ Follows WAI-ARIA Accordion pattern recommendations

## TypeScript Support

```typescript
import { AevaAccordion } from '@aeva/ui';

const accordion = document.querySelector('aeva-accordion') as AevaAccordion;
accordion.multiple = true;
```
