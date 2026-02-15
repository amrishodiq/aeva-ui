import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A tooltip component that displays contextual information on hover/focus.
 * Features smart positioning that auto-adjusts near viewport edges.
 *
 * @slot - Default slot for the element that triggers the tooltip
 *
 * @cssprop --aeva-tooltip-bg - Background color (default: rgba(0, 0, 0, 0.9))
 * @cssprop --aeva-tooltip-color - Text color (default: #ffffff)
 * @cssprop --aeva-tooltip-border-radius - Border radius (default: 8px)
 * @cssprop --aeva-tooltip-padding - Padding (default: 0.5rem 0.75rem)
 * @cssprop --aeva-tooltip-font-size - Font size (default: 0.875rem)
 */
@customElement('aeva-tooltip')
export class AevaTooltip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger {
      display: inline-block;
      cursor: help;
    }

    .tooltip-container {
      position: fixed;
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .tooltip-container.visible {
      opacity: 1;
    }

    .tooltip {
      position: relative;
      background: var(--aeva-tooltip-bg);
      backdrop-filter: blur(var(--aeva-tooltip-blur));
      -webkit-backdrop-filter: blur(var(--aeva-tooltip-blur));
      color: var(--aeva-tooltip-color);
      padding: var(--aeva-tooltip-padding);
      border-radius: var(--aeva-tooltip-border-radius);
      font-size: var(--aeva-tooltip-font-size);
      line-height: 1.4;
      max-width: 250px;
      word-wrap: break-word;
      white-space: normal;
      box-shadow: var(--aeva-tooltip-shadow);
      
      animation: tooltipIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes tooltipIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Arrow */
    .arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--aeva-tooltip-bg);
      transform: rotate(45deg);
    }

    /* Arrow positions */
    .tooltip-container[data-position="top"] .arrow {
      bottom: -4px;
      left: 50%;
      margin-left: -4px;
    }

    .tooltip-container[data-position="bottom"] .arrow {
      top: -4px;
      left: 50%;
      margin-left: -4px;
    }

    .tooltip-container[data-position="left"] .arrow {
      right: -4px;
      top: 50%;
      margin-top: -4px;
    }

    .tooltip-container[data-position="right"] .arrow {
      left: -4px;
      top: 50%;
      margin-top: -4px;
    }
  `;

  @property({ type: String })
  content = '';

  @property({ type: String })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @property({ type: Number })
  delay = 200;

  @state()
  private visible = false;

  @state()
  private tooltipX = 0;

  @state()
  private tooltipY = 0;

  @state()
  private actualPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private showTimer?: number;
  private hideTimer?: number;
  private triggerElement?: HTMLElement;
  private tooltipElement?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', this.handleMouseEnter);
    this.addEventListener('mouseleave', this.handleMouseLeave);
    this.addEventListener('focus', this.handleFocus, true);
    this.addEventListener('blur', this.handleBlur, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this.handleMouseEnter);
    this.removeEventListener('mouseleave', this.handleMouseLeave);
    this.removeEventListener('focus', this.handleFocus, true);
    this.removeEventListener('blur', this.handleBlur, true);
    this.clearTimers();
  }

  private clearTimers() {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }

  private handleMouseEnter = () => {
    this.clearTimers();
    this.showTimer = window.setTimeout(() => {
      this.show();
    }, this.delay);
  };

  private handleMouseLeave = () => {
    this.clearTimers();
    this.hide();
  };

  private handleFocus = () => {
    this.clearTimers();
    this.showTimer = window.setTimeout(() => {
      this.show();
    }, this.delay);
  };

  private handleBlur = () => {
    this.clearTimers();
    this.hide();
  };

  private show() {
    this.updateComplete.then(() => {
      this.triggerElement = this.shadowRoot?.querySelector('.trigger') as HTMLElement;
      this.tooltipElement = this.shadowRoot?.querySelector('.tooltip') as HTMLElement;

      if (!this.triggerElement || !this.tooltipElement) return;

      const triggerRect = this.triggerElement.getBoundingClientRect();
      const tooltipRect = this.tooltipElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const gap = 8; // Gap between trigger and tooltip

      let position = this.position;
      let x = 0;
      let y = 0;

      // Calculate position with smart adjustment
      switch (position) {
        case 'top':
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.top - tooltipRect.height - gap;

          // If tooltip goes above viewport, show below
          if (y < 0) {
            position = 'bottom';
            y = triggerRect.bottom + gap;
          }
          break;

        case 'bottom':
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.bottom + gap;

          // If tooltip goes below viewport, show above
          if (y + tooltipRect.height > viewportHeight) {
            position = 'top';
            y = triggerRect.top - tooltipRect.height - gap;
          }
          break;

        case 'left':
          x = triggerRect.left - tooltipRect.width - gap;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;

          // If tooltip goes left of viewport, show right
          if (x < 0) {
            position = 'right';
            x = triggerRect.right + gap;
          }
          break;

        case 'right':
          x = triggerRect.right + gap;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;

          // If tooltip goes right of viewport, show left
          if (x + tooltipRect.width > viewportWidth) {
            position = 'left';
            x = triggerRect.left - tooltipRect.width - gap;
          }
          break;
      }

      // Adjust horizontal position if tooltip goes off screen
      if (x < 8) x = 8;
      if (x + tooltipRect.width > viewportWidth - 8) {
        x = viewportWidth - tooltipRect.width - 8;
      }

      // Adjust vertical position if tooltip goes off screen
      if (y < 8) y = 8;
      if (y + tooltipRect.height > viewportHeight - 8) {
        y = viewportHeight - tooltipRect.height - 8;
      }

      this.tooltipX = x;
      this.tooltipY = y;
      this.actualPosition = position;
      this.visible = true;
    });
  }

  private hide() {
    this.visible = false;
  }

  render() {
    return html`
      <div class="trigger" role="button" tabindex="0">
        <slot></slot>
      </div>
      
      <div 
        class="tooltip-container ${this.visible ? 'visible' : ''}"
        data-position="${this.actualPosition}"
        style="left: ${this.tooltipX}px; top: ${this.tooltipY}px;"
        role="tooltip"
        aria-hidden="${!this.visible}"
      >
        <div class="tooltip">
          ${this.content}
          <div class="arrow"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-tooltip': AevaTooltip;
  }
}
