import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Aeva Step component (Atom for Process).
 * 
 * @slot - Default slot for step content/description.
 * @slot icon - Slot for custom step icon.
 */
@customElement('aeva-step')
export class AevaStep extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      flex: 1;
    }

    .step-node {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--aeva-step-circle-size);
      height: var(--aeva-step-circle-size);
      border-radius: 50%;
      background-color: var(--aeva-step-circle-bg);
      border: var(--aeva-step-line-thickness) solid var(--aeva-step-color-pending);
      color: var(--aeva-step-color-pending);
      font-size: var(--aeva-font-size-sm);
      font-weight: 600;
      transition: all var(--aeva-transition-normal) cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 2;
      position: relative;
    }

    :host([status="active"]) .step-node {
      border-color: var(--aeva-step-color-active);
      color: var(--aeva-step-color-active);
      transform: scale(1.1);
      box-shadow: 0 4px 12px color-mix(in srgb, var(--aeva-step-color-active) 30%, transparent);
    }

    :host([status="completed"]) .step-node {
      background-color: var(--aeva-step-color-completed);
      border-color: var(--aeva-step-color-completed);
      color: var(--aeva-color-white);
    }

    :host([status="error"]) .step-node {
      border-color: var(--aeva-step-color-error);
      color: var(--aeva-step-color-error);
    }

    .step-content {
      margin-top: var(--aeva-space-sm);
      text-align: center;
      padding: 0 var(--aeva-space-xs);
    }

    .step-label {
      display: block;
      font-size: var(--aeva-font-size-sm);
      font-weight: 600;
      color: var(--aeva-text-color);
      transition: color var(--aeva-transition-normal);
    }

    :host([status="pending"]) .step-label {
      color: var(--aeva-text-muted);
    }

    .step-description {
      display: block;
      font-size: var(--aeva-font-size-xs);
      color: var(--aeva-text-muted);
      margin-top: 2px;
    }

    .icon {
      width: 1.25em;
      height: 1.25em;
    }

    /* Connector Lines */
    :host(:not([last]))::after {
      content: '';
      position: absolute;
      background-color: var(--aeva-step-line-color);
      z-index: 1;
      transition: background-color var(--aeva-transition-normal);
    }

    :host([direction="horizontal"]:not([last]))::after {
      top: calc(var(--aeva-step-circle-size) / 2 - var(--aeva-step-line-thickness) / 2);
      left: 50%;
      right: calc(-50% - var(--aeva-process-gap));
      height: var(--aeva-step-line-thickness);
    }

    :host([direction="vertical"]:not([last]))::after {
      top: calc(var(--aeva-step-circle-size) / 2);
      left: calc(var(--aeva-step-circle-size) / 2 - var(--aeva-step-line-thickness) / 2);
      bottom: calc(-1 * var(--aeva-space-lg) - var(--aeva-step-circle-size) / 2);
      width: var(--aeva-step-line-thickness);
    }

    /* Active/Completed Line Colors */
    :host([status="completed"])::after,
    :host([status="active"])::after {
      background-color: var(--aeva-step-color-completed);
    }

    /* Vertical connector handled by parent, but step needs to align */
    :host([direction="vertical"]) {
      flex-direction: row;
      align-items: flex-start;
      gap: var(--aeva-space-md);
      margin-bottom: var(--aeva-space-lg);
    }

    :host([direction="vertical"]) .step-content {
      margin-top: 0;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  `;

  /**
   * Status of the step.
   */
  @property({ type: String, reflect: true })
  status: 'pending' | 'active' | 'completed' | 'error' = 'pending';

  /**
   * Title label for the step.
   */
  @property({ type: String })
  label = '';

  /**
   * Description for the step.
   */
  @property({ type: String })
  description = '';

  /**
   * Step number (auto-assigned by parent if not provided).
   */
  @property({ type: Number })
  index?: number;

  /**
   * Layout direction (reflected from parent).
   */
  @property({ type: String, reflect: true })
  direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Whether this is the last step in the process.
   */
  @property({ type: Boolean, reflect: true })
  last = false;

  render() {
    return html`
      <div class="step-node">
        <slot name="icon">
          ${this.status === 'completed'
        ? html`<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`
        : this.status === 'error'
          ? html`<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>`
          : html`<span>${this.index !== undefined ? this.index + 1 : ''}</span>`
      }
        </slot>
      </div>
      <div class="step-content">
        <span class="step-label">${this.label}</span>
        ${this.description ? html`<span class="step-description">${this.description}</span>` : ''}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-step': AevaStep;
  }
}
