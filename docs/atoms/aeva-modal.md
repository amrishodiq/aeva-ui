# aeva-modal

A premium modal overlay component with glassmorphism backdrop effects, smooth spring animations, and advanced focus management.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-modal id="welcome-modal">
  <h2>Welcome to Aeva UI</h2>
  <p>This is a premium modal with glass effects.</p>
  <aeva-button @click="${() => document.getElementById('welcome-modal').close()}">
    Close
  </aeva-button>
</aeva-modal>

<script>
  const modal = document.getElementById('welcome-modal');
  modal.open = true; // Open the modal
</script>
```

### Advanced Configuration

```html
<aeva-modal 
  elevation="5" 
  blur-amount="20" 
  close-on-backdrop="false">
  <p>High elevation modal with extra blur.</p>
</aeva-modal>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Whether the modal is currently visible |
| `backdrop` | `boolean` | `true` | Whether to show the dark overlay backdrop |
| `close-on-backdrop` | `boolean` | `true` | Close the modal when clicking outside |
| `close-on-esc` | `boolean` | `true` | Close the modal when pressing Escape |
| `elevation` | `number` (1-5)| `3` | Shadow intensity level |
| `blur-amount` | `number` | `10` | Intensity of backdrop-filter blur (px) |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `open` | - | Fired when the modal starts opening |
| `close` | - | Fired when the modal starts closing |
| `backdrop-click`| - | Fired when the backdrop is clicked |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-modal-bg` | `rgba(255, 255, 255, 0.7)` | Modal background (supports glass) |
| `--aeva-modal-backdrop-bg` | `rgba(0, 0, 0, 0.4)` | Backdrop overlay color |
| `--aeva-modal-border-color` | `rgba(255, 255, 255, 0.5)`| Glass-style border color |
| `--aeva-modal-border-radius`| `22px` | Corner radius |
| `--aeva-modal-padding` | `2rem` | Internal padding |
| `--aeva-modal-max-width` | `600px` (variable by screen)| Maximum width |
| `--aeva-modal-blur` | `10px` | Computed blur value |

## Accessibility

- ✅ Automatic body scroll lock when open
- ✅ Focus trapping and restoration (`aria-modal="true"`)
- ✅ Keyboard support (Escape key)
- ✅ Screen reader support via `role="dialog"`
- ✅ Back-button support (History API integration)
- ✅ Minimum touch targets and responsive sizing

## TypeScript Support

```typescript
import { AevaModal } from '@aeva/ui';

const modal = document.querySelector('aeva-modal') as AevaModal;
modal.open = true;

// Programmatic close with animation
await modal.close();
```
