import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import './aeva-popup-menu';
import '../molecules/aeva-list';
import './aeva-list-item';
import { AevaPopupMenu } from './aeva-popup-menu';

/**
 * A premium select component that reuses input styling and popup-menu logic.
 *
 * @slot - Default slot for aeva-list-item elements
 *
 * @fires change - Dispatched when the selected value changes
 */
@customElement('aeva-select')
export class AevaSelect extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      position: relative;
      --internal-trigger-width: 100%;
    }

    .select-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      cursor: pointer;
      user-select: none;
      box-sizing: border-box;

      font-family: var(--aeva-input-font-family, inherit);
      border: 2px solid var(--aeva-input-border-color, rgba(255, 255, 255, 0.2));
      border-radius: var(--aeva-input-border-radius, 22px);
      background-color: var(--aeva-input-bg, rgba(255, 255, 255, 0.05));
      color: var(--aeva-input-text-color, inherit);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: all 0.2s ease;
      outline: none;

      /* Default Size (md) */
      padding: var(--aeva-input-padding-md, 10px 20px);
      font-size: var(--aeva-input-font-size-md, 1rem);
      height: var(--aeva-input-height-md, 44px);
    }

    /* Size variants */
    :host([size='sm']) .select-trigger {
      padding: var(--aeva-input-padding-sm, 8px 16px);
      font-size: var(--aeva-input-font-size-sm, 0.875rem);
      height: var(--aeva-input-height-sm, 36px);
    }

    :host([size='lg']) .select-trigger {
      padding: var(--aeva-input-padding-lg, 12px 24px);
      font-size: var(--aeva-input-font-size-lg, 1.125rem);
      height: var(--aeva-input-height-lg, 52px);
    }

    /* Appearance variants */
    :host([appearance='flat']) .select-trigger {
      border: none;
      background-color: var(--aeva-input-flat-bg, rgba(255, 255, 255, 0.1));
    }

    /* State styles */
    :host([disabled]) .select-trigger {
      opacity: var(--aeva-input-disabled-opacity, 0.5);
      cursor: not-allowed;
      background-color: var(--aeva-input-disabled-bg, transparent);
    }

    .select-trigger:hover:not(.disabled) {
      border-color: var(--aeva-input-hover-border-color, var(--aeva-primary-color, #667eea));
    }

    .select-trigger.focus {
      border-color: var(--aeva-input-focus-border-color, var(--aeva-primary-color, #667eea));
      box-shadow: 0 0 0 var(--aeva-input-focus-ring-width, 3px)
        var(--aeva-input-focus-ring-color, rgba(102, 126, 234, 0.2));
    }

    .label-display {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .placeholder {
      color: var(--aeva-input-placeholder-color, rgba(255, 255, 255, 0.4));
    }

    .arrow {
      margin-left: 8px;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.7;
    }

    .open .arrow {
      transform: rotate(180deg);
      opacity: 1;
    }

    aeva-popup-menu {
      /* Use fixed width derived from trigger */
      --aeva-popup-min-width: var(--internal-trigger-width);
      --aeva-popup-max-width: var(--internal-trigger-width);
    }

    ::slotted(aeva-list) {
      width: 100%;
      --aeva-list-padding: 4px;
      --aeva-list-border-radius: 0;
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Select an option';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String, reflect: true }) appearance: 'bordered' | 'flat' = 'bordered';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) mandatory = false;
  @property({ type: String }) label = ''; // Display label

  @state() private open = false;
  @state() private hasFocus = false;

  @query('aeva-popup-menu') private popup!: AevaPopupMenu;
  @query('.select-trigger') private triggerElement!: HTMLElement;

  firstUpdated() {
    this.syncLabelWithValue();
  }

  private syncLabelWithValue() {
    const items = Array.from(this.querySelectorAll('aeva-list-item')) as any[];
    const selectedItem = items.find((item) => {
      const val = item.getAttribute('value') || item.value;
      return val === this.value;
    });

    if (selectedItem) {
      this.label =
        selectedItem.getAttribute('label') || selectedItem.label || selectedItem.textContent.trim();
    } else if (this.value) {
      this.label = this.value; // Fallback
    } else {
      this.label = '';
    }
  }

  private handleTriggerClick() {
    if (this.disabled) return;
    if (this.open) {
      this.popup.close();
    } else {
      this.popup.show(this.triggerElement);
    }
  }

  private handlePopupOpen() {
    this.open = true;
  }

  private handlePopupClose() {
    this.open = false;
  }

  private handleSelectionChange(e: CustomEvent) {
    const { index, label } = e.detail;
    const items = Array.from(this.querySelectorAll('aeva-list-item')) as any[];
    const selectedItem = items[index];

    const newValue = selectedItem?.getAttribute('value') || selectedItem?.value || label;
    const oldValue = this.value;

    // 1. Update internal state
    this.value = newValue;
    this.label = label;

    // 2. Close Popup IMMEDIATELY
    this.popup.close();

    // 3. Dispatch events
    if (oldValue !== newValue) {
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value, label: this.label },
          bubbles: true,
          composed: true,
        })
      );

      this.dispatchEvent(
        new CustomEvent('selected', {
          detail: { value: this.value, label: this.label, index },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private handleFocus() {
    this.hasFocus = true;
  }

  private handleBlur() {
    this.hasFocus = false;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this.open) {
        this.handleTriggerClick();
      }
    }
  }

  render() {
    const triggerClasses = {
      'select-trigger': true,
      open: this.open,
      focus: this.hasFocus,
      disabled: this.disabled,
    };

    return html`
      <div
        class="${classMap(triggerClasses)}"
        tabindex="${this.disabled ? '-1' : '0'}"
        @click="${this.handleTriggerClick}"
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @keydown="${this.handleKeyDown}"
      >
        <div class="label-display ${!this.label ? 'placeholder' : ''}">
          ${this.label || this.placeholder}
        </div>
        <div class="arrow">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <aeva-popup-menu
        .disableBackdropClick="${this.mandatory}"
        @open="${this.handlePopupOpen}"
        @close="${this.handlePopupClose}"
      >
        <aeva-list .active="${-1}" @selection-change="${this.handleSelectionChange}">
          <slot @slotchange="${this.syncLabelWithValue}"></slot>
        </aeva-list>
      </aeva-popup-menu>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-select': AevaSelect;
  }
}
