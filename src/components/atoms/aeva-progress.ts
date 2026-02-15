import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * A flexible progress component with circular and horizontal variants.
 * Supports both finite (controlled progress) and infinite (loading animation) modes.
 *
 * @slot - Optional label content displayed with the progress
 *
 * @csspart container - The container element
 * @csspart track - The background track element
 * @csspart bar - The progress bar element (horizontal only)
 * @csspart svg - The SVG element (circular only)
 * @csspart circle-bg - The background circle (circular only)
 * @csspart circle-progress - The progress circle (circular only)
 * @csspart label - The label element
 *
 * @cssprop --aeva-progress-color - Color of the progress indicator
 * @cssprop --aeva-progress-bg - Background color of the track
 * @cssprop --aeva-progress-thickness - Thickness of the progress bar/stroke
 * @cssprop --aeva-progress-border-radius - Border radius for horizontal progress
 * @cssprop --aeva-progress-size-sm - Size for small variant
 * @cssprop --aeva-progress-size-md - Size for medium variant
 * @cssprop --aeva-progress-size-lg - Size for large variant
 * @cssprop --aeva-progress-animation-duration - Duration of infinite animation
 * @cssprop --aeva-progress-label-color - Color of the label text
 * @cssprop --aeva-progress-label-font-size - Font size of the label
 */
