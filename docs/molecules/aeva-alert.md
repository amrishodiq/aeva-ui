<script setup lang="ts">
import { AevaAlert } from "../../src/components/molecules/aeva-alert.js";
import { AevaButton } from "../../src/components/atoms/aeva-button.js";
</script>

# Aeva Alert

The `<aeva-alert>` component is a banner-style molecule used to communicate important messages, status updates, or warnings to users. It supports multiple predefined visual states and stylistic appearances to fit within the hierarchy of your application.

## Basic Usage

By default, the alert uses the `info` variant and `subtle` appearance.

```html
<aeva-alert>This is a standard informational message to help users.</aeva-alert>
```

## Variants

Control the semantic meaning and colors using the `variant` property. Supported values are `info`, `success`, `warning`, and `danger`. An appropriate icon is selected automatically by default.

```html
<aeva-alert variant="info">New software update is available.</aeva-alert>
<aeva-alert variant="success">Your profile has been saved successfully.</aeva-alert>
<aeva-alert variant="warning">Please verify your email address soon.</aeva-alert>
<aeva-alert variant="danger">Failed to connect to the database.</aeva-alert>
```

## Appearances

There are three ways an alert can be styled (`subtle`, `solid`, `outlined`), which affects its visual weight against the background layout.

```html
<!-- Subtle (Default) -->
<aeva-alert appearance="subtle" variant="success">Subtle style (Background tint with solid icon)</aeva-alert>

<!-- Solid -->
<aeva-alert appearance="solid" variant="success">Solid style (Solid background, white text)</aeva-alert>

<!-- Outlined -->
<aeva-alert appearance="outlined" variant="success">Outlined style (Transparent background, colored border)</aeva-alert>
```

## With Title

Add a `title` attribute to provide a bold header above the main message.

```html
<aeva-alert variant="warning" title="Authentication Required">
  You must log in to access your billing details.
</aeva-alert>
```

## Dismissible

Make an alert removable by adding the `dismissible` boolean attribute. This renders a close (X) button on the right edge. When clicked, it completely hides the component and fires a `close` event.

```html
<aeva-alert variant="info" dismissible>
  You can close me using the icon on the right.
</aeva-alert>

<script>
  document.querySelector('aeva-alert').addEventListener('close', () => {
    console.log('Alert dismissed!');
  });
</script>
```

## Custom Actions

You can project custom buttons or links into the `action` slot. These will appear on the right side of the text, before the close button (if present).

```html
<aeva-alert variant="danger" title="Payment Failed">
  We couldn't process your last invoice.
  <aeva-button variant="danger" size="sm" slot="action" style="background: transparent; border: 1px solid currentColor;">Retry</aeva-button>
</aeva-alert>
```

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Defines the semantic color scheme. |
| `appearance` | `'subtle' \| 'solid' \| 'outlined'` | `'subtle'` | Dictates the fill/border combination style. |
| `title` | `string` | `''` | Optional bold header on the first line. |
| `icon` | `string` | `undefined` | Override default icon. Use `'none'` to hide. |
| `dismissible` | `boolean` | `false` | Whether the alert displays a close button. |

## Slots

| Name | Description |
|---|---|
| `default` | Main alert content. |
| `action` | Custom interactive elements on the right side. |

## Events

| Name | Detail | Description |
|---|---|---|
| `close` | none | Fired when the dismissible close button is triggered. |
