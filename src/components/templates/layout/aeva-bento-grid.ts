import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A bento grid component with preset asymmetric layouts.
 * Perfect for creating visually interesting dashboard-style layouts.
 *
 * @slot - Grid items (automatically positioned based on preset)
 *
 * @csspart grid - The grid container element
 *
 * @cssprop --aeva-bento-grid-gap - Gap between grid items (default: 1rem)
 * @cssprop --aeva-bento-grid-min-height - Minimum height for grid rows (default: 200px)
 */
@customElement('aeva-bento-grid')
export class AevaBentoGrid extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .grid {
      display: grid;
      width: 100%;
      gap: var(--aeva-bento-grid-gap);
      box-sizing: border-box;
    }

    /* Preset: Feature (1 large + 3 small) */
    .preset-feature {
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: minmax(var(--aeva-bento-grid-min-height), auto);
    }

    .preset-feature ::slotted(*:nth-child(1)) {
      grid-column: span 2;
      grid-row: span 2;
    }

    .preset-feature ::slotted(*:nth-child(2)),
    .preset-feature ::slotted(*:nth-child(3)),
    .preset-feature ::slotted(*:nth-child(4)) {
      grid-column: span 1;
      grid-row: span 1;
    }

    /* Preset: Masonry (Pinterest-style) */
    .preset-masonry {
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(150px, auto);
    }

    .preset-masonry ::slotted(*:nth-child(1)) {
      grid-row: span 2;
    }

    .preset-masonry ::slotted(*:nth-child(3)) {
      grid-row: span 2;
    }

    .preset-masonry ::slotted(*:nth-child(5)) {
      grid-column: span 2;
    }

    /* Preset: Dashboard (varied sizes) */
    .preset-dashboard {
      grid-template-columns: repeat(6, 1fr);
      grid-auto-rows: minmax(var(--aeva-bento-grid-min-height), auto);
    }

    .preset-dashboard ::slotted(*:nth-child(1)) {
      grid-column: span 4;
      grid-row: span 2;
    }

    .preset-dashboard ::slotted(*:nth-child(2)),
    .preset-dashboard ::slotted(*:nth-child(3)) {
      grid-column: span 2;
      grid-row: span 1;
    }

    .preset-dashboard ::slotted(*:nth-child(4)) {
      grid-column: span 3;
    }

    .preset-dashboard ::slotted(*:nth-child(5)) {
      grid-column: span 3;
    }

    /* Preset: Sidebar (2-column with large sidebar) */
    .preset-sidebar {
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(var(--aeva-bento-grid-min-height), auto);
    }

    .preset-sidebar ::slotted(*:nth-child(1)) {
      grid-column: span 2;
      grid-row: span 3;
    }

    .preset-sidebar ::slotted(*:nth-child(2)),
    .preset-sidebar ::slotted(*:nth-child(3)),
    .preset-sidebar ::slotted(*:nth-child(4)) {
      grid-column: span 1;
      grid-row: span 1;
    }

    /* Preset: Spotlight (1 hero + grid) */
    .preset-spotlight {
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: minmax(var(--aeva-bento-grid-min-height), auto);
    }

    .preset-spotlight ::slotted(*:nth-child(1)) {
      grid-column: span 4;
      grid-row: span 2;
    }

    .preset-spotlight ::slotted(*:nth-child(2)),
    .preset-spotlight ::slotted(*:nth-child(3)),
    .preset-spotlight ::slotted(*:nth-child(4)),
    .preset-spotlight ::slotted(*:nth-child(5)) {
      grid-column: span 1;
    }

    /* Responsive behavior */
    @media (max-width: 767px) {
      .grid {
        grid-template-columns: 1fr !important;
      }

      .grid ::slotted(*) {
        grid-column: span 1 !important;
        grid-row: span 1 !important;
      }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .preset-feature,
      .preset-dashboard,
      .preset-spotlight {
        grid-template-columns: repeat(2, 1fr) !important;
      }

      .preset-masonry,
      .preset-sidebar {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
  `;

  /**
   * Preset bento layout pattern
   */
  @property({ type: String, reflect: true })
  preset: 'feature' | 'masonry' | 'dashboard' | 'sidebar' | 'spotlight' | 'custom' = 'feature';

  render() {
    const classes = ['grid', this.preset !== 'custom' ? `preset-${this.preset}` : '']
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="${classes}" part="grid">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-bento-grid': AevaBentoGrid;
  }
}
