import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Aeva Pagination component.
 * 
 * @fires change - Dispatched when the page changes.
 */
@customElement('aeva-pagination')
export class AevaPagination extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--aeva-pagination-gap);
      user-select: none;
    }

    .page-btn {
      min-width: var(--aeva-pagination-btn-size);
      height: var(--aeva-pagination-btn-size);
      padding: 0 var(--aeva-space-xs);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: var(--aeva-pagination-btn-bg);
      color: var(--aeva-pagination-btn-color);
      border: 1px solid var(--aeva-accordion-item-border-color);
      border-radius: var(--aeva-pagination-btn-border-radius);
      font-family: inherit;
      font-size: var(--aeva-font-size-sm);
      font-weight: 500;
      transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .page-btn:hover:not(:disabled):not(.active) {
      background-color: var(--aeva-pagination-btn-hover-bg);
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .page-btn.active {
      background-color: var(--aeva-pagination-btn-active-bg);
      color: var(--aeva-pagination-btn-active-color);
      border-color: var(--aeva-pagination-btn-active-bg);
      transform: scale(1.15);
      box-shadow: 0 8px 16px color-mix(in srgb, var(--aeva-primary-color) 40%, transparent);
      z-index: 2;
    }

    /* Dots variant styles */
    .pagination-dots {
      display: flex;
      align-items: center;
      gap: var(--aeva-space-sm);
      padding: 0 var(--aeva-space-md);
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--aeva-pagination-btn-color);
      opacity: 0.3;
      transition: 
        width 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
        background-color 300ms ease,
        opacity 300ms ease,
        transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: pointer;
    }

    .dot:hover {
      opacity: 0.6;
      transform: scale(1.2);
    }

    .dot.active {
      width: 24px;
      border-radius: 6px;
      opacity: 1;
      background-color: var(--aeva-primary-color);
      transform: scale(1.1);
    }

    .page-btn:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .ellipsis {
      padding: 0 var(--aeva-space-xs);
      color: var(--aeva-text-muted);
    }

    .icon {
      width: 1.25em;
      height: 1.25em;
    }
  `;

  /**
   * Pagination variant style
   */
  @property({ type: String, reflect: true })
  variant: 'number' | 'dots' = 'number';

  /**
   * Total number of items.
   */
  @property({ type: Number })
  total = 0;

  /**
   * Current active page (1-based).
   */
  @property({ type: Number, reflect: true })
  current = 1;

  /**
   * Number of items per page.
   */
  @property({ type: Number, attribute: 'page-size' })
  pageSize = 10;

  /**
   * Number of always visible pages before and after the current page.
   */
  @property({ type: Number, attribute: 'sibling-count' })
  siblingCount = 1;

  /**
   * Number of always visible pages at the beginning and end.
   */
  @property({ type: Number, attribute: 'boundary-count' })
  boundaryCount = 1;

  private get totalPages() {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  private setPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.current) return;

    this.current = page;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { page: this.current },
      bubbles: true,
      composed: true
    }));
  }

  private range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  }

  private renderPages() {
    if (this.variant === 'dots') {
      return html`
        <div class="pagination-dots">
          ${this.range(1, this.totalPages).map((i) => html`
            <div 
              class="dot ${classMap({ active: this.current === i })}"
              @click="${() => this.setPage(i)}"
              title="Page ${i}"
            ></div>
          `)}
        </div>
      `;
    }

    const totalPages = this.totalPages;
    const boundaryCount = this.boundaryCount;
    const siblingCount = this.siblingCount;

    const startPages = this.range(1, Math.min(boundaryCount, totalPages));
    const endPages = this.range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

    const siblingsStart = Math.max(
      Math.min(this.current - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2
    );
    const siblingsEnd = Math.min(
      Math.max(this.current + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
    );

    const itemList = [
      ...startPages,
      ...(siblingsStart > boundaryCount + 2 ? ['ellipsis-start'] : boundaryCount < totalPages - boundaryCount ? [boundaryCount + 1] : []),
      ...this.range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < (endPages.length > 0 ? endPages[0] - 2 : totalPages - 1) ? ['ellipsis-end'] : (endPages.length > 0 && siblingsEnd < endPages[0] - 1) ? [endPages[0] - 1] : []),
      ...endPages
    ];

    return itemList.map((item) => {
      if (typeof item === 'number') {
        return html`
          <button 
            class="page-btn ${classMap({ active: this.current === item })}"
            @click="${() => this.setPage(item)}"
          >
            ${item}
          </button>
        `;
      }
      return html`<span class="ellipsis">...</span>`;
    });
  }

  render() {
    return html`
      <button 
        class="page-btn" 
        ?disabled="${this.current === 1}"
        @click="${() => this.setPage(this.current - 1)}"
        aria-label="Previous page"
      >
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      ${this.renderPages()}
      
      <button 
        class="page-btn" 
        ?disabled="${this.current === this.totalPages}"
        @click="${() => this.setPage(this.current + 1)}"
        aria-label="Next page"
      >
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-pagination': AevaPagination;
  }
}
