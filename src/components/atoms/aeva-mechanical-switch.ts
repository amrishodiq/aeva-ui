import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { SpringController } from '../../controllers/spring-controller.js';

/**
 * Aeva Mechanical Switch component.
 * Simulates a heavy industrial rocker switch with snap-action physics.
 * Part of the Tactile Maximalism series.
 */
@customElement('aeva-mechanical-switch')
export class AevaMechanicalSwitch extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      cursor: pointer;
      user-select: none;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      vertical-align: middle;
    }

    .switch-track {
      position: relative;
      width: 84px;
      height: 84px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      padding: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 
        inset 0 4px 12px rgba(0, 0, 0, 0.3),
        0 1px 2px rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* The Recessed Glass Disc */
    .glass-disc {
      position: relative;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      will-change: transform, box-shadow;
      z-index: 2;
      transition: background 0.4s ease;
      
      /* High-fidelity 3D glass: Shifts based on checked state */
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    /* Specular Reflection */
    .glass-disc::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(
        circle at var(--light-x, 30%) var(--light-y, 30%),
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0) 80%
      );
      pointer-events: none;
      z-index: 3;
    }

    /* Engraved IO Symbol Container */
    .io-surface {
      position: relative;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    /* The 'Backlight' layer behind the engraving */
    .backlight {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: var(--aeva-switch-backlight-color, var(--aeva-primary-color, #667eea));
      filter: blur(16px);
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: -1;
    }

    /* Engraved I/O symbol - Sharpened & Rounded using SVG */
    .io-symbol {
      width: 28px;
      height: 28px;
      color: rgba(0, 0, 0, 0.4);
      transition: color 0.4s ease, filter 0.4s ease;
      stroke-width: 3.5px;
    }

    .checked .io-symbol {
      color: #ffffff;
      /* Glow color follows the backlight variable */
      filter: drop-shadow(0 0 4px var(--aeva-switch-backlight-color, var(--aeva-primary-color, #667eea)));
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host(:focus-visible) .switch-track {
      border-color: var(--aeva-primary-color, #667eea);
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  // Spring for "press/recess" depth effect
  private _depthSpring = new SpringController(this, { stiffness: 0.25, damping: 0.5 }, 1);

  constructor() {
    super();
    this.addEventListener('click', this._handleClick);
    this.addEventListener('pointerdown', this._handlePointerDown);
    this.addEventListener('pointerup', this._handlePointerUp);
    this.addEventListener('pointerleave', this._handlePointerUp);
    this.addEventListener('pointermove', this._handlePointerMove);
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('checked')) {
      // Toggle state depth: raised (1) or sunken (0.92)
      this._depthSpring.setTarget(this.checked ? 0.92 : 1);
    }
  }

  private _handleClick() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true
    }));
  }

  private _handlePointerDown() {
    if (this.disabled) return;
    // Momentary extra press depth
    this._depthSpring.setTarget(this.checked ? 0.88 : 0.95);
  }

  private _handlePointerUp() {
    // Return to toggle state target
    this._depthSpring.setTarget(this.checked ? 0.92 : 1);
  }

  private _handlePointerMove(e: PointerEvent) {
    if (this.disabled) return;
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    this.style.setProperty('--light-x', `${x}%`);
    this.style.setProperty('--light-y', `${y}%`);
  }

  render() {
    const scale = this._depthSpring.value;

    // Calculate shadow intensity based on depth
    // More recessed = stronger inner shadow + smaller outer shadow
    const outerShadowAlpha = (scale - 0.8) * 1.5; // Decreases as it sinks
    const innerShadowAlpha = (1.1 - scale) * 4;   // Increases as it sinks

    return html`
      <div class="switch-track" part="track">
        <div 
          class="glass-disc ${this.checked ? 'checked' : ''}" 
          part="disc"
          style=${styleMap({
      transform: `scale(${scale})`,
      boxShadow: `
              0 ${8 * scale}px ${20 * scale}px rgba(0, 0, 0, ${0.4 * outerShadowAlpha}),
              inset 0 ${2 * (1 - scale) * 50}px ${10 * (1 - scale) * 50}px rgba(0, 0, 0, ${0.5 * innerShadowAlpha}),
              inset 0 1px 1px rgba(255, 255, 255, 0.2)
            `
    })}
        >
          <div class="io-surface">
            <div class="backlight"></div>
            <svg class="io-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2v10" stroke-linecap="round"></path>
              <path d="M18.36 6.64a9 9 0 1 1-12.72 0" stroke-linecap="round"></path>
            </svg>
          </div>
        </div>
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
      this._handleClick();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-mechanical-switch': AevaMechanicalSwitch;
  }
}
