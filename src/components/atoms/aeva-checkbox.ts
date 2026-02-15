import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A custom checkbox component with rectangular design.
 *
 * @slot - Not used (checkbox is self-contained)
 *
 * @fires change - Fired when checked state changes
 *
 * @csspart container - The container wrapper
 * @csspart box - The SVG rectangle element
 * @csspart checkmark - The SVG checkmark element
 *
 * @cssprop --aeva-checkbox-size - Size of the checkbox (default: 20px)
 * @cssprop --aeva-checkbox-border-radius - Border radius (default: 4px)
 * @cssprop --aeva-checkbox-unchecked-stroke - Stroke color when unchecked
 * @cssprop --aeva-checkbox-unchecked-bg - Background color when unchecked
 * @cssprop --aeva-checkbox-checked-stroke - Stroke color when checked
 * @cssprop --aeva-checkbox-checked-bg - Background color when checked
 * @cssprop --aeva-checkbox-checkmark-color - Color of the checkmark
 * @cssprop --aeva-checkbox-transition - Transition timing
 * @cssprop --aeva-checkbox-disabled-opacity - Opacity when disabled
 */
@customElement('aeva-checkbox')
export class AevaCheckbox extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      cursor: pointer;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: var(--aeva-checkbox-disabled-opacity);
    }

    .container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--aeva-checkbox-size);
      height: var(--aeva-checkbox-size);
      /* Dynamic padding to ensure minimum 44x44px touch target */
      padding: max(0px, calc((44px - var(--aeva-checkbox-size)) / 2));
      box-sizing: content-box;
    }

    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      transition: var(--aeva-checkbox-transition);
    }

    .box {
      transition: var(--aeva-checkbox-transition);
    }

    .checkmark {
      transition: var(--aeva-checkbox-transition);
      transform-origin: center;
      opacity: 0;
      transform: scale(0.5);
    }

    :host([checked]) .checkmark {
      opacity: 1;
      transform: scale(1);
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      svg,
      .box,
      .checkmark {
        transition: none;
      }
    }
  `;

  /**
   * Whether the checkbox is checked
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the checkbox is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Name attribute for form grouping
   */
  @property({ type: String })
  name = '';

  /**
   * Value attribute
   */
  @property({ type: String })
  value = '';

  private _handleClick() {
    if (this.disabled) return;

    // Toggle checked state (unlike radio, checkbox can be unchecked)
    this.checked = !this.checked;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          checked: this.checked,
          value: this.value,
          name: this.name,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const strokeColor = this.checked
      ? 'var(--aeva-checkbox-checked-stroke)'
      : 'var(--aeva-checkbox-unchecked-stroke)';
    const fillColor = this.checked
      ? 'var(--aeva-checkbox-checked-bg)'
      : 'var(--aeva-checkbox-unchecked-bg)';

    return html`
      <div
        class="container"
        part="container"
        @click="${this._handleClick}"
        role="checkbox"
        aria-checked="${this.checked}"
        aria-disabled="${this.disabled}"
      >
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <!-- Rounded Rectangle -->
          <rect
            class="box"
            part="box"
            x="1"
            y="1"
            width="18"
            height="18"
            rx="6"
            ry="6"
            fill="${fillColor}"
            stroke="${strokeColor}"
            stroke-width="2"
          />
          
          <!-- Checkmark with padding -->
          <g class="checkmark" part="checkmark">
            <path
              d="M 5 10 L 8.5 13.5 L 15 6.5"
              fill="none"
              stroke="var(--aeva-checkbox-checkmark-color)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-checkbox': AevaCheckbox;
  }
}
