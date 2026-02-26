import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { WithCloseAnimation } from '../../utils/behaviors';
import { SpringController } from '../../controllers/spring-controller';

/**
 * A full-screen page component with modal behavior and slide animations.
 * Features customizable background, smooth slide-in/out animations, and hardware back button support.
 *
 * @slot - Default slot for page content
 *
 * @fires open - Dispatched when the page opens
 * @fires close - Dispatched when the page closes
 * @fires backdrop-click - Dispatched when the backdrop is clicked
 *
 * @csspart page - The main page container
 * @csspart backdrop - The backdrop overlay
 *
 * @cssprop --aeva-page-background - Background of the page (default: white)
 * @cssprop --aeva-page-animation-duration - Animation duration (default: 350ms)
 * @cssprop --aeva-page-backdrop-bg - Backdrop background color (default: rgba(0, 0, 0, 0.5))
 * @cssprop --aeva-page-z-index - Z-index layer (default: 2000)
 */
@customElement('aeva-page')
export class AevaPage extends WithCloseAnimation(LitElement) {
  static styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: var(--aeva-page-z-index);
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
      background: var(--aeva-page-backdrop-bg);
      /* animation removed - handled by spring */
      will-change: opacity;
    }

    .page-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--aeva-page-background);
      overflow-y: auto;
      overflow-x: hidden;
      /* animation removed - handled by spring */
      will-change: transform, opacity;
      outline: none;
    }

    /* Closing states no longer need CSS animations */

    /* Backdrop fade animations */
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

    /* Page slide animations */
    @keyframes slideInFromRight {
      from {
        transform: translateX(100%) scale(1.2);
        opacity: 0;
      }
      to {
        transform: translateX(0) scale(1);
        opacity: 1;
      }
    }

    @keyframes slideOutToRight {
      from {
        transform: translateX(0) scale(1);
        opacity: 1;
      }
      to {
        transform: translateX(100%) scale(1.2);
        opacity: 0;
      }
    }

    /* Disable opening animations for the first page in the stack */
    :host(:first-of-type) .backdrop,
    :host(:first-of-type) .page-container {
      animation: none !important;
    }
  `;

  /**
   * Whether the page is open
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Custom background color/gradient
   */
  @property({ type: String })
  background = '';

  /**
   * Whether to close when clicking the backdrop
   */
  @property({ type: Boolean, attribute: 'close-on-backdrop' })
  closeOnBackdrop = true;

  @property({ type: Number, attribute: 'blur-amount' })
  blurAmount = 10;

  /**
   * Whether to disable history integration (prevents closing on back button)
   */
  @property({ type: Boolean, attribute: 'disable-history' })
  disableHistory = false;

  private _spring = new SpringController(
    this,
    {
      stiffness: 0.12,
      damping: 0.65,
      mass: 1.0,
    },
    0
  );

  private previousFocus: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handlePopState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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

    if (changedProperties.has('background') && this.background) {
      this.style.setProperty('--aeva-page-background', this.background);
    }
  }

  private handleOpen() {
    this.closing = false;
    this._spring.setTarget(1);
    this.previousFocus = document.activeElement as HTMLElement;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Add to history for back button support
    if (!this.disableHistory && window.history.state?.aevaPage !== true) {
      window.history.pushState({ aevaPage: true }, '');
    }

    // Focus the page
    this.updateComplete.then(() => {
      const page = this.shadowRoot?.querySelector('.page-container') as HTMLElement;
      page?.focus();
    });

    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  private handleClose() {
    this._spring.setTarget(0);
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

  private handlePopState = () => {
    if (this.open && !this.disableHistory && window.history.state?.aevaPage !== true) {
      this.close(true);
    }
  };

  /**
   * Open the page with animation
   */
  public show() {
    this.open = true;
  }

  /**
   * Close the page with animation
   * @param fromPopState Whether the close was triggered by a popstate event
   */
  public async close(fromPopState = false) {
    // Remove from history if we added it, unless we're already coming from a popstate
    if (!fromPopState && !this.disableHistory && window.history.state?.aevaPage === true) {
      window.history.back();
    }

    this.open = false; // Trigger handleClose which sets spring target back to 0
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for spring to settle
    await this.closeWithAnimation(0); // Effectively just hides the host now
  }

  render() {
    const isFirstPage = this.matches(':first-of-type');
    const springVal = isFirstPage && this.open ? 1 : this._spring.value;

    return html`
      <div
        part="backdrop"
        class="backdrop"
        @click=${this.handleBackdropClick}
        style="${styleMap({
          opacity: `${springVal}`,
          visibility: springVal > 0.01 ? 'visible' : 'hidden',
        })}"
      ></div>
      <div
        part="page"
        class="page-container"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        style="${styleMap({
          transform: `translateX(${(1 - springVal) * 100}%) scale(${0.8 + springVal * 0.2})`,
          opacity: `${Math.min(1, springVal * 2)}`,
          visibility: springVal > 0.01 ? 'visible' : 'hidden',
        })}"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-page': AevaPage;
  }
}
