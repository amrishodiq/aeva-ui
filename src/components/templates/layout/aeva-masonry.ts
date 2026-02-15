import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A masonry layout component that arranges child elements in a compact grid.
 * Uses CSS columns for true Pinterest-style masonry layout.
 *
 * @slot - Default slot for child elements (typically aeva-card components)
 *
 * @csspart container - The main masonry container
 *
 * @cssprop --masonry-gap - Gap between items (default: 16px)
 * @cssprop --masonry-column-count - Number of columns (default: auto)
 */
@customElement('aeva-masonry')
export class AevaMasonry extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .masonry-container {
      column-gap: var(--aeva-masonry-gap);
      width: 100%;
    }

    /* Auto columns based on viewport */
    .masonry-container.auto-columns {
      column-count: 1;
    }

    /* Fixed column layouts */
    .masonry-container.columns-1 {
      column-count: 1;
    }

    .masonry-container.columns-2 {
      column-count: 2;
    }

    .masonry-container.columns-3 {
      column-count: 3;
    }

    .masonry-container.columns-4 {
      column-count: 4;
    }

    .masonry-container.columns-5 {
      column-count: 5;
    }

    /* Responsive breakpoints for auto mode */
    @media (min-width: 768px) {
      .masonry-container.auto-columns {
        column-count: 2;
      }
    }

    @media (min-width: 1024px) {
      .masonry-container.auto-columns {
        column-count: 3;
      }
    }

    @media (min-width: 1440px) {
      .masonry-container.auto-columns {
        column-count: 4;
      }
    }

    /* Slotted items - prevent breaking across columns and ensure spacing */
    ::slotted(*) {
      break-inside: avoid;
      display: inline-block !important;
      width: 100%;
      margin-bottom: var(--aeva-masonry-gap, 16px) !important;
    }
  `;

  /**
   * Number of columns ('auto' for responsive, or fixed number)
   */
  @property({ type: String, reflect: true })
  columns: 'auto' | '1' | '2' | '3' | '4' | '5' = 'auto';

  /**
   * Gap between items. Can be a number (px) or a token (xs, sm, md, lg, xl).
   */
  @property({ type: String, reflect: true })
  gap: string | number = 16;

  private getGapValue(): string {
    const gapMap: Record<string, string> = {
      'xs': '4px',
      'sm': '8px',
      'md': '16px',
      'lg': '24px',
      'xl': '32px'
    };

    if (typeof this.gap === 'number') return `${this.gap}px`;
    if (gapMap[this.gap]) return gapMap[this.gap];
    if (!isNaN(Number(this.gap))) return `${this.gap}px`;
    return this.gap;
  }

  firstUpdated() {
    this.updateGap();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('gap')) {
      this.updateGap();
    }
  }

  private updateGap() {
    this.style.setProperty('--aeva-masonry-gap', this.getGapValue());
  }

  render() {
    const containerClass = `masonry-container ${this.columns === 'auto' ? 'auto-columns' : `columns-${this.columns}`
      }`;

    return html`
      <div class="${containerClass}" part="container" style="column-gap: var(--aeva-masonry-gap)">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-masonry': AevaMasonry;
  }
}
