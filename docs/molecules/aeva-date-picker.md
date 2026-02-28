<script setup lang="ts">
import { AevaDatePicker } from "../../src/components/molecules/aeva-date-picker.js";
</script>

# Aeva Date Picker

An interactive calendar component that adapts its UI depending on screen size. It uses a desktop popover on larger screens and a touch-friendly bottom sheet on mobile devices.

## Usage

Use it as a standard form input for dates. 

```html
<aeva-date-picker 
    label="Birth Date" 
    placeholder="Select date..."
    value="2026-03-01">
</aeva-date-picker>
```

## Min and Max Validation

You can restrict the selectable date range using the `min` and `max` attributes. Dates outside this range will be visually disabled and unclickable.

```html
<!-- Only allows dates in year 2026 -->
<aeva-date-picker 
    label="Event Date" 
    min="2026-01-01"
    max="2026-12-31">
</aeva-date-picker>
```

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `''` | Text label for the input field. |
| `placeholder` | `string` | `'Select date'` | Placeholder text shown when no date is picked. |
| `value` | `string` | `''` | The currently selected date in `YYYY-MM-DD` format. |
| `min` | `string` | `''` | Earliest selectable date in `YYYY-MM-DD` format. |
| `max` | `string` | `''` | Latest selectable date in `YYYY-MM-DD` format. |

## Events

| Event Name | Type | Description |
|---|---|---|
| `change` | `CustomEvent` | Fired when a date is selected. `event.detail.value` contains the string (YYYY-MM-DD) and `event.detail.date` contains the native javascript `Date` object. |
