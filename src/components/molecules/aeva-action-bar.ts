import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * An action bar component for grouping action buttons with flexible layout options.
 * Typically used at the bottom of forms, modals, or pages.
 *
 * @slot primary - Primary action buttons (right-aligned by default)
 * @slot secondary - Secondary action buttons (left-aligned by default)
 * @slot - Default slot (falls back to primary)
 *
 * @csspart action-bar - The main action bar container
 *
 * @cssprop --aeva-action-bar-bg - Background color (default: transparent)
 * @cssprop --aeva-action-bar-padding - Padding for the action bar
 * @cssprop --aeva-action-bar-gap - Gap between button groups
 * @cssprop --aeva-action-bar-border-top - Border top style
 * @cssprop --aeva-action-bar-border-bottom - Border bottom style
 * @cssprop --aeva-action-bar-backdrop-filter - Backdrop filter effect (default: none)
 * @cssprop --aeva-action-bar-drop-shadow - Drop shadow effect (default: none)
 * @cssprop --aeva-action-bar-sticky-bg - Background when sticky (default: rgba(255, 255, 255, 0.95))
 * @cssprop --aeva-action-bar-sticky-blur - Backdrop blur when sticky (default: 10px)
 * @cssprop --aeva-action-bar-glassmorphism-border - Border style for glassmorphism effect
 * @cssprop --aeva-action-bar-glassmorphism-shadow - Box shadow for glassmorphism effect
 */
@customElement('aeva-action-bar')
export class AevaActionBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    .action-bar {
      display: flex;
      align-items: center;
      margin: var(--aeva-action-bar-padding);
      background: var(--aeva-action-bar-bg);
      border-top: var(--aeva-action-bar-border-top);
      border-bottom: var(--aeva-action-bar-border-bottom);
      backdrop-filter: var(--aeva-action-bar-backdrop-filter);
      -webkit-backdrop-filter: var(--aeva-action-bar-backdrop-filter);
      box-shadow: var(--aeva-action-bar-drop-shadow);
      box-sizing: border-box;
      gap: var(--aeva-action-bar-gap);
      border-radius: 12px;
    }

    /* Layout variants */
    .layout-horizontal {
      flex-direction: row;
    }

    .layout-vertical {
      flex-direction: column;
      align-items: stretch;
    }

    /* Alignment options */
    .align-start {
      justify-content: flex-start;
    }

    .align-end {
      justify-content: flex-end;
    }

    .align-center {
      justify-content: center;
    }

    .align-space-between {
      justify-content: space-between;
    }

    .align-space-around {
      justify-content: space-around;
    }

    /* Slot containers */
    .secondary,
    .primary {
      display: flex;
      gap: var(--aeva-action-bar-gap);
      align-items: center;
    }

    .layout-vertical .secondary,
    .layout-vertical .primary {
      width: 100%;
    }

    /* Hide empty slots */
    .secondary:not(:has(*)),
    .primary:not(:has(*)) {
      display: none;
    }

    /* Fallback for browsers that don't support :has() */
    @supports not selector(:has(*)) {
      .secondary,
      .primary {
        display: flex;
      }
    }

    /* Gap variants */
    :host([gap="xs"]) {
      --aeva-action-bar-gap: 0.25rem;
    }

    :host([gap="sm"]) {
      --aeva-action-bar-gap: 0.5rem;
    }

    :host([gap="md"]) {
      --aeva-action-bar-gap: 0.75rem;
    }

    :host([gap="lg"]) {
      --aeva-action-bar-gap: 1rem;
    }

    :host([gap="xl"]) {
      --aeva-action-bar-gap: 1.5rem;
    }

    /* Padding variants */
    :host([padding="none"]) {
      --aeva-action-bar-padding: 0;
    }

    :host([padding="xs"]) {
      --aeva-action-bar-padding: 0.5rem;
    }

    :host([padding="sm"]) {
      --aeva-action-bar-padding: 0.75rem;
    }

    :host([padding="md"]) {
      --aeva-action-bar-padding: 1rem;
    }

    :host([padding="lg"]) {
      --aeva-action-bar-padding: 1.5rem;
    }

    :host([padding="xl"]) {
      --aeva-action-bar-padding: 2rem;
    }

    /* Sticky positioning */
    :host([sticky]) .action-bar {
      position: sticky;
      bottom: 0;
      z-index: 100;
    }

    /* Glassmorphism effect */
    :host([glassmorphism]) .action-bar {
      background: var(--aeva-action-bar-sticky-bg);
      backdrop-filter: blur(var(--aeva-action-bar-sticky-blur));
      -webkit-backdrop-filter: blur(var(--aeva-action-bar-sticky-blur));
      border-top: var(--aeva-action-bar-glassmorphism-border);
      box-shadow: var(--aeva-action-bar-glassmorphism-shadow);
    }

    /* Responsive layout */
    @media (max-width: 640px) {
      :host([layout="responsive"]) .action-bar {
        flex-direction: column;
        align-items: stretch;
      }

      :host([layout="responsive"]) .secondary,
      :host([layout="responsive"]) .primary {
        width: 100%;
        flex-direction: column;
      }

      :host([layout="responsive"]) .secondary ::slotted(*),
      :host([layout="responsive"]) .primary ::slotted(*) {
        width: 100%;
      }
    }

    /* Full width buttons in vertical layout */
    .layout-vertical .secondary ::slotted(*),
    .layout-vertical .primary ::slotted(*) {
      width: 100%;
    }

    /* Reverse order in vertical layout (primary on top) */
    .layout-vertical {
      flex-direction: column-reverse;
    }
  `;

  /**
   * Layout direction
   */
  @property({ type: String, reflect: true })
  layout: 'horizontal' | 'vertical' | 'responsive' = 'horizontal';

  /**
   * Alignment of action groups
   */
  @property({ type: String, reflect: true })
  align: 'start' | 'end' | 'center' | 'space-between' | 'space-around' = 'space-between';

  /**
   * Gap between buttons
   */
  @property({ type: String, reflect: true })
  gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Padding around the action bar
   */
  @property({ type: String, reflect: true })
  padding: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Whether the action bar should stick to the bottom
   */
  @property({ type: Boolean, reflect: true })
  sticky = false;

  /**
   * Whether to apply glassmorphism effect
   */
  @property({ type: Boolean, reflect: true })
  glassmorphism = false;

  render() {
    const classes = [
      'action-bar',
      `layout-${this.layout}`,
      `align-${this.align}`,
    ].join(' ');

    return html`
      <div class="${classes}" part="action-bar">
        <div class="secondary">
          <slot name="secondary"></slot>
        </div>
        <div class="primary">
          <slot name="primary"><slot></slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-action-bar': AevaActionBar;
  }
}
