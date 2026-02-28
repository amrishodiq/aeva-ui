import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { accessibilityStyles } from '../../styles/accessibility';
import { WithCloseAnimation } from '../../utils/behaviors';
import { SpringController } from '../../controllers/spring-controller';

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
        display: contents;
      }

      dialog {
        padding: 0;
        margin: 0;
        border: none;
        background: transparent;
        width: 100vw;
        height: 100vh;
        max-width: none;
        max-height: none;
        overflow: hidden;
      }

      dialog::backdrop {
        background: transparent;
      }

      .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--aeva-modal-backdrop-bg);
        z-index: 1;
        will-change: opacity;
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
        z-index: 2;
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
        will-change: transform, opacity;

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

      /* Closing state CSS no longer uses animations, handled by spring */

      /* Keyframes for internal elements if needed */

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

  private spring = new SpringController(
    this,
    {
      stiffness: 0.1,
      damping: 0.6,
      mass: 1.2, // Heavier feel for a premium modal
    },
    0
  );

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

    const dialogEl = this.shadowRoot?.getElementById('native-dialog') as HTMLDialogElement;
    if (dialogEl && !dialogEl.open) {
      dialogEl.showModal();
    }

    // Lock body scroll
    const scrollContainer = document.querySelector('.content-area') || window;
    const isWindow = scrollContainer === window;

    // Calculate the current scroll to position the modal exactly there
    // This is no longer necessary as .modal-container and .backdrop are now position: fixed
    // but the overflow logic below is still needed to prevent background scrolling.

    if (isWindow) {
      document.body.style.overflow = 'hidden';
    } else {
      (scrollContainer as HTMLElement).style.overflow = 'hidden';
    }

    // Add to history for back button support
    if (window.history.state?.aevaModal !== true) {
      window.history.pushState({ aevaModal: true }, '');
    }

    // Focus the modal
    this.updateComplete.then(() => {
      this.spring.setTarget(1);
      const modal = this.shadowRoot?.querySelector('.modal') as HTMLElement;
      modal?.focus({ preventScroll: true });
    });

    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  private handleClose() {
    const dialogEl = this.shadowRoot?.getElementById('native-dialog') as HTMLDialogElement;
    if (dialogEl && dialogEl.open) {
      dialogEl.close();
    }

    // Restore body scroll
    const scrollContainer = document.querySelector('.content-area') || window;
    const isWindow = scrollContainer === window;

    if (isWindow) {
      document.body.style.overflow = '';
    } else {
      (scrollContainer as HTMLElement).style.overflow = '';
    }

    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus({ preventScroll: true });
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

  private handleNativeCancel = (e: Event) => {
    e.preventDefault(); // Prevent native instant close
    if (this.closeOnEsc && this.open) {
      this.close(false); // Trigger animated close
    }
  };

  /**
   * Close the modal with animation
   * @param fromPopState Whether the close was triggered by a popstate event
   */
  public async close(fromPopState = false) {
    this.spring.setTarget(0);
    // Wait for the spring to settle before hiding the modal from DOM
    await this.spring.whenSettled();
    await this.closeWithAnimation(0);

    // Remove from history if we added it, unless we're already coming from a popstate
    if (!fromPopState && window.history.state?.aevaModal === true) {
      window.history.back();
    }
  }

  render() {
    return html`
      <dialog id="native-dialog" @cancel=${this.handleNativeCancel}>
        ${this.backdrop
          ? html` <div
              part="backdrop"
              class="backdrop"
              style="${styleMap({ opacity: `${this.spring.value}` })}"
              @click=${this.handleBackdropClick}
            ></div>`
          : ''}
        <div class="modal-container">
          <div
            part="modal"
            class="modal"
            tabindex="-1"
            role="document"
            style="${styleMap({
              opacity: `${Math.min(1, this.spring.value * 1.5)}`, // Fade in slightly faster
              transform: `scale(${0.9 + this.spring.value * 0.1}) translateY(${(1 - this.spring.value) * 20}px)`,
            })}"
          >
            <slot></slot>
          </div>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-modal': AevaModal;
  }
}
