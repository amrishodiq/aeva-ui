# aeva-card

A clean, versatile card component for grouping related content. Follows a minimal design aesthetic with solid borders and no default shadows.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Layout

```html
<aeva-card>
  <h3 slot="header">Card Title</h3>
  <p>Main content goes here.</p>
  <div slot="footer">Card Footer</div>
</aeva-card>
```

### Interactive (Clickable)

```html
<aeva-card interactive id="my-card">
  <p>Click me to trigger an action!</p>
</aeva-card>

<script>
  document.getElementById('my-card').addEventListener('card-click', () => {
    alert('Card clicked!');
  });
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `interactive` | `boolean` | `false` | Adds hover effects and click events |
| `padding` | `'sm' \| 'md' \| 'lg'` | `'md'` | Content padding size |

## Slots

| Slot | Description |
|------|-------------|
| `(default)` | Fallback main content area |
| `header` | Specialized header section (top) |
| `body` | Main content area (explicitly defined) |
| `footer` | Specialized footer section (bottom) |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `card-click` | - | Fired when an interactive card is clicked |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-card-bg` | Background color | `#ffffff` |
| `--aeva-card-border-color` | Default border color | `#e5e7eb` |
| `--aeva-card-border-hover-color`| Border color on hover (interactive) | `#667eea` |
| `--aeva-card-border-radius` | Corner radius | `22px` |
| `--aeva-card-transition` | Transition timing | `all 0.2s ease` |
| `--aeva-card-height` | Card height constraint | `100%` |
| `--aeva-card-padding-sm` | Small padding value | `1rem` |
| `--aeva-card-padding-md` | Medium padding value | `1.5rem` |
| `--aeva-card-padding-lg` | Large padding value | `2rem` |

## Accessibility

- ✅ Uses `article` role by default
- ✅ Switches to `button` role when `interactive="true"`
- ✅ Full keyboard support (Enter/Space to click)
- ✅ Managed `tabindex` for interactive states

## TypeScript Support

```typescript
import { AevaCard } from '@aeva/ui';

const card = document.querySelector('aeva-card') as AevaCard;
card.interactive = true;
card.addEventListener('card-click', () => {
  // Handle click
});
```
