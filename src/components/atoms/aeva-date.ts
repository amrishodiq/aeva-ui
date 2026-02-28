import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { accessibilityStyles } from '../../styles/accessibility.js';

/**
 * AevaDate component for formatting dates into human-readable text.
 *
 * @cssprop --aeva-date-font-family - Font family for the date
 * @cssprop --aeva-date-text-color - Text color for the date
 * @cssprop --aeva-date-font-size - Font size for the date
 */
@customElement('aeva-date')
export class AevaDate extends LitElement {
    static styles = [
        accessibilityStyles,
        css`
      :host {
        display: inline-block;
        font-family: var(--aeva-font-family, inherit);
        color: var(--aeva-date-text-color, var(--aeva-text-color, inherit));
        font-size: var(--aeva-date-font-size, inherit);
      }

      .date-text {
        white-space: nowrap;
      }
    `,
    ];

    /**
     * The date to format. Can be a Date object, an ISO string, or a timestamp.
     */
    @property()
    value?: Date | string | number;

    /**
     * The format style to use.
     */
    @property({ type: String })
    format: 'short' | 'medium' | 'long' | 'full' | 'relative' | 'date-only' | 'time-only' = 'medium';

    /**
     * Locale to use for formatting. Defaults to the browser's locale.
     */
    @property({ type: String })
    locale?: string;

    private get userLocale() {
        return this.locale || navigator.language || 'en-US';
    }

    private formatDate(date: Date): string {
        const locale = this.userLocale;

        switch (this.format) {
            case 'short':
                return new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' }).format(date);
            case 'long':
                return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeStyle: 'short' }).format(date);
            case 'full':
                return new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'long' }).format(date);
            case 'date-only':
                return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
            case 'time-only':
                return new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(date);
            case 'relative':
                return this.formatRelative(date);
            case 'medium':
            default:
                return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
        }
    }

    private formatRelative(date: Date): string {
        const now = new Date();
        const diffInMs = date.getTime() - now.getTime();
        const diffInSecs = Math.round(diffInMs / 1000);
        const diffInMins = Math.round(diffInSecs / 60);
        const diffInHours = Math.round(diffInMins / 60);
        const diffInDays = Math.round(diffInHours / 24);

        const rtf = new Intl.RelativeTimeFormat(this.userLocale, { numeric: 'auto' });

        if (Math.abs(diffInDays) > 0) {
            return rtf.format(diffInDays, 'day');
        }
        if (Math.abs(diffInHours) > 0) {
            return rtf.format(diffInHours, 'hour');
        }
        if (Math.abs(diffInMins) > 0) {
            return rtf.format(diffInMins, 'minute');
        }
        return rtf.format(diffInSecs, 'second');
    }

    render() {
        if (!this.value) {
            return html`<span class="date-text">--</span>`;
        }

        let dateObj: Date;
        try {
            dateObj = new Date(this.value);
            if (isNaN(dateObj.getTime())) {
                throw new Error('Invalid Date');
            }
        } catch (e) {
            return html`<span class="date-text">Invalid Date</span>`;
        }

        return html`<span class="date-text">${this.formatDate(dateObj)}</span>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-date': AevaDate;
    }
}
