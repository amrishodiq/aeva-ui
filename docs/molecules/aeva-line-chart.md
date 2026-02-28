# Line Chart (`<aeva-line-chart>`)

A highly minimalist, performant, SVG-based line chart. It automatically uses the built-in 10-color palette of Aeva UI. Data is passed simply via an attribute string.

## Basic Usage

Pass data as a string: `Label, Value; Label, Value`. Each semicolon represents a new row.

```html
<aeva-line-chart 
  data="Mon, 12; Tue, 19; Wed, 15; Thu, 25; Fri, 22"
></aeva-line-chart>
```

## Multiple Series

Add more comma-separated values for multiple series. Use the `series` attribute to define legend names.

```html
<aeva-line-chart 
  data="2020, 100, 80; 2021, 120, 95; 2022, 110, 105; 2023, 140, 115"
  series="Revenue, Expenses"
></aeva-line-chart>
```

## Area Chart

Add the `area` attribute to fill the area under the lines.

```html
<aeva-line-chart 
  data="2020, 100, 80; 2021, 120, 95; 2022, 110, 105; 2023, 140, 115"
  series="Revenue, Expenses"
  area
></aeva-line-chart>
```

## Smooth Lines

Add the `smooth` attribute to use bezier curves instead of sharp angles.

```html
<aeva-line-chart 
  data="Jan, 10; Feb, 40; Mar, 20; Apr, 60; May, 30"
  smooth
></aeva-line-chart>
```

## Events

| Event | Detail | Description |
| :--- | :--- | :--- |
| `chart-click` | `{ label: string, value: number, seriesIndex: number, seriesName: string }` | Fired when a data point is clicked. |

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data` | `string` | `""` | The data to display. Format: `Label, Value1, Value2; Label2, Value1, Value2`. |
| `series` | `string` | `""` | The names of the series. Format: `Series1, Series2`. |
| `area` | `boolean` | `false` | Fills the area under the line with color. |
| `smooth` | `boolean` | `false` | Renders a curved (spline) line instead of a straight line. |
| `height` | `string` | `"250px"` | The CSS height of the chart. |

## Customization

You can customize the 10-color categorical palette used by all Aeva charts via standard theme CSS variables: `--aeva-chart-1` to `--aeva-chart-10`.
