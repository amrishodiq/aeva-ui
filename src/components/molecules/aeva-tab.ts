import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { accessibilityStyles } from '../../styles/accessibility';
import { SpringController } from '../../controllers/spring-controller';
import '../atoms/aeva-tab-item';

/**
 * A tab container component with morphing background animation.
 * Manages multiple tab items and handles selection state.
 *
 * @slot - Default slot for aeva-tab-item elements
 *
 * @fires tab-changed - Fired when active tab changes
 * @event {CustomEvent<{previousIndex: number, currentIndex: number, label: string}>} tab-changed
 *
 * @csspart container - The tab container element
 * @csspart background - The animated background element
 *
 * @cssprop --aeva-tab-bg - Background color of the tab container
 * @cssprop --aeva-tab-active-bg - Background color of the active tab
 * @cssprop --aeva-tab-padding - Padding around the tab container
 * @cssprop --aeva-tab-gap - Gap between tab items
 * @cssprop --aeva-tab-border-radius - Border radius of the container
 * @cssprop --aeva-tab-transition-duration - Duration of the morphing animation
 * @cssprop --aeva-tab-transition-timing - Timing function for the animation
 */
@customElement('aeva-tab')
export class AevaTab extends LitElement {
  static styles = [
    accessibilityStyles,
    css`
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .container {
        background: var(--aeva-tab-bg);
        border-radius: var(--aeva-tab-border-radius);
        padding: var(--aeva-tab-padding);
        display: inline-flex;
        gap: var(--aeva-tab-gap);
        position: relative;
        isolation: isolate;
        max-width: 100%;

        /* Mobile scrolling support */
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;

        /* Hide scrollbar but keep functionality */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */

        /* Scroll snap for better UX - but don't snap too aggressively */
        scroll-snap-type: x proximity;
        scroll-padding-inline: var(--aeva-tab-gap);
      }

      /* Hide scrollbar for Chrome/Safari */
      .container::-webkit-scrollbar {
        display: none;
      }

      .background {
        position: absolute;
        background: var(--aeva-tab-active-bg);
        border-radius: calc(var(--aeva-tab-border-radius) - var(--aeva-tab-padding));
        /* transitions removed - handled by springs */
        pointer-events: none;
        z-index: 0;
        will-change: left, width;
      }

      /* Morphing handled by separate springs for position and scale */

      ::slotted(aeva-tab-item) {
        position: relative;
        z-index: 1;
        flex-shrink: 0; /* Prevent tabs from shrinking on mobile */

        /* Remove tap highlight on mobile */
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }

      /* Add spacing for first and last items to prevent edge touching */
      ::slotted(aeva-tab-item:first-child) {
        margin-left: var(--aeva-tab-gap);
        scroll-snap-align: end;
      }

      ::slotted(aeva-tab-item:last-child) {
        margin-right: var(--aeva-tab-gap);
        scroll-snap-align: start;
      }

      /* Middle items use center snap */
      ::slotted(aeva-tab-item:not(:first-child):not(:last-child)) {
        scroll-snap-align: center;
      }
    `,
  ];

  /**
   * Index of the currently active tab
   */
  @property({ type: Number, reflect: true })
  active = 0;

  @state()
  private tabItems: HTMLElement[] = [];

  @state()
  private backgroundStyle = {
    top: '0px',
    height: '0px',
  };

  private _xSpring = new SpringController(
    this,
    {
      stiffness: 0.1,
      damping: 0.7,
      mass: 1.0,
    },
    0
  );

  private _widthSpring = new SpringController(
    this,
    {
      stiffness: 0.1,
      damping: 0.7,
      mass: 1.0,
    },
    0
  );

  private scrollTimeout: number | null = null;

  @query('.container')
  private container!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('tab-item-click', this.handleTabItemClick as EventListener);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  async firstUpdated() {
    this.updateTabItems();

    // Wait for all items to complete their initial update
    await Promise.all(this.tabItems.map((item: any) => item.updateComplete));

    // Initial position
    this.updateBackgroundPosition(false);

    // Add scroll listener to update background position after scrolling stops
    this.container?.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

    // Secondary settlement after fonts and paint to ensure accuracy
    document.fonts.ready.then(() => {
      this.updateBackgroundPosition(false);
    });

    // Final safety check after a short delay
    setTimeout(() => {
      this.updateBackgroundPosition(false);
    }, 100);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('tab-item-click', this.handleTabItemClick as EventListener);
    this.removeEventListener('keydown', this.handleKeyDown);
    this.container?.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    if (this.scrollTimeout) {
      cancelAnimationFrame(this.scrollTimeout);
    }
  }

