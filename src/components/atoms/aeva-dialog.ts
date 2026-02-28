import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { AevaModal } from './aeva-modal.js';
import './aeva-modal.js';

/**
 * A structured dialog component built on top of aeva-modal.
 * Provides a standard layout with header, icon, title, description, content, and footer.
 *
 * @slot - Default slot for dialog content
 * @slot icon - Slot for an icon in the header
 * @slot header - Custom header content (overrides title/description)
 * @slot footer - Action buttons at the bottom
 *
 * @fires open - Dispatched when the dialog opens
 * @fires close - Dispatched when the dialog closes
 */
@customElement('aeva-dialog')
export class AevaDialog extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    .dialog-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 24px;
    }

    ::slotted([slot="icon"]) {
      flex-shrink: 0;
      display: inline-flex;
    }

    .dialog-title-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .dialog-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--aeva-text-color, #111827);
    }

    .dialog-description {
      margin: 0;
      font-size: 0.875rem;
      color: var(--aeva-text-muted-color, #6b7280);
      line-height: 1.5;
    }

    .close-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: var(--aeva-text-muted-color, #6b7280);
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
      padding: 0;
      margin-left: auto;
      margin-top: -4px; /* Visually align with title */
    }

    .close-button:hover {
      background-color: var(--aeva-bg-hover, rgba(0, 0, 0, 0.05));
      color: var(--aeva-text-color, #111827);
    }

    .dialog-content {
      color: var(--aeva-text-color, #111827);
      margin-bottom: 24px;
      line-height: 1.6;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: auto;
    }

    /* Target dark mode via global variables */
    @media (prefers-color-scheme: dark) {
      .close-button:hover {
        background-color: var(--aeva-bg-hover, rgba(255, 255, 255, 0.1));
      }
    }
  `;

  /**
   * Whether the dialog is open
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Dialog title
   */
  @property({ type: String }) title = '';

  /**
   * Dialog description (optional)
   */
  @property({ type: String }) description = '';

  /**
   * Whether to hide the default close (x) button in the header
   */
  @property({ type: Boolean, attribute: 'hide-close' }) hideClose = false;

  // --- Forward AevaModal properties ---
  /**
   * Whether to show the backdrop
   */
  @property({ type: Boolean }) backdrop = true;

  /**
   * Whether to close when clicking the backdrop
   */
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;

  /**
   * Whether to close when pressing Escape key
   */
  @property({ type: Boolean, attribute: 'close-on-esc' }) closeOnEsc = true;

  /**
   * Elevation level (1-5)
   */
  @property({ type: Number }) elevation = 3;

  /**
   * Backdrop blur amount in pixels
   */
  @property({ type: Number, attribute: 'blur-amount' }) blurAmount = 10;

  @query('aeva-modal') private modal!: AevaModal;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (!this.open && this.modal && this.modal.open) {
        this.modal.close();
      }
    }
  }

  private handleModalOpen(e: Event) {
    if (e.target === this.modal) {
      this.open = true;
      // Event bubbles naturally
    }
  }

  private handleModalClose(e: Event) {
    if (e.target === this.modal) {
      this.open = false;
      // Event bubbles naturally
    }
  }

  /**
   * Programmatically close the dialog.
   */
  public async close() {
    this.open = false;
    if (this.modal) {
      await this.modal.close();
    }
  }

  render() {
    return html`
      <aeva-modal
        ?open=${this.open}
        ?backdrop=${this.backdrop}
        ?close-on-backdrop=${this.closeOnBackdrop}
        ?close-on-esc=${this.closeOnEsc}
        elevation=${this.elevation}
        blur-amount=${this.blurAmount}
        @open=${this.handleModalOpen}
        @close=${this.handleModalClose}
      >
        <div class="dialog-header">
          <slot name="icon"></slot>
          
          <div class="dialog-title-wrapper">
            <slot name="header">
              ${this.title ? html`<h3 class="dialog-title">${this.title}</h3>` : ''}
              ${this.description ? html`<p class="dialog-description">${this.description}</p>` : ''}
            </slot>
          </div>

          ${!this.hideClose
        ? html`
                <button class="close-button" @click=${this.close} aria-label="Close dialog">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              `
        : ''}
        </div>
        
        <div class="dialog-content">
          <slot></slot>
        </div>
        
        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </aeva-modal>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-dialog': AevaDialog;
  }
}
