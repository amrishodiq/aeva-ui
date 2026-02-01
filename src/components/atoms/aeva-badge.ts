import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * A versatile badge component for tags and labels.
 * Supports text, icons, and combinations with optional delete functionality.
 *
 * @slot - Default slot for badge text content
 * @slot icon - Slot for icon/image content
 *
 * @fires badge-delete - Fired when the delete button is clicked
 *
 * @csspart badge - The badge container element
 * @csspart content - The content wrapper element
 * @csspart delete-button - The delete button element
 *
 * @cssprop --aeva-badge-font-family - Font family for badge text
 * @cssprop --aeva-badge-border-radius - Border radius for badge
 * @cssprop --aeva-badge-transition - Transition timing for state changes
 * @cssprop --aeva-badge-gap - Gap between icon and text
 *
 * @cssprop --aeva-badge-primary-bg - Primary variant background color
 * @cssprop --aeva-badge-primary-color - Primary variant text color
 * @cssprop --aeva-badge-primary-border - Primary variant border color
 *
 * @cssprop --aeva-badge-secondary-bg - Secondary variant background color
 * @cssprop --aeva-badge-secondary-color - Secondary variant text color
 * @cssprop --aeva-badge-secondary-border - Secondary variant border color
 *
 * @cssprop --aeva-badge-success-bg - Success variant background color
 * @cssprop --aeva-badge-success-color - Success variant text color
 * @cssprop --aeva-badge-success-border - Success variant border color
 *
 * @cssprop --aeva-badge-warning-bg - Warning variant background color
 * @cssprop --aeva-badge-warning-color - Warning variant text color
 * @cssprop --aeva-badge-warning-border - Warning variant border color
 *
 * @cssprop --aeva-badge-danger-bg - Danger variant background color
 * @cssprop --aeva-badge-danger-color - Danger variant text color
 * @cssprop --aeva-badge-danger-border - Danger variant border color
 *
 * @cssprop --aeva-badge-info-bg - Info variant background color
 * @cssprop --aeva-badge-info-color - Info variant text color
 * @cssprop --aeva-badge-info-border - Info variant border color
 *
 * @cssprop --aeva-badge-padding-sm - Padding for small badge
 * @cssprop --aeva-badge-font-size-sm - Font size for small badge
 * @cssprop --aeva-badge-padding-md - Padding for medium badge
 * @cssprop --aeva-badge-font-size-md - Font size for medium badge
 * @cssprop --aeva-badge-padding-lg - Padding for large badge
 * @cssprop --aeva-badge-font-size-lg - Font size for large badge
 *
 * @cssprop --aeva-badge-delete-size - Size of delete button
 * @cssprop --aeva-badge-delete-hover-bg - Delete button hover background
 */
