import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { accessibilityStyles } from '../../styles/accessibility.js';
import '../atoms/aeva-icon.js';

/**
 * An Avatar component for representing users or entities.
 * Features automatic fallbacks: Image -> Initials -> Icon.
 *
 * @cssprop --aeva-avatar-bg - Background color for initials/icon (default: #334155 / theme surface)
 * @cssprop --aeva-avatar-text-color - Text color for initials (default: #f8fafc)
 * @cssprop --aeva-avatar-border - Optional border around the avatar
 * @cssprop --aeva-avatar-font-weight - Font weight for initials
 */
@customElement('aeva-avatar')
export class AevaAvatar extends LitElement {
    static styles = [
        accessibilityStyles,
        css`
      :host {
        display: inline-block;
        --aeva-avatar-bg-default: var(--aeva-surface-3, #94a3b8);
        --aeva-avatar-text-color-default: var(--aeva-surface-on, #ffffff);
      }

      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color: var(--aeva-avatar-bg, var(--aeva-avatar-bg-default));
        color: var(--aeva-avatar-text-color, var(--aeva-avatar-text-color-default));
        font-family: var(--aeva-font-family, inherit);
        font-weight: var(--aeva-avatar-font-weight, 600);
        user-select: none;
        overflow: hidden;
        border: var(--aeva-avatar-border, none);
        box-sizing: border-box;
      }

      /* Shapes */
      .shape-circle { border-radius: 50%; }
      .shape-rounded { border-radius: var(--aeva-border-radius-md, 8px); }
      .shape-square { border-radius: var(--aeva-border-radius-sm, 4px); }

      /* Sizes */
      .size-sm { width: 24px; height: 24px; font-size: 0.65rem; }
      .size-md { width: 36px; height: 36px; font-size: 0.875rem; }
      .size-lg { width: 48px; height: 48px; font-size: 1.125rem; }
      .size-xl { width: 64px; height: 64px; font-size: 1.5rem; }

      /* Image */
      .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* Status Indicator */
      .status-badge {
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        border: 2px solid var(--aeva-bg-color, #ffffff); /* cut out effect */
        box-sizing: content-box;
        z-index: 1;
      }

      /* Status Badge Sizes based on Avatar Size */
      .size-sm .status-badge { width: 6px; height: 6px; }
      .size-md .status-badge { width: 8px; height: 8px; }
      .size-lg .status-badge { width: 10px; height: 10px; }
      .size-xl .status-badge { width: 14px; height: 14px; }

      /* Status Colors */
      .status-online { background-color: var(--aeva-success-color, #22c55e); }
      .status-offline { background-color: var(--aeva-text-muted-color, #94a3b8); }
      .status-away { background-color: var(--aeva-warning-color, #f59e0b); }
      .status-busy { background-color: var(--aeva-danger-color, #ef4444); }

      /* Shape adjustments for status positioning */
      .shape-square .status-badge, .shape-rounded .status-badge {
          transform: translate(25%, 25%);
      }
    `,
    ];

    /**
     * Image URL.
     */
    @property({ type: String })
    src?: string;

    /**
     * Name used for alt text and generating initials.
     */
    @property({ type: String })
    name = '';

    /**
     * Shape of the avatar.
     */
    @property({ type: String })
    shape: 'circle' | 'rounded' | 'square' = 'circle';

    /**
     * Size of the avatar.
     */
    @property({ type: String })
    size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

    /**
     * Optional presence status indicator.
     */
    @property({ type: String })
    status: 'online' | 'offline' | 'away' | 'busy' | 'none' = 'none';

    @state()
    private imageFailed = false;

    /**
     * Extracts 1-2 letters from the name for the initials fallback.
     */
    private getInitials(): string {
        if (!this.name) return '';
        const parts = this.name.trim().split(/\s+/);
        if (parts.length === 0) return '';
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    private handleImageError() {
        this.imageFailed = true;
    }

    protected willUpdate(changedProperties: Map<string | number | symbol, unknown>): void {
        if (changedProperties.has('src')) {
            // Reset failure state if a new source is provided
            this.imageFailed = false;
        }
    }

    private getIconSize(): number {
        switch (this.size) {
            case 'sm': return 12;
            case 'lg': return 24;
            case 'xl': return 32;
            case 'md':
            default: return 18;
        }
    }

    render() {
        const classes = {
            avatar: true,
            [`shape-${this.shape}`]: true,
            [`size-${this.size}`]: true
        };

        const showImage = this.src && !this.imageFailed;
        const initials = this.getInitials();
        const showInitials = !showImage && initials.length > 0;
        const showIcon = !showImage && !showInitials;

        let content;
        if (showImage) {
            content = html`<img class="avatar-img" src="${this.src}" alt="${this.name || 'Avatar'}" @error="${this.handleImageError}" />`;
        } else if (showInitials) {
            content = html`<span aria-label="${this.name}">${initials}</span>`;
        } else if (showIcon) {
            content = html`<aeva-icon name="user" size="${this.getIconSize()}" aria-label="User"></aeva-icon>`;
        }

        return html`
            <div class="${classMap(classes)}" aria-label="${this.name || 'User Avatar'}" role="img">
                ${content}
                ${this.status !== 'none' ? html`
                    <div class="status-badge status-${this.status}" title="${this.status}"></div>
                ` : ''}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-avatar': AevaAvatar;
    }
}
