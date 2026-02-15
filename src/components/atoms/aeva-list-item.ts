import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import './aeva-ripple';
import './aeva-text';

/**
 * A flexible list item component.
 * 
 * @slot icon-left - Leading icon/content
 * @slot title - Main text content (can also be passed via label property)
 * @slot description - Secondary text content
 * @slot icon-right - Trailing icon/content
 * 
 * @csspart item - The main container of the list item
 * 
 * @cssprop --aeva-list-item-padding - Padding for the list item (default: 12px 16px)
 * @cssprop --aeva-list-item-gap - Gap between icon and text (default: 16px)
 * @cssprop --aeva-list-item-bg - Background color (default: transparent)
 * @cssprop --aeva-list-item-hover-bg - Background color on hover (default: rgba(0, 0, 0, 0.04))
 * @cssprop --aeva-list-item-active-bg - Background color when active (default: rgba(102, 126, 234, 0.08))
 * @cssprop --aeva-list-item-border-radius - Border radius (default: 8px)
 */
@customElement('aeva-list-item')
export class AevaListItem extends LitElement {
  static styles = css`
    :host {
      /* Responsive variables for sidebar integration */
      --list-item-text-display: block;
      --list-item-justify: flex-start;
      --list-item-padding: var(--aeva-list-item-padding);

      display: block;
      width: 100%;
      user-select: none;
    }

    .item {
      position: relative;
      display: flex;
      align-items: center;
      padding: var(--list-item-padding);
      gap: var(--aeva-list-item-gap);
      background-color: var(--aeva-list-item-bg);
      color: var(--aeva-list-item-color);
      border-radius: var(--aeva-list-item-border-radius);
      transition: var(--aeva-list-item-transition);
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
      justify-content: var(--list-item-justify);
    }
    

    .item:hover:not(.active) {
      background-color: var(--aeva-list-item-hover-bg);
    }

    .item.active {
      background-color: var(--aeva-list-item-active-bg);
    }

    /* Focus state */
    .item:focus-visible {
      box-shadow: inset 0 0 0 2px var(--aeva-button-focus-ring-color, #667eea);
    }

    .content {
      flex: 1;
      display: var(--list-item-text-display);
      flex-direction: column;
      min-width: 0; /* Enable truncation in children */
    }

    /* Icon-only mode */
    :host([icon-only]) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    :host([icon-only]) .content {
      display: none;
    }

    :host([icon-only]) .item {
      justify-content: center;
      padding: 0;
      gap: 0; /* Remove gap in icon-only mode */
      border-radius: 50%; /* Circular ripple effect */
      width: 48px;
      height: 48px;
    }

    :host([icon-only]) .icon-container.trail-icon {
      display: none; /* Hide trailing icon in icon-only mode */
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    ::slotted(svg), ::slotted(aeva-icon) {
      width: 24px;
      height: 24px;
      color: inherit;
    }

    .title-container {
      display: block;
    }

    .description-container {
      display: block;
      margin-top: 2px;
    }
  `;

  /**
   * Main label for the item
   */
  @property({ type: String })
  label = '';

  /**
   * Whether the item is in active/selected state
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Show only icon, hide text content
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-only' })
  iconOnly = false;

  /**
   * Internal index for navigation
   * @internal
   */
  @property({ type: Number })
  index = -1;

  private handleClick() {
    this.dispatchEvent(
      new CustomEvent('list-item-click', {
        detail: { index: this.index, label: this.label },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const itemClasses = {
      item: true,
      active: this.active,
    };

    return html`
      <div 
        class="${classMap(itemClasses)}" 
        part="item"
        role="option"
        aria-selected="${this.active}"
        tabindex="0"
        @click="${this.handleClick}"
      >
        <aeva-ripple></aeva-ripple>
        
        <div class="icon-container lead-icon">
          <slot name="icon-left"></slot>
        </div>

        <div class="content">
          <div class="title-container">
            <slot name="title">
              <aeva-text variant="body" size="md">${this.label}</aeva-text>
            </slot>
          </div>
          <div class="description-container">
            <slot name="description"></slot>
          </div>
        </div>

        <div class="icon-container trail-icon">
          <slot name="icon-right"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-list-item': AevaListItem;
  }
}
