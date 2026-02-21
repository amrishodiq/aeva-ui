# @aeva/ui

> Modern Design System Library built with Lit Web Components

[![npm version](https://img.shields.io/npm/v/@aeva/ui.svg)](https://www.npmjs.com/package/@aeva/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight, customizable design system library built with [Lit](https://lit.dev/) for rapid web development. Perfect for students working on assignments and developers building web applications.

## ✨ Features

- 🎨 **Atomic Design Pattern** - Organized components (Atoms → Molecules → Organisms → Templates)
- ⚡ **Lit Web Components** - Lightweight (~5KB), fast, and framework-agnostic
- 🎯 **TypeScript First** - Full type safety and autocomplete support
- 🎨 **Easy Theming** - Customize via CSS Custom Properties
- 🔥 **Hot Reload** - Fast development experience with Vite
- 📦 **Tree-shakeable** - Only bundle what you use

## 📦 Installation

### Via NPM
```bash
npm install @aeva/ui lit
```

### Via CDN (jsDelivr)
Perfect for quick prototypes or static sites.
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aeva/ui/dist/aeva-ui.js"></script>
```

Or a specific version:
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aeva/ui@0.1.0/dist/aeva-ui.js"></script>
```

## 🚀 Quick Start (jsDelivr)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Aeva UI Example</title>
    <!-- Import official styles or use your own custom tokens -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aeva/ui/dist/style.css">
    <!-- Import components from CDN -->
    <script type="module" src="https://cdn.jsdelivr.net/npm/@aeva/ui/dist/aeva-ui.js"></script>
</head>
<body>
    <aeva-button variant="primary">Hello Aeva!</aeva-button>
</body>
</html>
```

## 🎨 Theming

Aeva UI uses CSS variables for theming. You can override them in your global CSS:

```css
:root {
  --aeva-color-primary: #6366f1;
  --aeva-border-radius: 12px;
}
```

## 📁 Project Structure
... (same as before) ...

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

