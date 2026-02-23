import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { accessibilityStyles } from '../../styles/accessibility';

/**
 * A carousel component for displaying multiple items in a sliding view.
 * Supports navigation buttons, indicators, touch gestures, and auto-play.
 *
 * @slot - Default slot for carousel items
 *
 * @fires slide-change - Dispatched when the active slide changes
 *
 * @csspart container - The main carousel container
 * @csspart slides - The slides wrapper
 * @csspart slide - Individual slide element
 * @csspart nav-button - Navigation button
 * @csspart indicators - Indicators container
 * @csspart indicator - Individual indicator dot
 *
 * @cssprop --aeva-carousel-height - Height of the carousel (default: 400px)
 * @cssprop --aeva-carousel-nav-bg - Navigation button background (default: rgba(0, 0, 0, 0.5))
 * @cssprop --aeva-carousel-nav-color - Navigation button color (default: white)
 * @cssprop --aeva-carousel-indicator-color - Inactive indicator color (default: rgba(255, 255, 255, 0.5))
 * @cssprop --aeva-carousel-indicator-active-color - Active indicator color (default: white)
 * @cssprop --aeva-carousel-transition-duration - Slide transition duration (default: 300ms)
 */
@customElement('aeva-carousel')
export class AevaCarousel extends LitElement {
  static styles = [
    accessibilityStyles,
    css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: var(--aeva-carousel-height);
        overflow: hidden;
        border-radius: 12px;
      }

      .carousel-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .slides-wrapper {
        display: flex;
        height: 100%;
        transition: transform var(--aeva-carousel-transition-duration) ease-in-out;
        will-change: transform;
      }

      ::slotted(*) {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Navigation Buttons */
      .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 48px;
        height: 48px;
        background: var(--aeva-carousel-nav-bg);
        color: var(--aeva-carousel-nav-color);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        z-index: 10;
        backdrop-filter: blur(10px);
      }

      .nav-button:hover {
        background: var(--aeva-carousel-nav-hover-bg);
        transform: translateY(-50%) scale(1.1);
      }

      .nav-button:active {
        transform: translateY(-50%) scale(0.95);
      }

      .nav-button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .nav-button:disabled:hover {
        transform: translateY(-50%) scale(1);
      }

      .nav-button.prev {
        left: 16px;
      }

      .nav-button.next {
        right: 16px;
      }

      .nav-button svg {
        width: 24px;
        height: 24px;
      }

      /* Hide navigation when disabled */
      :host([hide-nav]) .nav-button {
        display: none;
      }

      /* Indicators */
      .indicators {
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 10;
      }

