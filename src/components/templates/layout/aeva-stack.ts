import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A stack layout component for arranging children vertically or horizontally.
 * Uses flexbox for flexible spacing and alignment.
 *
 * @slot - Items to be stacked
 *
 * @csspart stack - The stack container element
 *
 * @cssprop --aeva-stack-gap-none - Gap for none spacing (default: 0)
 * @cssprop --aeva-stack-gap-xs - Gap for extra small spacing (default: 0.25rem)
 * @cssprop --aeva-stack-gap-sm - Gap for small spacing (default: 0.5rem)
 * @cssprop --aeva-stack-gap-md - Gap for medium spacing (default: 1rem)
 * @cssprop --aeva-stack-gap-lg - Gap for large spacing (default: 1.5rem)
 * @cssprop --aeva-stack-gap-xl - Gap for extra large spacing (default: 2rem)
 */
@customElement('aeva-stack')
export class AevaStack extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .stack {
      display: flex;
      box-sizing: border-box;
    }

    /* Direction */
    .direction-vertical {
      flex-direction: column;
    }

    .direction-horizontal {
      flex-direction: row;
    }

    /* Spacing (gap) */
    .spacing-none {
      gap: var(--aeva-stack-gap-none);
    }

    .spacing-xs {
      gap: var(--aeva-stack-gap-xs);
    }

    .spacing-sm {
      gap: var(--aeva-stack-gap-sm);
    }

    .spacing-md {
      gap: var(--aeva-stack-gap-md);
    }

    .spacing-lg {
      gap: var(--aeva-stack-gap-lg);
    }

    .spacing-xl {
      gap: var(--aeva-stack-gap-xl);
    }

    /* Align items (cross-axis) */
    .align-start {
      align-items: flex-start;
    }

    .align-center {
      align-items: center;
    }

    .align-end {
      align-items: flex-end;
    }

    .align-stretch {
      align-items: stretch;
    }

    /* Justify content (main-axis) */
    .justify-start {
      justify-content: flex-start;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-end {
      justify-content: flex-end;
    }

    .justify-space-between {
      justify-content: space-between;
    }

    .justify-space-around {
      justify-content: space-around;
    }

    .justify-space-evenly {
      justify-content: space-evenly;
    }

    /* Wrap */
    .wrap {
      flex-wrap: wrap;
    }
  `;

  /**
   * Stack direction
   */
  @property({ type: String, reflect: true })
  direction: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Spacing between items
   */
  @property({ type: String, reflect: true })
  spacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Alignment of items on cross-axis
   */
  @property({ type: String, reflect: true })
  align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  /**
   * Justification of items on main-axis
   */
  @property({ type: String, reflect: true })
  justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' = 'start';

  /**
   * Whether items should wrap
   */
  @property({ type: Boolean, reflect: true })
  wrap = false;

  render() {
    const classes = [
      'stack',
      `direction-${this.direction}`,
      `spacing-${this.spacing}`,
      `align-${this.align}`,
      `justify-${this.justify}`,
      this.wrap ? 'wrap' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="${classes}" part="stack">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-stack': AevaStack;
  }
}
