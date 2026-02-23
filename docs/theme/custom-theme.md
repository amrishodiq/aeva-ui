# Tutorial: Creating Custom Themes in Aeva UI

Hello fellow developers! In this tutorial, I'll show you how to create and apply a custom theme in Aeva UI. With the latest extensible theme system, creating a tailored look for your application is more straightforward than ever.

---

## 1. Defining Your Custom Theme
A theme is essentially a collection of CSS variables. You don't need to redefine everything. Thanks to the **inheritance** feature, you can extend the existing `light` or `dark` themes and only override what you need.

Here’s an example of an **"Emerald City"** theme that extends the `light` mode with green accents:

```javascript
const emeraldTheme = {
  extends: 'light', // Use light theme as the foundation
  variables: {
    '--aeva-primary-color': '#10b981', // Emerald green
    '--aeva-button-primary-bg': '#10b981',
    '--aeva-text-color': '#064e3b',
    '--aeva-page-background': 'linear-gradient(135deg, #ecfdf5 0%, #10b981 100%)'
  }
};
```

## 2. Applying the Theme Directly in Your HTML
You can configure and apply your custom theme directly in your HTML file using a simple `<script>` tag. This is useful for setting the theme immediately when the page loads.

Simply wrap your application with the `<aeva-theme>` component and use a script to register your custom styles:

```html
<!DOCTYPE html>
<html>
<body>
  <!-- 1. Wrap your app with aeva-theme -->
  <aeva-theme theme="my-custom-theme">
    <aeva-page>
      <aeva-button variant="primary">Primary Action</aeva-button>
    </aeva-page>
  </aeva-theme>

  <!-- 2. Configure the theme via script -->
  <script>
    const themeEl = document.querySelector('aeva-theme');
    
    // Register your custom themes
    themeEl.customStyles = {
      'my-custom-theme': {
        extends: 'light',
        variables: {
          '--aeva-primary-color': '#10b981',
          '--aeva-button-primary-bg': '#10b981'
        }
      }
    };
  </script>
</body>
</html>
```

## 3. Dynamic Switching (Optional)
If you want to support toggling through multiple themes (e.g., Light -> Dark -> Custom), you can define the cycle order in the `themes` property:

```javascript
// Define the cycle order
themeEl.themes = ['light', 'dark', 'my-custom-theme'];

// Now calling this will cycle through your themes
themeEl.toggleTheme();
```

---

### Pro Tips:
- **Inherit Wisely**: Always use `extends: 'light'` or `extends: 'dark'` to ensure all components have a fallback style for variables you didn't override.
- **Visual Flourish**: Use CSS gradients for `--aeva-page-background` to give your application a premium, state-of-the-art look.

Happy coding!
