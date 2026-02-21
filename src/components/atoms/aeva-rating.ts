import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A rating component to display user ratings with stars.
 * Supports read-only display and interactive mode for user input.
 *
 * @fires rating-change - Dispatched when the rating changes (only in interactive mode)
 *
 * @csspart container - The main rating container
 * @csspart star - Individual star element
 *
 * @cssprop --aeva-rating-color - Color of filled stars (default: #fbbf24)
 * @cssprop --aeva-rating-empty-color - Color of empty stars (default: #e5e7eb)
 * @cssprop --aeva-rating-hover-color - Color on hover in interactive mode (default: #f59e0b)
 * @cssprop --aeva-rating-size-sm - Size for small variant (default: 16px)
 * @cssprop --aeva-rating-size-md - Size for medium variant (default: 24px)
 * @cssprop --aeva-rating-size-lg - Size for large variant (default: 32px)
 */
@customElement('aeva-rating')
export class AevaRating extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .rating-container {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .star {
      display: inline-flex;
      position: relative;
      transition: transform 0.2s ease;
    }

    .star svg {
      display: block;
    }

    /* Size variants */
    .size-sm .star svg {
      width: var(--aeva-rating-size-sm);
      height: var(--aeva-rating-size-sm);
    }

    .size-md .star svg {
      width: var(--aeva-rating-size-md);
      height: var(--aeva-rating-size-md);
    }

    .size-lg .star svg {
      width: var(--aeva-rating-size-lg);
      height: var(--aeva-rating-size-lg);
    }

    /* Interactive mode */
    .interactive .star {
      cursor: pointer;
    }

    .interactive .star:hover {
      transform: scale(1.1);
    }

    /* Star fill colors */
    .star-empty {
      color: var(--aeva-rating-empty-color);
    }

    .star-filled {
      color: var(--aeva-rating-color);
    }

    .star-half {
      position: relative;
    }

    .star-half .star-bg {
      color: var(--aeva-rating-empty-color);
    }

    .star-half .star-fg {
      position: absolute;
      top: 0;
      left: 0;
      color: var(--aeva-rating-color);
      overflow: hidden;
      width: 50%;
    }

    /* Hover effect for interactive mode */
    .interactive .star:hover,
    .interactive .star.hover {
      color: var(--aeva-rating-hover-color);
    }

    /* Label styling */
    .rating-label {
      margin-left: 8px;
      font-size: 14px;
      color: #6b7280;
      font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }
  `;

  /**
   * Current rating value (0-5, supports decimals for half stars)
   */
  @property({ type: Number })
  value = 0;

  /**
   * Maximum rating value
   */
  @property({ type: Number })
  max = 5;

  /**
   * Size variant
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the rating is interactive (user can change it)
   */
  @property({ type: Boolean })
  interactive = false;

  /**
   * Whether to show the numeric label
   */
  @property({ type: Boolean, attribute: 'show-label' })
  showLabel = false;

  /**
   * Whether to allow half stars
   */
  @property({ type: Boolean, attribute: 'allow-half' })
  allowHalf = true;

  @state()
  private hoverValue = 0;

  private renderStar(index: number) {
    const starValue = index + 1;
    const currentValue = this.hoverValue || this.value;

    let starType: 'empty' | 'half' | 'filled' = 'empty';

    if (currentValue >= starValue) {
      starType = 'filled';
    } else if (this.allowHalf && currentValue >= starValue - 0.5) {
      starType = 'half';
    }

    const starPath =
      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

    if (starType === 'half') {
      return html`
        <div
          class="star star-half ${this.hoverValue >= starValue ? 'hover' : ''}"
          @click=${() => this.handleStarClick(starValue)}
          @mouseenter=${() => this.handleStarHover(starValue)}
          @mouseleave=${() => this.handleStarLeave()}
        >
          <svg class="star-bg" viewBox="0 0 24 24" fill="currentColor">
            <path d="${starPath}" />
          </svg>
          <svg class="star-fg" viewBox="0 0 24 24" fill="currentColor">
            <path d="${starPath}" />
          </svg>
        </div>
      `;
    }

    return html`
      <div
        class="star ${starType === 'filled' ? 'star-filled' : 'star-empty'} ${this.hoverValue >=
        starValue
          ? 'hover'
          : ''}"
        @click=${() => this.handleStarClick(starValue)}
        @mouseenter=${() => this.handleStarHover(starValue)}
        @mouseleave=${() => this.handleStarLeave()}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="${starPath}" />
        </svg>
      </div>
    `;
  }

  private handleStarClick(value: number) {
    if (!this.interactive) return;

    // If clicking the same star, allow half star on second click
    if (this.allowHalf && this.value === value) {
      this.value = value - 0.5;
    } else {
      this.value = value;
    }

    this.dispatchEvent(
      new CustomEvent('rating-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleStarHover(value: number) {
    if (!this.interactive) return;
    this.hoverValue = value;
  }

  private handleStarLeave() {
    if (!this.interactive) return;
    this.hoverValue = 0;
  }

  render() {
    const classes = ['rating-container', `size-${this.size}`, this.interactive ? 'interactive' : '']
      .filter(Boolean)
      .join(' ');

    const stars = Array.from({ length: this.max }, (_, i) => this.renderStar(i));

    return html`
      <div part="container" class="${classes}">
        ${stars}
        ${this.showLabel ? html`<span class="rating-label">${this.value.toFixed(1)}</span>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-rating': AevaRating;
  }
}
