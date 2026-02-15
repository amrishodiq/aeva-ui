import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A grid item component for controlling grid placement and spanning.
 * Use inside aeva-grid to create bento-style layouts.
 *
 * @slot - Content of the grid item
 *
 * @csspart item - The grid item element
 *
 * @cssprop --aeva-grid-item-min-height - Minimum height for grid items (default: auto)
 */
@customElement('aeva-grid-item')
export class AevaGridItem extends LitElement {
    static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    .item {
      width: 100%;
      height: 100%;
      min-height: var(--aeva-grid-item-min-height);
      box-sizing: border-box;
    }
  `;

    /**
     * Number of columns to span
     */
    @property({ type: Number, reflect: true, attribute: 'col-span' })
    colSpan = 1;

    /**
     * Number of rows to span
     */
    @property({ type: Number, reflect: true, attribute: 'row-span' })
    rowSpan = 1;

    /**
     * Column start position (1-indexed)
     */
    @property({ type: Number, reflect: true, attribute: 'col-start' })
    colStart?: number;

    /**
     * Row start position (1-indexed)
     */
    @property({ type: Number, reflect: true, attribute: 'row-start' })
    rowStart?: number;

    updated(changedProperties: Map<string, any>) {
        super.updated(changedProperties);

        // Apply grid placement styles to host element
        if (changedProperties.has('colSpan')) {
            this.style.gridColumn = this.colStart
                ? `${this.colStart} / span ${this.colSpan}`
                : `span ${this.colSpan}`;
        }

        if (changedProperties.has('rowSpan')) {
            this.style.gridRow = this.rowStart
                ? `${this.rowStart} / span ${this.rowSpan}`
                : `span ${this.rowSpan}`;
        }

        if (changedProperties.has('colStart') && this.colStart) {
            this.style.gridColumn = `${this.colStart} / span ${this.colSpan}`;
        }

        if (changedProperties.has('rowStart') && this.rowStart) {
            this.style.gridRow = `${this.rowStart} / span ${this.rowSpan}`;
        }
    }

    connectedCallback() {
        super.connectedCallback();
        // Set initial grid placement
        this.style.gridColumn = this.colStart
            ? `${this.colStart} / span ${this.colSpan}`
            : `span ${this.colSpan}`;
        this.style.gridRow = this.rowStart
            ? `${this.rowStart} / span ${this.rowSpan}`
            : `span ${this.rowSpan}`;
    }

    render() {
        return html`
      <div class="item" part="item">
        <slot></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-grid-item': AevaGridItem;
    }
}
