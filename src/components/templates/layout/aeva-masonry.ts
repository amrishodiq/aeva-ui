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
      column-count: var(--base-columns, 1);
      column-gap: var(--aeva-masonry-gap);
      width: 100%;
    }

    /* Media queries cascade from smallest to largest */
    @media (min-width: 576px) {
      .masonry-container {
        column-count: var(--sm-columns, var(--base-columns, 1));
      }
    }

    @media (min-width: 768px) {
      .masonry-container {
        column-count: var(
          --md-columns,
          var(--sm-columns, var(--base-columns, 1))
        );
      }
    }

    @media (min-width: 1024px) {
      .masonry-container {
        column-count: var(
          --lg-columns,
          var(--md-columns, var(--sm-columns, var(--base-columns, 1)))
        );
      }
    }

    @media (min-width: 1440px) {
      .masonry-container {
        column-count: var(
          --xl-columns,
          var(
            --lg-columns,
            var(--md-columns, var(--sm-columns, var(--base-columns, 1)))
          )
        );
      }
    }

    @media (min-width: 1920px) {
      .masonry-container {
        column-count: var(
          --xxl-columns,
          var(
            --xl-columns,
            var(
              --lg-columns,
              var(--md-columns, var(--sm-columns, var(--base-columns, 1)))
            )
          )
        );
      }
    }

    /* Slotted items - prevent breaking across columns and ensure spacing */
    ::slotted(*) {
      break-inside: avoid;
      display: inline-block !important;
      width: 100%;
      height: auto !important;
      margin-bottom: var(--aeva-masonry-gap, 16px) !important;
    }
  `;

  /**
   * Number of base columns (mobile). If 'auto', uses internal responsive presets.
   */
  @property({ type: String, reflect: true })
  columns: 'auto' | '1' | '2' | '3' | '4' | '5' | string = 'auto';

  @property({ type: String, attribute: 'sm-columns' }) smColumns?: string;
  @property({ type: String, attribute: 'md-columns' }) mdColumns?: string;
  @property({ type: String, attribute: 'lg-columns' }) lgColumns?: string;
  @property({ type: String, attribute: 'xl-columns' }) xlColumns?: string;
  @property({ type: String, attribute: 'xxl-columns' }) xxlColumns?: string;

  /**
   * Gap between items. Can be a number (px) or a token (xs, sm, md, lg, xl).
   */
  @property({ type: String, reflect: true })
  gap: string | number = 16;

  private getGapValue(): string {
    const gapMap: Record<string, string> = {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
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
    // Determine the base and responsive columns
    // If 'auto' mode is active, simulate the old auto behavior by injecting default responsive values
    const isAuto = this.columns === 'auto';
    const baseCol = isAuto ? '1' : this.columns;

    const styles: Record<string, string | undefined> = {
      '--base-columns': baseCol,
      '--sm-columns': this.smColumns,
      '--md-columns': this.mdColumns ?? (isAuto && !this.smColumns ? '2' : undefined), // Old auto behavior: 2 cols at md
      '--lg-columns': this.lgColumns ?? (isAuto && !this.mdColumns && !this.smColumns ? '3' : undefined), // Old auto: 3 at lg
      '--xl-columns': this.xlColumns ?? (isAuto && !this.lgColumns && !this.mdColumns && !this.smColumns ? '4' : undefined), // Old auto: 4 at xl
      '--xxl-columns': this.xxlColumns,
    };

    // Construct the inline style string
    const styleString = Object.entries(styles)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');

    return html`
      <div
        class="masonry-container"
        part="container"
        style="${styleString}; column-gap: var(--aeva-masonry-gap)"
      >
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
