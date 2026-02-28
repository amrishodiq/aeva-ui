import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { accessibilityStyles } from '../../styles/accessibility.js';
import '../atoms/aeva-icon.js';

/**
 * An alert/banner component for displaying contextual messages.
 *
 * @slot - Main alert content.
 * @slot action - Optional custom action area (before the dismiss button).
 * 
 * @fires close - Dispatched when the alert is dismissed.
 *
 * @cssprop --aeva-alert-border-radius - Border radius (default: 8px)
 * @cssprop --aeva-alert-padding - Internal padding (default: 1rem)
 */
@customElement('aeva-alert')
export class AevaAlert extends LitElement {
    static styles = [
        accessibilityStyles,
        css`
      :host {
        display: block;
        margin-bottom: 1rem;
        --aeva-alert-border-radius-default: var(--aeva-border-radius-md, 8px);
        --aeva-alert-padding-default: 1rem;
      }

      .alert {
        display: flex;
        font-family: var(--aeva-font-family, inherit);
        border-radius: var(--aeva-alert-border-radius, var(--aeva-alert-border-radius-default));
        padding: var(--aeva-alert-padding, var(--aeva-alert-padding-default));
        align-items: flex-start;
        transition: opacity 0.3s ease, transform 0.3s ease;
        line-height: 1.5;
        font-size: 0.875rem;
        box-sizing: border-box;
      }

      .alert.hidden {
        display: none;
      }

      .icon {
        flex-shrink: 0;
        margin-right: 0.75rem;
        margin-top: 0.1rem;
        display: flex;
      }

      .content-area {
        flex-grow: 1;
        min-width: 0;
      }

      .title {
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 0.25rem;
      }

      .message {
        color: inherit;
        opacity: 0.9;
      }

      .actions-area {
        display: flex;
        align-items: center;
        margin-left: 0.75rem;
        flex-shrink: 0;
        gap: 0.5rem;
      }

      .close-btn {
        background: transparent;
        border: none;
        color: inherit;
        opacity: 0.7;
        cursor: pointer;
        padding: 0.25rem;
        display: flex;
        border-radius: var(--aeva-border-radius-sm, 4px);
        transition: opacity 0.2s, background-color 0.2s;
      }

      .close-btn:hover {
        opacity: 1;
        background-color: rgba(128, 128, 128, 0.15);
      }

      /* === VARIANTS & APPEARANCES === */

      /* INFO */
      .variant-info.appearance-subtle {
        background-color: color-mix(in srgb, var(--aeva-info-color, #3b82f6) 15%, transparent);
        color: var(--aeva-text-color, inherit);
      }
      .variant-info.appearance-subtle .icon { color: var(--aeva-info-color, #3b82f6); }
      
      .variant-info.appearance-solid {
        background-color: var(--aeva-info-color, #3b82f6);
        color: #ffffff;
      }

      .variant-info.appearance-outlined {
        background-color: transparent;
        border: 1px solid var(--aeva-info-color, #3b82f6);
        color: var(--aeva-text-color, inherit);
      }
      .variant-info.appearance-outlined .icon { color: var(--aeva-info-color, #3b82f6); }

      /* SUCCESS */
      .variant-success.appearance-subtle {
        background-color: color-mix(in srgb, var(--aeva-success-color, #22c55e) 15%, transparent);
        color: var(--aeva-text-color, inherit);
      }
      .variant-success.appearance-subtle .icon { color: var(--aeva-success-color, #22c55e); }
      
      .variant-success.appearance-solid {
        background-color: var(--aeva-success-color, #22c55e);
        color: #ffffff;
      }

      .variant-success.appearance-outlined {
        background-color: transparent;
        border: 1px solid var(--aeva-success-color, #22c55e);
        color: var(--aeva-text-color, inherit);
      }
      .variant-success.appearance-outlined .icon { color: var(--aeva-success-color, #22c55e); }

      /* WARNING */
      .variant-warning.appearance-subtle {
        background-color: color-mix(in srgb, var(--aeva-warning-color, #f59e0b) 15%, transparent);
        color: var(--aeva-text-color, inherit);
      }
      .variant-warning.appearance-subtle .icon { color: var(--aeva-warning-color, #f59e0b); }
      
      .variant-warning.appearance-solid {
        background-color: var(--aeva-warning-color, #f59e0b);
        color: #000000;
      }

      .variant-warning.appearance-outlined {
        background-color: transparent;
        border: 1px solid var(--aeva-warning-color, #f59e0b);
        color: var(--aeva-text-color, inherit);
      }
      .variant-warning.appearance-outlined .icon { color: var(--aeva-warning-color, #f59e0b); }

      /* DANGER */
      .variant-danger.appearance-subtle {
        background-color: color-mix(in srgb, var(--aeva-danger-color, #ef4444) 15%, transparent);
        color: var(--aeva-text-color, inherit);
      }
      .variant-danger.appearance-subtle .icon { color: var(--aeva-danger-color, #ef4444); }
      
      .variant-danger.appearance-solid {
        background-color: var(--aeva-danger-color, #ef4444);
        color: #ffffff;
      }

      .variant-danger.appearance-outlined {
        background-color: transparent;
        border: 1px solid var(--aeva-danger-color, #ef4444);
        color: var(--aeva-text-color, inherit);
      }
      .variant-danger.appearance-outlined .icon { color: var(--aeva-danger-color, #ef4444); }
    `,
    ];

    /**
     * Determines color scheme.
     */
    @property({ type: String })
    variant: 'info' | 'success' | 'warning' | 'danger' = 'info';

    /**
     * Determines the visual style.
     */
    @property({ type: String })
    appearance: 'subtle' | 'solid' | 'outlined' = 'subtle';

    /**
     * Optional heading for the alert.
     */
    @property({ type: String })
    title = '';

    /**
     * Optional custom icon name. Set to 'none' to hide. Defaults to variant-specific icon.
     */
    @property({ type: String })
    icon?: string;

    /**
     * Whether the alert can be closed by the user.
     */
    @property({ type: Boolean })
    dismissible = false;

    @state()
    private isDismissed = false;

    private handleClose() {
        this.isDismissed = true;
        this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }

    private getDefaultIcon() {
        if (this.icon === 'none') return null;
        if (this.icon) return this.icon;

        switch (this.variant) {
            case 'success': return 'check-circle';
            case 'warning': return 'alert-triangle';
            case 'danger': return 'alert-circle';
            case 'info':
            default: return 'info';
        }
    }

    render() {
        if (this.isDismissed) return html``;

        const classes = {
            alert: true,
            [`variant-${this.variant}`]: true,
            [`appearance-${this.appearance}`]: true,
        };

        const iconName = this.getDefaultIcon();

        return html`
            <div class="${classMap(classes)}" role="alert">
                ${iconName ? html`
                    <div class="icon">
                        <aeva-icon name="${iconName}" size="20"></aeva-icon>
                    </div>
                ` : ''}

                <div class="content-area">
                    ${this.title ? html`<div class="title">${this.title}</div>` : ''}
                    <div class="message">
                        <slot></slot>
                    </div>
                </div>

                <div class="actions-area">
                    <slot name="action"></slot>
                    ${this.dismissible ? html`
                        <button class="close-btn" @click="${this.handleClose}" aria-label="Close alert">
                            <aeva-icon name="x" size="18"></aeva-icon>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-alert': AevaAlert;
    }
}