      .indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--aeva-carousel-indicator-color);
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
        padding: 0;
      }

      .indicator:hover {
        background: var(--aeva-carousel-indicator-hover-bg);
        transform: scale(1.2);
      }

      .indicator.active {
        background: var(--aeva-carousel-indicator-active-color);
        width: 24px;
        border-radius: 4px;
      }

      /* Hide indicators when disabled */
      :host([hide-indicators]) .indicators {
        display: none;
      }
    `,
  ];

  /**
   * Current active slide index
   */
  @property({ type: Number })
  activeIndex = 0;

  /**
   * Whether to hide navigation buttons
   */
  @property({ type: Boolean, attribute: 'hide-nav', reflect: true })
  hideNav = false;

  /**
   * Whether to hide indicators
   */
  @property({ type: Boolean, attribute: 'hide-indicators', reflect: true })
  hideIndicators = false;

  /**
   * Whether to enable auto-play
   */
  @property({ type: Boolean, attribute: 'auto-play' })
  autoPlay = false;

  /**
   * Auto-play interval in milliseconds
   */
  @property({ type: Number, attribute: 'auto-play-interval' })
  autoPlayInterval = 3000;

  /**
   * Whether to loop the carousel
   */
  @property({ type: Boolean })
  loop = true;

  @state()
  private slideCount = 0;

  @state()
  private touchStartX = 0;

  @state()
  private touchEndX = 0;

  @query('.slides-wrapper')
  private slidesWrapper!: HTMLElement;

  @query('slot')
  private slotElement!: HTMLSlotElement;

  private autoPlayTimer?: number;

  @state()
  private _isPausedInternally = false;

  private handleInteractionStart = () => {
    if (this.autoPlay) {
      this._isPausedInternally = true;
      this.stopAutoPlay();
    }
  };

  private handleInteractionEnd = () => {
    if (this.autoPlay && this._isPausedInternally) {
      this._isPausedInternally = false;
      this.startAutoPlay();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('touchstart', this.handleTouchStart);
    this.addEventListener('touchmove', this.handleTouchMove);
    this.addEventListener('touchend', this.handleTouchEnd);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('touchstart', this.handleTouchStart);
    this.removeEventListener('touchmove', this.handleTouchMove);
    this.removeEventListener('touchend', this.handleTouchEnd);
    this.stopAutoPlay();
  }

  firstUpdated() {
    this.updateSlideCount();
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('activeIndex')) {
      this.updateTransform();
      this.dispatchSlideChangeEvent();
    }

    if (changedProperties.has('autoPlay')) {
      if (this.autoPlay) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    }
  }

  private handleSlotChange = () => {
    this.updateSlideCount();
  };

  private updateSlideCount() {
    const assignedElements = this.slotElement?.assignedElements() || [];
    this.slideCount = assignedElements.length;
  }

  private updateTransform() {
    if (this.slidesWrapper) {
      const translateX = -this.activeIndex * 100;
      this.slidesWrapper.style.transform = `translateX(${translateX}%)`;
    }
  }

  private goToSlide(index: number) {
    if (index < 0 || index >= this.slideCount) return;
    this.activeIndex = index;
  }

  private nextSlide = () => {
    if (this.activeIndex < this.slideCount - 1) {
      this.activeIndex++;
    } else if (this.loop) {
      this.activeIndex = 0;
    }
  };

  private prevSlide = () => {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else if (this.loop) {
      this.activeIndex = this.slideCount - 1;
    }
  };

  private handleTouchStart = (e: TouchEvent) => {
    this.touchStartX = e.touches[0].clientX;
  };

  private handleTouchMove = (e: TouchEvent) => {
    this.touchEndX = e.touches[0].clientX;
  };

  private handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        this.nextSlide();
      } else {
        // Swipe right - previous slide
        this.prevSlide();
      }
    }

    this.touchStartX = 0;
    this.touchEndX = 0;
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.nextSlide();
    }
  };

  private startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  private dispatchSlideChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('slide-change', {
        detail: { activeIndex: this.activeIndex },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Navigate to a specific slide
   */
  public goTo(index: number) {
    this.goToSlide(index);
  }

  /**
   * Navigate to the next slide
   */
  public next() {
    this.nextSlide();
  }

  /**
   * Navigate to the previous slide
   */
  public prev() {
    this.prevSlide();
  }

  render() {
    const canGoPrev = this.loop || this.activeIndex > 0;
    const canGoNext = this.loop || this.activeIndex < this.slideCount - 1;

    return html`
      <div
        part="container"
        class="carousel-container"
        @keydown=${this.handleKeydown}
        @mouseenter=${this.handleInteractionStart}
        @mouseleave=${this.handleInteractionEnd}
        @focusin=${this.handleInteractionStart}
        @focusout=${this.handleInteractionEnd}
        tabindex="0"
        role="region"
        aria-label="Carousel"
      >
        <div part="slides" class="slides-wrapper">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>

        ${!this.hideNav
          ? html`
              <button
                part="nav-button"
                class="nav-button prev"
                @click=${this.prevSlide}
                ?disabled=${!canGoPrev}
                aria-label="Previous slide"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                part="nav-button"
                class="nav-button next"
                @click=${this.nextSlide}
                ?disabled=${!canGoNext}
                aria-label="Next slide"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            `
          : ''}
        ${!this.hideIndicators && this.slideCount > 1
          ? html`
              <div part="indicators" class="indicators">
                ${Array.from(
                  { length: this.slideCount },
                  (_, i) => html`
                    <button
                      part="indicator"
                      class="indicator ${i === this.activeIndex ? 'active' : ''}"
                      @click=${() => this.goToSlide(i)}
                      aria-label="Go to slide ${i + 1}"
                    ></button>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-carousel': AevaCarousel;
  }
}
