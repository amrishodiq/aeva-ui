# aeva-slider

A premium slider component with smooth spring-based physics for track filling and thumb scaling.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-slider 
  label="Volume" 
  min="0" 
  max="100" 
  value="50">
</aeva-slider>
```

### With Custom Step

```html
<aeva-slider 
  label="Brightness" 
  min="0" 
  max="1" 
  step="0.1" 
  value="0.7" 
  id="brightness-slider">
</aeva-slider>

<script>
  document.getElementById('brightness-slider').addEventListener('input', (e) => {
    console.log('Sliding:', e.detail.value);
  });
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `min` | `number` | `0` | Minimum possible value |
| `max` | `number` | `100` | Maximum possible value |
| `step` | `number` | `1` | Increment value |
| `label` | `string` | `''` | Text label displayed above the slider |
| `disabled` | `boolean` | `false` | Prevents interaction and dims appearance |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `input` | `{ value: number }` | Fired continuously as the user drags the slider |
| `change` | `{ value: number }` | Fired when the user releases the slider |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-slider-track-height` | Height of the track line | `4px` |
| `--aeva-slider-track-bg` | Background color of the full track | - |
| `--aeva-slider-fill-bg` | Color of the progress fill | - |
| `--aeva-slider-thumb-size` | Dimension of the slider knob | `16px` |
| `--aeva-slider-thumb-bg` | Color of the knob | - |
| `--aeva-slider-thumb-border` | Border for the knob | - |
| `--aeva-slider-thumb-shadow` | Shadow for the knob | - |

## Accessibility

- ✅ Built on top of native `<input type="range">`
- ✅ High contrast focus rings
- ✅ Minimum 44x44px touch target via transparent hit area
- ✅ Smooth spring-based visual transitions

## TypeScript Support

```typescript
import { AevaSlider } from '@aeva/ui';

const slider = document.querySelector('aeva-slider') as AevaSlider;
slider.value = 75;
```
