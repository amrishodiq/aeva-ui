# aeva-tab-item

An individual tab button component, designed for use within `aeva-tabs`.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-tab-item label="Profile" active></aeva-tab-item>
<aeva-tab-item label="Settings"></aeva-tab-item>
```

### With Icon

```html
<aeva-tab-item label="Gallery">
  <svg slot="icon" viewBox="0 0 24 24">...</svg>
</aeva-tab-item>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | The text label for the tab |
| `active` | `boolean` | `false` | Whether this tab is currently selected |
| `disabled` | `boolean` | `false` | Prevents interaction |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Fallback area for label content |
| `icon` | Optional area for an icon before the label |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-tab-padding` | `12px 20px` | Internal padding |
| `--aeva-tab-active-color` | - | Text/Line color when active |
| `--aeva-tab-inactive-color` | - | Text color when inactive |
| `--aeva-tab-hover-bg` | - | Background on hover |
| `--aeva-tab-transition` | - | Animation timing |

## Accessibility

- ✅ Semantic `button` used under the hood
- ✅ High contrast state indicators
- ✅ Hover and active focus states
- ✅ Supports screen readers via proper labeling

## TypeScript Support

```typescript
import { AevaTabItem } from '@aeva/ui';

const tab = document.querySelector('aeva-tab-item') as AevaTabItem;
tab.active = true;
```
