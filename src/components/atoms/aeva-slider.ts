import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Aeva Slider component.
 *
 * @fires change - Dispatched when the slider value changes.
 * @fires input - Dispatched as the slider value is being changed.
 */
@customElement('aeva-slider')
export class AevaSlider extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      margin: var(--aeva-space-sm) 0;
    }

    .slider-container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--aeva-space-xs);
    }

    .label-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      font-size: var(--aeva-font-size-sm);
      font-weight: 500;
      color: var(--aeva-text-color);
    }

    .value-display {
      font-size: var(--aeva-font-size-xs);
      font-weight: 600;
      color: var(--aeva-primary-color);
      background-color: color-mix(in srgb, var(--aeva-primary-color) 10%, transparent);
      padding: 2px 8px;
      border-radius: 4px;
    }

    .input-wrapper {
      position: relative;
      height: 32px;
      display: flex;
      align-items: center;
    }

    input[type='range'] {
      -webkit-appearance: none;
      width: 100%;
      height: 32px;
      background: transparent;
      outline: none;
      cursor: pointer;
      position: relative;
      z-index: 3;
      margin: 0;
    }

    /* Hide native track background */
    input[type='range']::-webkit-slider-runnable-track {
      background: transparent;
      border: none;
    }

    input[type='range']::-moz-range-track {
      background: transparent;
      border: none;
    }

    /* Track Base (Grey background) */
    .track-base {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: var(--aeva-slider-track-height);
      background: var(--aeva-slider-track-bg);
      border-radius: calc(var(--aeva-slider-track-height) / 2);
      z-index: 1;
      pointer-events: none;
    }

    /* Track fill (Progress) */
    .track-fill {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: var(--aeva-slider-track-height);
      background: var(--aeva-slider-fill-bg);
      border-radius: calc(var(--aeva-slider-track-height) / 2);
      pointer-events: none;
      z-index: 2;
    }

    /* Thumb Styling */
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: var(--aeva-slider-thumb-size);
      height: var(--aeva-slider-thumb-size);
      background: var(--aeva-slider-thumb-bg);
      border: var(--aeva-slider-thumb-border);
      border-radius: 50%;
      box-shadow: var(--aeva-slider-thumb-shadow);
      cursor: pointer;
      transition:
        transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.2s ease;
      position: relative;
      z-index: 3;
    }

    input[type='range']::-moz-range-thumb {
      width: var(--aeva-slider-thumb-size);
      height: var(--aeva-slider-thumb-size);
      background: var(--aeva-slider-thumb-bg);
      border: var(--aeva-slider-thumb-border);
      border-radius: 50%;
      box-shadow: var(--aeva-slider-thumb-shadow);
      cursor: pointer;
      transition:
        transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.2s ease;
      z-index: 3;
    }

    input[type='range']:active::-webkit-slider-thumb {
      transform: scale(1.2);
    }

    input[type='range']:active::-moz-range-thumb {
      transform: scale(1.2);
    }

    input[type='range']:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--aeva-primary-color) 20%, transparent);
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    :host([disabled]) input[type='range'] {
      cursor: not-allowed;
    }
  `;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  step = 1;

  @property({ type: String })
  label = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private _progressPercent = 0;

  protected firstUpdated() {
    this._updateProgress();
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (
      changedProperties.has('value') ||
      changedProperties.has('min') ||
      changedProperties.has('max')
    ) {
      this._updateProgress();
    }
  }

  private _updateProgress() {
    this._progressPercent = ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);
    this._updateProgress();

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="slider-container">
        ${this.label
          ? html`
              <div class="label-header">
                <span class="label">${this.label}</span>
                <span class="value-display">${this.value}</span>
              </div>
            `
          : ''}
        <div class="input-wrapper">
          <div class="track-base"></div>
          <div class="track-fill" style="${styleMap({ width: `${this._progressPercent}%` })}"></div>
          <input
            type="range"
            .value="${String(this.value)}"
            min="${this.min}"
            max="${this.max}"
            step="${this.step}"
            ?disabled="${this.disabled}"
            @input="${this._handleInput}"
            @change="${this._handleChange}"
          />
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-slider': AevaSlider;
  }
}
