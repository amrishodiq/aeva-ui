import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { SpringController } from '../../controllers/spring-controller.js';

/**
 * Aeva Magnetic component.
 * Provides a "magnetic" pull effect to its content when the cursor is nearby.
 * Part of the Tactile Maximalism series.
 */
@customElement('aeva-magnetic')
export class AevaMagnetic extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .magnetic-wrapper {
      display: inline-block;
      will-change: transform;
    }
  `;

    /**
     * Strength of the magnetic pull.
     */
    @property({ type: Number })
    strength = 0.5;

    /**
     * Radius in pixels within which the magnetic effect is active.
     */
    @property({ type: Number })
    radius = 150;

    /**
     * Maximum distance in pixels the content can move from its center.
     */
    @property({ type: Number })
    maxDistance = 30;

    private _springX = new SpringController(this, { stiffness: 0.1, damping: 0.5 }, 0);
    private _springY = new SpringController(this, { stiffness: 0.1, damping: 0.5 }, 0);

    constructor() {
        super();
        this._handlePointerMove = this._handlePointerMove.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('pointermove', this._handlePointerMove);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('pointermove', this._handlePointerMove);
    }

    private _handlePointerMove(e: PointerEvent) {
        // Only calculate if the element is in the viewport (optimization)
        const rect = this.getBoundingClientRect();

        // Quick check if mouse is anywhere near the rect bounds + radius
        // This avoids heavy calculation for elements far away
        if (
            e.clientX < rect.left - this.radius ||
            e.clientX > rect.right + this.radius ||
            e.clientY < rect.top - this.radius ||
            e.clientY > rect.bottom + this.radius
        ) {
            this._resetPosition();
            return;
        }

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius) {
            // Linear falloff for the pull factor
            const pullFactor = 1 - distance / this.radius;

            let tx = dx * this.strength * pullFactor;
            let ty = dy * this.strength * pullFactor;

            // Cap the total displacement to maxDistance
            const tDist = Math.sqrt(tx * tx + ty * ty);
            if (tDist > this.maxDistance) {
                const ratio = this.maxDistance / tDist;
                tx *= ratio;
                ty *= ratio;
            }

            this._springX.setTarget(tx);
            this._springY.setTarget(ty);
        } else {
            this._resetPosition();
        }
    }

    private _resetPosition() {
        if (this._springX.target !== 0 || this._springY.target !== 0) {
            this._springX.setTarget(0);
            this._springY.setTarget(0);
        }
    }

    render() {
        return html`
      <div
        class="magnetic-wrapper"
        style=${styleMap({
            transform: `translate3d(${this._springX.value}px, ${this._springY.value}px, 0)`,
        })}
      >
        <slot></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-magnetic': AevaMagnetic;
    }
}
