import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../atoms/aeva-list-item';

/**
 * A container component for list items.
 * Manages selection and keyboard navigation.
 * 
 * @slot - Default slot for aeva-list-item elements
 * 
 * @fires on-selection-change - Fired when the active item changes
 * @event {CustomEvent<{index: number, label: string}>} on-selection-change
 * 
 * @cssprop --aeva-list-padding - Padding for the list container (default: 8px)
 * @cssprop --aeva-list-gap - Gap between items (default: 4px)
 */
@customElement('aeva-list')
export class AevaList extends LitElement {
    static styles = css`
    :host {
      display: block;
      width: 100%;      
    }

    .list-container {
      display: flex;
      flex-direction: column;
      padding: var(--aeva-list-padding);
      gap: var(--aeva-list-gap);
      border-radius: var(--aeva-list-border-radius);
    }
  `;

    /**
     * The index of the currently active item
     */
    @property({ type: Number, reflect: true })
    active = -1;

    @state()
    private items: HTMLElement[] = [];

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('list-item-click', this.handleItemClick as EventListener);
        this.addEventListener('keydown', this.handleKeyDown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('list-item-click', this.handleItemClick as EventListener);
        this.removeEventListener('keydown', this.handleKeyDown);
    }

    private handleSlotChange() {
        this.updateItems();
    }

    private updateItems() {
        const slot = this.shadowRoot?.querySelector('slot');
        const assignedElements = slot?.assignedElements({ flatten: true }) || [];

        this.items = assignedElements.filter(
            (el) => el.tagName.toLowerCase() === 'aeva-list-item'
        ) as HTMLElement[];

        this.items.forEach((item: any, index) => {
            item.index = index;
            item.active = index === this.active;
        });
    }

    private handleItemClick(e: CustomEvent) {
        const { index, label } = e.detail;
        this.setSelected(index, label);
    }

    private setSelected(index: number, label: string) {
        if (index === this.active) return;

        this.active = index;

        // Update items active state
        this.items.forEach((item: any, i) => {
            item.active = i === this.active;
        });

        this.dispatchEvent(
            new CustomEvent('on-selection-change', {
                detail: { index, label },
                bubbles: true,
                composed: true,
            })
        );
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (this.items.length === 0) return;

        let targetIndex = -1;
        const currentIndex = this.items.findIndex((item: any) =>
            item.shadowRoot?.querySelector('.item') === document.activeElement ||
            item === document.activeElement ||
            item.shadowRoot?.activeElement
        );

        // If no item is focused, use the active index or 0
        let focusIndex = currentIndex === -1 ? (this.active === -1 ? 0 : this.active) : currentIndex;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                targetIndex = (focusIndex + 1) % this.items.length;
                break;
            case 'ArrowUp':
                e.preventDefault();
                targetIndex = (focusIndex - 1 + this.items.length) % this.items.length;
                break;
            case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                targetIndex = this.items.length - 1;
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                const activeEl = this.items[focusIndex] as any;
                if (activeEl) {
                    this.setSelected(focusIndex, activeEl.label);
                }
                return;
            default:
                return;
        }

        if (targetIndex !== -1) {
            const targetItem = this.items[targetIndex] as any;
            targetItem.shadowRoot?.querySelector('.item')?.focus();
        }
    }

    render() {
        return html`
      <div class="list-container" role="listbox">
        <slot @slotchange="${this.handleSlotChange}"></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-list': AevaList;
    }
}
