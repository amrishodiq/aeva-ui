import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A grid layout component for creating responsive multi-column layouts.
 * Uses CSS Grid with flexible column configurations.
 *
 * @slot - Grid items
 *
 * @csspart grid - The grid container element
 *
 * @cssprop --aeva-grid-gap-none - Gap for none spacing (default: 0)
 * @cssprop --aeva-grid-gap-xs - Gap for extra small spacing (default: 0.25rem)
 * @cssprop --aeva-grid-gap-sm - Gap for small spacing (default: 0.5rem)
 * @cssprop --aeva-grid-gap-md - Gap for medium spacing (default: 1rem)
 * @cssprop --aeva-grid-gap-lg - Gap for large spacing (default: 1.5rem)
 * @cssprop --aeva-grid-gap-xl - Gap for extra large spacing (default: 2rem)
 *
 * @cssprop --aeva-grid-auto-min-width - Minimum width for auto-fit/auto-fill columns (default: 250px)
 * @cssprop --aeva-grid-auto-max-width - Maximum width for auto-fit/auto-fill columns (default: 1fr)
 */
@customElement('aeva-grid')
export class AevaGrid extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .grid {
      display: grid;
      width: 100%;
      box-sizing: border-box;
    }

    /* Column configurations */
    .columns-1 {
      grid-template-columns: repeat(1, 1fr);
    }

    .columns-2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .columns-3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .columns-4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .columns-6 {
      grid-template-columns: repeat(6, 1fr);
    }

    .columns-12 {
      grid-template-columns: repeat(12, 1fr);
    }

    .columns-auto-fit {
      grid-template-columns: repeat(
        auto-fit,
        minmax(var(--aeva-grid-auto-min-width), var(--aeva-grid-auto-max-width))
      );
    }

    .columns-auto-fill {
      grid-template-columns: repeat(
        auto-fill,
        minmax(var(--aeva-grid-auto-min-width), var(--aeva-grid-auto-max-width))
      );
    }

    /* Gap */
    .gap-none {
      gap: var(--aeva-grid-gap-none);
    }

    .gap-xs {
      gap: var(--aeva-grid-gap-xs);
    }

    .gap-sm {
      gap: var(--aeva-grid-gap-sm);
    }

    .gap-md {
      gap: var(--aeva-grid-gap-md);
    }

    .gap-lg {
      gap: var(--aeva-grid-gap-lg);
    }

    .gap-xl {
      gap: var(--aeva-grid-gap-xl);
    }

    /* Align items */
    .align-items-start {
      align-items: start;
    }

    .align-items-center {
      align-items: center;
    }

    .align-items-end {
      align-items: end;
    }

    .align-items-stretch {
      align-items: stretch;
    }

    /* Justify items */
    .justify-items-start {
      justify-items: start;
    }

    .justify-items-center {
      justify-items: center;
    }

    .justify-items-end {
      justify-items: end;
    }

    .justify-items-stretch {
      justify-items: stretch;
    }

    /* Responsive behavior */
    @media (max-width: 767px) {
      .columns-2,
      .columns-3,
      .columns-4,
      .columns-6,
      .columns-12 {
        grid-template-columns: 1fr;
      }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .columns-3,
      .columns-4,
      .columns-6,
      .columns-12 {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `;

  /**
   * Number of columns or auto-fit/auto-fill
   */
  @property({ type: String, reflect: true })
  columns: '1' | '2' | '3' | '4' | '6' | '12' | 'auto-fit' | 'auto-fill' = '3';

  /**
   * Gap between grid items
   */
  @property({ type: String, reflect: true })
  gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Alignment of items on block axis
   */
  @property({ type: String, reflect: true, attribute: 'align-items' })
  alignItems: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  /**
   * Alignment of items on inline axis
   */
  @property({ type: String, reflect: true, attribute: 'justify-items' })
  justifyItems: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  render() {
    const classes = [
      'grid',
      `columns-${this.columns}`,
      `gap-${this.gap}`,
      `align-items-${this.alignItems}`,
      `justify-items-${this.justifyItems}`,
    ].join(' ');

    return html`
      <div class="${classes}" part="grid">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-grid': AevaGrid;
  }
}
