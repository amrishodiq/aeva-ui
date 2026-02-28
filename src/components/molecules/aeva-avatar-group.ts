import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { accessibilityStyles } from '../../styles/accessibility.js';
import '../atoms/aeva-avatar.js';

/**
 * A container component for stacking multiple aeva-avatar components horizontally.
 * Automatically handles negative margins for overlapping and truncates excess avatars.
 *
 * @slot - Expects <aeva-avatar> components.
 *
 * @cssprop --aeva-avatar-group-overlap - The negative margin overlap (default: -10px)
 */
@customElement('aeva-avatar-group')
export class AevaAvatarGroup extends LitElement {
    static styles = [
        accessibilityStyles,
        css`
      :host {
        display: inline-flex;
        align-items: center;
        /* The default overlap if size classes aren't explicitly caught (50% of md = -18px) */
        --aeva-avatar-group-overlap-default: -18px; 
      }

      .avatar-group {
        display: flex;
        align-items: center;
      }

      /* Hover uplift for avatars */
      ::slotted(aeva-avatar:hover) {
        transform: translateY(-4px);
        /* Force highest z-index on hover */
        z-index: 99 !important;
      }

      /* The surplus +N indicator */
      .surplus-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--aeva-surface-3, #94a3b8);
        color: var(--aeva-surface-on, #ffffff);
        font-family: var(--aeva-font-family, inherit);
        font-weight: 600;
        border-radius: 50%;
        border: 2px solid var(--aeva-bg-color, #ffffff);
        position: relative;
        box-sizing: border-box;
      }

      /* Match aeva-avatar sizes for the surplus indicator */
      .size-sm { width: 24px; height: 24px; font-size: 0.65rem; }
      .size-md { width: 36px; height: 36px; font-size: 0.875rem; }
      .size-lg { width: 48px; height: 48px; font-size: 1.125rem; }
      .size-xl { width: 64px; height: 64px; font-size: 1.5rem; }
    `,
    ];

    /**
     * Maximum number of avatars to render before truncating.
     */
    @property({ type: Number })
    max?: number;

    /**
     * Force size for all avatars in the group.
     */
    @property({ type: String })
    size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

    @state()
    private surplusCount = 0;

    private getOverlapValue(): string {
        switch (this.size) {
            case 'sm': return '-12px'; // 24px / 2
            case 'lg': return '-24px'; // 48px / 2
            case 'xl': return '-32px'; // 64px / 2
            case 'md':
            default: return '-18px'; // 36px / 2
        }
    }

    private handleSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        const assignedNodes = slot.assignedNodes({ flatten: true });

        // Filter only element nodes that are aeva-avatars
        const avatarElements = assignedNodes.filter(
            node => node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() === 'aeva-avatar'
        ) as HTMLElement[];

        const overlapMargin = this.getOverlapValue();

        avatarElements.forEach((avatar, index) => {
            avatar.setAttribute('size', this.size);

            // Apply border variable inline to guarantee inheritance
            avatar.style.setProperty('--aeva-avatar-border', '2px solid var(--aeva-bg-color, #ffffff)');

            // Reset transition and position
            avatar.style.position = 'relative';
            avatar.style.transition = 'transform 0.2s';

            // Ensure natural overlap by explicitly setting z-index upward
            avatar.style.zIndex = String(index);

            // Apply margin to everything except the first child
            if (index > 0) {
                avatar.style.marginLeft = overlapMargin;
            } else {
                avatar.style.marginLeft = '0';
            }

            if (this.max !== undefined) {
                if (index > this.max) {
                    avatar.style.display = 'none';
                } else if (index === this.max) {
                    // Hide the avatar that corresponds exactly to the 'max' index, 
                    // because the surplus badge will take its place.
                    avatar.style.display = 'none';
                } else {
                    avatar.style.display = 'inline-block';
                }
            } else {
                avatar.style.display = 'inline-block';
            }
        });

        if (this.max !== undefined && avatarElements.length > this.max) {
            this.surplusCount = avatarElements.length - this.max;
        } else {
            this.surplusCount = 0;
        }
    }

    render() {
        const surplusClasses = {
            'surplus-avatar': true,
            [`size-${this.size}`]: true
        };

        const overlapMargin = this.getOverlapValue();

        return html`
            <div class="avatar-group">
                <slot @slotchange="${this.handleSlotChange}"></slot>
                ${this.surplusCount > 0 ? html`
                    <div class="${classMap(surplusClasses)}" 
                         aria-label="${this.surplusCount} more users"
                         style="margin-left: ${overlapMargin}; z-index: ${this.max};">
                        +${this.surplusCount}
                    </div>
                ` : ''}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-avatar-group': AevaAvatarGroup;
    }
}
