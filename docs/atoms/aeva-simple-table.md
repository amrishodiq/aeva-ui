<script setup lang="ts">
import { AevaSimpleTable } from "../../src/components/atoms/aeva-simple-table.js";
</script>

# Aeva Simple Table

A simple table component supporting both string attributes and property binding, making it highly versatile for both rapid prototyping and robust data binding. It also **automatically supports data sorting** when users click on the column headers.

## Usage

The component **automatically supports data sorting** when users click on the column headers. You can also enable a built-in search bar by adding the `searchable` attribute, and built-in pagination via the `paginated` attribute.

For basic usage, you can provide the header and data entirely via strings:

```html
<aeva-simple-table 
    searchable
    paginated
    itemsPerPage="2"
    header="#,Name,Part,Contribution" 
    data="1,Amri Shodiq,ST Plugin P,540;2,Naufal,ST Plugin P,489;3,Kevin,SW Framework,600">
</aeva-simple-table>
```

For robust data, especially containing commas, you can provide JS arrays instead using property binding:

```html
<aeva-simple-table id="demo-dynamic-table"></aeva-simple-table>

<script>
    const table = document.getElementById('demo-dynamic-table');
    table.columns = [
        { key: "id", label: "#" },
        { key: "name", label: "Full Name" },
        { key: "role", label: "Role & Department" },
        { key: "score", label: "Score" }
    ];
    table.rows = [
        { id: 1, name: "Alice, M.D.", role: "Engineering, Frontend", score: 95 },
        { id: 2, name: "Bob, Ph.D.", role: "Data Science", score: 88 }
    ];
</script>
```

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `header` | `string` | `''` | Comma-separated headers. Overridden if `columns` exists. |
| `data` | `string` | `''` | Semicolon/comma-separated rows data. Overridden by `rows`. |
| `columns` | `Array` | `undefined` | Advanced property mapping for keys. |
| `rows` | `Array` | `undefined` | Arrays or Object data source for mapping. |
| `searchable` | `boolean` | `false` | Enables a global search input above the table. |
| `searchPlaceholder` | `string` | `'Search...'` | Placeholder text for the search input. |
| `paginated` | `boolean` | `false` | Enables slicing data and displaying a pagination control. |
| `itemsPerPage` | `number` | `10` | The number of rows to display per page when paginated. |

## Customization

The component implements `aeva-theme` design variables for smooth customization.

| CSS Variable | Description |
|---|---|
| `--aeva-border-color` | Table boundaries color |
| `--aeva-surface-color` | Table background color |
| `--aeva-surface-color-light` | Header row slight highlighting |
| `--aeva-text-color` | Cell content text color |
| `--aeva-text-muted-color` | Header labels coloration |
| `--aeva-hover-color` | Row hover backgrounds |
