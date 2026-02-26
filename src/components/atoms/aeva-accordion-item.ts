import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { SpringController } from '../../controllers/spring-controller';

/**
 * Aeva Accordion Item component.
 *
 * @slot - Default slot for the content of the accordion item.
 * @slot header - Optional slot to customize the header content.
 */
@customElement('aeva-accordion-item')
export class AevaAccordionItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      border-bottom: var(--aeva-accordion-item-border-width, 0px) solid
        var(--aeva-accordion-item-border-color);
    }

    :host([no-border]) {
      border-bottom: none;
    }

    .accordion-header {
      width: 100%;
      padding: var(--aeva-accordion-header-padding);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      background: none;
      border: none;
      color: var(--aeva-text-color);
      font-family: inherit;
      font-size: var(--aeva-font-size-sm);
      font-weight: 500;
      transition: background-color var(--aeva-accordion-transition);
      text-align: left;
    }

    .accordion-header:hover:not(:disabled) {
      background-color: var(--aeva-accordion-header-hover-bg);
    }

    .accordion-header:focus-visible {
      outline: 2px solid var(--aeva-primary-color);
      outline-offset: -2px;
    }

    .accordion-header:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .icon {
      width: 1.25em;
      height: 1.25em;
      /* transition removed - handled by spring if we want, or keep simple */
      transition: transform var(--aeva-accordion-transition);
      flex-shrink: 0;
      margin-left: var(--aeva-space-sm);
      will-change: transform;
    }

    .icon.open {
      transform: rotate(180deg);
    }

    .accordion-content {
      display: grid;
      grid-template-rows: 0fr;
      /* transition removed - handled by spring */
      overflow: hidden;
      will-change: grid-template-rows;
    }

    /* .open state for expansion no longer needed as we use the spring value directly */

    .accordion-inner {
      min-height: 0;
      /* animations handled by spring controller */
      will-change: transform, opacity;
    }

    /* .open states no longer needed as we use the spring value directly */

    .content-padding {
      padding: var(--aeva-accordion-content-padding);
    }
  `;

  /**
   * The label displayed in the header.
   */
  @property({ type: String })
  label = '';

  /**
   * Whether the accordion item is open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether the accordion item is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _expandSpring = new SpringController(this, {
    stiffness: 0.12,
    damping: 0.5,
    mass: 1.1
  }, 0);

  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has('open')) {
      this._expandSpring.setTarget(this.open ? 1 : 0);
    }
  }

  private toggle() {
    if (this.disabled) return;

    this.open = !this.open;

    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button
        class="accordion-header"
        @click="${this.toggle}"
        ?disabled="${this.disabled}"
        aria-expanded="${this.open}"
      >
        <slot name="header">
          <span>${this.label}</span>
        </slot>
        <svg
          class="icon ${classMap({ open: this.open })}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div 
        class="accordion-content" 
        role="region"
        style="${styleMap({
      'grid-template-rows': `${this._expandSpring.value}fr`
    })}"
      >
        <div 
          class="accordion-inner"
          style="${styleMap({
      opacity: `${Math.min(1, this._expandSpring.value * 2)}`, // Fade in faster
      transform: `translateY(${(1 - this._expandSpring.value) * -12}px) scale(${0.97 + this._expandSpring.value * 0.03})`,
      visibility: this._expandSpring.value > 0.01 ? 'visible' : 'hidden'
    })}"
        >
          <div class="content-padding">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-accordion-item': AevaAccordionItem;
  }
}
