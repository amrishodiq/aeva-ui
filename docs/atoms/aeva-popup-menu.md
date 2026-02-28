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

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-popup-bg` | Background color (supports blur) | `rgba(255, 255, 255, 0.7)` |
| `--aeva-popup-border-radius` | Corner radius | `22px` |
| `--aeva-popup-min-width` | Minimum width constraint | `200px` |
| `--aeva-popup-max-width` | Maximum width constraint | `600px` |
| `--aeva-popup-shadow-color` | Shadow color | `rgba(0, 0, 0, 0.2)` |

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
