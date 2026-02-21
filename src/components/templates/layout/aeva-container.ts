import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A container component with responsive max-width presets.
 * Perfect for wrapping page content with consistent sizing.
 *
 * @slot - Content to be contained
 *
 * @csspart container - The container element
 *
 * @cssprop --aeva-container-max-width-sm - Max width for small container (default: 640px)
 * @cssprop --aeva-container-max-width-md - Max width for medium container (default: 768px)
 * @cssprop --aeva-container-max-width-lg - Max width for large container (default: 1024px)
 * @cssprop --aeva-container-max-width-xl - Max width for extra large container (default: 1280px)
 * @cssprop --aeva-container-max-width-full - Max width for full container (default: 100%)
 *
 * @cssprop --aeva-container-padding-none - Padding for none (default: 0)
 * @cssprop --aeva-container-padding-sm - Padding for small (default: 1rem)
 * @cssprop --aeva-container-padding-md - Padding for medium (default: 1.5rem)
 * @cssprop --aeva-container-padding-lg - Padding for large (default: 2rem)
 */
@customElement('aeva-container')
export class AevaContainer extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .container {
      width: 100%;
      box-sizing: border-box;
    }

    /* Size variants */
    .size-sm {
      max-width: var(--aeva-container-max-width-sm);
    }

    .size-md {
      max-width: var(--aeva-container-max-width-md);
    }

    .size-lg {
      max-width: var(--aeva-container-max-width-lg);
    }

    .size-xl {
      max-width: var(--aeva-container-max-width-xl);
    }

    .size-full {
      max-width: var(--aeva-container-max-width-full);
    }

    /* Centered */
    .centered {
      margin-left: auto;
      margin-right: auto;
    }

    /* Padding variants */
    .padding-none {
      padding: var(--aeva-container-padding-none);
    }

    .padding-sm {
      padding: var(--aeva-container-padding-sm);
    }

    .padding-md {
      padding: var(--aeva-container-padding-md);
    }

    .padding-lg {
      padding: var(--aeva-container-padding-lg);
    }
  `;

  /**
   * Container size preset
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg';

  /**
   * Whether the container should be centered
   */
  @property({ type: Boolean, reflect: true })
  centered = true;

  /**
   * Padding size
   */
  @property({ type: String, reflect: true })
  padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  render() {
    const classes = [
      'container',
      `size-${this.size}`,
      `padding-${this.padding}`,
      this.centered ? 'centered' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="${classes}" part="container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-container': AevaContainer;
  }
}
