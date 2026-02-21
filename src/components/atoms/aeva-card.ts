import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A simple card component for content containers.
 * Features clean design with white background, solid border, and no shadow.
 *
 * @slot - Default slot for main content (rendered in body section)
 * @slot header - Header content area
 * @slot body - Main content area (explicit)
 * @slot footer - Footer content area
 *
 * @fires card-click - Dispatched when the card is clicked (only when interactive=true)
 *
 * @csspart card - The main card container
 *
 * @cssprop --aeva-card-bg - Background color (default: #ffffff)
 * @cssprop --aeva-card-border-color - Border color (default: #e5e7eb)
 * @cssprop --aeva-card-border-hover-color - Border color on hover (default: #667eea)
 * @cssprop --aeva-card-border-radius - Border radius (default: 22px)
 * @cssprop --aeva-card-transition - Transition timing (default: all 0.2s ease)
 * @cssprop --aeva-card-padding-sm - Small padding (default: 1rem)
 * @cssprop --aeva-card-padding-md - Medium padding (default: 1.5rem)
 * @cssprop --aeva-card-padding-lg - Large padding (default: 2rem)
 */
@customElement('aeva-card')
export class AevaCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    .card {
      display: flex;
      flex-direction: column;
      background: var(--aeva-card-bg, #ffffff);
      border: 1px solid var(--aeva-card-border-color, #e5e7eb);
      border-radius: var(--aeva-card-border-radius, 22px);
      transition: var(--aeva-card-transition, all 0.2s ease);
      height: var(--aeva-card-height, 100%);
      box-sizing: border-box;
    }

    /* Padding variants */
    .padding-sm {
      padding: var(--aeva-card-padding-sm, 1rem);
    }

    .padding-md {
      padding: var(--aeva-card-padding-md, 1.5rem);
    }

    .padding-lg {
      padding: var(--aeva-card-padding-lg, 2rem);
    }

    /* Interactive state */
    .interactive {
      cursor: pointer;
    }

    .interactive:hover {
      border-color: var(--aeva-card-border-hover-color, #667eea);
    }

    /* Slot sections */
    .header {
      margin-bottom: 1rem;
    }

    .body {
      flex: 1;
      margin-bottom: 1rem;
    }

    .footer {
      margin-top: auto;
    }

    /* Hide empty slots */
    .header:not(:has(*)) {
      display: none;
      margin-bottom: 0;
    }

    .body:not(:has(*)) {
      display: none;
      margin-bottom: 0;
    }

    .footer:not(:has(*)) {
      display: none;
    }

    /* Fallback for browsers that don't support :has() */
    @supports not selector(:has(*)) {
      .header,
      .body,
      .footer {
        display: block;
      }
    }
  `;

  /**
   * Whether the card is interactive (clickable)
   */
  @property({ type: Boolean, reflect: true })
  interactive = false;

  /**
   * Padding size
   */
  @property({ type: String, reflect: true })
  padding: 'sm' | 'md' | 'lg' = 'md';

  private handleClick = () => {
    if (this.interactive) {
      this.dispatchEvent(
        new CustomEvent('card-click', {
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  render() {
    const classes = ['card', `padding-${this.padding}`, this.interactive ? 'interactive' : '']
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        part="card"
        class="${classes}"
        @click="${this.handleClick}"
        role="${this.interactive ? 'button' : 'article'}"
        tabindex="${this.interactive ? '0' : '-1'}"
        @keydown="${this.handleKeydown}"
      >
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="body">
          <slot name="body"><slot></slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (this.interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this.handleClick();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-card': AevaCard;
  }
}
