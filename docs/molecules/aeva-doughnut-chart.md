# Doughnut Chart (`<aeva-doughnut-chart>`)

A highly minimalist, performant, SVG-based doughnut chart. It automatically uses the beautiful built-in 10-color palette of Aeva UI. Data is passed simply via an attribute string.

## Basic Usage

Pass data as a string: `Label, Value; Label, Value`.

```html
<aeva-doughnut-chart 
  data="Direct, 40; Organic, 30; Referral, 20; Social, 10"
></aeva-doughnut-chart>
```

## Tooltip Support

The chart emits events with the slice details when clicked and automatically displays a tooltip at the center of the chart when hovering.

## Events

| Event | Detail | Description |
| :--- | :--- | :--- |
| `chart-click` | `{ label: string, value: number, seriesIndex: number }` | Fired when a slice is clicked. |

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data` | `string` | `""` | The data to display. Format: `Label, Value; Label2, Value2`. |
| `height` | `string` | `"250px"` | The CSS height of the chart. |

## Customization

You can customize the 10-color categorical palette used by all Aeva charts via standard theme CSS variables: `--aeva-chart-1` to `--aeva-chart-10`.
