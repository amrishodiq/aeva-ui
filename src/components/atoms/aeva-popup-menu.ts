import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A popup menu component that anchors to a trigger element.
 * Combines modal-like overlay behavior with flexible list positioning.
 *
 * @slot - Default slot for menu content (usually aeva-list)
 *
 * @fires open - Dispatched when the menu opens
 * @fires close - Dispatched when the menu closes
 *
 * @cssprop --aeva-popup-bg - Background color (default: rgba(255, 255, 255, 0.7))
 * @cssprop --aeva-popup-border-radius - Border radius (default: 16px)
 * @cssprop --aeva-popup-min-width - Minimum width (default: 200px)
 * @cssprop --aeva-popup-max-width - Maximum width, inherits from modal (default: 600px)
 */
@customElement('aeva-popup-menu')
export class AevaPopupMenu extends LitElement {
  static styles = css`
    :host {
      --aeva-popup-bg: rgba(255, 255, 255, 0.7);
      --aeva-popup-border-radius: 23px;
      --aeva-popup-min-width: 200px;
      --aeva-popup-max-width: 600px;
      --aeva-popup-blur: 10px;
      --aeva-popup-border-color: rgba(255, 255, 255, 0.5);
      --aeva-popup-shadow-color: rgba(0, 0, 0, 0.1);

      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
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
      background: transparent;
    }

    .popup-container {
      position: absolute;
      pointer-events: none;
      display: flex;
      flex-direction: column;
    }

    .popup {
      position: relative;
      background: var(--aeva-popup-bg);
      backdrop-filter: blur(var(--aeva-popup-blur));
      -webkit-backdrop-filter: blur(var(--aeva-popup-blur));
      border-radius: var(--aeva-popup-border-radius);
      border: 1px solid var(--aeva-popup-border-color);
      min-width: var(--aeva-popup-min-width);
      max-width: var(--aeva-popup-max-width);
      width: fit-content;
      pointer-events: auto;
      overflow: hidden;
      padding: 0;
      box-sizing: border-box;
      
      box-shadow: 
        0 10px 15px -3px var(--aeva-popup-shadow-color),
        0 4px 6px -2px var(--aeva-popup-shadow-color);

      transform-origin: top left;
      animation: popupIn 0.2s cubic-bezier(0, 0, 0.2, 1);
    }

    :host([closing]) .popup {
      animation: popupOut 0.15s cubic-bezier(0.4, 0, 1, 1) forwards;
    }

    @keyframes popupIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes popupOut {
      from {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
      to {
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
      }
    }

    /* Elevation styles same as modal but slightly adjusted for popup scale */
    :host([elevation="1"]) .popup { box-shadow: 0 1px 3px var(--aeva-popup-shadow-color); }
    :host([elevation="2"]) .popup { box-shadow: 0 4px 6px var(--aeva-popup-shadow-color); }
    :host([elevation="3"]) .popup { box-shadow: 0 10px 15px var(--aeva-popup-shadow-color); }
    :host([elevation="4"]) .popup { box-shadow: 0 20px 25px var(--aeva-popup-shadow-color); }
    :host([elevation="5"]) .popup { box-shadow: 0 25px 50px var(--aeva-popup-shadow-color); }

    /* Fix visual gap: ensure slotted list fills the popup completely */
    ::slotted(aeva-list) {
      --aeva-list-border-radius: 0;
      --aeva-list-padding: 0;
      display: block;
      margin: 0;
    }
  `;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, attribute: 'auto-close' })
  autoClose = true;

  @property({ type: Number, reflect: true })
  elevation = 3;

  @state()
  private closing = false;

  @state()
  private x = 0;

  @state()
  private y = 0;

  @state()
  private origin = 'top left';

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this.close, { capture: true });
    window.addEventListener('resize', this.close);
    this.addEventListener('on-selection-change', this.handleSelectionChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.close, { capture: true });
    window.removeEventListener('resize', this.close);
    this.removeEventListener('on-selection-change', this.handleSelectionChange);
  }

  private handleSelectionChange() {
    if (this.autoClose) {
      this.close();
    }
  }

  /**
   * Shows the menu anchored to the provided element
   */
  public show(anchor: HTMLElement) {
    if (this.open) return;

    const rect = anchor.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Default positioning: below the anchor
    let top = rect.bottom + 8;
    let left = rect.left;
    let transformOrigin = 'top left';

    // Crude overflow handling (can be improved)
    // If it's too close to the right edge, align to the right of the anchor
    if (left + 200 > viewportWidth) {
      left = rect.right - 200; // Assume min-width 200
      if (left < 0) left = 8;
      transformOrigin = 'top right';
    }

    // If it's too close to the bottom edge, show above the anchor
    if (top + 200 > viewportHeight) {
      top = rect.top - 8 - 200; // Approximate height
      if (top < 0) top = rect.bottom + 8; // fallback
      else transformOrigin = 'bottom left';
    }

    this.x = left;
    this.y = top;
    this.origin = transformOrigin;
    this.open = true;

    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  /**
   * Closes the menu with animation
   */
  public close = () => {
    if (!this.open || this.closing) return;

    this.closing = true;
    setTimeout(() => {
      this.open = false;
      this.closing = false;
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }, 150);
  };

  private handleBackdropClick(e: MouseEvent) {
    e.stopPropagation();
    this.close();
  }

  render() {
    return html`
      <div class="backdrop" @click=${this.handleBackdropClick}></div>
      <div 
        class="popup-container" 
        style="top: ${this.y}px; left: ${this.x}px;"
      >
        <div 
          part="popup" 
          class="popup" 
          style="transform-origin: ${this.origin};"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-popup-menu': AevaPopupMenu;
  }
}
