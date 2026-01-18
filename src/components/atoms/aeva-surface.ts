import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A floating surface component with liquid glass (glassmorphism) effect.
 * Features semi-transparent background, backdrop blur, edge shimmer, and elevation shadow.
 *
 * @slot - Default slot for surface content
 *
 * @fires open - Dispatched when the surface opens
 * @fires close - Dispatched when the surface closes
 * @fires backdrop-click - Dispatched when the backdrop is clicked
 *
 * @csspart surface - The main surface container
 * @csspart backdrop - The backdrop overlay
 *
 * @cssprop --aeva-surface-bg - Background color of the surface (default: rgba(255, 255, 255, 0.7))
 * @cssprop --aeva-surface-border-radius - Border radius of the surface (default: 24px)
 * @cssprop --aeva-surface-padding - Padding inside the surface (default: 2rem)
 * @cssprop --aeva-surface-max-width - Maximum width of the surface (default: 600px)
 * @cssprop --aeva-surface-backdrop-bg - Backdrop background color (default: rgba(0, 0, 0, 0.4))
 * @cssprop --aeva-surface-border-color - Border color for shimmer effect (default: rgba(255, 255, 255, 0.5))
 * @cssprop --aeva-surface-shadow-color - Shadow color (default: rgba(0, 0, 0, 0.1))
 */
@customElement('aeva-surface')
export class AevaSurface extends LitElement {
  static styles = css`
    :host {
      --aeva-surface-bg: rgba(255, 255, 255, 0.7);
      --aeva-surface-border-radius: 24px;
      --aeva-surface-padding: 2rem;
      --aeva-surface-max-width: 600px;
      --aeva-surface-backdrop-bg: rgba(0, 0, 0, 0.4);
      --aeva-surface-border-color: rgba(255, 255, 255, 0.5);
      --aeva-surface-shadow-color: rgba(0, 0, 0, 0.1);

      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }

    :host([open]) {
      display: block;
    }

    .backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--aeva-surface-backdrop-bg);
      animation: fadeIn 0.3s ease-out;
    }

    .surface-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      pointer-events: none;
    }

    .surface {
      position: relative;
      background: var(--aeva-surface-bg);
      backdrop-filter: blur(var(--aeva-surface-blur, 10px));
      -webkit-backdrop-filter: blur(var(--aeva-surface-blur, 10px));
      border-radius: var(--aeva-surface-border-radius);
      padding: var(--aeva-surface-padding);
      max-width: var(--aeva-surface-max-width);
      width: 100%;
      pointer-events: auto;
      animation: surfaceIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      
      /* Edge shimmer effect */
      border: 1px solid var(--aeva-surface-border-color);
      
      /* Elevation shadow */
      box-shadow: 
        0 4px 6px -1px var(--aeva-surface-shadow-color),
        0 2px 4px -1px var(--aeva-surface-shadow-color);
    }

    /* Elevation levels */
    :host([elevation="1"]) .surface {
      box-shadow: 
        0 1px 3px 0 var(--aeva-surface-shadow-color),
        0 1px 2px 0 var(--aeva-surface-shadow-color);
    }

    :host([elevation="2"]) .surface {
      box-shadow: 
        0 4px 6px -1px var(--aeva-surface-shadow-color),
        0 2px 4px -1px var(--aeva-surface-shadow-color);
    }

    :host([elevation="3"]) .surface {
      box-shadow: 
        0 10px 15px -3px var(--aeva-surface-shadow-color),
        0 4px 6px -2px var(--aeva-surface-shadow-color);
    }

    :host([elevation="4"]) .surface {
      box-shadow: 
        0 20px 25px -5px var(--aeva-surface-shadow-color),
        0 10px 10px -5px var(--aeva-surface-shadow-color);
    }

    :host([elevation="5"]) .surface {
      box-shadow: 
        0 25px 50px -12px var(--aeva-surface-shadow-color);
    }

    /* Shimmer effect using pseudo-element */
    .surface::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: var(--aeva-surface-border-radius);
      padding: 1px;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0.6) 100%
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      animation: shimmer 3s ease-in-out infinite;
    }

    /* Closing animation */
    :host([closing]) .backdrop {
      animation: fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    :host([closing]) .surface {
      animation: surfaceOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    @keyframes surfaceIn {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes surfaceOut {
      0% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
      100% {
        opacity: 0;
        transform: scale(0.92) translateY(20px);
      }
    }

    @keyframes shimmer {
      0%, 100% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
    }

    /* Responsive */
    @media (max-width: 640px) {
      .surface {
        max-width: 100%;
        margin: 0;
      }
    }
  `;

  /**
   * Whether the surface is open
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether to show the backdrop
   */
  @property({ type: Boolean })
  backdrop = true;

  /**
   * Whether to close when clicking the backdrop
   */
  @property({ type: Boolean, attribute: 'close-on-backdrop' })
  closeOnBackdrop = true;

  /**
   * Whether to close when pressing Escape key
   */
  @property({ type: Boolean, attribute: 'close-on-esc' })
  closeOnEsc = true;

  /**
   * Elevation level (1-5)
   */
  @property({ type: Number, reflect: true })
  elevation = 3;

  /**
   * Backdrop blur amount in pixels
   */
  @property({ type: Number, attribute: 'blur-amount' })
  blurAmount = 10;

  @property({ type: Boolean, reflect: true })
  closing = false;

  private previousFocus: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('popstate', this.handlePopState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('popstate', this.handlePopState);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    }

    if (changedProperties.has('blurAmount')) {
      this.style.setProperty('--aeva-surface-blur', `${this.blurAmount}px`);
    }
  }

  private handleOpen() {
    this.closing = false;
    this.previousFocus = document.activeElement as HTMLElement;

    // Add to history for back button support
    if (window.history.state?.aevaSurface !== true) {
      window.history.pushState({ aevaSurface: true }, '');
    }

    // Focus the surface
    this.updateComplete.then(() => {
      const surface = this.shadowRoot?.querySelector('.surface') as HTMLElement;
      surface?.focus();
    });

    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  private handleClose() {
    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus();
      this.previousFocus = null;
    }

    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private handleBackdropClick = (e: MouseEvent) => {
    if (!this.closeOnBackdrop) return;

    const target = e.target as HTMLElement;
    if (target.classList.contains('backdrop')) {
      this.dispatchEvent(new CustomEvent('backdrop-click', { bubbles: true, composed: true }));
      this.close();
    }
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.closeOnEsc && this.open) {
      e.preventDefault();
      this.close();
    }
  };

  private handlePopState = () => {
    if (this.open) {
      this.close();
    }
  };

  /**
   * Close the surface with animation
   */
  public close() {
    // Use requestAnimationFrame to ensure the closing attribute is applied
    // before the animation starts
    requestAnimationFrame(() => {
      this.closing = true;

      // Remove from history if we added it
      if (window.history.state?.aevaSurface === true) {
        window.history.back();
      }

      setTimeout(() => {
        this.open = false;
        this.closing = false;
      }, 300);
    });
  }

  render() {
    return html`
      ${this.backdrop ? html`<div part="backdrop" class="backdrop" @click=${this.handleBackdropClick}></div>` : ''}
      <div class="surface-container">
        <div part="surface" class="surface" tabindex="-1" role="dialog" aria-modal="true">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-surface': AevaSurface;
  }
}
