import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { SpringController } from '../../controllers/spring-controller';

/**
 * Aeva Gooey Slider component.
 * A Tactile Maximalism slider that uses SVG filters to create a liquid liquid interaction.
 */
@customElement('aeva-gooey-slider')
export class AevaGooeySlider extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      margin: var(--aeva-space-md) 0;
      user-select: none;
    }

    .slider-container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--aeva-space-sm);
    }

    .label-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      font-size: var(--aeva-font-size-sm);
      font-weight: 700;
      color: var(--aeva-text-color);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .value-display {
      font-size: var(--aeva-font-size-xs);
      font-weight: 800;
      color: var(--aeva-primary-color);
      padding: 2px 10px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--aeva-primary-color) 15%, transparent);
    }

    .input-wrapper {
      position: relative;
      height: 48px;
      display: flex;
      align-items: center;
      /* Add padding to account for thumb width (40px total, so 20px each side) */
      padding: 0 20px;
    }

    /* Helper for the gooey area only */
    .gooey-layer {
      position: absolute;
      inset: 0 20px;
      height: 100%;
      filter: url(#goo);
      -webkit-filter: url(#goo);
      pointer-events: none;
      display: flex;
      align-items: center;
      z-index: 2;
    }

    .track-bg {
      position: absolute;
      left: 20px;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      height: 12px;
      background: var(--aeva-slider-track-bg, #eee);
      border-radius: 6px;
      z-index: 1;
      opacity: 0.8;
    }

    .track-active {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 24px;
      background: var(--aeva-primary-color, #667eea);
      border-radius: 12px;
      will-change: width;
      /* Ensure it starts slightly behind the anchor for seamless merge */
      margin-left: -2px; 
    }

    .track-anchor {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      background: var(--aeva-primary-color, #667eea);
      border-radius: 50%;
      margin-left: -12px;
      z-index: 3;
    }

    .thumb {
      position: absolute;
      top: 50%;
      width: 40px;
      height: 40px;
      background: var(--aeva-primary-color, #667eea);
      border-radius: 50%;
      left: 0; /* Positioned relative to progressValue */
      margin-left: -20px;
      display: flex;
      align-items: center;
      justify-content: center;
      will-change: transform, left;
    }

    input[type='range'] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 100%;
      background: transparent;
      outline: none;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      margin: 0;
    }

    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 40px;
      height: 40px;
      background: transparent;
    }

    input[type='range']::-moz-range-thumb {
      width: 40px;
      height: 40px;
      background: transparent;
      border: none;
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    svg {
      position: absolute;
      width: 0;
      height: 0;
    }
  `;

  @property({ type: Number })
  value = 50;

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

  private _velocity = 0;

  private _progressSpring = new SpringController(this, {
    stiffness: 0.1,
    damping: 0.8,
  }, 50);

  private _scaleSpring = new SpringController(this, {
    stiffness: 0.2,
    damping: 0.5,
  }, 1);

  constructor() {
    super();
    this._progressSpring.value = this.value;
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('value')) {
      const percent = ((this.value - this.min) / (this.max - this.min)) * 100;
      this._progressSpring.setTarget(percent);
    }
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const oldPercent = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.value = Number(input.value);
    const newPercent = ((this.value - this.min) / (this.max - this.min)) * 100;

    // Calculate velocity for the stretch effect
    this._velocity = newPercent - oldPercent;

    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handlePointerDown() {
    this._scaleSpring.setTarget(1.15);
  }

  private _handlePointerUp() {
    this._scaleSpring.setTarget(1.0);
    this._velocity = 0;
  }

  render() {
    const progressValue = this._progressSpring.value;

    // Calculate dynamic stretch based on velocity
    // If moving fast right, x-scale increases, y-scale decreases
    const stretchX = 1 + (Math.abs(this._velocity) * 0.05);
    const stretchY = 1 - (Math.abs(this._velocity) * 0.02);
    const combinedScale = this._scaleSpring.value;

    return html`
      <div class="slider-container">
        ${this.label ? html`
          <div class="label-header">
            <span class="label">${this.label}</span>
            <span class="value-display">${this.value}</span>
          </div>
        ` : ''}

        <div class="input-wrapper">
          <div class="track-bg"></div>
          
          <div class="gooey-layer">
            <div class="track-anchor"></div>
            <div 
              class="track-active"
              style=${styleMap({ width: `${progressValue}%` })}
            ></div>
            
            <div 
              class="thumb"
              style=${styleMap({
      left: `${progressValue}%`,
      transform: `translateY(-50%) scale(${combinedScale * stretchX}, ${combinedScale * stretchY})`
    })}
            ></div>
          </div>

          <input 
            type="range"
            .value=${this.value}
            min=${this.min}
            max=${this.max}
            step=${this.step}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            @pointerdown=${this._handlePointerDown}
            @pointerup=${this._handlePointerUp}
            @pointerleave=${this._handlePointerUp}
          >
        </div>
      </div>

      <!-- SVG Gooey Filter -->
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-gooey-slider': AevaGooeySlider;
  }
}
