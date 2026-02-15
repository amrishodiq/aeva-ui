import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('aeva-doc-section')
export class AevaDocSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 3rem;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
      color: var(--aeva-primary-color, #667eea);
    }

    .description {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 1.5rem;
    }

    .columns-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      width: 100%;
      box-sizing: border-box;
    }

    ::slotted(*) {
      flex: 1 1 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    /*
    @media (min-width: 640px) {
      ::slotted(*) {
        flex: 1 1 calc(50% - 0.75rem);
        max-width: calc(50% - 0.75rem);
      }
    }

    @media (min-width: 1024px) {
      ::slotted(*) {
        flex: 1 1 calc(33.333% - 1rem);
        max-width: calc(33.333% - 1rem);
      }
    }
    */

    /* Override for specific column counts if they fit in the viewport */
    :host([columns="1"]) ::slotted(*) { 
      flex: 1 1 100%;
      max-width: 100%;
    }
    
    @media (min-width: 640px) {
      :host([columns="2"]) ::slotted(*) { 
        flex: 1 1 calc(50% - 0.75rem);
        max-width: calc(50% - 0.75rem);
      }
    }
    
    @media (min-width: 1024px) {
      :host([columns="3"]) ::slotted(*) { 
        flex: 1 1 calc(33.333% - 1rem);
        max-width: calc(33.333% - 1rem);
      }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  description = '';

  @property({ type: String, reflect: true })
  columns = '';

  render() {
    return html`
      ${this.title ? html`<h3>${this.title}</h3>` : ''}
      ${this.description ? html`<div class="description">${this.description}</div>` : ''}
      <div class="columns-container">
        <slot></slot>
      </div>
    `;
  }
}
