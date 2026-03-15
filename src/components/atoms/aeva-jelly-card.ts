import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { SpringController } from '../../controllers/spring-controller.js';

/**
 * Aeva Jelly Card component.
 * Features jelly-like deformation and collision reactions.
 * Part of the Tactile Maximalism series.
 */
@customElement('aeva-jelly-card')
export class AevaJellyCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      perspective: 1000px;
    }

    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      background: var(--aeva-card-bg, #ffffff);
      border: 1px solid var(--aeva-card-border-color, #e5e7eb);
      border-radius: var(--aeva-card-border-radius, 22px);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      height: var(--aeva-card-height, 100%);
      box-sizing: border-box;
      will-change: transform, border-radius;
      overflow: hidden;
      transform-origin: center;
    }

    .padding-sm { padding: var(--aeva-card-padding-sm, 1rem); }
    .padding-md { padding: var(--aeva-card-padding-md, 1.5rem); }
    .padding-lg { padding: var(--aeva-card-padding-lg, 2rem); }

    .header { margin-bottom: 1rem; }
    .body { flex: 1; margin-bottom: 1rem; }
    .footer { margin-top: auto; }

    .header:not(:has(*)), .body:not(:has(*)), .footer:not(:has(*)) {
      display: none;
    }
  `;

  @property({ type: Boolean, reflect: true })
  interactive = false;

  @property({ type: String, reflect: true })
  padding: 'sm' | 'md' | 'lg' = 'md';

  // Springs for jelly movement
  private _scaleSpring = new SpringController(this, { stiffness: 0.15, damping: 0.4 }, 1);
  private _dentXSpring = new SpringController(this, { stiffness: 0.1, damping: 0.6 }, 0);
  private _dentYSpring = new SpringController(this, { stiffness: 0.1, damping: 0.6 }, 0);

  // Track neighbor influence


  constructor() {
    super();
    this._handleGlobalPointerMove = this._handleGlobalPointerMove.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('pointermove', this._handleGlobalPointerMove);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('pointermove', this._handleGlobalPointerMove);
  }

  private _handlePointerEnter() {
    if (!this.interactive) return;
    this._scaleSpring.setTarget(1.05);
    // Ensure we have an ID for collision tracking
    if (!this.id) {
      this.id = `jelly-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Notify parent/siblings of active "pressure point"
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    this.parentElement?.style.setProperty('--jelly-active-x', `${centerX}px`);
    this.parentElement?.style.setProperty('--jelly-active-y', `${centerY}px`);
    this.parentElement?.style.setProperty('--jelly-active-id', this.id);
  }

  private _handlePointerLeave() {
    if (!this.interactive) return;
    this._scaleSpring.setTarget(1);
    this.parentElement?.style.removeProperty('--jelly-active-x');
    this.parentElement?.style.removeProperty('--jelly-active-y');
    this.parentElement?.style.removeProperty('--jelly-active-id');
  }

  private _handleGlobalPointerMove() {
    if (!this.parentElement) return;

    const activeXStr = getComputedStyle(this.parentElement).getPropertyValue('--jelly-active-x');
    const activeYStr = getComputedStyle(this.parentElement).getPropertyValue('--jelly-active-y');
    const activeId = getComputedStyle(this.parentElement).getPropertyValue('--jelly-active-id').trim();

    if (!activeXStr || activeId === (this.id || 'current')) {
      this._dentXSpring.setTarget(0);
      this._dentYSpring.setTarget(0);
      return;
    }

    const activeX = parseFloat(activeXStr);
    const activeY = parseFloat(activeYStr);

    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = centerX - activeX;
    const dy = centerY - activeY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const radius = 300; // Influence radius
    if (distance < radius) {
      const pullFactor = (1 - distance / radius) * 15; // Max 15px dent
      this._dentXSpring.setTarget((dx / distance) * pullFactor);
      this._dentYSpring.setTarget((dy / distance) * pullFactor);
    } else {
      this._dentXSpring.setTarget(0);
      this._dentYSpring.setTarget(0);
    }
  }

  render() {
    const scale = this._scaleSpring.value;
    const tx = this._dentXSpring.value;
    const ty = this._dentYSpring.value;

    // Simulate "dent" by slightly modifying border radius and transform
    // As it gets pushed (tx, ty), the border radius on that side should "flatten"
    const brBase = 22;
    const brX = Math.abs(tx) * 0.5;
    const brY = Math.abs(ty) * 0.5;

    const transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;

    return html`
      <div 
        class="card padding-${this.padding}"
        @mouseenter=${this._handlePointerEnter}
        @mouseleave=${this._handlePointerLeave}
        style=${styleMap({
      transform,
      borderRadius: `${brBase - brX}px ${brBase + brX}px ${brBase + brY}px ${brBase - brY}px`
    })}
      >
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="body">
          <slot name="body"><slot></slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-jelly-card': AevaJellyCard;
  }
}
