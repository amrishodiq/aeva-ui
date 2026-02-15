import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

@customElement('aeva-doc-example')
export class AevaDocExample extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .demo-area {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      min-height: 50px;
      max-width: 100%;
      overflow-x: auto;
      box-sizing: border-box;
      padding: 12px;
    }

    ::slotted(aeva-card), ::slotted(aeva-doc-page) {
      width: 100%;
    }

    .hidden-slot {
      display: none;
    }
  `;

  @property({ type: String })
  code = '';

  @property({ type: String })
  language = 'html';

  @state()
  private _extractedCode = '';

  @query('slot[name="code"]')
  private _codeSlot?: HTMLSlotElement;

  private _handleSlotChange() {
    if (!this._codeSlot) return;
    const assignedElements = this._codeSlot.assignedElements();
    if (assignedElements.length > 0) {
      const content = assignedElements[0].textContent || '';
      // Simple de-indentation: find the minimum indentation of non-empty lines
      const lines = content.split('\n');
      const nonEmptyLines = lines.filter(line => line.trim().length > 0);
      if (nonEmptyLines.length > 0) {
        const minIndent = Math.min(...nonEmptyLines.map(line => line.match(/^\s*/)?.[0].length || 0));
        this._extractedCode = lines.map(line => line.slice(minIndent)).join('\n').trim();
      } else {
        this._extractedCode = content.trim();
      }
    }
  }

  render() {
    return html`
      <div class="demo-area">
        <slot name="example"></slot>
        <slot></slot>
      </div>
      <div class="hidden-slot">
        <slot name="code" @slotchange=${this._handleSlotChange}></slot>
      </div>
      <aeva-code .language=${this.language} .code=${this.code || this._extractedCode}></aeva-code>
    `;
  }
}
