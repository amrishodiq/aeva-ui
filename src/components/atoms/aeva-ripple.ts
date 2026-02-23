import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { accessibilityStyles } from '../../styles/accessibility';

/**
 * A reusable ripple effect component that can be added to any position:relative element.
 * It listens for pointer events on its parent and creates expanding ripple circles.
 *
 * @cssprop --aeva-ripple-color - Color of the ripple (default: currentColor)
 * @cssprop --aeva-ripple-duration - Duration of the ripple animation (default: 600ms)
 * @cssprop --aeva-ripple-opacity - Maximum opacity of the ripple (default: 0.15)
 */
@customElement('aeva-ripple')
export class AevaRipple extends LitElement {
  static styles = [
    accessibilityStyles,
    css`
      :host {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        pointer-events: none;
        border-radius: inherit;
        z-index: 0;
      }

      .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: var(--aeva-ripple-color, currentColor);
        opacity: var(--aeva-ripple-opacity, 0.15);
        transform: scale(0);
        animation: ripple-animation var(--aeva-ripple-duration, 600ms) cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
      }

      @keyframes ripple-animation {
        from {
          transform: scale(0);
          opacity: var(--aeva-ripple-opacity, 0.15);
        }
        to {
          transform: scale(2.5);
          opacity: 0;
        }
      }
    `,
  ];

  /**
   * The duration of the ripple animation in milliseconds
   */
  @property({ type: Number })
  duration = 600;

  /**
   * Opacity of the ripple
   */
  @property({ type: Number })
  opacity = 0.15;

  private parent: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.parent = this.parentElement;
    if (this.parent) {
      this.parent.addEventListener('mousedown', this.handlePointerDown);
      this.parent.addEventListener('touchstart', this.handlePointerDown, { passive: true });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.parent) {
      this.parent.removeEventListener('mousedown', this.handlePointerDown);
      this.parent.removeEventListener('touchstart', this.handlePointerDown);
    }
  }

  private handlePointerDown = (e: MouseEvent | TouchEvent) => {
    if (!this.shadowRoot) return;

    // Get coordinates relative to parent
    const rect = this.parent!.getBoundingClientRect();
    let x, y;

    if (e instanceof MouseEvent) {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }

    // Determine the size of the ripple
    const size = Math.max(rect.width, rect.height);

    // Create the ripple element
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;

    this.shadowRoot.appendChild(ripple);

    // Remove the ripple element after animation
    setTimeout(() => {
      ripple.remove();
    }, this.duration);
  };

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-ripple': AevaRipple;
  }
}
