# Bento Grid

A bento grid component with preset asymmetric layouts inspired by Japanese bento boxes.

## Installation

The component is included in the `@aeva/ui` package:

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage with Presets

```html
<aeva-bento-grid preset="feature">
  <aeva-card>Large featured card</aeva-card>
  <aeva-card>Small card 1</aeva-card>
  <aeva-card>Small card 2</aeva-card>
  <aeva-card>Small card 3</aeva-card>
</aeva-bento-grid>
```

### Custom Layout with Grid Items

```html
<aeva-grid columns="4" gap="md">
  <aeva-grid-item col-span="2" row-span="2">
    <aeva-card>2x2 large card</aeva-card>
  </aeva-grid-item>
  <aeva-grid-item col-span="1" row-span="1">
    <aeva-card>1x1 small card</aeva-card>
  </aeva-grid-item>
</aeva-grid>
```

## Properties

### aeva-bento-grid

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `preset` | `'feature' \| 'masonry' \| 'dashboard' \| 'sidebar' \| 'spotlight' \| 'custom'` | `'feature'` | Preset layout pattern |

### aeva-grid-item

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `col-span` | `number` | `1` | Number of columns to span |
| `row-span` | `number` | `1` | Number of rows to span |
| `col-start` | `number` | `undefined` | Column start position (1-indexed) |
| `row-start` | `number` | `undefined` | Row start position (1-indexed) |

## Preset Layouts

### Feature
1 large card (2x2) + 3 small cards (1x1) - Perfect for highlighting main content with supporting stats.

```html
<aeva-bento-grid preset="feature">
  <!-- 4 cards total -->
</aeva-bento-grid>
```

### Dashboard
Varied sizes optimized for dashboard layouts with main chart area and metric cards.

```html
<aeva-bento-grid preset="dashboard">
  <!-- 5 cards total -->
</aeva-bento-grid>
```

### Masonry
Pinterest-style layout with alternating tall and regular cards.

```html
<aeva-bento-grid preset="masonry">
  <!-- 6+ cards -->
</aeva-bento-grid>
```

### Sidebar
2-column layout with large sidebar and smaller content cards.

```html
<aeva-bento-grid preset="sidebar">
  <!-- 4 cards total -->
</aeva-bento-grid>
```

### Spotlight
Full-width hero section followed by grid of feature cards.

```html
<aeva-bento-grid preset="spotlight">
  <!-- 5 cards total -->
</aeva-bento-grid>
```

## Customization

### CSS Custom Properties

**aeva-bento-grid:**
- `--aeva-bento-grid-gap`: Gap between items (default: `1rem`)
- `--aeva-bento-grid-min-height`: Minimum row height (default: `200px`)

**aeva-grid-item:**
- `--aeva-grid-item-min-height`: Minimum item height (default: `auto`)

### Example

```html
<aeva-bento-grid 
  preset="feature"
  style="--aeva-bento-grid-gap: 2rem; --aeva-bento-grid-min-height: 250px;">
  <!-- cards -->
</aeva-bento-grid>
```

## Responsive Behavior

All bento grid presets automatically adapt to smaller screens:
- **Mobile (<768px)**: Single column layout
- **Tablet (768-1023px)**: 2-column layout
- **Desktop (≥1024px)**: Full preset layout

## Advanced Examples

### Dashboard Layout

```html
<aeva-bento-grid preset="dashboard">
  <aeva-card>
    <div style="padding: 2rem; background: linear-gradient(135deg, #667eea, #764ba2);">
      <h3>Revenue Chart</h3>
      <!-- Chart component -->
    </div>
  </aeva-card>
  <aeva-card>
    <div style="padding: 1.5rem;">
      <p>Total Revenue</p>
      <h2>$45.2K</h2>
    </div>
  </aeva-card>
  <aeva-card>
    <div style="padding: 1.5rem;">
      <p>Growth</p>
      <h2>+23%</h2>
    </div>
  </aeva-card>
  <aeva-card>Recent Activity</aeva-card>
  <aeva-card>Quick Actions</aeva-card>
</aeva-bento-grid>
```

### Custom Grid with Precise Control

```html
<aeva-grid columns="6" gap="lg">
  <aeva-grid-item col-span="4" row-span="2">
    <aeva-card>Main content area</aeva-card>
  </aeva-grid-item>
  
  <aeva-grid-item col-span="2" row-span="1">
    <aeva-card>Sidebar widget 1</aeva-card>
  </aeva-grid-item>
  
  <aeva-grid-item col-span="2" row-span="1">
    <aeva-card>Sidebar widget 2</aeva-card>
  </aeva-grid-item>
  
  <aeva-grid-item col-span="3" row-span="1">
    <aeva-card>Footer left</aeva-card>
  </aeva-grid-item>
  
  <aeva-grid-item col-span="3" row-span="1">
    <aeva-card>Footer right</aeva-card>
  </aeva-grid-item>
</aeva-grid>
```

## Best Practices

1. **Use presets first**: Start with a preset that matches your layout needs
2. **Consistent card heights**: Use min-height on cards for visual balance
3. **Limit nesting**: Avoid deeply nested bento grids
4. **Test responsive**: Always verify mobile and tablet layouts
5. **Content hierarchy**: Place important content in larger grid items

## Accessibility

- Grid items maintain proper reading order in the DOM
- Use semantic HTML inside grid items
- Ensure sufficient color contrast in gradient backgrounds
- Test keyboard navigation through grid items
