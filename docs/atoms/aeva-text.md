# aeva-text Component

## Overview

`aeva-text` is a comprehensive text/typography component built with Lit Element. It provides a flexible and accessible way to render text with various styles, sizes, and states. The component supports semantic HTML tags, inline formatting, multi-line truncation, and extensive customization through CSS variables.

## Features

- ✅ **9 Variants**: display/hero, h1-h6, body, label
- ✅ **7 Sizes**: xs, sm, md, lg, xl, 2xl, 3xl
- ✅ **4 Alignments**: left, center, right, justify
- ✅ **4 States**: normal, muted, inverse, error
- ✅ **Text Transform**: uppercase, lowercase, capitalize
- ✅ **Truncation**: Single-line and multi-line (1-6 lines)
- ✅ **Inline Formatting**: Bold, italic, links, code, etc.
- ✅ **Semantic HTML**: Automatic tag selection (h1-h6, p, label)
- ✅ **Accessibility**: High contrast mode, font scaling, reduced motion
- ✅ **Dark Mode**: Automatic color adjustment
- ✅ **50+ CSS Variables**: Full customization support

## Installation

```bash
npm install @aeva/ui
```

## Basic Usage

```html
<!-- Import the component -->
<script type="module">
  import '@aeva/ui';
</script>

<!-- Use in HTML -->
<aeva-text variant="h1">Page Title</aeva-text>
<aeva-text variant="body">This is body text.</aeva-text>
<aeva-text variant="label">Form Label</aeva-text>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'display' \| 'hero' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body' \| 'label'` | `'body'` | Text variant/style |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'md'` | Text size |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Text alignment |
| `state` | `'normal' \| 'muted' \| 'inverse' \| 'error'` | `'normal'` | Text state/color |
| `transform` | `'none' \| 'uppercase' \| 'lowercase' \| 'capitalize'` | `'none'` | Text transformation |
| `noWrap` | `boolean` | `false` | Prevent text wrapping |
| `truncate` | `boolean` | `false` | Truncate with ellipsis (single line) |
| `lineClamp` | `number` | `0` | Multi-line truncation (1-6 lines, 0 = disabled) |
| `semantic` | `boolean` | `true` | Use semantic HTML tags |
| `tag` | `string` | - | Override semantic tag |

## Variants

### Display / Hero
Large, impactful text for hero sections.

```html
<aeva-text variant="display">Welcome to Our Platform</aeva-text>
<aeva-text variant="hero">Hero Text</aeva-text>
```

Default size: 60px (3.75rem)

### Headings (h1-h6)
Semantic heading levels with appropriate sizes.

```html
<aeva-text variant="h1">Main Heading</aeva-text>
<aeva-text variant="h2">Section Heading</aeva-text>
<aeva-text variant="h3">Subsection</aeva-text>
<!-- h4, h5, h6 also available -->
```

Default sizes: h1 (48px), h2 (36px), h3 (30px), h4 (24px), h5 (20px), h6 (18px)

### Body
Default paragraph text.

```html
<aeva-text variant="body">
  This is body text for paragraphs and general content.
</aeva-text>
```

Default size: 16px (1rem)

### Label
Smaller text for form labels and UI elements.

```html
<aeva-text variant="label">Email Address</aeva-text>
```

Default size: 14px (0.875rem)

## Sizes

Override the default size for any variant:

```html
<aeva-text variant="body" size="xs">Extra small text</aeva-text>
<aeva-text variant="body" size="sm">Small text</aeva-text>
<aeva-text variant="body" size="md">Medium text (default)</aeva-text>
<aeva-text variant="body" size="lg">Large text</aeva-text>
<aeva-text variant="body" size="xl">Extra large text</aeva-text>
<aeva-text variant="body" size="2xl">2X large text</aeva-text>
<aeva-text variant="body" size="3xl">3X large text</aeva-text>
```

## Alignment

```html
<aeva-text align="left">Left aligned (default)</aeva-text>
<aeva-text align="center">Center aligned</aeva-text>
<aeva-text align="right">Right aligned</aeva-text>
<aeva-text align="justify">Justified text</aeva-text>
```

## States

```html
<!-- Normal (default) -->
<aeva-text state="normal">Normal text</aeva-text>

<!-- Muted - reduced emphasis -->
<aeva-text state="muted">Secondary information</aeva-text>

<!-- Inverse - for dark backgrounds -->
<aeva-text state="inverse">Text on dark background</aeva-text>

