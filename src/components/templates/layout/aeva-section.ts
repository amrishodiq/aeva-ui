import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A flexible section layout component with header, body, and footer areas.
 * Can be used anywhere to organize content into three distinct sections.
 *
 * @slot header - Header content area
 * @slot - Default slot for body content (main content area)
 * @slot body - Explicit body content area (alternative to default slot)
 * @slot footer - Footer content area
 *
 * @csspart section - The main section container
 * @csspart header - The header section
 * @csspart body - The body section
 * @csspart footer - The footer section
 *
 * @cssprop --aeva-section-gap - Gap between sections (default: 0)
 * @cssprop --aeva-section-padding - Padding for the entire section (default: 0)
 * @cssprop --aeva-section-header-padding - Padding for header (default: 0)
 * @cssprop --aeva-section-body-padding - Padding for body (default: 0)
 * @cssprop --aeva-section-footer-padding - Padding for footer (default: 0)
 */
@customElement('aeva-section')
export class AevaSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    .section {
      display: flex;
      flex-direction: column;
      padding: var(--aeva-section-padding);
      gap: var(--aeva-section-gap);
      box-sizing: border-box;
      height: 100%;
    }

    .header {
      padding: var(--aeva-section-header-padding);
      flex-shrink: 0;
    }

    .body {
      padding: var(--aeva-section-body-padding);
      flex: 1;
      overflow: auto;
    }

    .footer {
      padding: var(--aeva-section-footer-padding);
      flex-shrink: 0;
      margin-top: auto;
    }

    /* Hide empty slots */
    .header:not(:has(*)) {
      display: none;
    }

    .body:not(:has(*)) {
      display: none;
    }

    .footer:not(:has(*)) {
      display: none;
    }

    /* Fallback for browsers that don't support :has() */
    @supports not selector(:has(*)) {
      .header,
      .body,
      .footer {
        display: block;
      }
    }

    /* Gap variants */
    :host([gap="xs"]) {
      --aeva-section-gap: 0.25rem;
    }

    :host([gap="sm"]) {
      --aeva-section-gap: 0.5rem;
    }

    :host([gap="md"]) {
      --aeva-section-gap: 1rem;
    }

    :host([gap="lg"]) {
      --aeva-section-gap: 1.5rem;
    }

    :host([gap="xl"]) {
      --aeva-section-gap: 2rem;
    }

    /* Padding variants */
    :host([padding="xs"]) {
      --aeva-section-padding: 0.5rem;
    }

    :host([padding="sm"]) {
      --aeva-section-padding: 1rem;
    }

    :host([padding="md"]) {
      --aeva-section-padding: 1.5rem;
    }

    :host([padding="lg"]) {
      --aeva-section-padding: 2rem;
    }

    :host([padding="xl"]) {
      --aeva-section-padding: 3rem;
    }

    /* Full height variant */
    :host([full-height]) {
      height: 100%;
    }

    :host([full-height]) .section {
      height: 100%;
    }

    /* Sticky header */
    :host([sticky-header]) .header {
      position: sticky;
      top: 0;
      z-index: 10;
      background: inherit;
    }

    /* Sticky footer */
    :host([sticky-footer]) .footer {
      position: sticky;
      bottom: 0;
      z-index: 10;
      background: inherit;
    }
  `;

  /**
   * Gap between sections
   */
  @property({ type: String, reflect: true })
  gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'none';

  /**
   * Padding for the entire section
   */
  @property({ type: String, reflect: true })
  padding: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'none';

  /**
   * Whether the section should take full height
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-height' })
  fullHeight = false;

  /**
   * Whether the header should be sticky
   */
  @property({ type: Boolean, reflect: true, attribute: 'sticky-header' })
  stickyHeader = false;

  /**
   * Whether the footer should be sticky
   */
  @property({ type: Boolean, reflect: true, attribute: 'sticky-footer' })
  stickyFooter = false;

  render() {
    return html`
      <div class="section" part="section">
        <div class="header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="body" part="body">
          <slot name="body"><slot></slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-section': AevaSection;
  }
}
