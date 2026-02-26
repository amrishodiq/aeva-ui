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

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-icon-bg` | `#f5f5f5` | Container background color |
| `--aeva-icon-color` | `#667eea` | Default icon/text color |
| `--aeva-icon-border-color` | `#667eea` | Color for solid border |
| `--aeva-icon-border-width` | `2px` | Width for solid border |

### Custom Sizes
- `--aeva-icon-size-sm`: default `40px`
- `--aeva-icon-size-md`: default `56px`
- `--aeva-icon-size-lg`: default `72px`

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
