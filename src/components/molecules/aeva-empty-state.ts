import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { accessibilityStyles } from '../../styles/accessibility.js';
import '../atoms/aeva-text.js'; // Ensure aeva-text is available

/**
 * A component to display when a container is empty (e.g., no search results, no data).
 *
 * @slot icon - Slot for the main illustration or icon
 * @slot title - Slot for a custom title (overrides the 'title' property)
 * @slot description - Slot for a custom description (overrides the 'description' property)
 * @slot - Default slot for actions (buttons)
 *
 * @csspart container - The main container wrapper
 * @csspart icon - The wrapper around the icon slot
 * @csspart content - The wrapper around title and description
 * @csspart actions - The wrapper around the default action slot
 *
 * @cssprop --aeva-empty-state-gap - Gap between main elements (icon, content, actions)
 * @cssprop --aeva-empty-state-padding - Padding inside the container
 * @cssprop --aeva-empty-state-bg - Background color (transparent by default)
 * @cssprop --aeva-empty-state-border-radius - Border radius of the container
 */
@customElement('aeva-empty-state')
export class AevaEmptyState extends LitElement {
  static styles = [
    accessibilityStyles,
    css`
      :host {
        display: block;
      }

      .empty-state {
        display: flex;
        align-items: center;
        background-color: var(--aeva-empty-state-bg, transparent);
        border-radius: var(--aeva-empty-state-border-radius, var(--aeva-border-radius, 8px));
        text-align: center;
      }

      /* Layout Variants */
      .layout-vertical {
        flex-direction: column;
        justify-content: center;
      }

      .layout-horizontal {
        flex-direction: row;
        justify-content: flex-start;
        text-align: center;
      }

      /* Size Variants */
      .size-sm {
        padding: var(--aeva-empty-state-padding-sm, 1.5rem);
        gap: var(--aeva-empty-state-gap-sm, 0.75rem);
      }
      .size-sm .icon-wrapper ::slotted(svg),
      .size-sm .icon-wrapper ::slotted(img) {
        width: 48px;
        height: 48px;
      }

      .size-md {
        padding: var(--aeva-empty-state-padding-md, 2rem);
        gap: var(--aeva-empty-state-gap-md, 1rem);
      }
      .size-md .icon-wrapper ::slotted(svg),
      .size-md .icon-wrapper ::slotted(img) {
        width: 72px;
        height: 72px;
      }

      .size-lg {
        padding: var(--aeva-empty-state-padding-lg, 3rem);
        gap: var(--aeva-empty-state-gap-lg, 1.5rem);
      }
      .size-lg .icon-wrapper ::slotted(svg),
      .size-lg .icon-wrapper ::slotted(img) {
        width: 96px;
        height: 96px;
      }

      /* Sections */
      .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--aeva-text-color-muted, rgba(150, 150, 150, 0.5));
      }

      .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        text-align: center; /* Center horizontally for vertical layouts */
      }
      
      .layout-horizontal .content-wrapper {
         flex: 1;
         text-align: center; /* Keep center alignment for horizontal layout */
      }

      .actions-wrapper {
        display: flex;
        gap: 0.75rem;
        margin-top: 0.75rem;
        justify-content: center;
      }

      .layout-horizontal .actions-wrapper {
        justify-content: center; /* Still center actions within the content block */
      }
    `,
  ];

  /**
   * The visual layout direction.
   */
  @property({ type: String, reflect: true })
  layout: 'vertical' | 'horizontal' = 'vertical';

  /**
   * The overall sizing scale.
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * The primary title text. If the 'title' slot is used, it overrides this property.
   */
  @property({ type: String })
  title = '';

  /**
   * The secondary description text. If the 'description' slot is used, it overrides this.
   */
  @property({ type: String })
  description = '';

  render() {
    const classes = {
      'empty-state': true,
      [`layout-${this.layout}`]: true,
      [`size-${this.size}`]: true,
    };

    const titleVariant = this.size === 'sm' ? 'h5' : this.size === 'lg' ? 'h3' : 'h4';
    const descVariant = this.size === 'sm' ? 'caption' : 'body';

    return html`
      <div part="container" class="${classMap(classes)}">
        <div part="icon" class="icon-wrapper">
          <slot name="icon"></slot>
        </div>
        
        <div part="content" class="content-wrapper">
          <slot name="title">
            ${this.title ? html`<aeva-text variant="${titleVariant}" align="center" style="margin:0">${this.title}</aeva-text>` : ''}
          </slot>
          <slot name="description">
            ${this.description ? html`<aeva-text variant="${descVariant}" color="muted" align="center" style="margin:0">${this.description}</aeva-text>` : ''}
          </slot>
          <div part="actions" class="actions-wrapper">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-empty-state': AevaEmptyState;
  }
}
