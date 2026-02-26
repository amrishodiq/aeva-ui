# aeva-popup-menu

A floating menu component that intelligently anchors to a trigger element. Perfect for dropdown menus, context menus, and pickers.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<button id="trigger">Open Menu</button>
<aeva-popup-menu id="menu">
  <aeva-list>
    <aeva-list-item label="Edit Profile"></aeva-list-item>
    <aeva-list-item label="Settings"></aeva-list-item>
    <aeva-list-item label="Logout"></aeva-list-item>
  </aeva-list>
</aeva-popup-menu>

<script>
  const trigger = document.getElementById('trigger');
  const menu = document.getElementById('menu');
  
  trigger.addEventListener('click', () => {
    menu.show(trigger); // Show anchored to button
  });
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls visibility |
| `auto-close`| `boolean` | `true` | Automatically closes when a list item is selected |
| `elevation` | `number` (1-5)| `3` | Shadow intensity level |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `open` | - | Fired when the menu opens |
| `close` | - | Fired when the menu closes |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-popup-bg` | glass-style | Background color (supports blur) |
| `--aeva-popup-border-radius` | `22px` | Corner radius |
| `--aeva-popup-min-width` | `200px` | Minimum width constraint |
| `--aeva-popup-max-width` | `600px` | Maximum width constraint |

## Accessibility

- ✅ Closes automatically on scroll or resize
- ✅ Dismisses on backdrop click
- ✅ Intelligent positioning to stay within viewport
- ✅ Smooth scaling animation from the anchor point

## TypeScript Support

```typescript
import { AevaPopupMenu } from '@aeva/ui';

const menu = document.querySelector('aeva-popup-menu') as AevaPopupMenu;
const btn = document.querySelector('button');

menu.show(btn);
```
