import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A custom radio button component with circular design.
 *
 * @slot - Not used (radio is self-contained)
 *
 * @fires change - Fired when checked state changes
 *
 * @csspart container - The container wrapper
 * @csspart circle - The SVG circle element
 * @csspart checkmark - The SVG checkmark element
 *
 * @cssprop --aeva-radio-size - Size of the radio button (default: 20px)
 * @cssprop --aeva-radio-unchecked-stroke - Stroke color when unchecked
 * @cssprop --aeva-radio-unchecked-bg - Background color when unchecked
 * @cssprop --aeva-radio-checked-stroke - Stroke color when checked
 * @cssprop --aeva-radio-checked-bg - Background color when checked
 * @cssprop --aeva-radio-checkmark-color - Color of the checkmark
 * @cssprop --aeva-radio-transition - Transition timing
 * @cssprop --aeva-radio-disabled-opacity - Opacity when disabled
 */
@customElement('aeva-radio')
export class AevaRadio extends LitElement {
    static styles = css`
    :host {
      --aeva-radio-size: 20px;
      --aeva-radio-unchecked-stroke: #9ca3af;
      --aeva-radio-unchecked-bg: transparent;
      --aeva-radio-checked-stroke: #3b82f6;
      --aeva-radio-checked-bg: #3b82f6;
      --aeva-radio-checkmark-color: #ffffff;
      --aeva-radio-transition: all 0.2s ease-in-out;
      --aeva-radio-disabled-opacity: 0.5;

      display: inline-block;
      cursor: pointer;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: var(--aeva-radio-disabled-opacity);
    }

    .container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--aeva-radio-size);
      height: var(--aeva-radio-size);
      /* Dynamic padding to ensure minimum 44x44px touch target */
      padding: max(0px, calc((44px - var(--aeva-radio-size)) / 2));
      box-sizing: content-box;
    }

    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      transition: var(--aeva-radio-transition);
    }

    .circle {
      transition: var(--aeva-radio-transition);
    }

    .checkmark {
      transition: var(--aeva-radio-transition);
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
      .circle,
      .checkmark {
        transition: none;
      }
    }
  `;

    /**
     * Whether the radio button is checked
     */
    @property({ type: Boolean, reflect: true })
    checked = false;

    /**
     * Whether the radio button is disabled
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

        // If clicking to check this radio
        if (!this.checked) {
            // Uncheck all other radios with the same name
            if (this.name) {
                const radios = document.querySelectorAll(`aeva-radio[name="${this.name}"]`);
                radios.forEach((radio) => {
                    if (radio !== this && radio instanceof AevaRadio) {
                        radio.checked = false;
                    }
                });
            }

            this.checked = true;

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
        // If clicking an already checked radio, do nothing (radio buttons stay checked)
    }

    render() {
        const strokeColor = this.checked
            ? 'var(--aeva-radio-checked-stroke)'
            : 'var(--aeva-radio-unchecked-stroke)';
        const fillColor = this.checked
            ? 'var(--aeva-radio-checked-bg)'
            : 'var(--aeva-radio-unchecked-bg)';

        return html`
      <div
        class="container"
        part="container"
        @click="${this._handleClick}"
        role="radio"
        aria-checked="${this.checked}"
        aria-disabled="${this.disabled}"
      >
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <!-- Circle -->
          <circle
            class="circle"
            part="circle"
            cx="10"
            cy="10"
            r="9"
            fill="${fillColor}"
            stroke="${strokeColor}"
            stroke-width="2"
          />
          
          <!-- Checkmark with 4px padding (scaled to fit) -->
          <g class="checkmark" part="checkmark">
            <path
              d="M 6 10 L 9 13 L 14 7"
              fill="none"
              stroke="var(--aeva-radio-checkmark-color)"
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
        'aeva-radio': AevaRadio;
    }
}
