import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { accessibilityStyles } from '../../styles/accessibility';

/**
 * A versatile button component with multiple variants, sizes, and states.
 * Supports text, icons, and combinations with full accessibility support.
 *
 * @slot - Default slot for button text content
 * @slot icon-left - Slot for icon on the left side of text
 * @slot icon-right - Slot for icon on the right side of text
 * @slot icon-only - Slot for icon-only button
 *
 * @csspart button - The button element
 *
 * @cssprop --aeva-button-font-family - Font family for button text
 * @cssprop --aeva-button-border-radius - Border radius for all buttons
 * @cssprop --aeva-button-transition - Transition timing for state changes
 * @cssprop --aeva-button-focus-ring-color - Color of the focus ring
 * @cssprop --aeva-button-focus-ring-width - Width of the focus ring
 * @cssprop --aeva-button-focus-ring-offset - Offset of the focus ring
 *
 * @cssprop --aeva-button-primary-bg - Primary variant background color
 * @cssprop --aeva-button-primary-color - Primary variant text color
 * @cssprop --aeva-button-primary-hover-bg - Primary variant hover background
 * @cssprop --aeva-button-primary-active-bg - Primary variant active background
 *
 * @cssprop --aeva-button-secondary-bg - Secondary variant background color
 * @cssprop --aeva-button-secondary-color - Secondary variant text color
 * @cssprop --aeva-button-secondary-hover-bg - Secondary variant hover background
 * @cssprop --aeva-button-secondary-active-bg - Secondary variant active background
 *
 * @cssprop --aeva-button-outline-border-color - Outline variant border color
 * @cssprop --aeva-button-outline-color - Outline variant text color
 * @cssprop --aeva-button-outline-hover-bg - Outline variant hover background
 *
 * @cssprop --aeva-button-ghost-color - Ghost variant text color
 * @cssprop --aeva-button-ghost-hover-bg - Ghost variant hover background
 *
 * @cssprop --aeva-button-danger-bg - Danger variant background color
 * @cssprop --aeva-button-danger-color - Danger variant text color
 * @cssprop --aeva-button-danger-hover-bg - Danger variant hover background
 * @cssprop --aeva-button-danger-active-bg - Danger variant active background
 *
 * @cssprop --aeva-button-disabled-opacity - Opacity for disabled state
 * @cssprop --aeva-button-disabled-cursor - Cursor for disabled state
 *
 * @cssprop --aeva-button-padding-sm - Padding for small button
 * @cssprop --aeva-button-font-size-sm - Font size for small button
 * @cssprop --aeva-button-padding-md - Padding for medium button
 * @cssprop --aeva-button-font-size-md - Font size for medium button
 * @cssprop --aeva-button-padding-lg - Padding for large button
 * @cssprop --aeva-button-font-size-lg - Font size for large button
 *
 * @cssprop --aeva-button-icon-padding-sm - Padding for small icon-only button
 * @cssprop --aeva-button-icon-width-sm - Width for small icon-only button
 * @cssprop --aeva-button-icon-padding-md - Padding for medium icon-only button
 * @cssprop --aeva-button-icon-width-md - Width for medium icon-only button
 * @cssprop --aeva-button-icon-padding-lg - Padding for large icon-only button
 * @cssprop --aeva-button-icon-width-lg - Width for large icon-only button
 *
 * @cssprop --aeva-button-gap - Gap between icon and text
 * @cssprop --aeva-button-outline-active-bg - Outline variant active background
 * @cssprop --aeva-button-ghost-active-bg - Ghost variant active background
 */
