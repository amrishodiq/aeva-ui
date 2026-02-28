# aeva-carousel

A high-performance carousel component for sliding content. Supports touch gestures, auto-play, navigation buttons, and indicator dots with smooth CSS transitions.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Carousel

```html
<aeva-carousel height="300px">
  <div style="background: #667eea; color: white;">Slide 1</div>
  <div style="background: #764ba2; color: white;">Slide 2</div>
  <div style="background: #6B8DD6; color: white;">Slide 3</div>
</aeva-carousel>
```

### Auto-play with Indicators

```html
<aeva-carousel 
  auto-play 
  auto-play-interval="5000" 
  loop>
  <img src="banner1.jpg" />
  <img src="banner2.jpg" />
</aeva-carousel>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `activeIndex` | `number` | `0` | State defining which slide is currently visible |
| `hide-nav` | `boolean` | `false` | Hides the Next/Prev arrow buttons |
| `hide-indicators`| `boolean` | `false` | Hides the bottom dot indicators |
| `auto-play` | `boolean` | `false` | Automatically cycles through slides |
| `auto-play-interval`| `number` | `3000` | Delay between cycles in milliseconds |
| `loop` | `boolean` | `true` | Continues to the first slide after the last |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `slide-change` | `{ activeIndex: number }` | Fired when the active slide changes |

## Methods

| Method | Description |
|--------|-------------|
| `goTo(index: number)` | Navigates to a specific slide |
| `next()` | Moves to the next slide |
| `prev()` | Moves to the previous slide |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-carousel-height` | Height of the container | `400px` |
| `--aeva-carousel-nav-bg` | Background of nav arrows | `rgba(0,0,0,0.5)`|
| `--aeva-carousel-nav-color` | Icon color of nav arrows | `white` |
| `--aeva-carousel-indicator-color`| Inactive dot color | - |
| `--aeva-carousel-indicator-active-color`| Active dot color | - |
| `--aeva-carousel-transition-duration`| Swipe/Fade timing | `300ms` |

## Accessibility

- ✅ Full keyboard support (Arrow keys)
- ✅ Pause on Hover/Focus (automatic for auto-play)
- ✅ Touch swipe gestures (left/right)
- ✅ ARIA labels for navigation buttons and indicators
- ✅ `role="region"` for section identification

## TypeScript Support

```typescript
import { AevaCarousel } from '@aeva/ui';

const carousel = document.querySelector('aeva-carousel') as AevaCarousel;
carousel.next();
carousel.addEventListener('slide-change', (e) => {
  console.log('Current index:', e.detail.activeIndex);
});
```
