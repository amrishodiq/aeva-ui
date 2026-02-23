import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { AevaStep } from '../atoms/aeva-step.js';

/**
 * Aeva Process component (Molecule).
 * Manages a sequence of steps.
 *
 * @slot - Default slot for aeva-step elements.
 */
@customElement('aeva-process')
export class AevaProcess extends LitElement {
  static styles = css`
    :host {
      display: flex;
      width: 100%;
      position: relative;
    }

    :host([direction='horizontal']) {
      flex-direction: row;
      align-items: flex-start;
      gap: var(--aeva-process-gap);
    }

    :host([direction='vertical']) {
      flex-direction: column;
    }
  `;

  /**
   * Layout direction.
   */
  @property({ type: String, reflect: true })
  direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Current active step index (0-based).
   */
  @property({ type: Number })
  current = 0;

  @queryAssignedElements({ selector: 'aeva-step' })
  private steps!: Array<AevaStep>;

  protected updated() {
    this.updateSteps();
  }

  private updateSteps() {
    if (!this.steps) return;

    this.steps.forEach((step, index) => {
      step.index = index;
      step.direction = this.direction;
      step.last = index === this.steps.length - 1;

      if (index < this.current) {
        step.status = 'completed';
      } else if (index === this.current) {
        step.status = 'active';
      } else {
        step.status = 'pending';
      }
    });
  }

  render() {
    return html`<slot @slotchange="${this.updateSteps}"></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-process': AevaProcess;
  }
}
