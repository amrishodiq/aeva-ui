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
 */
@customElement('aeva-list-item')
export class AevaListItem extends LitElement {
  static styles = css`
    :host {
      --list-item-text-display: block;
      --list-item-justify: flex-start;
      --list-item-padding-default: 12px 16px;
      --list-item-gap-default: 16px;
      --list-item-transition-default: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      --list-item-border-radius-default: 8px;
      --list-item-active-bg-default: var(--aeva-primary-light, rgba(102, 126, 234, 0.08));
      --list-item-hover-bg-default: rgba(0, 0, 0, 0.04);
      --list-item-color-default: var(--aeva-text-color, #1f2937);

      display: block;
      width: 100%;
      user-select: none;
    }

    .item {
      position: relative;
      display: flex;
      align-items: center;
      padding: var(--aeva-list-item-padding, var(--list-item-padding-default));
      gap: var(--aeva-list-item-gap, var(--list-item-gap-default));
      background-color: var(--aeva-list-item-bg, transparent);
      color: var(--aeva-list-item-color, var(--list-item-color-default));
      --aeva-text-color: inherit;
      border-radius: var(--aeva-list-item-border-radius, var(--list-item-border-radius-default));
      transition: var(--aeva-list-item-transition, var(--list-item-transition-default));
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
      justify-content: var(--list-item-justify);
    }

    .item:hover:not(.active) {
      background-color: var(--aeva-list-item-hover-bg, var(--list-item-hover-bg-default));
    }

    .item.active {
      background-color: var(--aeva-list-item-active-bg, var(--list-item-active-bg-default));
      color: var(--aeva-list-item-active-color, var(--aeva-primary, #667eea));
    }

    .item:focus-visible {
      box-shadow: inset 0 0 0 2px var(--aeva-button-focus-ring-color, #667eea);
    }

    .content {
      flex: 1;
      display: var(--list-item-text-display);
      flex-direction: column;
      min-width: 0;
    }

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
      gap: 0;
      border-radius: 50%;
      width: 48px;
      height: 48px;
    }

    :host([icon-only]) .icon-container.trail-icon {
      display: none;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    svg.lib-icon, ::slotted(aeva-icon) {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    ::slotted(svg) {
      width: 24px;
      height: 24px;
      display: block;
    }

    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
      
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

  private static iconLibrary: Record<string, any> = {
    'grid_view': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z"/></svg>`,
    'analytics': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`,
    'people': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    'settings': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
    'folder': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`,
    'description': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    'person': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4z"/></svg>`,
    'face': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5s.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>`,
    'notifications': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>`,
    'security': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`,
    'dashboard': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>`,
    'mail': html`<svg class="lib-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
  };

  /**
   * Main label for the item
   */
  @property({ type: String })
  label = '';

  /**
   * Icon name
   */
  @property({ type: String })
  icon = '';

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

  private renderIconContainer() {
    if (this.icon) {
      const svg = AevaListItem.iconLibrary[this.icon];
      if (svg) return svg;
      return html`<span class="material-icons">${this.icon}</span>`;
    }
    return html`<slot name="icon-left"></slot>`;
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
          ${this.renderIconContainer()}
        </div>

        <div class="content">
          <div class="title-container">
            <slot name="title">
              ${this.label ? html`<aeva-text variant="body" size="md">${this.label}</aeva-text>` : ''}
              <slot></slot>
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
