import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A simple icon component with customizable size, shape, and border styles.
 * Perfect for avatars, profile pictures, or decorative icons.
 *
 * @slot - Default slot for icon content (SVG, emoji, text, or image)
 *
 * @csspart container - The icon container element
 *
 * @cssprop --aeva-icon-bg - Background color (default: #f5f5f5)
 * @cssprop --aeva-icon-color - Icon/text color (default: #667eea)
 * @cssprop --aeva-icon-border-color - Border color for solid style (default: #667eea)
 * @cssprop --aeva-icon-border-width - Border width (default: 2px)
 * @cssprop --aeva-icon-size-sm - Custom size for small (default: 40px)
 * @cssprop --aeva-icon-size-md - Custom size for medium (default: 56px)
 * @cssprop --aeva-icon-size-lg - Custom size for large (default: 72px)
 */
@customElement('aeva-icon')
export class AevaIcon extends LitElement {
  static styles = css`
    :host {
      --aeva-icon-bg: #f5f5f5;
      --aeva-icon-color: #667eea;
      --aeva-icon-border-color: #000000;  /* Monochrome: black for light mode */
      --aeva-icon-border-width: 2px;
      --aeva-icon-size-sm: 40px;
      --aeva-icon-size-md: 56px;
      --aeva-icon-size-lg: 72px;

      display: inline-flex;
    }

    .icon-container {
      display: flex;  /* Changed from inline-flex for better centering */
      align-items: center;
      justify-content: center;
      background: var(--aeva-icon-bg);
      color: var(--aeva-icon-color);
      overflow: hidden;
      transition: all 0.2s ease-in-out;
      position: relative;
    }

    /* Size variants */
    .size-sm {
      width: var(--aeva-icon-size-sm);
      height: var(--aeva-icon-size-sm);
      font-size: calc(var(--aeva-icon-size-sm) * 0.5);
    }

    .size-md {
      width: var(--aeva-icon-size-md);
      height: var(--aeva-icon-size-md);
      font-size: calc(var(--aeva-icon-size-md) * 0.5);
    }

    .size-lg {
      width: var(--aeva-icon-size-lg);
      height: var(--aeva-icon-size-lg);
      font-size: calc(var(--aeva-icon-size-lg) * 0.5);
    }

    /* Shape variants */
    .shape-circle {
      border-radius: 50%;
    }

    .shape-rect {
      border-radius: 0;
    }

    .shape-round-rect {
      border-radius: 12px;
    }

    /* Border styles */
    .border-none {
      border: none;
    }

    .border-solid {
      border: var(--aeva-icon-border-width) solid var(--aeva-icon-border-color);
    }

    /* Fading border effect - blur/fade to opacity 0 at edges */
    .border-fading {
      mask-image: radial-gradient(black 30%, transparent);
      -webkit-mask-image: radial-gradient(black 30%, transparent);
    }

    /* Slot styling - improved centering */
    ::slotted(*) {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
      max-height: 100%;
    }

    ::slotted(svg) {
      width: 60%;
      height: 60%;
      display: block;
    }

    ::slotted(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  `;

  /**
   * Size of the icon
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Shape of the icon
   */
  @property({ type: String, reflect: true })
  shape: 'circle' | 'rect' | 'round-rect' = 'circle';

  /**
   * Border style
   */
  @property({ type: String, reflect: true })
  border: 'none' | 'solid' | 'fading' = 'none';

  render() {
    const classes = [
      'icon-container',
      `size-${this.size}`,
      `shape-${this.shape}`,
      `border-${this.border}`
    ].join(' ');

    return html`
      <div part="container" class="${classes}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-icon': AevaIcon;
  }
}
