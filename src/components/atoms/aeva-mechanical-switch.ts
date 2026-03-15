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
    }

    .switch-track {
      position: relative;
      width: 72px;
      height: 72px;
      background: var(--aeva-mechanical-track-bg, #1a1a1a);
      border-radius: 50%;
      padding: 6px;
      box-shadow: 
        inset 0 4px 12px var(--aeva-mechanical-track-shadow, rgba(0, 0, 0, 0.8)),
        0 2px 2px var(--aeva-mechanical-track-highlight, rgba(255, 255, 255, 0.1));
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 300px;
    }

    .rocker {
      position: relative;
      width: 100%;
      height: 100%;
      background: var(--aeva-mechanical-rocker-bg, #333);
      border-radius: 50%;
      transition: background 0.3s ease;
      transform-style: preserve-3d;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      box-shadow: 
        0 8px 16px var(--aeva-mechanical-rocker-shadow, rgba(0, 0, 0, 0.6)),
        inset 0 1px 1px var(--aeva-mechanical-rocker-highlight, rgba(255, 255, 255, 0.15));
    }

    /* Metallic reflection effect */
    .rocker::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: conic-gradient(
        from 180deg at 50% 50%,
        rgba(255, 255, 255, 0.1) 0deg,
        rgba(255, 255, 255, 0) 90deg,
        rgba(255, 255, 255, 0.1) 180deg,
        rgba(255, 255, 255, 0) 270deg,
        rgba(255, 255, 255, 0.1) 360deg
      );
      pointer-events: none;
    }

    /* The Combined IO (Power) Symbol */
    .io-symbol {
      position: relative;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    /* The 'O' (Circle) part */
    .io-symbol::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 200%; /* Elongated to form the incomplete circle effect */
      max-height: 20px;
      border: 3px solid var(--aeva-mechanical-indicator-off, #111);
      border-radius: 50%;
      /* Masking the top for the 'O' gap */
      clip-path: polygon(0 15%, 100% 15%, 100% 100%, 0 100%);
      transition: border-color 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease;
    }

    /* The 'I' (Vertical Line) part */
    .io-symbol::after {
      content: '';
      position: absolute;
      top: -2px;
      width: 3px;
      height: 12px;
      background: var(--aeva-mechanical-indicator-off, #111);
      border-radius: 1.5px;
      transition: background 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease;
    }

    .rocker.checked .io-symbol::before {
      border-color: var(--aeva-primary-color, #667eea);
      filter: drop-shadow(0 0 4px var(--aeva-primary-color, #667eea));
    }

    .rocker.checked .io-symbol::after {
      background: var(--aeva-primary-color, #667eea);
      filter: drop-shadow(0 0 4px var(--aeva-primary-color, #667eea));
    }

    .rocker.checked {
      background: var(--aeva-mechanical-rocker-checked-bg, #3a3a3a);
    }

    /* Focus State */
    :host(:focus-visible) .switch-track {
      box-shadow: 
        inset 0 2px 10px rgba(0, 0, 0, 0.8),
        0 0 0 2px var(--aeva-primary-color, #667eea);
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  // Spring for the tilting action
  private _angleSpring = new SpringController(this, { stiffness: 0.3, damping: 0.4, mass: 1 }, 0);

  // Spring for the "press down" depth effect
  private _depthSpring = new SpringController(this, { stiffness: 0.4, damping: 0.5 }, 1);

  constructor() {
    super();
    this.addEventListener('click', this._handleClick);
    this.addEventListener('pointerdown', this._handlePointerDown);
    this.addEventListener('pointerup', this._handlePointerUp);
    this.addEventListener('pointerleave', this._handlePointerUp);
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('checked')) {
      this._angleSpring.setTarget(this.checked ? 1 : 0);
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
    this._depthSpring.setTarget(0.95);
  }

  private _handlePointerUp() {
    this._depthSpring.setTarget(1);
  }

  render() {
    // Map 0 -> 1 to -30deg -> 30deg for a more aggressive circular tilt
    const angle = (this._angleSpring.value * 60) - 30;
    const scale = this._depthSpring.value;

    return html`
      <div class="switch-track" part="track">
        <div 
          class="rocker ${this.checked ? 'checked' : ''}" 
          part="rocker"
          style=${styleMap({
      transform: `rotateX(${angle}deg) scale(${scale})`
    })}
        >
          <div class="io-symbol"></div>
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
