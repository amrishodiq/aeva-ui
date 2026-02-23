import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { accessibilityStyles } from '../../styles/accessibility';
import { WithCloseAnimation } from '../../utils/behaviors';

/**
 * A modal overlay component with backdrop blur effect.
 * Features semi-transparent background, smooth animations, and accessibility support.
 *
 * @slot - Default slot for modal content
 *
 * @fires open - Dispatched when the modal opens
 * @fires close - Dispatched when the modal closes
 * @fires backdrop-click - Dispatched when the backdrop is clicked
 *
 * @csspart modal - The main modal container
 * @csspart backdrop - The backdrop overlay
 *
 * @cssprop --aeva-modal-bg - Background color of the modal (default: rgba(255, 255, 255, 0.7))
 * @cssprop --aeva-modal-border-radius - Border radius of the modal (default: 22px)
 * @cssprop --aeva-modal-padding - Padding inside the modal (default: 2rem)
 * @cssprop --aeva-modal-max-width - Maximum width of the modal (default: 600px)
 * @cssprop --aeva-modal-backdrop-bg - Backdrop background color (default: rgba(0, 0, 0, 0.4))
 * @cssprop --aeva-modal-border-color - Border color (default: rgba(255, 255, 255, 0.5))
 * @cssprop --aeva-modal-shadow-color - Shadow color (default: rgba(0, 0, 0, 0.1))
 */
@customElement('aeva-modal')
export class AevaModal extends WithCloseAnimation(LitElement) {
  static styles = [
    accessibilityStyles,
    css`
      :host {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: var(--aeva-z-modal);
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
        background: var(--aeva-modal-backdrop-bg);
        animation: fadeIn 0.3s ease-out;
      }

      .modal-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }

      .modal {
        position: relative;
        background: var(--aeva-modal-bg);
        backdrop-filter: blur(var(--aeva-modal-blur, 10px));
        -webkit-backdrop-filter: blur(var(--aeva-modal-blur, 10px));
        border-radius: var(--aeva-modal-border-radius);
        padding: var(--aeva-modal-padding);
        max-width: var(--aeva-modal-max-width);
        width: 100%;
        pointer-events: auto;
        animation: modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

        /* Edge shimmer effect */
        border: 1px solid var(--aeva-modal-border-color);

        /* Elevation shadow */
        box-shadow:
          0 4px 6px -1px var(--aeva-modal-shadow-color),
          0 2px 4px -1px var(--aeva-modal-shadow-color);
      }

      /* Elevation levels */
      :host([elevation='1']) .modal {
        box-shadow:
          0 1px 3px 0 var(--aeva-modal-shadow-color),
          0 1px 2px 0 var(--aeva-modal-shadow-color);
      }

      :host([elevation='2']) .modal {
        box-shadow:
          0 4px 6px -1px var(--aeva-modal-shadow-color),
          0 2px 4px -1px var(--aeva-modal-shadow-color);
      }

      :host([elevation='3']) .modal {
        box-shadow:
          0 10px 15px -3px var(--aeva-modal-shadow-color),
          0 4px 6px -2px var(--aeva-modal-shadow-color);
      }

      :host([elevation='4']) .modal {
        box-shadow:
          0 20px 25px -5px var(--aeva-modal-shadow-color),
          0 10px 10px -5px var(--aeva-modal-shadow-color);
      }

      :host([elevation='5']) .modal {
        box-shadow: 0 25px 50px -12px var(--aeva-modal-shadow-color);
      }

      /* Shimmer effect using pseudo-element */
      .modal::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: var(--aeva-modal-border-radius);
        padding: 1px;
        background: var(--aeva-modal-shimmer-gradient);
        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        animation: shimmer 3s ease-in-out infinite;
      }

      /* Closing animation */
      :host([closing]) .backdrop {
        animation: fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      :host([closing]) .modal {
        animation: modalOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

      @keyframes modalIn {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes modalOut {
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
        0%,
        100% {
          opacity: 0.5;
        }
        50% {
          opacity: 1;
        }
      }

      /* Responsive - Mobile First */
      /* Mobile: 100vw - 24px (12px padding on each side) */
      @media (max-width: 767px) {
        .modal {
          max-width: calc(100vw - 24px);
          margin: 0;
        }
      }

      /* Tablet: 80% of 640px = 512px */
      @media (min-width: 640px) and (max-width: 1023px) {
        .modal {
          max-width: 512px;
        }
      }

      /* Desktop/Laptop: 80% of 1024px = 819px */
      @media (min-width: 1024px) {
        .modal {
          max-width: 819px;
        }
      }
    `,
  ];

  /**
   * Whether the modal is open
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
      this.style.setProperty('--aeva-modal-blur', `${this.blurAmount}px`);
    }
  }

  private handleOpen() {
    this.closing = false;
    this.previousFocus = document.activeElement as HTMLElement;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Add to history for back button support
    if (window.history.state?.aevaModal !== true) {
      window.history.pushState({ aevaModal: true }, '');
    }

    // Focus the modal
    this.updateComplete.then(() => {
      const modal = this.shadowRoot?.querySelector('.modal') as HTMLElement;
      modal?.focus();
    });

    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  private handleClose() {
    // Restore body scroll
    document.body.style.overflow = '';

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
      this.close(false);
    }
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.closeOnEsc && this.open) {
      e.preventDefault();
      this.close(false);
    }
  };

  private handlePopState = () => {
    if (this.open && window.history.state?.aevaModal !== true) {
      this.close(true);
    }
  };

  /**
   * Close the modal with animation
   * @param fromPopState Whether the close was triggered by a popstate event
   */
  public async close(fromPopState = false) {
    // Remove from history if we added it, unless we're already coming from a popstate
    if (!fromPopState && window.history.state?.aevaModal === true) {
      window.history.back();
    }

    await this.closeWithAnimation(300);
  }

  render() {
    return html`
      ${this.backdrop
        ? html`<div part="backdrop" class="backdrop" @click=${this.handleBackdropClick}></div>`
        : ''}
      <div class="modal-container">
        <div part="modal" class="modal" tabindex="-1" role="dialog" aria-modal="true">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-modal': AevaModal;
  }
}