  private handleScroll = () => {
    // Cancel any pending update
    if (this.scrollTimeout) {
      cancelAnimationFrame(this.scrollTimeout);
    }

    // Schedule update for next frame
    this.scrollTimeout = requestAnimationFrame(() => {
      this.updateBackgroundPosition(false);
      this.scrollTimeout = null;
    });
  };

  private handleResize = () => {
    this.updateBackgroundPosition(false);
  };

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('active')) {
      this.updateBackgroundPosition(true);
    }
  }

  private handleSlotChange() {
    this.updateTabItems();
    this.updateBackgroundPosition(false);
  }

  private updateTabItems() {
    const slot = this.shadowRoot?.querySelector('slot');
    const assignedElements = slot?.assignedElements() || [];

    this.tabItems = assignedElements.filter(
      (el) => el.tagName.toLowerCase() === 'aeva-tab-item'
    ) as HTMLElement[];

    // Update tab items with their index and active state
    this.tabItems.forEach((item: any, index) => {
      item.index = index;
      item.active = index === this.active;
    });
  }

  private handleTabItemClick(e: CustomEvent) {
    const { index, label } = e.detail;

    // Don't do anything if clicking the already active tab
    if (index === this.active) return;

    const previousIndex = this.active;
    this.active = index;

    // Update active state on tab items
    this.tabItems.forEach((item: any, i) => {
      item.active = i === this.active;
    });

    // Dispatch change event
    this.dispatchEvent(
      new CustomEvent('tab-changed', {
        detail: {
          previousIndex,
          currentIndex: index,
          label,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const enabledTabs = this.tabItems.filter((item: any) => !item.disabled);
    const currentIndex = enabledTabs.findIndex((item: any) => item.active);

    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
        break;
      case 'ArrowRight':
        e.preventDefault();
        newIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = enabledTabs.length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      const targetTab = enabledTabs[newIndex] as any;
      targetTab.shadowRoot?.querySelector('button')?.focus();

      // Trigger click on the new tab
      const actualIndex = this.tabItems.indexOf(targetTab);
      this.handleTabItemClick(
        new CustomEvent('tab-item-click', {
          detail: { index: actualIndex, label: targetTab.label },
        })
      );
    }
  };

  private updateBackgroundPosition(animate: boolean) {
    // Wait for next frame to ensure DOM is updated
    requestAnimationFrame(() => {
      const activeItem = this.tabItems[this.active];
      if (!activeItem || !this.container) return;

      const containerRect = this.container.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      // Calculate position relative to container, accounting for scroll
      // We need the position relative to the container's content area, not viewport
      const left = itemRect.left - containerRect.left + this.container.scrollLeft;
      const top = itemRect.top - containerRect.top + this.container.scrollTop;
      const width = itemRect.width;
      const height = itemRect.height;

      this._xSpring.setTarget(left);
      this._widthSpring.setTarget(width);

      this.backgroundStyle = {
        top: `${top}px`,
        height: `${height}px`,
      };

      // Scroll active tab into view if not fully visible
      if (animate) {
        this.scrollTabIntoView(activeItem);
      }

      this.requestUpdate();
    });
  }

  private scrollTabIntoView(tabItem: HTMLElement) {
    if (!this.container) return;

    const containerRect = this.container.getBoundingClientRect();
    const itemRect = tabItem.getBoundingClientRect();

    // Calculate if item is fully visible
    const isFullyVisible =
      itemRect.left >= containerRect.left && itemRect.right <= containerRect.right;

    if (!isFullyVisible) {
      // Scroll with some padding for better UX
      const padding = 20;
      let targetScrollLeft = this.container.scrollLeft;

      if (itemRect.left < containerRect.left) {
        // Item is cut off on the left, scroll left
        targetScrollLeft -= containerRect.left - itemRect.left + padding;
      } else if (itemRect.right > containerRect.right) {
        // Item is cut off on the right, scroll right
        targetScrollLeft += itemRect.right - containerRect.right + padding;
      }

      // Use scrollTo with smooth behavior for programmatic scrolling
      this.container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  }

  render() {
    return html`
      <div class="container" part="container" role="tablist">
        <div
          class="background"
          part="background"
          style="${styleMap({
            left: `${this._xSpring.value}px`,
            top: this.backgroundStyle.top,
            width: `${this._widthSpring.value}px`,
            height: this.backgroundStyle.height,
          })}"
        ></div>
        <slot @slotchange="${this.handleSlotChange}"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-tab': AevaTab;
  }
}
