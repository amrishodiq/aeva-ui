import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * A comprehensive typography component with multiple variants, sizes, and states.
 * Supports inline formatting and full accessibility features.
 *
 * @slot - Default slot for text content (supports inline HTML formatting)
 *
 * @csspart typography - The typography element
 *
 * @cssprop --aeva-text-font-family - Default font family
 * @cssprop --aeva-text-display-font-family - Font family for display/hero variant
 * @cssprop --aeva-text-heading-font-family - Font family for heading variants
 * @cssprop --aeva-text-body-font-family - Font family for body variant
 * @cssprop --aeva-text-label-font-family - Font family for label variant
 *
 * @cssprop --aeva-text-display-weight - Font weight for display/hero
 * @cssprop --aeva-text-heading-weight - Font weight for headings
 * @cssprop --aeva-text-body-weight - Font weight for body
 * @cssprop --aeva-text-label-weight - Font weight for labels
 *
 * @cssprop --aeva-text-display-line-height - Line height for display/hero
 * @cssprop --aeva-text-heading-line-height - Line height for headings
 * @cssprop --aeva-text-body-line-height - Line height for body
 * @cssprop --aeva-text-label-line-height - Line height for labels
 *
 * @cssprop --aeva-text-color - Default text color
 * @cssprop --aeva-text-muted-color - Color for muted state
 * @cssprop --aeva-text-inverse-color - Color for inverse state
 * @cssprop --aeva-text-error-color - Color for error state
 *
 * @cssprop --aeva-text-muted-opacity - Opacity for muted state
 * @cssprop --aeva-text-link-color - Color for links within typography
 * @cssprop --aeva-text-link-hover-color - Hover color for links
 *
 * @cssprop --aeva-text-size-xs - Font size for xs
 * @cssprop --aeva-text-size-sm - Font size for sm
 * @cssprop --aeva-text-size-md - Font size for md
 * @cssprop --aeva-text-size-lg - Font size for lg
 * @cssprop --aeva-text-size-xl - Font size for xl
 * @cssprop --aeva-text-size-2xl - Font size for 2xl
 * @cssprop --aeva-text-size-3xl - Font size for 3xl
 *
 * @cssprop --aeva-text-letter-spacing-display - Letter spacing for display
 * @cssprop --aeva-text-letter-spacing-heading - Letter spacing for headings
 * @cssprop --aeva-text-letter-spacing-body - Letter spacing for body
 * @cssprop --aeva-text-letter-spacing-label - Letter spacing for labels
 *
 * @cssprop --aeva-text-margin-top - Top margin
 * @cssprop --aeva-text-margin-bottom - Bottom margin
 * @cssprop --aeva-text-max-width - Maximum width for optimal readability
 */
