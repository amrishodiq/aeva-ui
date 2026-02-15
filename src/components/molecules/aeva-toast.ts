import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A toast notification component for displaying temporary messages.
 * Supports multiple variants, positions, auto-dismiss, and stacking.
 *
 * @slot - Default slot for toast content
 *
 * @fires open - Dispatched when the toast opens
 * @fires close - Dispatched when the toast closes
 *
 * @cssprop --aeva-toast-bg - Background color (default: rgba(255, 255, 255, 0.9))
 * @cssprop --aeva-toast-border-radius - Border radius (default: 12px)
 * @cssprop --aeva-toast-padding - Padding (default: 1rem 1.25rem)
 * @cssprop --aeva-toast-min-width - Minimum width (default: 300px)
 * @cssprop --aeva-toast-max-width - Maximum width (default: 500px)
 */
@customElement('aeva-toast')
export class AevaToast extends LitElement {
  static styles = css`
    :host {
      display: none;
      position: fixed;
      z-index: 9999;
    }

    :host([open]) {
      display: block;
    }

    /* Position variants */
    :host([position="top-right"]) {
      top: 1rem;
      right: 1rem;
    }

    :host([position="top-left"]) {
      top: 1rem;
      left: 1rem;
    }

    :host([position="top-center"]) {
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom-right"]) {
      bottom: 1rem;
      right: 1rem;
    }

    :host([position="bottom-left"]) {
      bottom: 1rem;
      left: 1rem;
    }

    :host([position="bottom-center"]) {
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
    }

    .toast {
      position: relative;
      background: var(--aeva-toast-bg, rgba(255, 255, 255, 0.95));
      backdrop-filter: blur(var(--aeva-toast-blur, 8px));
      -webkit-backdrop-filter: blur(var(--aeva-toast-blur, 8px));
      border-radius: var(--aeva-toast-border-radius, 12px);
      padding: var(--aeva-toast-padding, 1rem 1.25rem);
      min-width: var(--aeva-toast-min-width, 300px);
      max-width: var(--aeva-toast-max-width, 500px);
      border: 1px solid var(--aeva-toast-border-color, rgba(255, 255, 255, 0.1));
      box-shadow: 
        0 10px 15px -3px var(--aeva-toast-shadow-color, rgba(0, 0, 0, 0.1)),
        0 4px 6px -2px var(--aeva-toast-shadow-color, rgba(0, 0, 0, 0.05));
      
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      animation: toastIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    :host([closing]) .toast {
      animation: toastOut 0.2s cubic-bezier(0.4, 0, 1, 1) forwards;
    }

    /* Slide animations based on position */
    @keyframes toastIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :host([position*="bottom"]) .toast {
      animation: toastInBottom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes toastInBottom {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes toastOut {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }

    /* Icon container */
    .icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon svg {
      width: 100%;
      height: 100%;
    }

    /* Content */
    .content {
      flex: 1;
      color: #333;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    /* Close button */
    .close-button {
      flex-shrink: 0;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      transition: all 0.2s;
      width: 24px;
      height: 24px;
    }

    .close-button:hover {
      background: var(--aeva-toast-close-hover-bg);
      color: #333;
    }

    .close-button svg {
      width: 16px;
      height: 16px;
    }

    /* Variant styles */
    :host([variant="success"]) .toast {
      --aeva-toast-bg: rgba(220, 252, 231, 0.95);
      --aeva-toast-border-color: rgba(34, 197, 94, 0.3);
    }

    :host([variant="success"]) .icon {
      color: #16a34a;
    }

    :host([variant="error"]) .toast {
      --aeva-toast-bg: rgba(254, 226, 226, 0.95);
      --aeva-toast-border-color: rgba(239, 68, 68, 0.3);
    }

    :host([variant="error"]) .icon {
      color: #dc2626;
    }

    :host([variant="warning"]) .toast {
      --aeva-toast-bg: rgba(254, 243, 199, 0.95);
      --aeva-toast-border-color: rgba(245, 158, 11, 0.3);
    }

    :host([variant="warning"]) .icon {
      color: #d97706;
    }

    :host([variant="info"]) .toast {
      --aeva-toast-bg: rgba(219, 234, 254, 0.95);
      --aeva-toast-border-color: rgba(59, 130, 246, 0.3);
    }

    :host([variant="info"]) .icon {
      color: #2563eb;
    }

    /* Mobile responsive */
    @media (max-width: 767px) {
      :host {
        --aeva-toast-max-width: calc(100vw - 2rem);
      }

      :host([position="top-center"]),
      :host([position="bottom-center"]) {
        left: 1rem;
        right: 1rem;
        transform: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'default' | 'success' | 'error' | 'warning' | 'info' = 'default';

  @property({ type: String, reflect: true })
  position: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center' = 'top-right';

  @property({ type: Number })
  duration = 3000;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean })
  closable = true;

  @state()
  private closing = false;

  private autoCloseTimer?: number;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.handleOpen();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }
  }

  private handleOpen() {
    this.closing = false;
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));

    // Auto-dismiss if duration > 0
    if (this.duration > 0) {
      if (this.autoCloseTimer) {
        clearTimeout(this.autoCloseTimer);
      }
      this.autoCloseTimer = window.setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  public close() {
    if (!this.open || this.closing) return;

    this.closing = true;
    this.setAttribute('closing', '');

    setTimeout(() => {
      this.open = false;
      this.closing = false;
      this.removeAttribute('closing');
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }, 200);
  }

  private handleClose = () => {
    this.close();
  };

  private getIcon() {
    switch (this.variant) {
      case 'success':
        return html`
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        `;
      case 'error':
        return html`
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        `;
      case 'warning':
        return html`
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        `;
      case 'info':
        return html`
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        `;
      default:
        return null;
    }
  }

  render() {
    return html`
      <div class="toast" role="alert" aria-live="polite">
        ${this.variant !== 'default' ? html`<div class="icon">${this.getIcon()}</div>` : ''}
        <div class="content">
          <slot></slot>
        </div>
        ${this.closable ? html`
          <button class="close-button" @click=${this.handleClose} aria-label="Close">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-toast': AevaToast;
  }
}