@customElement('aeva-progress')
export class AevaProgress extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    /* Horizontal Progress */
    .horizontal-container {
      width: 100%;
    }

    .horizontal-track {
      width: 100%;
      height: var(--aeva-progress-thickness);
      background-color: var(--aeva-progress-bg);
      border-radius: var(--aeva-progress-border-radius);
      position: relative;
    }

    .horizontal-bar {
      height: 100%;
      background-color: var(--aeva-progress-color);
      border-radius: var(--aeva-progress-border-radius);
      transition: width 0.3s ease-in-out;
    }

    /* Horizontal Infinite Animation */
    .horizontal-bar.infinite {
      width: 30%;
      animation: horizontal-infinite var(--aeva-progress-animation-duration)
        ease-in-out infinite;
    }

    @keyframes horizontal-infinite {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(350%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    /* Circular Progress */
    .circular-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .circular-container.size-sm {
      width: var(--aeva-progress-size-sm);
      height: var(--aeva-progress-size-sm);
    }

    .circular-container.size-md {
      width: var(--aeva-progress-size-md);
      height: var(--aeva-progress-size-md);
    }

    .circular-container.size-lg {
      width: var(--aeva-progress-size-lg);
      height: var(--aeva-progress-size-lg);
    }

    .circular-svg {
      transform: rotate(-90deg);
      width: 100%;
      height: 100%;
    }

    .circle-bg {
      fill: none;
      stroke: var(--aeva-progress-bg);
      stroke-width: var(--aeva-progress-thickness);
    }

    .circle-progress {
      fill: none;
      stroke: var(--aeva-progress-color);
      stroke-width: var(--aeva-progress-thickness);
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease-in-out;
    }

    /* Circular Infinite Animation */
    .circle-progress.infinite {
      animation: circular-infinite var(--aeva-progress-animation-duration)
        linear infinite;
      transform-origin: center;
    }

    @keyframes circular-infinite {
      0% {
        stroke-dasharray: 1, 300;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 150, 300;
        stroke-dashoffset: -50;
      }
      100% {
        stroke-dasharray: 1, 300;
        stroke-dashoffset: -300;
      }
    }

    .circular-svg.infinite {
      animation: circular-rotate var(--aeva-progress-animation-duration)
        linear infinite;
    }

    @keyframes circular-rotate {
      100% {
        transform: rotate(270deg);
      }
    }

    /* Label */
    .label {
      color: var(--aeva-progress-label-color);
      font-size: var(--aeva-progress-label-font-size);
      font-weight: 500;
      text-align: center;
    }

    /* Percentage Display for Circular */
    .percentage {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: calc(var(--aeva-progress-size-md) * 0.2);
      font-weight: 600;
      color: var(--aeva-progress-label-color);
    }

    .size-sm .percentage {
      font-size: calc(var(--aeva-progress-size-sm) * 0.2);
    }

    .size-lg .percentage {
      font-size: calc(var(--aeva-progress-size-lg) * 0.2);
    }

    /* Horizontal Sizes */
    .horizontal-track.size-sm {
      height: 4px;
    }

    .horizontal-track.size-md {
      height: 8px;
    }

    .horizontal-track.size-lg {
      height: 12px;
    }
  `;

  /**
   * Shape of the progress indicator
   */
  @property({ type: String, reflect: true })
  shape: 'circular' | 'horizontal' = 'horizontal';

  /**
   * Mode of the progress indicator
   */
  @property({ type: String, reflect: true })
  mode: 'finite' | 'infinite' = 'finite';

  /**
   * Current progress value (used in finite mode)
   */
  @property({ type: Number })
  progress = 0;

  /**
   * Minimum value for progress
   */
  @property({ type: Number })
  min = 0;

  /**
   * Maximum value for progress
   */
  @property({ type: Number })
  max = 100;

  /**
   * Size variant
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Optional label for accessibility
   */
  @property({ type: String })
  label = '';

  /**
   * Show percentage text (circular only)
   */
  @property({ type: Boolean, attribute: 'show-percentage' })
  showPercentage = true;

  /**
   * Calculate the percentage based on current progress
   */
  private get percentage(): number {
    if (this.max === this.min) return 0;
    const clampedProgress = Math.max(
      this.min,
      Math.min(this.max, this.progress)
    );
    return ((clampedProgress - this.min) / (this.max - this.min)) * 100;
  }

  /**
   * Calculate stroke-dasharray and stroke-dashoffset for circular progress
   */
  private getCircularProgress() {
    const radius = 50 - parseFloat(getComputedStyle(this).getPropertyValue('--aeva-progress-thickness') || '8') / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this.percentage / 100) * circumference;

    return {
      radius,
      circumference,
      offset,
    };
  }

  private renderHorizontal() {
    const classes = {
      'horizontal-track': true,
      [`size-${this.size}`]: true,
    };

    const barClasses = {
      'horizontal-bar': true,
      infinite: this.mode === 'infinite',
    };

    const barStyle =
      this.mode === 'finite' ? `width: ${this.percentage}%` : '';

    return html`
      <div class="horizontal-container">
        <div part="track" class="${classMap(classes)}">
          <div
            part="bar"
            class="${classMap(barClasses)}"
            style="${barStyle}"
          ></div>
        </div>
      </div>
    `;
  }

  private renderCircular() {
    const { radius, circumference, offset } = this.getCircularProgress();

    const containerClasses = {
      'circular-container': true,
      [`size-${this.size}`]: true,
    };

    const svgClasses = {
      'circular-svg': true,
      infinite: this.mode === 'infinite',
    };

    const progressClasses = {
      'circle-progress': true,
      infinite: this.mode === 'infinite',
    };

    const progressStyle =
      this.mode === 'finite'
        ? `stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset}`
        : '';

    return html`
      <div part="container" class="${classMap(containerClasses)}">
        <svg part="svg" class="${classMap(svgClasses)}" viewBox="0 0 100 100">
          <circle
            part="circle-bg"
            class="circle-bg"
            cx="50"
            cy="50"
            r="${radius}"
          ></circle>
          <circle
            part="circle-progress"
            class="${classMap(progressClasses)}"
            cx="50"
            cy="50"
            r="${radius}"
            style="${progressStyle}"
          ></circle>
        </svg>
        ${this.mode === 'finite' && this.showPercentage
        ? html`<div class="percentage">${Math.round(this.percentage)}%</div>`
        : ''}
      </div>
    `;
  }

  render() {
    const ariaValueNow = this.mode === 'finite' ? this.progress : undefined;
    const ariaValueMin = this.mode === 'finite' ? this.min : undefined;
    const ariaValueMax = this.mode === 'finite' ? this.max : undefined;

    return html`
      <div
        class="container"
        role="progressbar"
        aria-label="${this.label || 'Progress indicator'}"
        aria-valuenow="${ariaValueNow}"
        aria-valuemin="${ariaValueMin}"
        aria-valuemax="${ariaValueMax}"
        aria-valuetext="${this.mode === 'finite'
        ? `${Math.round(this.percentage)}%`
        : 'Loading'}"
      >
        ${this.shape === 'horizontal'
        ? this.renderHorizontal()
        : this.renderCircular()}
        ${this.label
        ? html`<div part="label" class="label">${this.label}</div>`
        : ''}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-progress': AevaProgress;
  }
}
