# aeva-icon

A flexible container for icons, emojis, or avatars with support for different shapes and border effects.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Simple SVG Icon

```html
<aeva-icon size="sm">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L1 21h22L12 2z"/>
  </svg>
</aeva-icon>
```

### Avatar Image

```html
<aeva-icon size="lg" shape="circle" border="solid">
  <img src="avatar.jpg" alt="User profile" />
</aeva-icon>
```

### With Fading Border

```html
<aeva-icon border="fading">
  <span>😊</span>
</aeva-icon>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Predefined size variants |
| `shape` | `'circle' \| 'rect' \| 'round-rect'` | `'circle'` | Container shape |
| `border` | `'none' \| 'solid' \| 'fading'` | `'none'` | Border effect style |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | The icon content (SVG, img, emoji, or text) |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| - | - | This component does not dispatch custom events |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-icon-bg` | Container background color | `#f5f5f5` |
| `--aeva-icon-color` | Default icon/text color | `#667eea` |
| `--aeva-icon-border-color` | Color for solid border | `#667eea` |
| `--aeva-icon-border-width` | Width for solid border | `2px` |
| `--aeva-icon-size-sm` | Small scale dimension | `40px` |
| `--aeva-icon-size-md` | Medium scale dimension | `56px` |
| `--aeva-icon-size-lg` | Large scale dimension | `72px` |

## Accessibility

- ✅ Responsive to `prefers-reduced-motion`
- ✅ Ensures image content uses `object-fit: cover`
- ✅ Centers all slotted content automatically

## TypeScript Support

```typescript
import { AevaIcon } from '@aeva/ui';

const icon = document.querySelector('aeva-icon') as AevaIcon;
icon.size = 'lg';
icon.shape = 'round-rect';
```