<!-- Error - for error messages -->
<aeva-text state="error">Error message</aeva-text>
```

## Text Transform

```html
<aeva-text transform="uppercase">uppercase text</aeva-text>
<aeva-text transform="lowercase">LOWERCASE TEXT</aeva-text>
<aeva-text transform="capitalize">capitalize each word</aeva-text>
```

## Truncation

### Single Line Truncation

```html
<aeva-text truncate>
  This long text will be truncated with ellipsis...
</aeva-text>
```

### Multi-Line Truncation (Line Clamp)

```html
<!-- Truncate to 1 line -->
<aeva-text line-clamp="1">
  Long text truncated to one line...
</aeva-text>

<!-- Truncate to 2 lines -->
<aeva-text line-clamp="2">
  Long text truncated to two lines with ellipsis at the end...
</aeva-text>

<!-- Truncate to 3 lines -->
<aeva-text line-clamp="3">
  Long text truncated to three lines. Perfect for card descriptions...
</aeva-text>

<!-- Supports up to 6 lines -->
<aeva-text line-clamp="6">...</aeva-text>
```

**Use Cases:**
- Card titles and descriptions
- Article previews
- Product descriptions
- List items with limited space

## No Wrap

Prevent text from wrapping to multiple lines:

```html
<aeva-text no-wrap>This text will not wrap</aeva-text>
```

## Inline Formatting

The component supports nested HTML for rich text formatting:

```html
<aeva-text variant="body">
  This text contains <strong>bold</strong>, <em>italic</em>, 
  <u>underlined</u> text, and <a href="#">links</a>.
  You can also use <code>inline code</code>.
</aeva-text>
```

Supported inline elements:
- `<strong>`, `<b>` - Bold text
- `<em>`, `<i>` - Italic text
- `<u>` - Underlined text
- `<a>` - Hyperlinks (styled with hover effects)
- `<code>` - Inline code (monospace with background)

## Spacing Control

Control margins using CSS variables:

```html
<!-- Add bottom margin to heading -->
<aeva-text variant="h3" style="--aeva-text-margin-bottom: 1rem;">
  Heading with Margin
</aeva-text>

<!-- Add top and bottom margins -->
<aeva-text 
  variant="body" 
  style="--aeva-text-margin-top: 2rem; --aeva-text-margin-bottom: 1rem;">
  Paragraph with spacing
</aeva-text>
```

## Max Width Control

Limit text width for optimal readability (60-80 characters recommended):

```html
<aeva-text variant="body" style="--aeva-text-max-width: 65ch;">
  This text is limited to 65 characters width for optimal readability.
  Long lines can be difficult to read, especially on wide screens.
</aeva-text>
```

## Semantic HTML

By default, the component uses semantic HTML tags:

- `display`/`hero` → `<h1>`
- `h1` → `<h1>`
- `h2` → `<h2>`
- `h3` → `<h3>`
- `h4` → `<h4>`
- `h5` → `<h5>`
- `h6` → `<h6>`
- `body` → `<p>`
- `label` → `<label>`

### Disable Semantic Tags

```html
<!-- Renders as <span> instead of <p> -->
<aeva-text variant="body" semantic="false">Non-semantic text</aeva-text>
```

### Override Tag

```html
<!-- Render as <div> instead of default -->
<aeva-text variant="body" tag="div">Custom tag</aeva-text>
```

## CSS Customization

The component provides 50+ CSS variables for customization:

### Global Customization

```css
/* Customize all text components */
aeva-text {
  --aeva-text-font-family: 'Inter', sans-serif;
  --aeva-text-color: #2d3748;
  --aeva-text-link-color: #3182ce;
}
```

### Variant-Specific Customization

```css
/* Customize display variant */
aeva-text[variant="display"] {
  --aeva-text-display-weight: 900;
  --aeva-text-letter-spacing-display: -0.03em;
}

/* Customize all headings */
aeva-text[variant^="h"] {
  --aeva-text-heading-weight: 800;
  --aeva-text-margin-bottom: 1rem;
}

/* Customize body text */
aeva-text[variant="body"] {
  --aeva-text-max-width: 65ch;
  --aeva-text-body-line-height: 1.7;
}
```

### State Customization

```css
/* Customize error state */
aeva-text[state="error"] {
  --aeva-text-error-color: #e53e3e;
}

