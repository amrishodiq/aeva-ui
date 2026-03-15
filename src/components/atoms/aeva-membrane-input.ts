import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { SpringController } from '../../controllers/spring-controller.js';

/**
 * Aeva Membrane Input component.
 * Behave like an elastic membrane that reacts to keystrokes.
 * Part of the Tactile Maximalism series.
 */
@customElement('aeva-membrane-input')
export class AevaMembraneInput extends LitElement {
    static styles = css`
    :host {
      display: block;
      width: 100%;
      --membrane-ripple-color: var(--aeva-primary-color, #667eea);
    }

    .membrane-container {
      position: relative;
      width: 100%;
      border-radius: var(--aeva-input-border-radius, 22px);
      background: var(--aeva-input-bg, rgba(255, 255, 255, 0.05));
      border: 2px solid var(--aeva-input-border-color, rgba(255, 255, 255, 0.2));
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      overflow: hidden;
      display: flex;
      align-items: center;
      transform-origin: center;
      will-change: transform;
    }

    .membrane-container:focus-within {
      border-color: var(--aeva-primary-color, #667eea);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--aeva-primary-color, #667eea) 20%, transparent);
    }

    input {
      width: 100%;
      padding: var(--aeva-input-padding-md, 12px 20px);
      font-size: var(--aeva-input-font-size-md, 1rem);
      font-family: inherit;
      color: var(--aeva-input-text-color, white);
      background: transparent;
      border: none;
      outline: none;
      position: relative;
      z-index: 2;
    }

    input::placeholder {
      color: var(--aeva-input-placeholder-color, rgba(255, 255, 255, 0.4));
    }

    .ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, var(--membrane-ripple-color) 0%, transparent 70%);
      opacity: 0;
      pointer-events: none;
      z-index: 1;
      will-change: opacity, transform;
    }

    .ripple.animate {
      animation: ripple-out 0.4s ease-out;
    }

    @keyframes ripple-out {
      0% {
        opacity: 0.4;
        transform: translate(-50%, -50%) scale(0.2);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.5);
      }
    }
  `;

    @property({ type: String })
    value = '';

    @property({ type: String })
    placeholder = '';

    @property({ type: Boolean })
    disabled = false;

    @state()
    private _isRippling = false;

    private _pulseSpring = new SpringController(this, { stiffness: 0.2, damping: 0.4, mass: 1 }, 1);

    private _handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this.value = target.value;

        // Trigger pulse
        this._pulseSpring.setTarget(1.03);
        setTimeout(() => {
            this._pulseSpring.setTarget(1);
        }, 50);

        // Trigger ripple
        this._isRippling = false;
        // Force reflow
        void this.offsetWidth;
        this._isRippling = true;

        this.dispatchEvent(
            new CustomEvent('input', {
                detail: { value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }

    private _handleAnimationEnd() {
        this._isRippling = false;
    }

    render() {
        return html`
      <div
        class="membrane-container"
        style=${styleMap({
            transform: `scale(${this._pulseSpring.value})`,
        })}
      >
        <div 
          class="${classMap({ ripple: true, animate: this._isRippling })}"
          @animationend=${this._handleAnimationEnd}
        ></div>
        <input
          type="text"
          .value="${this.value}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          @input="${this._handleInput}"
        />
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-membrane-input': AevaMembraneInput;
    }
}
