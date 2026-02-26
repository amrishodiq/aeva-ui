import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { SpringController } from '../../controllers/spring-controller';

/**
 * Aeva Switch component (Atom).
 * A premium toggle switch for boolean inputs.
 *
 * @slot - Optional slot for label content.
 * @fires change - Dispatched when the switch state changes.
 */
@customElement('aeva-switch')
export class AevaSwitch extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--aeva-space-sm);
      cursor: pointer;
      user-select: none;
      vertical-align: middle;
      outline: none;
      box-sizing: border-box;
      --switch-width: var(--aeva-switch-width);
      --switch-height: var(--aeva-switch-height);
      --thumb-size: var(--aeva-switch-thumb-size);
      /* Calculate internal padding once */
      --padding: calc((var(--switch-height) - var(--thumb-size)) / 2);
    }

    /* Recalculate variables for different sizes */
    :host([size='sm']) {
      --switch-width: 32px;
      --switch-height: 18px;
      --thumb-size: 14px;
      --padding: calc((var(--switch-height) - var(--thumb-size)) / 2);
    }

    :host([size='lg']) {
      --switch-width: 56px;
      --switch-height: 30px;
      --thumb-size: 24px;
      --padding: calc((var(--switch-height) - var(--thumb-size)) / 2);
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }

    .switch {
      position: relative;
      width: var(--switch-width);
      height: var(--switch-height);
      background-color: var(--aeva-switch-track-bg);
      border-radius: calc(var(--switch-height) / 2);
      transition: background-color var(--aeva-switch-transition);
      box-sizing: border-box;
      overflow: hidden; /* Ensure thumb stays within bounds if scaled heavily */
    }

    .thumb {
      position: absolute;
      top: 50%;
      left: var(--padding);
      width: var(--thumb-size);
      height: var(--thumb-size);
      background-color: var(--aeva-switch-thumb-bg);
      border-radius: 50%;
      box-shadow: var(--aeva-switch-thumb-shadow);
      /* transition removed - handled by SpringController */
      /* Base transform: center vertically and reset horizontal */
      transform: translateY(-50%) translateX(0);
      transform-origin: center center;
      will-change: transform;
    }

    /* Input Hidden for accessibility */
    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* Checked State */
    input:checked + .switch {
      background-color: var(--aeva-switch-track-checked-bg);
    }

    input:checked + .switch .thumb {
      /* Translation handled via inline style and SpringController */
    }

    /* Scale/Elastic effect handled via spring logic if needed, 
       but for now we focus on the bouncy translation */

    /* Focus State */
    :host(:focus-visible) .switch {
      outline: 2px solid var(--aeva-primary-color);
      outline-offset: 2px;
    }

    .label {
      font-size: var(--aeva-font-size-sm);
      color: var(--aeva-text-color);
    }

    /* Glassmorphism Variant */
    :host([variant='glass']) .switch {
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    :host([variant='glass']) input:checked + .switch {
      background-color: color-mix(in srgb, var(--aeva-primary-color) 40%, transparent);
    }
  `;

  /**
   * Whether the switch is checked.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the switch is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Optional label for the switch.
   */
  @property({ type: String })
  label = '';

  /**
   * Size of the switch: 'sm', 'md', 'lg'.
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Visual variant: 'default', 'glass'.
   */
  @property({ type: String, reflect: true })
  variant: 'default' | 'glass' = 'default';

  private spring = new SpringController(this, {
    stiffness: 0.15,
    damping: 0.6,
    mass: 0.5, // Switch thumb should be very light
  });

  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has('checked')) {
      this._updateSpringTarget();
    }
  }

  private _updateSpringTarget() {
    // We'll calculate the travel distance in pixels
    // Since we're in Shadow DOM and using CSS variables,
    // we might need to get the computed style if variables change,
    // but for a standard switch we can use a logical 0 to 1 mapping
    // and handle the pixel calculation in the styleMap.
    this.spring.setTarget(this.checked ? 1 : 0);
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleHostClick() {
    if (this.disabled) return;
    const input = this.shadowRoot?.querySelector('input');
    if (input) {
      input.click();
    }
  }

  render() {
    return html`
      <div @click="${this._handleHostClick}" style="display: contents;">
        <input
          type="checkbox"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this._handleChange}"
          tabindex="-1"
        />
        <div class="switch">
          <div
            class="thumb"
            style="${styleMap({
              transform: `translateY(-50%) translateX(calc(${this.spring.value} * (var(--switch-width) - var(--thumb-size) - (var(--padding) * 2))))`,
            })}"
          ></div>
        </div>
        ${this.label || html`<slot></slot>`
          ? html`
              <span class="label">
                ${this.label}
                <slot></slot>
              </span>
            `
          : ''}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.addEventListener('keydown', this._handleKeyDown);
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._handleHostClick();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-switch': AevaSwitch;
  }
}
