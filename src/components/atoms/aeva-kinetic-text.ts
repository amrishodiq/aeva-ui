import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { SpringController } from '../../controllers/spring-controller.js';

/**
 * Kinetic Typography for Tactile Maximalism & Sensory UI 2026.
 * Headlines that stretch, liquify, or "dance" reacting to touch or gaze.
 */
@customElement('aeva-kinetic-text')
export class AevaKineticText extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            font-family: var(--aeva-text-display-font-family, inherit);
            position: relative;
            cursor: default;
            user-select: none;
            /* Container styling to allow characters to stretch without clipping */
            padding: 20px 0;
            margin: -20px 0;
        }
        
        .char {
            display: inline-block;
            will-change: transform;
            transform-origin: bottom center;
            white-space: pre; /* preserve spaces */
            color: var(--aeva-text-color, inherit);
            transition: color 0.2s ease;
        }

        /* 2026 Gradient text effect when hovered */
        :host(:hover) .char {
            background: linear-gradient(180deg, var(--aeva-primary-color, #667eea) 0%, var(--aeva-text-color, #333) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    `;

    /**
     * The text to display and animate.
     */
    @property({ type: String })
    text = '';

    /**
     * The variant size from standard typography.
     */
    @property({ type: String, reflect: true })
    variant: 'display' | 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' = 'h1';

    private springs: SpringController[] = [];

    // When text changes, we re-initialize the springs based on length
    protected willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('text')) {
            // Keep existing springs if possible to avoid memory churn
            const charCount = this.text.length;
            while (this.springs.length < charCount) {
                // Add new spring with slightly varied parameters for organic feel
                const variance = Math.random() * 0.05;
                this.springs.push(new SpringController(this, {
                    stiffness: 0.15 + variance,
                    damping: 0.35 + variance,
                    mass: 0.8 + variance
                }, 0));
            }
            // If shrinking, we could remove springs, but keeping them is fine for reuse.
        }
    }

    private lastX = 0;
    private lastTime = 0;

    private _handlePointerMove(e: PointerEvent) {
        // Calculate pointer position relative to host
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;

        // Velocity tracking
        const now = performance.now();
        const dt = now - this.lastTime;
        const dx = e.clientX - this.lastX;
        const velocity = (Math.abs(dx) / dt) || 0;

        this.lastX = e.clientX;
        this.lastTime = now;

        const isFastSwipe = velocity > 2; // threshold for "fast swipe"

        // Grab char elements from shadow root
        const charElements = this.shadowRoot?.querySelectorAll('.char');
        if (!charElements) return;

        charElements.forEach((el, index) => {
            const charEl = el as HTMLElement;
            if (index >= this.text.length) return;

            // Character mid-point
            const charCenter = charEl.offsetLeft + (charEl.offsetWidth / 2);
            const distance = Math.abs(x - charCenter);

            // Interaction radius
            const maxDist = 80; // px

            if (isFastSwipe && distance < maxDist * 2) {
                // Shatter effect: High random chaos injected into spring target
                // Target ranges from -1.5 to 1.5 randomly
                const chaos = (Math.random() - 0.5) * 3;
                this.springs[index].setTarget(chaos);

                // Set timeout to return to 0 quickly after shatter
                setTimeout(() => {
                    if (this.springs[index]) {
                        this.springs[index].setTarget(0);
                    }
                }, 150 + Math.random() * 100);
            }
            else if (distance < maxDist) {
                // Organic stretch squishy logic
                // Max effect near pointer is 1
                const effect = (maxDist - distance) / maxDist;
                this.springs[index].setTarget(effect);
            } else {
                this.springs[index].setTarget(0); // 0 effect
            }
        });
    }

    private _handlePointerLeave() {
        this.lastX = 0;
        this.lastTime = 0;

        this.springs.forEach((spring, i) => {
            if (i < this.text.length) {
                spring.setTarget(0);
            }
        });
    }

    render() {
        // Render variant base styles using standard typography classes conceptually,
        // but here we just use font-sizes directly or inherit from wrapper.
        // Or we can import AevaText classes. For simplicity, we define sizes for standard variants.
        let fontSize = '3rem';
        let fontWeight = '800';
        let letterSpacing = '-0.02em';

        if (this.variant === 'display' || this.variant === 'hero') fontSize = '3.75rem';
        if (this.variant === 'h2') fontSize = '2.25rem';
        if (this.variant === 'h3') fontSize = '1.875rem';
        if (this.variant === 'h4') {
            fontSize = '1.5rem';
            fontWeight = '700';
            letterSpacing = '-0.01em';
        }
        if (this.variant === 'body') {
            fontSize = '1rem';
            fontWeight = '400';
            letterSpacing = 'normal';
        }

        const chars = this.text.split('');

        return html`
            <div 
                style="font-size: ${fontSize}; font-weight: ${fontWeight}; line-height: 1.1; letter-spacing: ${letterSpacing};"
                @pointermove=${this._handlePointerMove}
                @pointerleave=${this._handlePointerLeave}
            >
                ${chars.map((char, index) => {
            const effect = this.springs[index]?.value || 0;
            // Apply effects: 
            // Y stretches up
            // X squeezes slightly
            // Add a tiny Y translate to keep it bottom aligned or float it
            const scaleY = 1 + (effect * 0.6);
            const scaleX = 1 - (effect * 0.15);
            const translateY = -effect * 8; // shift up slightly

            return html`<span class="char" style=${styleMap({
                transform: `translateY(${translateY}px) scale3d(${scaleX}, ${scaleY}, 1)`
            })}>${char}</span>`;
        })}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-kinetic-text': AevaKineticText;
    }
}
