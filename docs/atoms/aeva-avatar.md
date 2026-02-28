<script setup lang="ts">
import { AevaAvatar } from "../../src/components/atoms/aeva-avatar.js";
import { AevaAvatarGroup } from "../../src/components/molecules/aeva-avatar-group.js";
</script>

# Aeva Avatar

The `<aeva-avatar>` component is used to visually represent a user or an entity. It includes robust fallback mechanisms to elegantly handle scenarios where profile imagery is unavailable or fails to load.

## Basic Usage

When a valid image URL is provided to the `src` attribute, the component renders the image.

```html
<aeva-avatar src="https://i.pravatar.cc/150?img=1" name="John Doe"></aeva-avatar>
```

## Fallbacks

The component follows a strict visual hierarchy. If `src` is missing or the image fails to load, it falls back to:
1.  **Initials:** Automatically extracts the first letters of the first and last name from the `name` attribute.
2.  **Icon:** If `name` is also missing, it displays a generic user icon (`<aeva-icon name="user">`).

```html
<!-- Fails back to initials "JS" -->
<aeva-avatar name="Jane Smith"></aeva-avatar>

<!-- Fails back to user icon -->
<aeva-avatar></aeva-avatar>
```

## Shapes and Sizes

Customize the physical appearance of avatars to fit your interface.

```html
<!-- Shapes -->
<aeva-avatar shape="circle" name="A" style="--aeva-avatar-bg: var(--aeva-info-color)"></aeva-avatar>
<aeva-avatar shape="rounded" name="B" style="--aeva-avatar-bg: var(--aeva-success-color)"></aeva-avatar>
<aeva-avatar shape="square" name="C" style="--aeva-avatar-bg: var(--aeva-danger-color)"></aeva-avatar>

<!-- Sizes -->
<aeva-avatar size="sm" name="S"></aeva-avatar>
<aeva-avatar size="md" name="M"></aeva-avatar>
<aeva-avatar size="lg" name="L"></aeva-avatar>
<aeva-avatar size="xl" name="XL"></aeva-avatar>
```

## Status Indicators

Use the `status` attribute to overlay a presence indicator in the bottom-right corner.

```html
<aeva-avatar status="online" name="User"></aeva-avatar>
<aeva-avatar status="away" name="User"></aeva-avatar>
<aeva-avatar status="busy" name="User"></aeva-avatar>
<aeva-avatar status="offline" name="User"></aeva-avatar>
```

## Avatar Groups

Wrap multiple avatars in an `<aeva-avatar-group>` to stack them visually with an overlapping effect. Define `max` to limit the visible count and show a surplus badge. Note that the group orchestrates the `size` of all its children centrally.

```html
<aeva-avatar-group max="3" size="md">
    <aeva-avatar name="User One" src="https://i.pravatar.cc/150?img=1"></aeva-avatar>
    <aeva-avatar name="User Two" src="https://i.pravatar.cc/150?img=2"></aeva-avatar>
    <aeva-avatar name="User Three" src="https://i.pravatar.cc/150?img=3"></aeva-avatar>
    <aeva-avatar name="User Four" src="https://i.pravatar.cc/150?img=4"></aeva-avatar>
    <aeva-avatar name="User Five" src="https://i.pravatar.cc/150?img=5"></aeva-avatar>
</aeva-avatar-group>
```

## Properties: `<aeva-avatar>`

| Property | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | `undefined` | URL of the profile image. |
| `name` | `string` | `''` | Text used for alt tag and generating initials. |
| `shape` | `'circle' \| 'rounded' \| 'square'` | `'circle'` | Shape of the avatar outline. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar dimensions. |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy' \| 'none'` | `'none'` | Displays a colored badge in the corner. |

## Properties: `<aeva-avatar-group>`

| Property | Type | Default | Description |
|---|---|---|---|
| `max` | `number` | `undefined` | Limits visible avatars and adds a `+X` badge. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Overrides the size of all slotted avatars. |

## Customization (CSS Variables)

| CSS Variable | Default Value | Description |
|---|---|---|
| `--aeva-avatar-bg` | `--aeva-surface-3` | Background color for fallbacks. |
| `--aeva-avatar-text-color` | `--aeva-text-color` | Color for the initials text. |
| `--aeva-avatar-border` | `none` | Optional border stroke. |
| `--aeva-avatar-font-weight` | `600` | Font weight of the initials. |
| `--aeva-avatar-group-overlap` | `-10px` | Negative margin pulling group children together. |
