import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import '../atoms/aeva-input.js';
import '../atoms/aeva-button.js';
import '../atoms/aeva-icon.js';
import '../atoms/aeva-popup-menu.js';

/**
 * AevaDatePicker component for selecting dates via a responsive modal calendar grid.
 */
@customElement('aeva-date-picker')
export class AevaDatePicker extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      position: relative;
    }

    /* Mobile Bottom Sheet style */
    .mobile-bottom-sheet {
      display: none;
    }

    @media (max-width: 600px) {
      .mobile-bottom-sheet.visible {
        display: block;
        position: fixed;
        top: auto;
        bottom: 0;
        left: 0;
        width: 100%;
        background: var(--aeva-surface-color, #1e1e1e);
        border-top: 1px solid var(--aeva-border-color, rgba(255, 255, 255, 0.1));
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        padding: 1.5rem;
        z-index: 1000;
        animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
      }

      .modal-backdrop.visible {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 999;
        animation: fadeIn 0.3s ease;
      }

      /* Hide desktop popup contents when mobile sheet is active */
      aeva-popup-menu {
        display: none !important;
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .calendar-container {
      width: 320px;
      padding: 1rem;
      box-sizing: border-box;
    }

    @media (max-width: 600px) {
      .calendar-container {
        width: 100%;
        padding: 0;
      }
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .month-year-title {
      font-weight: 600;
      font-size: 1.1rem;
      color: var(--aeva-text-color, #e2e8f0);
    }

    .nav-btn {
      background: transparent;
      border: 1px solid var(--aeva-border-color, rgba(255, 255, 255, 0.1));
      color: var(--aeva-text-color, #e2e8f0);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
    }

    .nav-btn:hover {
      background: var(--aeva-hover-color, rgba(255, 255, 255, 0.05));
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      text-align: center;
      margin-bottom: 0.5rem;
    }

    .day-name {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--aeva-text-muted-color, #94a3b8);
      font-weight: 600;
      padding-bottom: 0.5rem;
    }

    .dates-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .date-btn {
      aspect-ratio: 1;
      width: 100%;
      border: none;
      background: transparent;
      color: var(--aeva-text-color, #e2e8f0);
      border-radius: var(--aeva-border-radius-sm, 6px);
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .date-btn:not(.empty):not(.disabled):hover {
      background: var(--aeva-hover-color, rgba(255, 255, 255, 0.05));
    }

    .date-btn.empty {
      cursor: default;
    }

    .date-btn.today {
      color: var(--aeva-primary-color, #3b82f6);
      font-weight: bold;
    }

    .date-btn.selected {
      background: var(--aeva-primary-color, #3b82f6);
      color: white;
      font-weight: bold;
      box-shadow: 0 4px 12px color-mix(in srgb, var(--aeva-primary-color) 40%, transparent);
    }

    .date-btn.disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .mobile-actions {
      display: none;
      margin-top: 1.5rem;
    }

    @media (max-width: 600px) {
      .mobile-actions {
        display: block;
      }
    }
  `;
  @property({ type: String }) label = '';
  @property({ type: String }) placeholder = 'Select date';
  @property({ type: String, reflect: true }) value = '';

  /** Minimum selectable date (YYYY-MM-DD) */
  @property({ type: String }) min = '';

  /** Maximum selectable date (YYYY-MM-DD) */
  @property({ type: String }) max = '';

  @state() private isMobileSheetOpen = false;
  @state() private viewingDate: Date;
  @state() private selectedDate?: Date;

  @query('aeva-popup-menu') private popup!: any; // AevaPopupMenu type not imported
  @query('aeva-input') private triggerInput!: HTMLElement;

  constructor() {
    super();
    const now = new Date();
    this.viewingDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  protected willUpdate(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('value') && this.value) {
      const parsed = new Date(this.value);
      if (!isNaN(parsed.getTime())) {
        this.selectedDate = parsed;
        this.viewingDate = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
      }
    }
  }

  private toggleModal() {
    if (this.selectedDate) {
      this.viewingDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
    }

    if (window.innerWidth <= 600) {
      this.isMobileSheetOpen = true;
    } else {
      // Desktop floating UI popover
      if (this.popup.open) {
        this.popup.close();
      } else {
        this.popup.show(this.triggerInput);
      }
    }
  }

  private closePicker() {
    this.isMobileSheetOpen = false;
    if (this.popup && this.popup.open) {
      this.popup.close();
    }
  }

  private prevMonth() {
    this.viewingDate = new Date(this.viewingDate.getFullYear(), this.viewingDate.getMonth() - 1, 1);
  }

  private nextMonth() {
    this.viewingDate = new Date(this.viewingDate.getFullYear(), this.viewingDate.getMonth() + 1, 1);
  }

  private isDateDisabled(date: Date): boolean {
    if (this.min) {
      const minDate = new Date(this.min);
      minDate.setHours(0, 0, 0, 0);
      if (date < minDate) return true;
    }
    if (this.max) {
      const maxDate = new Date(this.max);
      maxDate.setHours(23, 59, 59, 999);
      if (date > maxDate) return true;
    }
    return false;
  }

  private selectDate(day: number) {
    const selected = new Date(this.viewingDate.getFullYear(), this.viewingDate.getMonth(), day);

    if (this.isDateDisabled(selected)) return;

    this.selectedDate = selected;
    // Format YYYY-MM-DD local time manually to avoid timezone shift
    const year = selected.getFullYear();
    const month = String(selected.getMonth() + 1).padStart(2, '0');
    const dbDay = String(selected.getDate()).padStart(2, '0');
    const newValue = `${year}-${month}-${dbDay}`;

    if (this.value !== newValue) {
      this.value = newValue;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value, date: this.selectedDate },
          bubbles: true,
          composed: true,
        })
      );
    }

    // On desktop, auto-close. On mobile, let user hit Confirm.
    if (window.innerWidth > 600) {
      this.closePicker();
    }
  }

  private renderCalendar() {
    const year = this.viewingDate.getFullYear();
    const month = this.viewingDate.getMonth();

    // First day of month (0 = Sunday, 1 = Monday ...)
    const firstDay = new Date(year, month, 1).getDay();
    // Days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const monthName = new Intl.DateTimeFormat('default', { month: 'long', year: 'numeric' }).format(
      this.viewingDate
    );
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return html`
      <div class="calendar-container">
        <div class="calendar-header">
          <button class="nav-btn" @click="${this.prevMonth}" aria-label="Previous Month">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div class="month-year-title">${monthName}</div>
          <button class="nav-btn" @click="${this.nextMonth}" aria-label="Next Month">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div class="days-grid">${dayNames.map((d) => html`<div class="day-name">${d}</div>`)}</div>

        <div class="dates-grid">
          ${blanks.map(() => html`<div class="date-btn empty"></div>`)}
          ${days.map((day) => {
            const dateObj = new Date(year, month, day);
            const isToday = dateObj.getTime() === today.getTime();

            let isSelected = false;
            if (this.selectedDate) {
              isSelected =
                dateObj.getFullYear() === this.selectedDate.getFullYear() &&
                dateObj.getMonth() === this.selectedDate.getMonth() &&
                dateObj.getDate() === this.selectedDate.getDate();
            }

            const isDisabled = this.isDateDisabled(dateObj);

            const classes = {
              'date-btn': true,
              today: isToday,
              selected: isSelected,
              disabled: isDisabled,
            };

            return html`
              <button
                class="${classMap(classes)}"
                @click="${() => this.selectDate(day)}"
                ?disabled="${isDisabled}"
              >
                ${day}
              </button>
            `;
          })}
        </div>

        <div class="mobile-actions">
          <aeva-button variant="primary" full-width @click="${this.closePicker}"
            >Confirm</aeva-button
          >
        </div>
      </div>
    `;
  }

  render() {
    const calendarIcon = html`<svg
      slot="prefix"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>`;

    return html`
      <aeva-input
        .label="${this.label}"
        .placeholder="${this.placeholder}"
        .value="${this.value}"
        readonly
        @click="${this.toggleModal}"
        style="cursor: pointer;"
      >
        ${calendarIcon}
      </aeva-input>

      <aeva-popup-menu> ${this.renderCalendar()} </aeva-popup-menu>

      <!-- Mobile Bottom Sheet Version -->
      <div
        class="modal-backdrop ${this.isMobileSheetOpen ? 'visible' : ''}"
        @click="${this.closePicker}"
      ></div>
      <div class="mobile-bottom-sheet ${this.isMobileSheetOpen ? 'visible' : ''}">
        ${this.renderCalendar()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-date-picker': AevaDatePicker;
  }
}
