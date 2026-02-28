# Empty State

Empty states tell users that a container is intentionally blank, providing clarity and often offering an actionable next step.

## Import

```javascript
import { AevaEmptyState } from '@aeva/ui';
// or
import '@aeva/ui/dist/components/molecules/aeva-empty-state.js';
```

## Basic Usage

The simplest empty state requires a title and description to tell the user what is missing. The component centers this text content securely.

```html
<aeva-empty-state 
  title="No Search Results"
  description="We couldn't find any matches for your query. Try different keywords.">
</aeva-empty-state>
```

## Icons and Actions

A good empty state encourages the user to act. Supply an illustration or literal icon using `slot="icon"` and insert `aeva-button` into the default slot.

```html
<aeva-empty-state 
  title="Your Inbox is Empty"
  description="When you receive new messages, they will appear here.">
  
  <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>

  <aeva-button variant="primary">Send a Message</aeva-button>

</aeva-empty-state>
```

## Layouts

The `layout` parameter sets vertical (default) or horizontal mode. Horizontal mode aligns the icon alongside the text, useful for wide table rows or constrained vertical spaces.

```html
<aeva-empty-state 
  layout="horizontal"
  title="Disconnected"
  description="Please check your internet connection and try again.">
  <svg slot="icon">...</svg>
  <aeva-button variant="secondary">Retry Connection</aeva-button>
</aeva-empty-state>
```

## Sizes

Change size depending on the context scale. `size="sm"` is ideal for dropdowns or sidebars. `size="lg"` is designed for full page applications.

```html
<aeva-empty-state size="sm" title="No events today"></aeva-empty-state>

<aeva-empty-state size="lg" title="Welcome to Aeva" description="Let's build something extraordinary."></aeva-empty-state>
```

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `layout` | `"vertical" \| "horizontal"` | `"vertical"` | Dictates the flex direction of the interior content. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls overall padding and inner font sizes. |
| `title` | `string` | `""` | Primary declarative text indicating status. |
| `description` | `string` | `""` | Optional secondary instructional text. |

## Slots

| Slot Name | Description |
|---|---|
| `icon` | Where SVG icons or illustrative `img` elements should be injected. |
| `title` | Override for formatting the title with custom DOM vs raw text property. |
| `description` | Override for formatting the description with custom DOM (e.g., links). |
| `(default)` | Expected to house action items or buttons. |