@customElement('aeva-badge')
export class AevaBadge extends LitElement {
    static styles = css`
    :host {
      --aeva-badge-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      --aeva-badge-border-radius: 16px;
      --aeva-badge-transition: all 0.2s ease-in-out;
      --aeva-badge-gap: 6px;

      /* Primary variant */
      --aeva-badge-primary-bg: #e8eaf6;
      --aeva-badge-primary-color: #3f51b5;
      --aeva-badge-primary-border: #c5cae9;

      /* Secondary variant */
      --aeva-badge-secondary-bg: #f5f5f5;
      --aeva-badge-secondary-color: #616161;
      --aeva-badge-secondary-border: #e0e0e0;

      /* Success variant */
      --aeva-badge-success-bg: #e8f5e9;
      --aeva-badge-success-color: #2e7d32;
      --aeva-badge-success-border: #c8e6c9;

      /* Warning variant */
      --aeva-badge-warning-bg: #fff3e0;
      --aeva-badge-warning-color: #e65100;
      --aeva-badge-warning-border: #ffe0b2;

      /* Danger variant */
      --aeva-badge-danger-bg: #ffebee;
      --aeva-badge-danger-color: #c62828;
      --aeva-badge-danger-border: #ffcdd2;

      /* Info variant */
      --aeva-badge-info-bg: #e3f2fd;
      --aeva-badge-info-color: #1565c0;
      --aeva-badge-info-border: #bbdefb;

      /* Sizes */
      --aeva-badge-padding-sm: 4px 10px;
      --aeva-badge-font-size-sm: 12px;

      --aeva-badge-padding-md: 6px 12px;
      --aeva-badge-font-size-md: 14px;

      --aeva-badge-padding-lg: 8px 16px;
      --aeva-badge-font-size-lg: 16px;

      /* Delete button */
      --aeva-badge-delete-size: 16px;
      --aeva-badge-delete-hover-bg: rgba(0, 0, 0, 0.1);

      display: inline-flex;
      align-items: center;
    }

    .badge {
      font-family: var(--aeva-badge-font-family);
      border-radius: var(--aeva-badge-border-radius);
      transition: var(--aeva-badge-transition);
      display: inline-flex;
      align-items: center;
      gap: var(--aeva-badge-gap);
      border: 1px solid;
      font-weight: 500;
      white-space: nowrap;
      max-width: 100%;
    }

    /* Size variants */
    .size-sm {
      padding: var(--aeva-badge-padding-sm);
      font-size: var(--aeva-badge-font-size-sm);
    }

    .size-md {
      padding: var(--aeva-badge-padding-md);
      font-size: var(--aeva-badge-font-size-md);
    }

    .size-lg {
      padding: var(--aeva-badge-padding-lg);
      font-size: var(--aeva-badge-font-size-lg);
    }

    /* Color variants */
    .variant-primary {
      background-color: var(--aeva-badge-primary-bg);
      color: var(--aeva-badge-primary-color);
      border-color: var(--aeva-badge-primary-border);
    }

    .variant-secondary {
      background-color: var(--aeva-badge-secondary-bg);
      color: var(--aeva-badge-secondary-color);
      border-color: var(--aeva-badge-secondary-border);
    }

    .variant-success {
      background-color: var(--aeva-badge-success-bg);
      color: var(--aeva-badge-success-color);
      border-color: var(--aeva-badge-success-border);
    }

    .variant-warning {
      background-color: var(--aeva-badge-warning-bg);
      color: var(--aeva-badge-warning-color);
      border-color: var(--aeva-badge-warning-border);
    }

    .variant-danger {
      background-color: var(--aeva-badge-danger-bg);
      color: var(--aeva-badge-danger-color);
      border-color: var(--aeva-badge-danger-border);
    }

    .variant-info {
      background-color: var(--aeva-badge-info-bg);
      color: var(--aeva-badge-info-color);
      border-color: var(--aeva-badge-info-border);
    }

    /* Content wrapper */
    .content {
      display: inline-flex;
      align-items: center;
      gap: var(--aeva-badge-gap);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Delete button */
    .delete-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--aeva-badge-delete-size);
      height: var(--aeva-badge-delete-size);
      border-radius: 50%;
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 0;
      margin-left: 2px;
      transition: var(--aeva-badge-transition);
      flex-shrink: 0;
      color: currentColor;
      -webkit-tap-highlight-color: transparent;
    }

    .delete-button:hover {
      background-color: var(--aeva-badge-delete-hover-bg);
    }

    .delete-button:active {
      transform: scale(0.9);
    }

    .delete-button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 1px;
    }

    /* Delete icon (X) */
    .delete-icon {
      width: 10px;
      height: 10px;
      position: relative;
    }

    .delete-icon::before,
    .delete-icon::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1.5px;
      background-color: currentColor;
      top: 50%;
      left: 50%;
      border-radius: 1px;
    }

    .delete-icon::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .delete-icon::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    /* Slot styling */
    ::slotted(*) {
      display: inline-flex;
      align-items: center;
    }

    ::slotted(svg),
    ::slotted(img) {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }

    ::slotted(img) {
      border-radius: 50%;
      object-fit: cover;
    }
  `;

    /**
     * Badge variant/color
     */
    @property({ type: String, reflect: true })
    variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' =
        'primary';

    /**
     * Badge size
     */
    @property({ type: String, reflect: true })
    size: 'sm' | 'md' | 'lg' = 'md';

    /**
     * Whether the badge can be deleted
     */
    @property({ type: Boolean, reflect: true })
    deletable = false;

    /**
     * Aria label for the delete button
     */
    @property({ type: String, attribute: 'delete-label' })
    deleteLabel = 'Remove badge';

    private handleDelete(e: Event) {
        e.stopPropagation();

        // Dispatch custom event
        this.dispatchEvent(
            new CustomEvent('badge-delete', {
                bubbles: true,
                composed: true,
                detail: {
                    badge: this,
                },
            })
        );

        // Animate out and remove
        const badge = this.shadowRoot?.querySelector('.badge') as HTMLElement;
        if (badge) {
            badge.style.transform = 'scale(0)';
            badge.style.opacity = '0';

            setTimeout(() => {
                this.remove();
            }, 200);
        }
    }

    render() {
        const classes = {
            badge: true,
            [`variant-${this.variant}`]: true,
            [`size-${this.size}`]: true,
        };

        return html`
      <div part="badge" class="${classMap(classes)}">
        <div part="content" class="content">
          <slot name="icon"></slot>
          <slot></slot>
        </div>
        ${this.deletable
                ? html`
              <button
                part="delete-button"
                class="delete-button"
                @click="${this.handleDelete}"
                aria-label="${this.deleteLabel}"
                type="button"
              >
                <span class="delete-icon" aria-hidden="true"></span>
              </button>
            `
                : ''}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-badge': AevaBadge;
    }
}
