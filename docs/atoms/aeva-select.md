# Aeva Select

A premium, glass-morphism based selection component. It provides a familiar dropdown interface with full keyboard support and smooth animations.

## Usage

```html
<aeva-select placeholder="Choose a fruit">
  <aeva-list-item value="apple" label="Apple"></aeva-list-item>
  <aeva-list-item value="banana" label="Banana"></aeva-list-item>
  <aeva-list-item value="cherry" label="Cherry"></aeva-list-item>
</aeva-select>
```

## Properties

| Property | Type | Options | Description | Default |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `string` | - | The currently selected value. | `''` |
| `placeholder` | `string` | - | Text shown when no value is selected. | `'Select an option'` |
| `size` | `string` | `sm`, `md`, `lg` | The size of the select trigger. | `md` |
| `appearance` | `string` | `bordered`, `flat` | Visual style of the trigger. | `bordered` |
| `disabled` | `boolean` | - | Whether the component is interactive. | `false` |
| `mandatory` | `boolean` | - | If true, requires an option to be selected to close the popup. | `false` |

## Events

| Event | Detail | Description |
| :--- | :--- | :--- |
| `change` | `{ value, label }` | Dispatched when the selection changes (standard). |
| `selected` | `{ value, label, index }` | Dispatched on successful selection. |

## Customizing

You can customize the select component using CSS variables:

| CSS Variable | Description | Default |
| :--- | :--- | :--- |
| `--aeva-input-border-radius` | Border radius of the selection trigger. | `22px` |
| `--aeva-input-bg` | Background color of the selection trigger. | `rgba(255, 255, 255, 0.05)` |
| `--aeva-input-border-color` | Border color of the selection trigger. | `rgba(255, 255, 255, 0.2)` |
| `--aeva-popup-bg` | Background color of the dropdown menu. | `rgba(255, 255, 255, 0.7)` |
| `--aeva-popup-blur` | Backdrop blur intensity for the dropdown. | `10px` |
| `--aeva-popup-border-radius` | Border radius of the dropdown menu. | `22px` |

## Variants

### Sizes
Supports `sm`, `md`, and `lg` sizes to match `aeva-input`.

### Appearance
Supports `bordered` (default) and `flat` (no border, slightly darker background).

## Accessibility
- Full keyboard navigation (Arrow keys, Enter, Space).
- ARIA roles and states handled internally via `aeva-list` and `aeva-popup-menu`.
- Supports focus ring and high-contrast focus states.
