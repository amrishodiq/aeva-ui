import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A tab item component used within aeva-tab container.
 * Represents a single selectable tab option.
 *
 * @slot - Default slot for tab label text
 *
 * @csspart tab-item - The tab item element
 *
 * @cssprop --aeva-tab-item-font-family - Font family for tab text
 * @cssprop --aeva-tab-item-font-size - Font size for tab text
 * @cssprop --aeva-tab-item-padding - Padding for tab item
 * @cssprop --aeva-tab-item-border-radius - Border radius for tab item
 * @cssprop --aeva-tab-item-transition - Transition timing for state changes
 * @cssprop --aeva-tab-item-color-active - Text color when active
 * @cssprop --aeva-tab-item-color-inactive - Text color when inactive
 * @cssprop --aeva-tab-item-color-disabled - Text color when disabled
 * @cssprop --aeva-tab-item-cursor - Cursor style
 * @cssprop --aeva-tab-item-disabled-opacity - Opacity when disabled
 */
@customElement('aeva-tab-item')
export class AevaTabItem extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .tab-item {
      font-family: var(--aeva-tab-item-font-family);
      font-size: var(--aeva-tab-item-font-size);
      padding: var(--aeva-tab-item-padding);
      border-radius: var(--aeva-tab-item-border-radius);
      border: none;
      background: transparent;
      cursor: var(--aeva-tab-item-cursor);
      transition: var(--aeva-tab-item-transition);
      color: var(--aeva-tab-item-color-inactive);
      font-weight: 500;
      white-space: nowrap;
      position: relative;
      z-index: 1;
      /* Minimum 44x44px hit area for accessibility */
      min-width: 44px;
      min-height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      
      /* Remove tap highlight on mobile */
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
    }

    :host([active]) .tab-item {
      color: var(--aeva-tab-item-color-active);
    }

    :host([disabled]) .tab-item {
      color: var(--aeva-tab-item-color-disabled);
      cursor: not-allowed;
      opacity: var(--aeva-tab-item-disabled-opacity);
    }

    .tab-item:focus-visible {
      outline: 2px solid rgba(102, 126, 234, 0.5);
      outline-offset: 2px;
    }
  `;

  /**
   * Label text for the tab
   */
  @property({ type: String })
  label = '';

  /**
   * Whether this tab is currently active
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Whether this tab is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Internal index used by parent aeva-tab component
   * @internal
   */
  @property({ type: Number, attribute: false })
  index = 0;

  private handleClick() {
    if (this.disabled) return;

    // Dispatch custom event for parent to handle
    this.dispatchEvent(
      new CustomEvent('tab-item-click', {
        detail: { index: this.index, label: this.label },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button
        part="tab-item"
        class="tab-item"
        role="tab"
        aria-selected="${this.active}"
        aria-disabled="${this.disabled}"
        tabindex="${this.disabled ? '-1' : '0'}"
        @click="${this.handleClick}"
      >
        <slot>${this.label}</slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-tab-item': AevaTabItem;
  }
}
