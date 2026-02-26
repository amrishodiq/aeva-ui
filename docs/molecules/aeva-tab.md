# aeva-tab

A premium tab container featuring a morphing background selection indicator and smooth spring physics. Supports horizontal scrolling on mobile.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-tab id="main-tabs">
  <aeva-tab-item label="Dashboard" active></aeva-tab-item>
  <aeva-tab-item label="Analytics"></aeva-tab-item>
  <aeva-tab-item label="Settings"></aeva-tab-item>
</aeva-tab>

<script>
  document.getElementById('main-tabs').addEventListener('tab-changed', (e) => {
    console.log('Switched to:', e.detail.label);
  });
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `active` | `number` | `0` | The index of the currently selected tab |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `tab-changed` | `{ previousIndex, currentIndex, label }` | Fired when the active tab is changed |

## CSS Customization

| Variable | Default | Description |
|----------|---------|-------------|
| `--aeva-tab-bg` | - | Container background |
| `--aeva-tab-active-bg` | - | Background color of the active indicator |
| `--aeva-tab-padding` | - | Padding around the indicator track |
| `--aeva-tab-gap` | - | Spacing between tab buttons |
| `--aeva-tab-border-radius` | - | Corner radius for container & indicator |

## Accessibility

- ✅ Semantic `role="tablist"` management
- ✅ Keyboard Navigation: Arrow keys to switch, Home/End to jump
- ✅ Intelligent Scroll-into-view: Keeps active tab visible on mobile
- ✅ Smooth spring-based morphing indicator

## TypeScript Support

```typescript
import { AevaTab } from '@aeva/ui';

const tabs = document.querySelector('aeva-tab') as AevaTab;
tabs.active = 1;
```
