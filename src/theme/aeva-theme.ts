import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createContext, provide } from '@lit-labs/context';

import type { Theme, ThemeStyles, ThemeVariables } from './types.js';
import { lightTheme } from './tokens/light.js';
import { darkTheme } from './tokens/dark.js';

export { Theme, ThemeStyles };

export const themeContext = createContext<Theme>('aeva-theme');

export const themeStyles: ThemeStyles = {
  light: lightTheme,
  dark: darkTheme,
};

@customElement('aeva-theme')
export class AevaTheme extends LitElement {
  static styles = css`
    :host {
      display: block;
      transition:
        background-color 0.3s,
        color 0.3s;
    }
  `;

  @provide({ context: themeContext })
  @property({ type: String })
  theme: Theme = 'light';

  /**
   * List of themes to cycle through when calling toggleTheme().
   */
  @property({ type: Array })
  themes: Theme[] = ['light', 'dark'];

  /**
   * Map of custom themes.
   */
  @property({ type: Object })
  customStyles: ThemeStyles | null = null;

  /**
   * If true, prevents automatic injection of Google Fonts (Inter & Outfit).
   */
  @property({ type: Boolean, attribute: 'disable-font-injection' })
  disableFontInjection = false;

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('theme') || changedProperties.has('customStyles')) {
      this.applyThemeToHost();
    }
  }

  toggleTheme() {
    const currentIndex = this.themes.indexOf(this.theme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.theme = this.themes[nextIndex];
  }

  applyThemeToHost() {
    let styles = themeStyles[this.theme];

    // Check if it's a custom theme
    if (!styles && this.customStyles && this.customStyles[this.theme]) {
      const customTheme = this.customStyles[this.theme];

      // Handle inheritance
      if ('extends' in customTheme && customTheme.extends) {
        const baseStyles = themeStyles[customTheme.extends];
        if (baseStyles) {
          this.applyVariables(baseStyles);
        }
      }

      // Apply variables (either from CustomTheme or direct ThemeVariables)
      const variables = 'variables' in customTheme ? customTheme.variables : customTheme;
      this.applyVariables(variables as ThemeVariables);
      return;
    }

    if (styles) {
      this.applyVariables(styles);
    } else {
      console.warn(`[aeva-theme] Theme "${this.theme}" not found.`);
    }
  }

  private applyVariables(variables: ThemeVariables) {
    Object.entries(variables).forEach(([key, value]) => {
      if (value) {
        this.style.setProperty(key, value);
      }
    });
  }

  private injectFonts() {
    if (this.disableFontInjection) return;

    const fontId = 'aeva-google-fonts';
    if (document.getElementById(fontId)) return;

    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@100..900&display=swap';

    document.head.appendChild(link);
  }

  connectedCallback() {
    super.connectedCallback();
    this.injectFonts();
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