@customElement('aeva-text')
export class AevaText extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: var(--aeva-text-color);
    }

    /* Base typography styles */
    .typography {
      margin-top: var(--aeva-text-margin-top, 0);
      margin-bottom: var(--aeva-text-margin-bottom, 0);
      padding: 0;
      color: inherit;
      font-family: var(--aeva-text-font-family);
      max-width: var(--aeva-text-max-width, none);
    }

    /* Variant: Display/Hero */
    .variant-display,
    .variant-hero {
      font-family: var(
        --aeva-text-display-font-family,
        var(
          --aeva-text-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          sans-serif
        )
      );
      font-weight: var(--aeva-text-display-weight, 800);
      line-height: var(--aeva-text-display-line-height, 1.1);
      letter-spacing: var(--aeva-text-letter-spacing-display, -0.02em);
    }

    /* Variant: Headings */
    .variant-h1,
    .variant-h2,
    .variant-h3,
    .variant-h4,
    .variant-h5,
    .variant-h6 {
      font-family: var(
        --aeva-text-heading-font-family,
        var(
          --aeva-text-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          sans-serif
        )
      );
      font-weight: var(--aeva-text-heading-weight, 700);
      line-height: var(--aeva-text-heading-line-height, 1.2);
      letter-spacing: var(--aeva-text-letter-spacing-heading, -0.01em);
    }

    /* Variant: Body */
    .variant-body {
      font-family: var(
        --aeva-text-body-font-family,
        var(
          --aeva-text-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          sans-serif
        )
      );
      font-weight: var(--aeva-text-body-weight, 400);
      line-height: var(--aeva-text-body-line-height, 1.6);
      letter-spacing: var(--aeva-text-letter-spacing-body, normal);
    }

    /* Variant: Label */
    .variant-label {
      font-family: var(
        --aeva-text-label-font-family,
        var(
          --aeva-text-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          sans-serif
        )
      );
      font-weight: var(--aeva-text-label-weight, 500);
      line-height: var(--aeva-text-label-line-height, 1.4);
      letter-spacing: var(--aeva-text-letter-spacing-label, 0.01em);
    }

    /* Sizes */
    .size-xs {
      font-size: var(--aeva-text-size-xs, 0.75rem);
    }

    .size-sm {
      font-size: var(--aeva-text-size-sm, 0.875rem);
    }

    .size-md {
      font-size: var(--aeva-text-size-md, 1rem);
    }

    .size-lg {
      font-size: var(--aeva-text-size-lg, 1.125rem);
    }

    .size-xl {
      font-size: var(--aeva-text-size-xl, 1.25rem);
    }

    .size-2xl {
      font-size: var(--aeva-text-size-2xl, 1.5rem);
    }

    .size-3xl {
      font-size: var(--aeva-text-size-3xl, 1.875rem);
    }

    /* Default sizes for variants when size is not specified */
    .variant-display.size-md,
    .variant-hero.size-md {
      font-size: 3.75rem; /* 60px */
    }

    .variant-h1.size-md {
      font-size: 3rem; /* 48px */
    }

    .variant-h2.size-md {
      font-size: 2.25rem; /* 36px */
    }

    .variant-h3.size-md {
      font-size: 1.875rem; /* 30px */
    }

    .variant-h4.size-md {
      font-size: 1.5rem; /* 24px */
    }

    .variant-h5.size-md {
      font-size: 1.25rem; /* 20px */
    }

    .variant-h6.size-md {
      font-size: 1.125rem; /* 18px */
    }

    .variant-body.size-md {
      font-size: 1rem; /* 16px */
    }

    .variant-label.size-md {
      font-size: 0.875rem; /* 14px */
    }

    /* Alignment */
    .align-left {
      text-align: left;
    }

    .align-center {
      text-align: center;
    }

    .align-right {
      text-align: right;
    }

    .align-justify {
      text-align: justify;
    }

    /* States */
    .state-muted {
      color: var(--aeva-text-muted-color, #6b7280);
      /* Removed opacity to avoid double effect - color is already lighter */
    }

    .state-inverse {
      color: var(--aeva-text-inverse-color, #ffffff);
    }

    .state-error {
      color: var(--aeva-text-error-color, #dc2626);
    }

    /* Text Transform */
    .transform-uppercase {
      text-transform: uppercase;
    }

    .transform-lowercase {
      text-transform: lowercase;
    }

    .transform-capitalize {
      text-transform: capitalize;
    }

    /* No Wrap */
    .no-wrap {
      white-space: nowrap;
    }

    /* Truncate */
    .truncate {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Line Clamp - Multi-line truncation */
    .line-clamp {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .line-clamp-1 {
      -webkit-line-clamp: 1;
    }

    .line-clamp-2 {
      -webkit-line-clamp: 2;
    }

    .line-clamp-3 {
      -webkit-line-clamp: 3;
    }

    .line-clamp-4 {
      -webkit-line-clamp: 4;
    }

    .line-clamp-5 {
      -webkit-line-clamp: 5;
    }

    .line-clamp-6 {
      -webkit-line-clamp: 6;
    }

    /* Inline formatting support */
    ::slotted(strong),
    ::slotted(b) {
      font-weight: 700;
    }

    ::slotted(em),
    ::slotted(i) {
      font-style: italic;
    }

    ::slotted(u) {
      text-decoration: underline;
    }

    ::slotted(a) {
      color: var(--aeva-text-link-color, #667eea);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    ::slotted(a:hover) {
      color: var(--aeva-text-link-hover-color, #5568d3);
      text-decoration: underline;
    }

    ::slotted(code) {
      font-family: 'Fira Code', 'Cascadia Code', Consolas, Monaco, monospace;
      background-color: var(--aeva-text-code-bg);
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-size: 0.9em;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .typography {
        font-weight: 500;
      }

      .state-muted {
        opacity: 0.85;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      ::slotted(a) {
        transition: none;
      }
    }
  `;

  /**
   * Typography variant
   */
  @property({ type: String, reflect: true })
  variant: 'display' | 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'label' = 'body';

  /**
   * Typography size
   */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md';

  /**
   * Text alignment
   */
  @property({ type: String, reflect: true })
  align: 'left' | 'center' | 'right' | 'justify' = 'left';

  /**
   * Typography state
   */
  @property({ type: String, reflect: true })
  state: 'normal' | 'muted' | 'inverse' | 'error' = 'normal';

  /**
   * Whether to use semantic HTML tags
   */
  @property({ type: Boolean, reflect: true })
  semantic = true;

  /**
   * Custom tag to use (overrides semantic)
   */
  @property({ type: String, reflect: true })
  tag?: string;

  /**
   * Text transform style
   */
  @property({ type: String, reflect: true })
  transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize' = 'none';

  /**
   * Prevent text wrapping
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-wrap' })
  noWrap = false;

  /**
   * Truncate text with ellipsis (requires single line)
   */
  @property({ type: Boolean, reflect: true })
  truncate = false;

  /**
   * Clamp text to specified number of lines with ellipsis
   * Supports 1-6 lines. Use 0 to disable.
   */
  @property({ type: Number, reflect: true, attribute: 'line-clamp' })
  lineClamp = 0;

  /**
   * Get the appropriate HTML tag based on variant
   */
  private getTag(): string {
    if (this.tag) {
      return this.tag;
    }

    if (!this.semantic) {
      return 'span';
    }

    switch (this.variant) {
      case 'display':
      case 'hero':
        return 'h1';
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'h5':
        return 'h5';
      case 'h6':
        return 'h6';
      case 'body':
        return 'p';
      case 'label':
        return 'label';
      default:
        return 'p';
    }
  }

  render() {
    const classes = {
      typography: true,
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true,
      [`align-${this.align}`]: true,
      [`state-${this.state}`]: this.state !== 'normal',
      [`transform-${this.transform}`]: this.transform !== 'none',
      'no-wrap': this.noWrap,
      truncate: this.truncate && this.lineClamp === 0,
      'line-clamp': this.lineClamp > 0,
      [`line-clamp-${this.lineClamp}`]: this.lineClamp > 0 && this.lineClamp <= 6,
    };

    const tag = this.getTag();

    // Using a switch to render different tags
    // This is necessary because Lit doesn't support dynamic tag names directly
    switch (tag) {
      case 'h1':
        return html`<h1 part="typography" class="${classMap(classes)}">
          <slot></slot>
        </h1>`;
      case 'h2':
        return html`<h2 part="typography" class="${classMap(classes)}">
          <slot></slot>
        </h2>`;
      case 'h3':
        return html`<h3 part="typography" class="${classMap(classes)}">
          <slot></slot>
        </h3>`;
      case 'h4':
        return html`<h4 part="typography" class="${classMap(classes)}">
          <slot></slot>
        </h4>`;
      case 'h5':
        return html`<h5 part="typography" class="${classMap(classes)}">
          <slot></slot>
        </h5>`;
      case 'h6':
        return html`<h6 part="typography" class="${classMap(classes)}">
          <slot></slot>
        </h6>`;
      case 'label':
        return html`<label part="typography" class="${classMap(classes)}">
          <slot></slot>
        </label>`;
      case 'span':
        return html`<span part="typography" class="${classMap(classes)}">
          <slot></slot>
        </span>`;
      case 'p':
      default:
        return html`<p part="typography" class="${classMap(classes)}">
          <slot></slot>
        </p>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-text': AevaText;
  }
}
