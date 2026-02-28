import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { accessibilityStyles } from '../../styles/accessibility.js';

/**
 * A skeleton component used as a placeholder while content is loading.
 *
 * @csspart skeleton - The main skeleton element
 *
 * @cssprop --aeva-skeleton-bg - Background color of the skeleton (default: rgba(150, 150, 150, 0.2))
 * @cssprop --aeva-skeleton-wave-color - Color of the wave animation (default: rgba(255, 255, 255, 0.4))
 * @cssprop --aeva-skeleton-border-radius - Border radius for text and rectangular shapes (default: 4px)
 * @cssprop --aeva-skeleton-animation-duration - Duration of the pulsing or wave animation (default: 1.5s)
 */
@customElement('aeva-skeleton')
export class AevaSkeleton extends LitElement {
  static styles = [
    accessibilityStyles,
    css`
      :host {
        display: inline-block;
        vertical-align: middle;
      }

      .skeleton {
        background-color: var(--aeva-skeleton-bg, rgba(150, 150, 150, 0.2));
        border-radius: var(--aeva-skeleton-border-radius, 4px);
        overflow: hidden;
        position: relative;
        z-index: 1; /* For wave animation context */
      }

      /* Shapes */
      .shape-text {
        height: 1em;
        width: 100%;
        margin-top: 0.25em;
        margin-bottom: 0.25em;
      }

      .shape-circular {
        border-radius: 50%;
      }

      .shape-rectangular {
        /* Relies on explicit width/height or flex layout */
        min-width: 1em;
        min-height: 1em;
      }

      /* Animations */
      .anim-pulse {
        animation: pulse var(--aeva-skeleton-animation-duration, 1.5s) ease-in-out infinite;
      }

      .anim-wave::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          var(--aeva-skeleton-wave-color, rgba(255, 255, 255, 0.4)),
          transparent
        );
        animation: wave var(--aeva-skeleton-animation-duration, 1.5s) infinite;
        z-index: 2;
      }

      .anim-none {
        /* No animation */
      }

      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes wave {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }

      /* High contrast & prefers-reduced-motion support */
      @media (prefers-reduced-motion: reduce) {
        .anim-pulse,
        .anim-wave::after {
          animation: none !important;
        }
        .anim-wave::after {
          display: none;
        }
        .skeleton {
          opacity: 0.8; /* Static faded state */
        }
      }
    `,
  ];

  /**
   * The shape of the skeleton.
   * Options: 'text', 'circular', 'rectangular'
   */
  @property({ type: String, reflect: true })
  shape: 'text' | 'circular' | 'rectangular' = 'text';

  /**
   * The animation type.
   * Options: 'pulse', 'wave', 'none'
   */
  @property({ type: String })
  animation: 'pulse' | 'wave' | 'none' = 'pulse';

  /**
   * Explicit width. Overrides the shape's default behavior if provided.
   * Useful for 'text' or 'rectangular' shapes.
   * Accepts any valid CSS width value (e.g., '100px', '50%', '3rem').
   */
  @property({ type: String })
  width?: string;

  /**
   * Explicit height. Overrides the shape's default behavior if provided.
   * Useful for 'rectangular' or 'circular' shapes.
   * Accepts any valid CSS height value.
   */
  @property({ type: String })
  height?: string;

  render() {
    const classes = {
      skeleton: true,
      [`shape-${this.shape}`]: true,
      [`anim-${this.animation}`]: true,
    };

    const styles: { [key: string]: string } = {};
    if (this.width) styles['width'] = this.width;
    if (this.height) styles['height'] = this.height;

    // For circular, if dimensions are provided, making sure width/height match if only one is specified could be a nice UX touch,
    // but standard CSS approach is to let the author specify both or use CSS aspect-ratio. For simplicity, apply inline styles as strictly provided.
    if (this.shape === 'circular' && this.width && !this.height) {
      styles['height'] = this.width;
    }
    if (this.shape === 'circular' && this.height && !this.width) {
      styles['width'] = this.height;
    }

    return html`
      <div
        part="skeleton"
        class="${classMap(classes)}"
        style="${styleMap(styles)}"
        aria-hidden="true"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-skeleton': AevaSkeleton;
  }
}
