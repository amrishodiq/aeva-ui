<script setup lang="ts">
import { AevaDivider } from "../../src/components/atoms/aeva-divider.js";
</script>

# Aeva Divider

The `<aeva-divider>` component is used to visually separate content into clear groups or sections. It supports horizontal and vertical orientations and text labels.

## Basic Usage

By default, the divider renders as a solid horizontal line.

```html
<p>Section 1</p>
<aeva-divider></aeva-divider>
<p>Section 2</p>
```

## Content / Text Labels

You can place text inside the divider to label the separation.

```html
<aeva-divider>OR</aeva-divider>
```

## Styling Variants

Change the stroke style using the `variant` property.

```html
<aeva-divider variant="solid"></aeva-divider>
<aeva-divider variant="dashed"></aeva-divider>
<aeva-divider variant="dotted"></aeva-divider>
```

## Vertical Orientation

To create a vertical divider between flex or grid items, set `orientation="vertical"`.
*Note: Make sure the parent container has a defined height or is a flex container for the divider to stretch.*

```html
<div style="display: flex; height: 50px; align-items: center;">
    <span>Left Item</span>
    <aeva-divider orientation="vertical"></aeva-divider>
    <span>Right Item</span>
</div>
```

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Stroke style of the divider line. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation of the divider. |

## Customization (CSS Variables)

| CSS Variable | Default Value | Description |
|---|---|---|
| `--aeva-divider-color` | `--aeva-border-color` | Color of the divider line. |
| `--aeva-divider-thickness` | `1px` | Thickness or width of the divider stroke. |
| `--aeva-divider-spacing` | `1.5rem` | Top/Bottom margin (or Left/Right for vertical). |
| `--aeva-divider-text-color` | `--aeva-text-muted-color` | Color of the slot text. |