@customElement('aeva-button')
export class AevaButton extends LitElement {
  static styles = [
    accessibilityStyles,
    css`
      :host {
        display: inline-block;
        max-width: 80%;
      }

      :host([full-width]) {
        display: block;
        width: 100%;
        max-width: 100%;
      }

      button {
        font-family: var(--aeva-button-font-family);
        border: none;
        cursor: pointer;
        font-weight: 500;
        transition: var(--aeva-button-transition);
        border-radius: var(--aeva-button-border-radius);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--aeva-button-gap);
        white-space: nowrap;
        position: relative;
        /* Minimum 44x44px hit area for accessibility */
        min-width: 44px;
        min-height: 44px;
        /* Remove tap highlight on mobile */
        -webkit-tap-highlight-color: transparent;
      }

      :host([full-width]) button {
        max-width: none;
        width: 100%;
      }

      /* Focus ring for accessibility */
      button:focus-visible {
        outline: var(--aeva-button-focus-ring-width) solid var(--aeva-button-focus-ring-color);
        outline-offset: var(--aeva-button-focus-ring-offset);
      }

      /* Size variants */
      .size-sm {
        padding: var(--aeva-button-padding-sm);
        font-size: var(--aeva-button-font-size-sm);
      }

      .size-md {
        padding: var(--aeva-button-padding-md);
        font-size: var(--aeva-button-font-size-md);
      }

      .size-lg {
        padding: var(--aeva-button-padding-lg);
        font-size: var(--aeva-button-font-size-lg);
      }

      /* Icon-only buttons - square shape */
      .icon-only {
        padding: var(--aeva-button-icon-padding-md);
        gap: 0;
        aspect-ratio: 1;
      }

      .icon-only.size-sm {
        padding: var(--aeva-button-icon-padding-sm);
        width: var(--aeva-button-icon-width-sm);
      }

      .icon-only.size-md {
        padding: var(--aeva-button-icon-padding-md);
        width: var(--aeva-button-icon-width-md);
      }

      .icon-only.size-lg {
        padding: var(--aeva-button-icon-padding-lg);
        width: var(--aeva-button-icon-width-lg);
      }

      /* Primary variant */
      .variant-primary {
        background-color: var(--aeva-button-primary-bg);
        color: var(--aeva-button-primary-color);
      }

      .variant-primary:hover:not(:disabled) {
        background-color: var(--aeva-button-primary-hover-bg);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); /* Fallback */
        box-shadow: 0 4px 12px color-mix(in srgb, var(--aeva-button-primary-bg) 40%, transparent);
      }

      .variant-primary:active:not(:disabled) {
        background-color: var(--aeva-button-primary-active-bg);
        transform: scale(0.95);
        box-shadow: none;
      }

      /* Secondary variant */
      .variant-secondary {
        background-color: var(--aeva-button-secondary-bg);
        color: var(--aeva-button-secondary-color);
      }

      .variant-secondary:hover:not(:disabled) {
        background-color: var(--aeva-button-secondary-hover-bg);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(108, 117, 125, 0.4); /* Fallback */
        box-shadow: 0 4px 12px color-mix(in srgb, var(--aeva-button-secondary-bg) 40%, transparent);
      }

      .variant-secondary:active:not(:disabled) {
        background-color: var(--aeva-button-secondary-active-bg);
        transform: scale(0.95);
        box-shadow: none;
      }

      /* Outline variant */
      .variant-outline {
        background-color: transparent;
        color: var(--aeva-button-outline-color);
        border: 2px solid var(--aeva-button-outline-border-color);
      }

      .variant-outline:hover:not(:disabled) {
        background-color: var(--aeva-button-outline-hover-bg);
        transform: translateY(-1px);
      }

      .variant-outline:active:not(:disabled) {
        background-color: rgba(102, 126, 234, 0.2); /* Fallback */
        background-color: var(--aeva-button-outline-active-bg);
        background-color: color-mix(in srgb, var(--aeva-button-outline-color) 20%, transparent);
        transform: scale(0.95);
      }

      /* Ghost variant */
      .variant-ghost {
        background-color: transparent;
        color: var(--aeva-button-ghost-color);
      }

      .variant-ghost:hover:not(:disabled) {
        background-color: var(--aeva-button-ghost-hover-bg);
      }

      .variant-ghost:active:not(:disabled) {
        background-color: rgba(102, 126, 234, 0.2); /* Fallback */
        background-color: var(--aeva-button-ghost-active-bg);
        background-color: color-mix(in srgb, var(--aeva-button-ghost-color) 20%, transparent);
        transform: scale(0.95);
      }

      /* Danger variant */
      .variant-danger {
        background-color: var(--aeva-button-danger-bg);
        color: var(--aeva-button-danger-color);
      }

      .variant-danger:hover:not(:disabled) {
        background-color: var(--aeva-button-danger-hover-bg);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4); /* Fallback */
        box-shadow: 0 4px 12px color-mix(in srgb, var(--aeva-button-danger-bg) 40%, transparent);
      }

      .variant-danger:active:not(:disabled) {
        background-color: var(--aeva-button-danger-active-bg);
        transform: scale(0.95);
        box-shadow: none;
      }

      /* Disabled state */
      button:disabled {
        opacity: var(--aeva-button-disabled-opacity);
        cursor: var(--aeva-button-disabled-cursor);
        transform: none !important;
        box-shadow: none !important;
      }

      /* Loading state */
      .loading {
        position: relative;
        pointer-events: none;
        color: transparent;
      }

      .loading::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        border: 2px solid;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 0.6s linear infinite;
      }

      .variant-primary.loading::after {
        border-color: var(--aeva-button-primary-color);
        border-top-color: transparent;
      }

      .variant-secondary.loading::after {
        border-color: var(--aeva-button-secondary-color);
        border-top-color: transparent;
      }

      .variant-outline.loading::after,
      .variant-ghost.loading::after {
        border-color: var(--aeva-button-outline-color);
        border-top-color: transparent;
      }

      .variant-danger.loading::after {
        border-color: var(--aeva-button-danger-color);
        border-top-color: transparent;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Slot styling */
      slot {
        display: contents;
      }

      ::slotted(*) {
        display: inline-flex;
        align-items: center;
      }

      ::slotted(svg) {
        width: 1em;
        height: 1em;
        flex-shrink: 0;
      }
    `,
  ];

