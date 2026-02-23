import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { iconLibrary } from '../../utils/icons';
import { accessibilityStyles } from '../../styles/accessibility';
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
  static styles = [
    accessibilityStyles,
    css`
      :host {
        --list-item-text-display: block;
        --list-item-justify: flex-start;
        --list-item-padding-default: 12px 16px;
        --list-item-gap-default: 16px;
        --list-item-transition-default: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        --list-item-border-radius-default: 8px;
        --list-item-active-bg-default: var(--aeva-primary-light, rgba(102, 126, 234, 0.08));
        --list-item-hover-bg-default: var(--aeva-color-gray-100, rgba(0, 0, 0, 0.04));
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
        color: var(--aeva-list-item-active-color, var(--aeva-primary-color, #667eea));
      }

      .item:focus-visible {
        box-shadow: inset 0 0 0 2px
          var(--aeva-button-focus-ring-color, var(--aeva-primary-color, #667eea));
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

      svg.lib-icon,
      ::slotted(aeva-icon) {
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
    `,
  ];

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

  /**
   * Delegates focus to the internal interactive element.
   */
  public focus(options?: FocusOptions) {
    (this.shadowRoot?.querySelector('.item') as HTMLElement)?.focus(options);
  }

  /**
   * Returns true if the internal interactive element is currently focused.
   */
  public get hasFocus(): boolean {
    const activeEl = this.shadowRoot?.activeElement;
    return activeEl !== null && activeEl !== undefined && activeEl.classList.contains('item');
  }

  private renderIconContainer() {
    if (this.icon) {
      const svg = iconLibrary[this.icon];
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

        <div class="icon-container lead-icon">${this.renderIconContainer()}</div>

        <div class="content">
          <div class="title-container">
            <slot name="title">
              ${this.label
                ? html`<aeva-text variant="body" size="md">${this.label}</aeva-text>`
                : ''}
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
