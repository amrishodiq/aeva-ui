# aeva-dialog

A highly structured premium dialog component built on top of `aeva-modal`. It provides a standardized layout with a header, icon, title, description, and footer actions, while inheriting all the glassmorphism and animation capabilities of the modal.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-dialog id="my-dialog" title="Delete Account" description="Are you sure you want to delete your account? This action cannot be undone.">
  <aeva-icon slot="icon" name="alert-triangle" color="var(--aeva-error)"></aeva-icon>
  
  <p>Please type your username to confirm.</p>
  <aeva-input placeholder="Username..."></aeva-input>

  <div slot="footer">
    <aeva-button variant="ghost" @click="document.getElementById('my-dialog').close()">Cancel</aeva-button>
    <aeva-button variant="danger">Delete Account</aeva-button>
  </div>
</aeva-dialog>

<script>
  const dialog = document.getElementById('my-dialog');
  dialog.open = true; // Open the dialog
</script>
```

### Advanced Usage with Custom Header

If you need full control over the header, you can use the `header` slot:

```html
<aeva-dialog>
  <div slot="header" style="display: flex; align-items: center; gap: 8px;">
    <img src="avatar.png" alt="Profile" style="width: 32px; border-radius: 50%;">
    <h3>Update Profile</h3>
  </div>
  
  <p>Customize your profile information below.</p>
</aeva-dialog>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Whether the dialog is currently visible |
| `title` | `string` | `''` | The main title of the dialog |
| `description` | `string` | `''` | Secondary descriptive text |
| `hide-close` | `boolean` | `false` | Hides the default top-right close button |
| `backdrop` | `boolean` | `true` | Show dark overlay backdrop |
| `close-on-backdrop` | `boolean` | `true` | Close the dialog when clicking outside |
| `close-on-esc` | `boolean` | `true` | Close the dialog when pressing Escape |
| `elevation` | `number` (1-5)| `3` | Shadow intensity level |
| `blur-amount` | `number` | `10` | Intensity of backdrop-filter blur (px) |

## Slots

| Name | Description |
|------|-------------|
| `(default)` | Main body content of the dialog |
| `icon` | Icon element placed before the title (e.g., `<aeva-icon>`) |
| `header` | Replaces the title and description with custom content |
| `footer` | Container for action buttons at the bottom right |

## Events

*(Inherits all events from `aeva-modal`)*

| Event | Detail | Description |
|-------|--------|-------------|
| `open` | - | Fired when the dialog starts opening |
| `close` | - | Fired when the dialog starts closing |

## Accessibility

Since `aeva-dialog` wraps `aeva-modal`, it inherits all its accessibility features:
- ✅ Automatic body scroll lock when open
- ✅ Focus trapping and restoration (`aria-modal="true"`)
- ✅ Keyboard support (Escape key)
- ✅ Screen reader support via `role="dialog"`
- ✅ Back-button support (History API integration)
