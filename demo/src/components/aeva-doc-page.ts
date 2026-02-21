import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('aeva-doc-page')
export class AevaDocPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      padding: 12px !important;
      max-width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
      width: 100%;
    }

    @media (min-width: 768px) {
      :host {
        padding: 4rem 2rem;
      }
    }

    @media (min-width: 1200px) {
      :host {
        padding: 4rem 1.5rem;
      }
    }

    .header {
      margin-bottom: 4rem;
    }

    /* Fixed Exit Button */
    .exit-button {
      position: fixed;
      top: 1.5rem;
      right: 2rem;
      z-index: 2100;
    }

    .exit-btn {
      background: rgba(220, 38, 38, 0.8); /* Danger color with transparency */
      backdrop-filter: blur(4px);
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .exit-btn:hover {
      background: rgba(220, 38, 38, 1);
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }

    .exit-btn svg {
      width: 24px;
      height: 24px;
    }

    h2 {
      margin: 0 0 1rem 0;
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--aeva-text-color);
      background: linear-gradient(135deg, var(--aeva-text-color) 0%, var(--aeva-text-muted-color) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--aeva-text-muted-color);
      max-width: 800px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    h2 {
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  description = '';

  private handleClose() {
    const detailPage = document.getElementById('detail-page') as any;
    if (detailPage && typeof detailPage.close === 'function') {
      detailPage.close();
    }
  }

  render() {
    return html`
      <div class="exit-button">
        <button class="exit-btn" @click=${this.handleClose} aria-label="Close">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="header">
        <h2>${this.title}</h2>
        ${this.description ? html`<div class="description">${this.description}</div>` : ''}
      </div>

      <slot></slot>
    `;
  }
}
