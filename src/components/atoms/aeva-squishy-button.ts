import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { SpringController } from '../../controllers/spring-controller.js';

/**
 * A "Squishy" Button for Tactile Maximalism & Sensory UI 2026.
 * Physically "deforms" when pressed, providing a satisfying, tactile response.
 */
@customElement('aeva-squishy-button')
export class AevaSquishyButton extends LitElement {
    static styles = css`
        :host {
            display: inline-block;     
}

        button {
            /* Base Aeva Button styling with advanced shadow layer */
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.4);
            color: var(--aeva-button-primary-color, white);
            
            padding: var(--aeva-button-padding-md, 16px 32px);
            border-radius: var(--aeva-button-border-radius, 24px);
            font-family: var(--aeva-button-font-family, inherit);
            font-size: var(--aeva-button-font-size-md, 1rem);
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--aeva-button-gap, 8px);
            cursor: pointer;
            outline: none;
            position: relative;
            overflow: hidden;
            
            /* Dynamic shadows controlled via CSS vars updated by JS */
            box-shadow: 
                var(--shadow-x, 8px) var(--shadow-y, 8px) 24px rgba(0,0,0,0.15),
                calc(var(--shadow-x, 8px) * -1) calc(var(--shadow-y, 8px) * -1) 24px rgba(255,255,255,0.4),
                inset 4px 4px 12px rgba(255,255,255,0.5),
                inset -4px -4px 12px rgba(0,0,0,0.1);
                
            transition: filter 0.3s ease;
            will-change: transform, box-shadow;
            transform-origin: center center;
            
            /* Remove tap highlight on mobile */
            -webkit-tap-highlight-color: transparent;
        }

        /* Focus ring for accessibility */
        button:focus-visible {
            outline: var(--aeva-button-focus-ring-width, 2px) solid var(--aeva-button-focus-ring-color, #667eea);
            outline-offset: var(--aeva-button-focus-ring-offset, 2px);
        }
        
        button::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: inherit;
            background: radial-gradient(circle at var(--light-x, 50%) var(--light-y, 0%), rgba(255,255,255,0.6), transparent 70%);
            pointer-events: none;
        }

        button:hover:not(:disabled) {
            filter: brightness(1.05);
            /* Shadows dynamically updated by pointermove, CSS handles the filter transition */
        }
        
        button:active:not(:disabled) {
            box-shadow: 
                var(--shadow-x, 2px) var(--shadow-y, 2px) 8px rgba(0,0,0,0.1),
                calc(var(--shadow-x, 2px) * -1) calc(var(--shadow-y, 2px) * -1) 8px rgba(255,255,255,0.2),
                inset 8px 8px 20px rgba(0,0,0,0.2),
                inset -8px -8px 20px rgba(255,255,255,0.4);
        }

        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            filter: grayscale(0.5);
        }
        
        /* Size variants */
        .size-sm {
            padding: var(--aeva-button-padding-sm, 8px 16px);
            font-size: var(--aeva-button-font-size-sm, 0.875rem);
        }

        .size-md {
            padding: var(--aeva-button-padding-md, 12px 24px);
            font-size: var(--aeva-button-font-size-md, 1rem);
        }

        .size-lg {
            padding: var(--aeva-button-padding-lg, 16px 32px);
            font-size: var(--aeva-button-font-size-lg, 1.125rem);
        }

        /* Color variants matching aeva-button exactly */
        .variant-primary {
            background-color: var(--aeva-button-primary-bg);
            color: var(--aeva-button-primary-color);
        }

        .variant-secondary {
            background-color: var(--aeva-button-secondary-bg);
            color: var(--aeva-button-secondary-color);
        }

        .variant-outline {
            background-color: transparent;
            color: var(--aeva-button-outline-color);
            border: 2px solid var(--aeva-button-outline-border-color);
        }

        .variant-ghost {
            background-color: transparent;
            color: var(--aeva-button-ghost-color);
            box-shadow: none;
        }

        .variant-danger {
            background-color: var(--aeva-button-danger-bg);
            color: var(--aeva-button-danger-color);
        }

        .squish {
            display: contents;
        }
    `;

    /**
     * Visual style variant of the button.
     */
    @property({ type: String, reflect: true })
    variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';

    /**
     * Size of the button.
     */
    @property({ type: String, reflect: true })
    size: 'sm' | 'md' | 'lg' = 'md';

    /**
     * Whether the button is disabled.
     */
    @property({ type: Boolean, reflect: true })
    disabled = false;

    /**
     * The underlying button type attribute.
     */
    @property({ type: String })
    type: 'button' | 'submit' | 'reset' = 'button';

    // Use a spring controller for the Y scale.
    // The X scale will be inversely related for the "jelly" volume preservation effect.
    private scaleSpring = new SpringController(this, { stiffness: 0.15, damping: 0.35, mass: 1 }, 1);

    private _handlePointerDown(e: PointerEvent) {
        if (this.disabled) return;

        // Pressure sensitivity logic for squish depth
        // Normal click pressure is typically 0.5. Stylus/ForceTouch can go up to 1.
        const pressure = e.pressure || 0.5;
        const targetScale = 0.9 - (pressure * 0.05); // ranges roughly 0.85 to 0.75

        this.scaleSpring.setTarget(targetScale);

        // Micro-haptics (Heavy Thud)
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([15]); // 15ms short vibration
        }
    }

    private _handlePointerUp() {
        if (this.disabled) return;
        this.scaleSpring.setTarget(1);

        // Micro-haptics (Light Tick)
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([5]);
        }

        // Reset dynamic CSS variables slowly
        this.style.setProperty('--shadow-x', '8px');
        this.style.setProperty('--shadow-y', '8px');
        this.style.setProperty('--light-x', '50%');
        this.style.setProperty('--light-y', '0%');
    }

    private _handlePointerMove(e: PointerEvent) {
        if (this.disabled) return;

        // Dynamic Glass & Clay Lighting based on pointer
        const rect = this.getBoundingClientRect();

        // Calculate pointer position relative to center [-1 to 1]
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        // Map to shadow offset (invert pointer: cast shadow away from pointer)
        const maxOffset = 16;
        this.style.setProperty('--shadow-x', `${-x * maxOffset}px`);
        this.style.setProperty('--shadow-y', `${-y * maxOffset}px`);

        // Map to inner specular light (follows pointer)
        const lightX = ((e.clientX - rect.left) / rect.width) * 100;
        const lightY = ((e.clientY - rect.top) / rect.height) * 100;
        this.style.setProperty('--light-x', `${lightX}%`);
        this.style.setProperty('--light-y', `${lightY}%`);
    }

    render() {
        const scaleY = this.scaleSpring.value;
        // Volume preservation for jelly effect: as scaleY decreases, scaleX increases slightly.
        const scaleX = 1 + (1 - scaleY) * 0.6;

        const classes = {
            [`variant-${this.variant}`]: true,
            [`size-${this.size}`]: true,
        };

        return html`
            <button
                type="${this.type}"
                class="${classMap(classes)}"
                ?disabled="${this.disabled}"
                @pointerdown=${this._handlePointerDown}
                @pointerup=${this._handlePointerUp}
                @pointerleave=${this._handlePointerUp}
                @pointermove=${this._handlePointerMove}
                @contextmenu=${(e: Event) => {
                if (!this.disabled) e.preventDefault();
            }}
                style=${styleMap({ transform: `scale3d(${scaleX}, ${scaleY}, 1)` })}
            >
                <div class="squish">
                    <slot></slot>
                </div>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-squishy-button': AevaSquishyButton;
    }
}
