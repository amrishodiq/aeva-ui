import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { WithCloseAnimation } from '../../utils/behaviors';
import { SpringController } from '../../controllers/spring-controller';
import { PageStackController, globalPageStack } from '../../utils/page-stack';

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
  private pageStackController = new PageStackController(this);
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

    :host([open]),
    :host([closing]) {
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

  `;

  /**
   * Whether the page is currently open and visible.
   * Modifies the display property and triggers opening animations.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Custom background color or gradient for the page.
   * If provided, it overrides the --aeva-page-background CSS variable.
   */
  @property({ type: String })
  background = '';

  /**
   * Whether the page should automatically close when the backdrop is clicked.
   * Default is true.
   */
  @property({ type: Boolean, attribute: 'close-on-backdrop' })
  closeOnBackdrop = true;

  /**
   * Amount of blur to apply to the content behind the page (in pixels).
   * Only applicable if supported by the browser via backdrop-filter.
   */
  @property({ type: Number, attribute: 'blur-amount' })
  blurAmount = 10;

  /**
   * Whether to disable automatic browser history integration.
   * When enabled, the page will not push a state to history and won't close on back button.
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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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
    this._spring.setTarget(1, { stiffness: 0.12, damping: 0.65, mass: 1.0 });
    this.previousFocus = document.activeElement as HTMLElement;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Register active page and push history state
    this.pageStackController.register();

    // Focus the page
    this.updateComplete.then(() => {
      const page = this.shadowRoot?.querySelector('.page-container') as HTMLElement;
      page?.focus({ preventScroll: true });
    });

    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  private handleClose() {
    this._spring.setTarget(0);

    // Unregister active page
    this.pageStackController.unregister();

    // Restore body scroll
    document.body.style.overflow = '';

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
    this._spring.setTarget(0, { stiffness: 0.02, damping: 0.94, mass: 2.0 });
    await this._spring.whenSettled();
    await this.closeWithAnimation(0);

    // Remove from history if we added it, unless we're already coming from a popstate
    if (!fromPopState && !this.disableHistory) {
      window.history.back();
    }
  }

  render() {
    // A page is the first page if it is the only page in the stack, effectively the foundation
    const isFirstPage = globalPageStack.isFirst(this);

    // Only clamp to 1 if we are the first page, open, AND not in the middle of closing
    const springVal = isFirstPage && this.open && !this.closing ? 1 : this._spring.value;

    // Asymmetric animation: No scale during close, linear fade
    const transform = this.closing
      ? `translateX(${(1 - springVal) * 100}%)`
      : `translateX(${(1 - springVal) * 100}%) scale(${0.8 + springVal * 0.2})`;

    const opacity = this.closing ? springVal : Math.min(1, springVal * 2);

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
      transform,
      opacity: `${opacity}`,
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
