import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A responsive sidebar component for navigation.
 * Adapts to different viewport sizes:
 * - Mobile (<768px): Hidden drawer
 * - Tablet (768px-1024px): Icon-only mode
 * - Desktop (>1024px): Full mode with icons and text
 *
 * @slot header - Sidebar header content (logo, title)
 * @slot - Default slot for navigation items (aeva-list)
 * @slot footer - Sidebar footer content (user profile, settings)
 *
 * @csspart sidebar - The main sidebar container
 * @csspart backdrop - The backdrop overlay (mobile only)
 *
 * @fires sidebar-toggle - Fired when sidebar opens/closes
 * @fires item-click - Fired when navigation item is clicked
 *
 * @cssprop --aeva-sidebar-bg - Background color
 * @cssprop --aeva-sidebar-width-sm - Small width (200px)
 * @cssprop --aeva-sidebar-width-md - Medium width (280px)
 * @cssprop --aeva-sidebar-width-lg - Large width (320px)
 * @cssprop --aeva-sidebar-icon-width - Icon-only width (72px)
 * @cssprop --aeva-sidebar-transition - Transition timing
 */
@customElement('aeva-sidebar')
export class AevaSidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    /* Mobile: Hidden drawer */
    @media (max-width: 767px) {
      :host {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: -1; /* Start hidden behind content */
        width: var(--aeva-sidebar-width-md);
        max-width: 85vw;
        transition: z-index 0s var(--aeva-sidebar-transition); /* Delay z-index change */
      }

      :host([open]) {
        z-index: var(--aeva-sidebar-z-index); /* Bring to front when open */
        transition: z-index 0s 0s; /* Immediate z-index change when opening */
      }

      .sidebar {
        transform: translateX(-100%);
        transition: transform var(--aeva-sidebar-transition);
        box-shadow: var(--aeva-sidebar-shadow);
      }

      :host([open]) .sidebar {
        transform: translateX(0);
      }

      .backdrop {
        position: fixed;
        inset: 0;
        background: var(--aeva-sidebar-backdrop-bg);
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--aeva-sidebar-transition);
        z-index: -1;
      }

      :host([open]) .backdrop {
        opacity: 1;
        pointer-events: auto;
      }
    }

    /* Tablet: Icon-only mode */
    @media (min-width: 768px) and (max-width: 1023px) {
      :host {
        position: relative;
        width: var(--aeva-sidebar-icon-width);
        height: 100%;
        z-index: 1000 !important;
      }

      .backdrop {
        display: none;
      }

      /* Hide text in icon-only mode */
      :host {
        --list-item-text-display: none;
        --list-item-justify: center;
        --list-item-padding: 0.75rem;
      }
    }

    /* Desktop: Full mode */
    @media (min-width: 1024px) {
      :host {
        position: relative;
        height: 100%;
        z-index: 1000 !important;
      }

      :host([width="sm"]) {
        width: var(--aeva-sidebar-width-sm);
      }

      :host([width="md"]) {
        width: var(--aeva-sidebar-width-md);
      }

      :host([width="lg"]) {
        width: var(--aeva-sidebar-width-lg);
      }

      .backdrop {
        display: none;
      }
    }

    /* Right position */
    :host([position="right"]) {
      left: auto;
      right: 0;
    }

    @media (max-width: 767px) {
      :host([position="right"]) .sidebar {
        transform: translateX(100%);
      }

      :host([position="right"][open]) .sidebar {
        transform: translateX(0);
      }
    }

    /* Sidebar container */
    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--aeva-sidebar-bg);
      border-right: var(--aeva-sidebar-border);
      overflow: hidden;
      box-sizing: border-box;
      border-top-right-radius: 24px;
      border-bottom-right-radius: 24px;
    }

    :host([position="right"]) .sidebar {
      border-right: none;
      border-left: var(--aeva-sidebar-border);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: 24px;
      border-bottom-left-radius: 24px;
    }

    /* Glassmorphism */
    :host([glassmorphism]) .sidebar {
      background: var(--aeva-sidebar-glassmorphism-bg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-color: var(--aeva-sidebar-glassmorphism-border);
    }

    /* Header */
    .header {
      flex-shrink: 0;
    }
    
    :host([has-header]) .header {
      padding: 1.5rem 1rem;
      border-bottom: var(--aeva-sidebar-border);
    }

    :host(:not([has-header])) .header {
      display: none;
    }

    /* Content */
    .content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }

    /* Footer */
    .footer {
      flex-shrink: 0;
    }

    :host([has-footer]) .footer {
      padding: 1rem;
      border-top: var(--aeva-sidebar-border);
    }

    :host(:not([has-footer])) .footer {
      display: none;
    }

    /* Tablet mode: reduce padding and hide header */
    @media (min-width: 768px) and (max-width: 1023px) {
      .header {
        display: none;
      }

      .footer {
        padding: 1rem 0.5rem;
        text-align: center;
      }

      .content {
        padding: 0;
        margin-top: 0.75rem;
      }
    }

    /* Scrollbar styling */
    .content::-webkit-scrollbar {
      width: 6px;
    }

    .content::-webkit-scrollbar-track {
      background: transparent;
    }

    .content::-webkit-scrollbar-thumb {
      background: var(--aeva-sidebar-scrollbar-thumb);
      border-radius: 3px;
    }

    .content::-webkit-scrollbar-thumb:hover {
      background: var(--aeva-sidebar-scrollbar-thumb-hover);
    }
  `;

  /**
   * Position of the sidebar
   */
  @property({ type: String, reflect: true })
  position: 'left' | 'right' = 'left';

  /**
   * Width variant (desktop only)
   */
  @property({ type: String, reflect: true })
  width: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether the sidebar is open (mobile only)
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether to apply glassmorphism effect
   */
  @property({ type: Boolean, reflect: true })
  glassmorphism = false;

  /**
   * Whether to close sidebar on navigation (mobile only)
   */
  @property({ type: Boolean, attribute: 'close-on-navigate' })
  closeOnNavigate = true;

  /**
   * Current viewport mode
   */
  @state()
  private viewport: 'mobile' | 'tablet' | 'desktop' = 'desktop';

  /**
   * Whether header slot has content
   */
  @state()
  private hasHeader = false;

  /**
   * Whether footer slot has content
   */
  @state()
  private hasFooter = false;

  connectedCallback() {
    super.connectedCallback();
    this.updateViewport();
    this.checkSlots();
    window.addEventListener('resize', this.handleResize);
    this.addEventListener('click', this.handleContentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
    this.removeEventListener('click', this.handleContentClick);
  }

  private handleResize = () => {
    this.updateViewport();
  };

  private updateViewport() {
    const width = window.innerWidth;
    const oldViewport = this.viewport;

    if (width < 768) {
      this.viewport = 'mobile';
    } else if (width < 1024) {
      this.viewport = 'tablet';
    } else {
      this.viewport = 'desktop';
    }

    // Close mobile drawer when switching to tablet/desktop
    if (oldViewport === 'mobile' && this.viewport !== 'mobile') {
      this.open = false;
    }

    // Apply icon-only mode to list items when viewport changes
    if (oldViewport !== this.viewport) {
      this.updateListItems();
    }
  }

  private updateListItems() {
    // Apply icon-only to all list items ONLY in tablet mode
    // Mobile drawer should show full items (icon + text)
    const listItems = this.querySelectorAll('aeva-list-item');
    listItems.forEach((item) => {
      if (this.viewport === 'tablet') {
        item.setAttribute('icon-only', '');
      } else {
        item.removeAttribute('icon-only');
      }
    });
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    // Update list items when viewport changes
    if (changedProperties.has('viewport')) {
      this.updateListItems();
    }

    // Handle z-index management for mobile drawer
    if (changedProperties.has('open')) {
      this.handleZIndexTransition();
    }
  }

  firstUpdated() {
    // Ensure list items are updated on initial render
    this.updateListItems();
    this.checkSlots();
  }

  private checkSlots() {
    // Check header slot
    const headerSlot = this.shadowRoot?.querySelector('slot[name="header"]') as HTMLSlotElement;
    if (headerSlot) {
      const headerNodes = headerSlot.assignedNodes({ flatten: true });
      this.hasHeader = headerNodes.some(node =>
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      );
    }

    // Check footer slot
    const footerSlot = this.shadowRoot?.querySelector('slot[name="footer"]') as HTMLSlotElement;
    if (footerSlot) {
      const footerNodes = footerSlot.assignedNodes({ flatten: true });
      this.hasFooter = footerNodes.some(node =>
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      );
    }

    // Update attributes for CSS
    if (this.hasHeader) {
      this.setAttribute('has-header', '');
    } else {
      this.removeAttribute('has-header');
    }

    if (this.hasFooter) {
      this.setAttribute('has-footer', '');
    } else {
      this.removeAttribute('has-footer');
    }
  }

  private handleZIndexTransition() {
    // Only manage z-index in mobile viewport
    if (this.viewport !== 'mobile') return;

    if (this.open) {
      // When opening, immediately set z-index to bring sidebar to front
      this.style.zIndex = '1000';
    } else {
      // When closing, wait for animation to complete before hiding
      const transitionDuration = 300; // Match --aeva-sidebar-transition (0.3s)
      setTimeout(() => {
        if (!this.open) { // Double-check it's still closed
          this.style.zIndex = '-1';
        }
      }, transitionDuration);
    }
  }

  private handleBackdropClick = () => {
    if (this.viewport === 'mobile') {
      this.toggle();
    }
  };

  private handleContentClick = (e: Event) => {
    // Close on navigation item click (mobile only)
    if (this.viewport === 'mobile' && this.closeOnNavigate && this.open) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'AEVA-LIST-ITEM') {
        this.toggle();
      }
    }
  };

  /**
   * Toggle sidebar open/close
   */
  toggle() {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('sidebar-toggle', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="backdrop" part="backdrop" @click=${this.handleBackdropClick}></div>
      <div class="sidebar" part="sidebar">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-sidebar': AevaSidebar;
  }
}