  /**
   * Button variant style
   */
  @property({ type: String, reflect: true })
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';

  /**
   * Button size
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the button is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the button is in loading state
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Whether the button should take full width
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Button type attribute
   */
  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Whether this is an icon-only button
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-only' })
  iconOnly = false;

  /**
   * Aria label for icon-only buttons
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  connectedCallback() {
    super.connectedCallback();

    // Validate slot combinations (development warning)
    this.updateComplete.then(() => {
      const slots = this.shadowRoot?.querySelectorAll('slot');
      const filledSlots: string[] = [];

      slots?.forEach((slot) => {
        const assignedNodes = slot.assignedNodes({ flatten: true });
        const hasContent = assignedNodes.some(
          (node) => node.nodeType === Node.ELEMENT_NODE || node.textContent?.trim()
        );

        if (hasContent) {
          filledSlots.push(slot.name || 'default');
        }
      });

      // Warn if icon-only is used with other slots
      if (filledSlots.includes('icon-only') && filledSlots.length > 1) {
        console.warn(
          '[aeva-button] Using slot="icon-only" with other slots may cause unexpected layout. ' +
            'Use icon-only alone, or use icon-left/icon-right with default slot.',
          { filledSlots }
        );
      }
    });
  }

  render() {
    const classes = {
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true,
      loading: this.loading,
      'icon-only': this.iconOnly,
    };

    return html`
      <button
        part="button"
        type="${this.type}"
        class="${classMap(classes)}"
        ?disabled="${this.disabled || this.loading}"
        aria-label="${this.ariaLabel || ''}"
        aria-busy="${this.loading}"
      >
        <slot name="icon-only"></slot>
        <slot name="icon-left"></slot>
        <slot></slot>
        <slot name="icon-right"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-button': AevaButton;
  }
}
