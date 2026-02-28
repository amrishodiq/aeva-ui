<script setup lang="ts">
import { AevaDate } from "../../src/components/atoms/aeva-date.js";
</script>

# Aeva Date

A simple utility component used to standardize formatting for JavaScript Date objects, ISO strings, and integer timestamps across the application. Relying deeply on `Intl.DateTimeFormat` API for robust multi-region native localization.

## Usage

Simply pass the `value` array you desire. `aeva-date` automatically evaluates inputs strings, integers, or actual objects smoothly into the designated format.

```html
<!-- Display current browser locale format -->
<aeva-date value="2026-02-28T14:30:00Z"></aeva-date>

<!-- Display date specific localized string -->
<aeva-date value="2026-02-28T14:30:00Z" format="date-only"></aeva-date>

<!-- Relative timestamp output -->
<aeva-date value="1709191800000" format="relative"></aeva-date>
```

## Formats
Several format styles mapping `Intl.DateTimeFormat` configurations provide standard presets.

| Format Variant | Description |
|---|---|
| `medium` (default) | Medium length date and short time |
| `short` | The most compressed date and time |
| `long` | Human readable formal date with short time |
| `full` | The longest, localized native date string |
| `date-only` | Skips time, yields medium date |
| `time-only` | Skips date, yields standard short time |
| `relative` | Calculates diff from now (i.e., '2 days ago', 'in 3 minutes') |

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | `Date\|string\|number` | `undefined` | Target timestamp |
| `format` | `string` | `'medium'` | The visual variation mapping to Intl spec. |
| `locale` | `string` | `navigator.language` | Regional BCP 47 override. Ex `id-ID` |

## CSS Variables
To adjust aesthetics you may alter standard properties. By default, it seamlessly inherits from your block element structure.

| Name | Description |
|---|---|
| `--aeva-date-font-family` | Override block font-family. |
| `--aeva-date-text-color` | Override block color. |
| `--aeva-date-font-size` | Adjust text sizing constraint. |
