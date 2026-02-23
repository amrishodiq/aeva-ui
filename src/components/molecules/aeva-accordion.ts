import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { AevaAccordionItem } from '../atoms/aeva-accordion-item.js';

/**
 * Aeva Accordion component.
 * 
 * @slot - Default slot for aeva-accordion-item elements.
 */
@customElement('aeva-accordion')
export class AevaAccordion extends LitElement {
    static styles = css`
    :host {
      display: block;
      background-color: var(--aeva-accordion-bg);
      border-radius: var(--aeva-accordion-border-radius);
      overflow: hidden;
      --aeva-accordion-item-border-width: 0px;
    }

    :host([variant="bordered"]) {
      border: 1px solid var(--aeva-accordion-item-border-color);
      --aeva-accordion-item-border-width: 1px;
    }
  `;

    /**
     * Accordion variant.
     * 'flush' (default) - no borders.
     * 'bordered' - with borders between items and outer container.
     */
    @property({ type: String, reflect: true })
    variant: 'flush' | 'bordered' = 'flush';

    /**
     * Whether multiple items can be open at once.
     */
    @property({ type: Boolean })
    multiple = false;

    @queryAssignedElements({ selector: 'aeva-accordion-item' })
    private items!: Array<AevaAccordionItem>;

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('toggle', this.handleToggle as EventListener);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('toggle', this.handleToggle as EventListener);
    }

    private handleToggle(event: CustomEvent) {
        if (this.multiple) return;

        const target = event.target as AevaAccordionItem;
        if (event.detail.open) {
            this.items.forEach(item => {
                if (item !== target) {
                    item.open = false;
                }
            });
        }
    }

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-accordion': AevaAccordion;
    }
}
