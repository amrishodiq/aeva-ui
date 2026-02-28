# Skeleton

Skeletons are placeholder elements that represent content before it's fully loaded, improving perceived performance.

## Import

```javascript
import { AevaSkeleton } from '@aeva/ui';
// or
import '@aeva/ui/dist/components/atoms/aeva-skeleton.js';
```

## Basic Usage

Skeleton defaults to a "text" shape and a "pulse" animation.

```html
<aeva-skeleton width="60%"></aeva-skeleton>
```

## Shapes

Match the shape of your skeleton to the content that will eventually load.

```html
<!-- Text shape (adapts to its container's line-height) -->
<aeva-skeleton shape="text" width="60%"></aeva-skeleton>
<aeva-skeleton shape="text" width="40%"></aeva-skeleton>

<!-- Circular shape -->
<aeva-skeleton shape="circular" width="48px" height="48px"></aeva-skeleton>

<!-- Rectangular shape -->
<aeva-skeleton shape="rectangular" width="200px" height="150px"></aeva-skeleton>
```

## Animations

By default, the skeleton uses a subtle pulsing animation. You can change this to a wave shimmer effect, or disable the animation completely.

*Note: For users with `prefers-reduced-motion: reduce`, animations are automatically disabled.*

```html
<!-- Default pulse animation -->
<aeva-skeleton shape="text" width="100%"></aeva-skeleton>

<!-- Wave animation -->
<aeva-skeleton shape="rectangular" animation="wave" height="100px" width="100%"></aeva-skeleton>

<!-- No animation -->
<aeva-skeleton shape="circular" animation="none" width="48px" height="48px"></aeva-skeleton>
```

## Creating Realistic Layouts

Combine Skeleton primitives to form complex loading states that resemble your components, like Cards or Lists.

```html
<div style="display: flex; gap: 16px; align-items: center;">
    <aeva-skeleton shape="circular" width="40px" height="40px"></aeva-skeleton>
    <div style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
        <aeva-skeleton shape="text" width="80%"></aeva-skeleton>
        <aeva-skeleton shape="text" width="50%"></aeva-skeleton>
    </div>
</div>
```

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `shape` | `"text" \| "circular" \| "rectangular"` | `"text"` | Defines the visual form of the component. |
| `animation` | `"pulse" \| "wave" \| "none"` | `"pulse"` | Controls the loading animation state. |
| `width` | `string` | `undefined` | Explicitly sets the CSS width. |
| `height` | `string` | `undefined` | Explicitly sets the CSS height. |

## CSS Custom Properties

| CSS Variable | Default | Description |
|---|---|---|
| `--aeva-skeleton-bg` | `rgba(150, 150, 150, 0.2)` | The base background color of the shape. |
| `--aeva-skeleton-wave-color` | `rgba(255, 255, 255, 0.4)` | The highlight color used in the wave animation. |
| `--aeva-skeleton-border-radius` | `4px` | Border radius for `text` and `rectangular` shapes. |
| `--aeva-skeleton-animation-duration` | `1.5s` | Timing duration for `pulse` and `wave` animations. |
