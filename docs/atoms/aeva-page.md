# aeva-page

A full-screen page component designed for mobile-first applications and immersive web experiences. Features hardware back-button support and smooth slide-in animations.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-page id="settings-page">
  <div style="padding: 2rem;">
    <h1>Settings</h1>
    <p>Configure your profile here.</p>
    <aeva-button @click="${() => document.getElementById('settings-page').close()}">
      Back home
    </aeva-button>
  </div>
</aeva-page>

<script>
  const page = document.getElementById('settings-page');
  page.open = true; // Show the page
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls the visibility/open state |
| `background`| `string` | `''` | Custom CSS background (color, gradient, etc.) |
| `close-on-backdrop` | `boolean` | `true` | Close the page when clicking the backdrop |
| `blur-amount` | `number` | `10` | Backdrop blur intensity in pixels |
| `disable-history` | `boolean` | `false` | If true, disables back-button history integration |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `open` | - | Fired when the page starts opening |
| `close` | - | Fired when the page starts closing |
| `backdrop-click`| - | Fired when the backdrop overlay is clicked |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-page-background` | `white` | Main surface background |
| `--aeva-page-backdrop-bg` | `rgba(0,0,0,0.5)`| Overlay color |
| `--aeva-page-z-index` | `2000` | Layer priority |

## Accessibility

- ✅ Semantic `role="dialog"` and `aria-modal="true"`
- ✅ Automatic body scroll locking
- ✅ Focus management and restoration
- ✅ Hardware back-button integration (Android/Web)
- ✅ Smooth slide-in from right animation with spring physics

## TypeScript Support

```typescript
import { AevaPage } from '@aeva/ui';

const page = document.querySelector('aeva-page') as AevaPage;
page.open = true;

// Programmatic control
await page.close();
```
