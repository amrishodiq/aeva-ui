# aeva-ui

> Modern Design System Library built with Lit Web Components

[![npm version](https://img.shields.io/npm/v/aeva-ui.svg)](https://www.npmjs.com/package/aeva-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight, customizable design system library built with [Lit](https://lit.dev/) for rapid web development. Perfect for students working on assignments and developers building web applications.

## Why Aeva UI?

Aeva UI isn't just another UI library; it's a modern, future-proof design system built on web standards.

- **Framework Agnostic & Future-Proof**  
  Built with native Web Components via Lit. Whether you use React, Vue, Svelte, Angular, or just Vanilla HTML/JS, Aeva UI works seamlessly everywhere. No lock-in, no framework-specific wrappers needed.

- **Ultra Lightweight & Fast**  
  Zero bloat. By leveraging the browser's native capabilities and Lit's minimal overhead (~5KB), components render incredibly fast and consume minimal memory. It's fully tree-shakeable—only bundle what you actually use.

- **True Style Encapsulation**  
  Say goodbye to CSS class collisions. Aeva UI utilizes native Shadow DOM, ensuring that your app's styles won't break the components, and the components' styles won't leak into your application.

- **Effortless, Native Theming**  
  No complex CSS-in-JS configurations required. Theming is completely driven by native CSS Custom Properties (CSS Variables). Implement Dark Mode or custom brand themes (like Emerald) just by overriding a few variables in your `:root`.

- **Atomic Design Architecture**  
  Thoughtfully structured following the Atomic Design methodology (Atoms → Molecules → Organisms). It scales perfectly from simple prototypes to complex enterprise applications.

- **TypeScript First**  
  Written in TypeScript from the ground up to provide a world-class developer experience with strict type safety, robust auto-completion, and inline documentation right in your editor.

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

Or a specific version:
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/aeva-ui@0.1.0/dist/aeva-ui.js"></script>
```

## Quick Start (jsDelivr)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Aeva UI Example</title>
    <!-- Import official styles or use your own custom tokens -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aeva-ui/dist/style.css">
    <!-- Import components from CDN -->
    <script type="module" src="https://cdn.jsdelivr.net/npm/aeva-ui/dist/aeva-ui.js"></script>
</head>
<body>
    <aeva-button variant="primary">Hello Aeva!</aeva-button>
</body>
</html>
```

## Theming

Aeva UI uses CSS variables for theming. You can override them in your global CSS:

```css
:root {
  --aeva-color-primary: #6366f1;
  --aeva-border-radius: 12px;
}
```

## Project Structure
... (same as before) ...

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

