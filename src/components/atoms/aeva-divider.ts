import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { accessibilityStyles } from '../../styles/accessibility.js';

/**
 * A divider component that separates content visually.
 *
 * @slot - Optional text or content to render in the middle of the divider.
 *
 * @cssprop --aeva-divider-color - The color of the divider line
 * @cssprop --aeva-divider-text-color - The color of the text within the divider
 * @cssprop --aeva-divider-thickness - The thickness of the divider line
 * @cssprop --aeva-divider-spacing - The margin surrounding the divider
 */
@customElement('aeva-divider')
export class AevaDivider extends LitElement {
    static styles = [
        accessibilityStyles,
        css`
      :host {
        display: block;
        --aeva-divider-color-default: var(--aeva-border-color, rgba(255, 255, 255, 0.1));
        --aeva-divider-text-color-default: var(--aeva-text-muted-color, #94a3b8);
        --aeva-divider-thickness-default: 1px;
        --aeva-divider-spacing-default: 1.5rem;
      }

      .divider {
        display: flex;
        font-family: var(--aeva-font-family, inherit);
        color: var(--aeva-divider-text-color, var(--aeva-divider-text-color-default));
        font-size: 0.875rem;
        align-items: center;
        margin: var(--aeva-divider-spacing, var(--aeva-divider-spacing-default)) 0;
      }

      /* Horizontal */
      .divider::before,
      .divider::after {
        content: '';
        flex: 1;
        background-color: transparent;
      }

      .divider.solid::before, .divider.solid::after {
        border-top: var(--aeva-divider-thickness, var(--aeva-divider-thickness-default)) solid var(--aeva-divider-color, var(--aeva-divider-color-default));
      }

      .divider.dashed::before, .divider.dashed::after {
        border-top: var(--aeva-divider-thickness, var(--aeva-divider-thickness-default)) dashed var(--aeva-divider-color, var(--aeva-divider-color-default));
      }

      .divider.dotted::before, .divider.dotted::after {
        border-top: var(--aeva-divider-thickness, var(--aeva-divider-thickness-default)) dotted var(--aeva-divider-color, var(--aeva-divider-color-default));
      }

      .content {
        padding: 0 1rem;
        display: none;
      }

      .has-content .content {
        display: block;
      }

      /* Vertical */
      :host([orientation="vertical"]) {
          display: inline-block;
          height: inherit;
          min-height: 100%;
      }

      .divider.vertical {
          flex-direction: column;
          margin: 0 var(--aeva-divider-spacing, var(--aeva-divider-spacing-default));
          height: 100%;
      }

      .divider.vertical::before,
      .divider.vertical::after {
          border-top: none;
      }

      .divider.vertical.solid::before, .divider.vertical.solid::after {
          border-left: var(--aeva-divider-thickness, var(--aeva-divider-thickness-default)) solid var(--aeva-divider-color, var(--aeva-divider-color-default));
      }

      .divider.vertical.dashed::before, .divider.vertical.dashed::after {
          border-left: var(--aeva-divider-thickness, var(--aeva-divider-thickness-default)) dashed var(--aeva-divider-color, var(--aeva-divider-color-default));
      }

      .divider.vertical.dotted::before, .divider.vertical.dotted::after {
          border-left: var(--aeva-divider-thickness, var(--aeva-divider-thickness-default)) dotted var(--aeva-divider-color, var(--aeva-divider-color-default));
      }

      .divider.vertical .content {
          padding: 1rem 0;
      }
    `,
    ];

    /**
     * Variant styling for the divider line.
     */
    @property({ type: String })
    variant: 'solid' | 'dashed' | 'dotted' = 'solid';

    /**
     * Orientation of the divider.
     */
    @property({ type: String, reflect: true })
    orientation: 'horizontal' | 'vertical' = 'horizontal';

    private get hasText() {
        return this.textContent && this.textContent.trim().length > 0;
    }

    render() {
        const classes = {
            divider: true,
            [this.variant]: true,
            vertical: this.orientation === 'vertical',
            'has-content': this.hasText
        };

        return html`
            <div class="${classMap(classes)}" role="separator" aria-orientation="${this.orientation}">
                <div class="content"><slot></slot></div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-divider': AevaDivider;
    }
}
