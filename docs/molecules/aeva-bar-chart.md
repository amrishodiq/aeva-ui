# Bar Chart (`<aeva-bar-chart>`)

The button component is a fundamental interactive element that allows users to perform actions. It supports multiple visual variants, sizes, and icon integration.

## Basic Usage

Pass data as a string: `Label, Value; Label, Value`. Each semicolon represents a new row.

```html
<aeva-bar-chart 
  data="Jan, 40; Feb, 60; Mar, 80; Apr, 55; May, 90"
  @chart-click="console.log"
></aeva-bar-chart>
```

## Multiple Series (Grouped)

Add more comma-separated values for multiple series. Use the `series` attribute to define legend names.

```html
<aeva-bar-chart 
  data="2020, 120, 80, 50; 2021, 150, 100, 70; 2022, 110, 140, 90" 
  series="Sales, Marketing, R&D"
></aeva-bar-chart>
```

## Stacked Bar

Add the `stacked` attribute to stack the multi-series data visually.

```html
<aeva-bar-chart 
  data="Q1, 30, 40, 20; Q2, 50, 20, 30; Q3, 60, 50, 40; Q4, 70, 80, 60" 
  series="Direct, Organic, Referral"
  stacked
></aeva-bar-chart>
```

## Events

| Event | Detail | Description |
| :--- | :--- | :--- |
| `chart-click` | `{ label: string, value: number, seriesIndex: number, seriesName: string }` | Fired when a bar is clicked. |

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data` | `string` | `""` | The data to display. Format: `Label, Value1, Value2; Label2, Value1, Value2`. |
| `series` | `string` | `""` | The names of the series. Format: `Series1, Series2`. |
| `stacked` | `boolean` | `false` | When true, renders the bar chart as a stacked chart instead of a grouped chart. |
| `height` | `string` | `"250px"` | The CSS height of the chart. |

## Customization

You can customize the 10-color categorical palette used by all Aeva charts:

| CSS Variable | Description | Default |
| :--- | :--- | :--- |
| `--aeva-chart-1` | Data Series 1 color | `#667eea` |
| `--aeva-chart-2` | Data Series 2 color | `#764ba2` |
| `--aeva-chart-3` | Data Series 3 color | `#10b981` |
| `--aeva-chart-4` | Data Series 4 color | `#f59e0b` |
| `--aeva-chart-5` | Data Series 5 color | `#ef4444` |
| `--aeva-chart-6` | Data Series 6 color | `#06b6d4` |
| `--aeva-chart-7` | Data Series 7 color | `#8b5cf6` |
| `--aeva-chart-8` | Data Series 8 color | `#ec4899` |
| `--aeva-chart-9` | Data Series 9 color | `#14b8a6` |
| `--aeva-chart-10` | Data Series 10 color | `#f97316` |
