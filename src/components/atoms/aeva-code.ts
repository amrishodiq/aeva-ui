import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A code block component with MacOS-style window decorations (Carbon style).
 * Supports syntax highlighting, line numbers (planned), and copy to clipboard.
 * 
 * @cssprop --aeva-code-bg - Background color of the code area
 * @cssprop --aeva-code-header-bg - Background color of the window header
 * @cssprop --aeva-code-font-family - Font family for the code
 * @cssprop --aeva-code-font-size - Font size for the code
 * @cssprop --aeva-code-border-radius - Border radius of the code window (default: 22px)
 */
@customElement('aeva-code')
export class AevaCode extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin: 1.5rem 0;
      font-family: var(--aeva-code-font-family, 'Fira Code', 'Cascadia Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace);
    }

    .code-window {
      background: var(--aeva-code-bg, #1e1e1e);
      border-radius: var(--aeva-code-border-radius, 22px);
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
    }

    .window-header {
      background: var(--aeva-code-header-bg, #323232);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .dot-red { background: #ff5f56; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #27c93f; }

    .window-title {
      flex: 1;
      text-align: center;
      color: rgba(255, 255, 255, 0.4);
      font-size: 0.8rem;
      margin-right: 40px; /* Offset for dots to center title */
    }

    .code-container {
      position: relative;
      padding: 1.5rem;
      margin: 0;
      overflow-x: auto;
    }

    pre {
      margin: 0;
      padding: 0;
      background: transparent !important;
    }

    code {
      font-family: inherit;
      font-size: var(--aeva-code-font-size, 0.95rem);
      line-height: 1.6;
      color: #d4d4d4;
    }

    .copy-button {
      position: absolute;
      top: 12px;
      right: 12px;
      padding: 6px 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(4px);
      z-index: 10;
    }

    .copy-button:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-color: rgba(255, 255, 255, 0.2);
    }

    .copy-button.copied {
      background: rgba(39, 201, 63, 0.2);
      color: #27c93f;
      border-color: rgba(39, 201, 63, 0.3);
    }

    /* Scrollbar styling */
    .code-container::-webkit-scrollbar {
      width: var(--aeva-scrollbar-width);
      height: var(--aeva-scrollbar-width);
    }

    .code-container::-webkit-scrollbar-track {
      background: var(--aeva-scrollbar-track);
    }

    .code-container::-webkit-scrollbar-thumb {
      background: var(--aeva-scrollbar-thumb);
      border-radius: 10px;
    }

    .code-container::-webkit-scrollbar-thumb:hover {
      background: var(--aeva-scrollbar-thumb-hover);
    }
  `;

  /**
   * The code to display
   */
  @property({ type: String })
  code = '';

  /**
   * The language for syntax highlighting
   */
  @property({ type: String })
  language = 'html';

  /**
   * Optional title for the window
   */
  @property({ type: String })
  title = '';

  @state()
  private copied = false;

  private handleCopy() {
    // Get text from slot if code property is empty
    const textToCopy = this.code || this.textContent?.trim() || '';

    navigator.clipboard.writeText(textToCopy).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }

  render() {
    return html`
      <div class="code-window">
        <div class="window-header">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
          ${this.title ? html`<div class="window-title">${this.title}</div>` : ''}
        </div>
        
        <div class="code-container">
          <button 
            class="copy-button ${this.copied ? 'copied' : ''}" 
            @click=${this.handleCopy}
          >
            ${this.copied ? 'Copied!' : 'Copy'}
          </button>
          <pre class="language-${this.language}"><code class="language-${this.language}">${this.code}<slot></slot></code></pre>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-code': AevaCode;
  }
}