/* Customize muted state */
aeva-text[state="muted"] {
  --aeva-text-muted-color: #718096;
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| - | - | This component does not dispatch custom events |

## CSS Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `--aeva-text-font-family` | Default font family | - |
| `--aeva-text-color` | Default text color | - |
| `--aeva-text-muted-color` | Color for muted state | `#6b7280` |
| `--aeva-text-inverse-color` | Color for inverse state | `#ffffff` |
| `--aeva-text-error-color` | Color for error state | `#dc2626` |
| `--aeva-text-link-color` | Color for links | `#667eea` |
| `--aeva-text-size-xs` | Font size for xs | `0.75rem` |
| `--aeva-text-size-sm` | Font size for sm | `0.875rem` |
| `--aeva-text-size-md` | Font size for md | `1rem` |
| `--aeva-text-size-lg` | Font size for lg | `1.125rem` |
| `--aeva-text-size-xl` | Font size for xl | `1.25rem` |
| `--aeva-text-size-2xl` | Font size for 2xl | `1.5rem` |
| `--aeva-text-size-3xl` | Font size for 3xl | `1.875rem` |
| `--aeva-text-margin-top` | Top margin | `0` |
| `--aeva-text-margin-bottom` | Bottom margin | `0` |
| `--aeva-text-max-width` | Maximum width | `none` |

## Accessibility

### High Contrast Mode

The component automatically adjusts for high contrast mode:

```css
@media (prefers-contrast: high) {
  /* Font weight increased */
  /* Muted opacity adjusted for better visibility */
}
```

### Dark Mode

Automatic color adjustment based on system preference:

```css
@media (prefers-color-scheme: dark) {
  /* Colors automatically adjusted */
  --aeva-text-color: #f5f5f5;
  --aeva-text-muted-color: #9ca3af;
}
```

### Reduced Motion

Respects user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  /* Transitions disabled */
}
```

### Keyboard Navigation

Links within text components are fully keyboard accessible with visible focus states.

## Real-World Examples

### Hero Section

```html
<aeva-text variant="display" align="center" size="xl">
  Welcome to Our Platform
</aeva-text>
<aeva-text variant="body" size="lg" align="center" state="muted">
  Build amazing applications with our modern design system
</aeva-text>
```

### Article Preview Card

```html
<aeva-text variant="h3" style="--aeva-text-margin-bottom: 0.5rem;">
  Article Title
</aeva-text>
<aeva-text variant="body" line-clamp="3" state="muted">
  This is a preview of the article content. It will be truncated to 
  three lines with an ellipsis at the end, perfect for card layouts.
</aeva-text>
<aeva-text variant="label" size="xs" state="muted">
  Published on January 17, 2026
</aeva-text>
```

### Form Label with Error

```html
<aeva-text variant="label">Email Address</aeva-text>
<input type="email" />
<aeva-text variant="label" size="sm" state="error">
  Please enter a valid email address
</aeva-text>
```

### Product Description

```html
<aeva-text variant="h2" style="--aeva-text-margin-bottom: 1rem;">
  Premium Wireless Headphones
</aeva-text>
<aeva-text variant="body" style="--aeva-text-max-width: 65ch;">
  Experience <strong>crystal-clear audio</strong> with our premium 
  wireless headphones. Features include <em>active noise cancellation</em>, 
  30-hour battery life, and <a href="#">Bluetooth 5.0</a> connectivity.
</aeva-text>
```

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

**Note**: Line clamp feature uses `-webkit-line-clamp` which is supported in all modern browsers.

## TypeScript Support

Full TypeScript support with type definitions:

```typescript
import { AevaText } from '@aeva/ui';

const textElement = document.querySelector('aeva-text') as AevaText;
textElement.variant = 'h1';
textElement.size = 'xl';
textElement.lineClamp = 2;
```

## Best Practices

1. **Use Semantic Variants**: Choose the appropriate variant for your content (h1 for main headings, body for paragraphs, etc.)

2. **Limit Line Width**: For body text, use `--aeva-text-max-width: 65ch` for optimal readability

3. **Add Spacing**: Use margin CSS variables to create proper vertical rhythm

4. **Truncate Wisely**: Use line-clamp for previews, but ensure full content is accessible

5. **Accessibility First**: Keep semantic tags enabled unless there's a specific reason not to

6. **Consistent Sizing**: Stick to the size scale (xs-3xl) for visual consistency

## Migration from aeva-typography

If you're migrating from the old `aeva-typography` component:

1. **Tag Name**: `<aeva-typography>` → `<aeva-text>`
2. **CSS Variables**: `--aeva-typography-*` → `--aeva-text-*`
3. **Class Name**: `AevaTypography` → `AevaText`
4. **Import**: `'@aeva/ui/aeva-typography'` → `'@aeva/ui/aeva-text'`

All properties and functionality remain the same!

## Related Components

- `aeva-button` - Button component with text styling
- More components coming soon...

## Support

For issues, questions, or contributions, please visit our [GitHub repository](https://github.com/your-org/aeva-ui).
