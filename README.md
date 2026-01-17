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

```bash
npm install @aeva/ui lit
```

## 🚀 Quick Start

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@aeva/ui';
  </script>
</head>
<body>
  <!-- Components akan tersedia di sini -->
</body>
</html>
```

## 🎨 Theming

Customize the design system by overriding CSS Custom Properties:

```css
:root {
  --aeva-color-primary: #your-color;
  --aeva-spacing-md: 1.5rem;
  --aeva-radius-md: 0.75rem;
  /* See src/styles/tokens.css for all available tokens */
}
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Build library
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## 📁 Project Structure

```
@aeva/ui/
├── src/
│   ├── components/
│   │   ├── atoms/       # Basic building blocks
│   │   ├── molecules/   # Combinations of atoms
│   │   ├── organisms/   # Complex components
│   │   └── templates/   # Page layouts
│   ├── styles/
│   │   └── tokens.css   # Design tokens
│   └── index.ts         # Main entry point
├── demo/                # Demo playground
└── dist/                # Build output
```

## 📝 License

MIT © [Your Name]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
