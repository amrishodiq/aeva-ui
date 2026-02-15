import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createContext, provide } from "@lit-labs/context";

import type { Theme, ThemeStyles, ThemeVariables } from "./types.js";
import { lightTheme } from "./tokens/light.js";
import { darkTheme } from "./tokens/dark.js";

export { Theme, ThemeStyles };

export const themeContext = createContext<Theme>('aeva-theme');

export const themeStyles: ThemeStyles = {
    light: lightTheme,
    dark: darkTheme
};

@customElement('aeva-theme')
export class AevaTheme extends LitElement {
    static styles = css`
    :host {
        display: block;
        transition: background-color 0.3s, color 0.3s;
    }
    `;

    @provide({ context: themeContext })
    @property({ type: String })
    theme: Theme = 'light';

    /**
     * Optional custom styles to be applied when using a custom theme name.
     */
    @property({ type: Object })
    customStyles: ThemeVariables | null = null;

    updated(changedProperties: Map<string, any>) {
        console.log('AMRIXXX', changedProperties);
        if (changedProperties.has('theme') || changedProperties.has('customStyles')) {
            this.applyThemeToHost();
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        // applyThemeToHost is called in updated()
    }

    applyThemeToHost() {
        let styles = themeStyles[this.theme];

        // If theme is not found in predefined styles, check customStyles
        if (!styles && this.customStyles) {
            styles = this.customStyles;
        }

        if (styles) {
            Object.entries(styles).forEach(([key, value]) => {
                console.log(key, value);
                this.style.setProperty(key, value);
            });
        } else {
            console.warn(`[aeva-theme] Theme "${this.theme}" not found and no customStyles provided.`);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.applyThemeToHost();
    }

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'aeva-theme': AevaTheme;
    }
}