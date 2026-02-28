# aeva-sidebar

A sophisticated, responsive sidebar component that automatically adapts its layout to different screen sizes. Features drawer mode for mobile, icon-only mode for tablets, and full navigation for desktops.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Desktop Sidebar

```html
<aeva-sidebar>
  <div slot="header">
    <aeva-text variant="h3">Aeva App</aeva-text>
  </div>
  
  <aeva-list>
    <aeva-list-item label="Home" active>
      <aeva-icon slot="icon" name="home"></aeva-icon>
    </aeva-list-item>
    <aeva-list-item label="Projects">
      <aeva-icon slot="icon" name="folder"></aeva-icon>
    </aeva-list-item>
  </aeva-list>

  <div slot="footer">
    <aeva-list-item label="Settings">
      <aeva-icon slot="icon" name="settings"></aeva-icon>
    </aeva-list-item>
  </div>
</aeva-sidebar>
```

### Mobile Responsive Drawer

The sidebar automatically hides on mobile (< 768px). Use the `open` property to toggle visibility.

```html
<aeva-sidebar id="drawer" close-on-navigate></aeva-sidebar>

<script>
  const sidebar = document.getElementById('drawer');
  // Toggle this on menu button click
  sidebar.toggle(); 
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `'left' \| 'right'` | `'left'` | Which side the sidebar docks to |
| `width` | `'sm' \| 'md' \| 'lg'` | `'md'` | Desktop width variant (200px to 320px) |
| `open` | `boolean` | `false` | Controls visibility in mobile drawer mode |
| `glassmorphism` | `boolean` | `false` | Enables transparent blur effect |
| `staticMode` | `boolean` | `false` | Disables fixed positioning (internal use) |
| `close-on-navigate`| `boolean`| `true` | Auto-closes drawer when an item is clicked |

## Slots

| Slot | Description |
|------|-------------|
| `header` | Area above navigation (logos, titles) |
| `(default)`| Main content area (usually `aeva-list`) |
| `footer` | Bottom area (profile, logout, settings) |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `sidebar-toggle` | `{ open: boolean }` | Fired when the sidebar opens or closes. |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-sidebar-bg` | Primary background color | - |
| `--aeva-sidebar-width-md` | Base width for desktop | `280px` |
| `--aeva-sidebar-icon-width` | Width in tablet (icon-only) mode | `72px` |
| `--aeva-sidebar-transition` | Slide animation timing | `0.3s` |

## Accessibility

- ✅ **Automatic Viewport Detection**: Optimizes layout for all devices.
- ✅ **Backdrop support**: Mobile drawer includes a dimming backdrop for focus.
- ✅ **Z-Index Management**: Automatically manages stacking context during transitions.
- ✅ **Keyboard Friendly**: Esc closing (planned) and focus trapping considerations.

## TypeScript Support

```typescript
import { AevaSidebar } from '@aeva/ui';

const sidebar = document.querySelector('aeva-sidebar') as AevaSidebar;
sidebar.toggle();
```
