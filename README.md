# Aeva UI

> **The light, bouncy, and effortlessly chill UI library for the next gen of web developers. Build fast, stay relaxed.**

[![npm version](https://img.shields.io/npm/v/aeva-ui.svg)](https://www.npmjs.com/package/aeva-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Aeva UI is a feather-soft, highly customizable design system built with [Lit](https://lit.dev/). Crafted for students, rapid prototypers, and anyone who wants their web apps to feel as smooth as they look.

## Why it Hits Different

Aeva UI isn't just another library; it's a mood. Built on modern web standards to keep your workflow light and your apps snappy.

- **Works with Everything**  
  Built with native Web Components. React, Vue, Svelte, or just plain HTML—Aeva UI fits right in without any extra baggage.

- **Feather Soft & Fast**  
  Zero bloat. Leveraging native browser power and Lit's tiny footprint (~5KB). It’s fully tree-shakeable—bundle only what you actually use.

- **Safe & Sound (Shadow DOM)**  
  No more CSS collisions. Styles are locked in with native Shadow DOM, so they won't leak out or get messed up by your app's global CSS.

- **Your Brand, Your Mood**  
  Theming is effortless with native CSS Variables. Switch to Dark Mode or a custom palette just by tweaking a few lines in your `:root`.

- **Scale Like a Pro**  
  Structured with Atomic Design (Atoms → Molecules → Organisms). It grows with you, from a quick assignment to a full-scale project.

- **TypeScript First**  
  Built for a premium dev experience. Enjoy perfect auto-completion and type safety out of the box.

## Components

Explore the collection of bouncy components:

<details>
<summary><b>Atoms (Basic Elements)</b></summary>

- [Accordion Item](docs/atoms/aeva-accordion-item.md)
- [Avatar](docs/atoms/aeva-avatar.md)
- [Badge](docs/atoms/aeva-badge.md)
- [Button](docs/atoms/aeva-button.md)
- [Card](docs/atoms/aeva-card.md)
- [Checkbox](docs/atoms/aeva-checkbox.md)
- [Code](docs/atoms/aeva-code.md)
- [Date](docs/atoms/aeva-date.md)
- [Dialog](docs/atoms/aeva-dialog.md)
- [Divider](docs/atoms/aeva-divider.md)
- [Icon](docs/atoms/aeva-icon.md)
- [Input](docs/atoms/aeva-input.md)
- [List Item](docs/atoms/aeva-list-item.md)
- [Modal](docs/atoms/aeva-modal.md)
- [Page](docs/atoms/aeva-page.md)
- [Popup Menu](docs/atoms/aeva-popup-menu.md)
- [Progress](docs/atoms/aeva-progress.md)
- [Radio](docs/atoms/aeva-radio.md)
- [Rating](docs/atoms/aeva-rating.md)
- [Ripple](docs/atoms/aeva-ripple.md)
- [Select](docs/atoms/aeva-select.md)
- [Simple Table](docs/atoms/aeva-simple-table.md)
- [Skeleton](docs/atoms/aeva-skeleton.md)
- [Slider](docs/atoms/aeva-slider.md)
- [Step](docs/atoms/aeva-step.md)
- [Switch](docs/atoms/aeva-switch.md)
- [Tab Item](docs/atoms/aeva-tab-item.md)
- [Text](docs/atoms/aeva-text.md)
- [Tooltip](docs/atoms/aeva-tooltip.md)
</details>

<details>
<summary><b>Molecules (Groups of Atoms)</b></summary>

- [Accordion](docs/molecules/aeva-accordion.md)
- [Action Bar](docs/molecules/aeva-action-bar.md)
- [Alert](docs/molecules/aeva-alert.md)
- [Bar Chart](docs/molecules/aeva-bar-chart.md)
- [Carousel](docs/molecules/aeva-carousel.md)
- [Date Picker](docs/molecules/aeva-date-picker.md)
- [Doughnut Chart](docs/molecules/aeva-doughnut-chart.md)
- [Empty State](docs/molecules/aeva-empty-state.md)
- [Line Chart](docs/molecules/aeva-line-chart.md)
- [List](docs/molecules/aeva-list.md)
- [Pagination](docs/molecules/aeva-pagination.md)
- [Process](docs/molecules/aeva-process.md)
- [Tab](docs/molecules/aeva-tab.md)
- [Toast](docs/molecules/aeva-toast.md)
</details>

<details>
<summary><b>Organisms & Templates</b></summary>

- [Sidebar (Organism)](docs/organisms/aeva-sidebar.md)
- [Bento Grid](docs/templates/aeva-bento-grid.md)
- [Container](docs/templates/aeva-container.md)
- [Grid](docs/templates/aeva-grid.md)
- [Grid Item](docs/templates/aeva-grid-item.md)
- [Masonry](docs/templates/aeva-masonry.md)
- [Section](docs/templates/aeva-section.md)
- [Stack](docs/templates/aeva-stack.md)
</details>

## Installation

### Via NPM
```bash
npm install aeva-ui lit
```

### Via CDN (jsDelivr)
Perfect for quick prototypes or static sites.
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/aeva-ui/dist/aeva-ui.js"></script>
```

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Aeva UI - Stay Chill</title>
    <!-- Bring the default styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aeva-ui/dist/style.css">
    <!-- Load the vibes -->
    <script type="module" src="https://cdn.jsdelivr.net/npm/aeva-ui/dist/aeva-ui.js"></script>
</head>
<body>
    <aeva-button variant="primary">Hello Aeva!</aeva-button>
</body>
</html>
```

## Theming

Aeva UI uses native CSS variables. Just drop them in your `:root`:

```css
:root {
  --aeva-color-primary: #6366f1;
  --aeva-border-radius: 12px;
}
```

Check out the [Theming Guide](docs/theme/custom-theme.md) for more.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contributing

We love contributions from the community! Check out [CONTRIBUTING.md](CONTRIBUTING.md) to get started.
