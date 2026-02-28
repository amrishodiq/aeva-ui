import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * A versatile input component with regex-based validation.
 * Variants serve as preset shortcuts for common input patterns.
 *
 * @slot - Not used (input is self-contained)
 *
 * @fires input - Fired when input value changes
 * @fires change - Fired when input loses focus after value change
 * @fires error - Fired when validation fails
 *
 * @csspart input - The input/textarea element
 * @csspart container - The container wrapper
 *
 * @cssprop --aeva-input-font-family - Font family for input text
 * @cssprop --aeva-input-border-radius - Border radius for inputs (default: 22px)
 * @cssprop --aeva-input-transition - Transition timing for state changes
 *
 * @cssprop --aeva-input-bg - Background color
 * @cssprop --aeva-input-border-color - Border color
 * @cssprop --aeva-input-text-color - Text color
 * @cssprop --aeva-input-placeholder-color - Placeholder text color
 * @cssprop --aeva-input-error-border-color - Border color on error
 *
 * @cssprop --aeva-input-focus-border-color - Border color on focus
 * @cssprop --aeva-input-focus-ring-color - Focus ring color
 * @cssprop --aeva-input-focus-ring-width - Focus ring width
 * @cssprop --aeva-input-focus-ring-offset - Focus ring offset
 *
 * @cssprop --aeva-input-hover-border-color - Border color on hover
 *
 * @cssprop --aeva-input-disabled-bg - Background color when disabled
 * @cssprop --aeva-input-disabled-border-color - Border color when disabled
 * @cssprop --aeva-input-disabled-text-color - Text color when disabled
 * @cssprop --aeva-input-disabled-opacity - Opacity when disabled
 *
 * @cssprop --aeva-input-flat-bg - Background color for flat appearance
 * @cssprop --aeva-input-flat-hover-bg - Background color on hover for flat appearance
 * @cssprop --aeva-input-flat-focus-bg - Background color on focus for flat appearance
 *
 * @cssprop --aeva-input-padding-sm - Padding for small input
 * @cssprop --aeva-input-font-size-sm - Font size for small input
 * @cssprop --aeva-input-height-sm - Height for small input
 *
 * @cssprop --aeva-input-padding-md - Padding for medium input
 * @cssprop --aeva-input-font-size-md - Font size for medium input
 * @cssprop --aeva-input-height-md - Height for medium input
 *
 * @cssprop --aeva-input-padding-lg - Padding for large input
 * @cssprop --aeva-input-font-size-lg - Font size for large input
 * @cssprop --aeva-input-height-lg - Height for large input
 *
 * @cssprop --aeva-input-multiline-min-height - Minimum height for multiline
 */
@customElement('aeva-input')
export class AevaInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .container {
      width: 100%;
    }

    input,
    textarea {
      font-family: var(--aeva-input-font-family);
      width: 100%;
      border: 2px solid var(--aeva-input-border-color);
      border-radius: var(--aeva-input-border-radius);
      background-color: var(--aeva-input-bg);
      color: var(--aeva-input-text-color);
      transition: var(--aeva-input-transition);
      outline: none;
      box-sizing: border-box;
    }

    input::placeholder,
    textarea::placeholder {
      color: var(--aeva-input-placeholder-color);
    }

    /* Hover state */
    input:hover:not(:disabled),
    textarea:hover:not(:disabled) {
      border-color: var(--aeva-input-hover-border-color);
    }

    /* Focus state */
    input:focus,
    textarea:focus {
      border-color: var(--aeva-input-focus-border-color);
      box-shadow: 0 0 0 var(--aeva-input-focus-ring-width) var(--aeva-input-focus-ring-color);
    }

    /* Error state */
    .error input,
    .error textarea {
      border-color: var(--aeva-input-error-border-color);
    }

    .error input:focus,
    .error textarea:focus {
      box-shadow: 0 0 0 var(--aeva-input-focus-ring-width) rgba(220, 38, 38, 0.3);
    }

    /* Disabled state */
    input:disabled,
    textarea:disabled {
      background-color: var(--aeva-input-disabled-bg);
      border-color: var(--aeva-input-disabled-border-color);
      color: var(--aeva-input-disabled-text-color);
      opacity: var(--aeva-input-disabled-opacity);
      cursor: not-allowed;
    }

    /* Size variants for input */
    .size-sm input {
      padding: var(--aeva-input-padding-sm);
      font-size: var(--aeva-input-font-size-sm);
      height: var(--aeva-input-height-sm);
    }

    .size-md input {
      padding: var(--aeva-input-padding-md);
      font-size: var(--aeva-input-font-size-md);
      height: var(--aeva-input-height-md);
    }

    .size-lg input {
      padding: var(--aeva-input-padding-lg);
      font-size: var(--aeva-input-font-size-lg);
      height: var(--aeva-input-height-lg);
    }

    /* Size variants for textarea */
    .size-sm textarea {
      padding: var(--aeva-input-padding-sm);
      font-size: var(--aeva-input-font-size-sm);
      min-height: var(--aeva-input-multiline-min-height);
    }

    .size-md textarea {
      padding: var(--aeva-input-padding-md);
      font-size: var(--aeva-input-font-size-md);
      min-height: var(--aeva-input-multiline-min-height);
    }

    .size-lg textarea {
      padding: var(--aeva-input-padding-lg);
      font-size: var(--aeva-input-font-size-lg);
      min-height: var(--aeva-input-multiline-min-height);
    }

    /* Textarea specific */
    textarea {
      resize: vertical;
      line-height: 1.5;
    }

    /* Flat appearance */
    .appearance-flat input,
    .appearance-flat textarea {
      border: none;
      background-color: var(--aeva-input-flat-bg);
    }

    .appearance-flat input:hover:not(:disabled),
    .appearance-flat textarea:hover:not(:disabled) {
      background-color: var(--aeva-input-flat-hover-bg);
    }

    .appearance-flat input:focus,
    .appearance-flat textarea:focus {
      background-color: var(--aeva-input-flat-focus-bg);
      box-shadow: none;
    }

    /* Error state for flat appearance */
    .appearance-flat.error input,
    .appearance-flat.error textarea {
      border: 2px solid var(--aeva-input-error-border-color);
    }

    .appearance-flat.error input:focus,
    .appearance-flat.error textarea:focus {
      box-shadow: 0 0 0 var(--aeva-input-focus-ring-width) rgba(220, 38, 38, 0.3);
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      input,
      textarea {
        transition: none;
      }
    }
  `;

  /**
   * Input variant type (serves as preset for common patterns)
   * - text: No restrictions
   * - password: Masked input
   * - integer: Whole numbers only (uses regex ^-?\d*$)
   * - decimal: Decimal numbers (uses regex ^-?\d*\.?\d*$)
   * - email: Email input with browser validation
   * - multiline: Textarea for longer text
   */
  @property({ type: String, reflect: true })
  variant: 'text' | 'password' | 'integer' | 'decimal' | 'email' | 'multiline' = 'text';

  /**
   * Input size
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Input appearance style
   */
  @property({ type: String, reflect: true })
  appearance: 'bordered' | 'flat' = 'bordered';

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Input value
   */
  @property({ type: String })
  value = '';

  /**
   * Whether the input is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Regex pattern for filtering allowed characters
   * Overrides variant preset if specified
   * Example: "^[0-9]*$" for numbers only, "^[a-zA-Z ]*$" for letters and spaces
   */
  @property({ type: String })
  regex = '';

  /**
   * Input name attribute
   */
  @property({ type: String })
  name = '';

  /**
   * Whether the input is required
   */
  @property({ type: Boolean })
  required = false;

  /**
   * Minimum value (for integer and decimal variants)
   */
  @property({ type: Number })
  min?: number;

  /**
   * Maximum value (for integer and decimal variants)
   */
  @property({ type: Number })
  max?: number;

  /**
   * Step value (for integer and decimal variants)
   */
  @property({ type: Number })
  step?: number;

  /**
   * Maximum length (for text variant)
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Number of rows for multiline variant
   */
  @property({ type: Number })
  rows?: number;

  @state()
  private _internalValue = '';

  @state()
  private _hasError = false;

  connectedCallback() {
    super.connectedCallback();
    this._internalValue = this.value;
  }

  protected willUpdate(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('value')) {
      this._internalValue = this.value;
    }
  }

  /**
   * Get the regex pattern for the current variant
   */
  private _getVariantRegex(): string {
    // Custom regex overrides variant preset
    if (this.regex) {
      return this.regex;
    }

    // Variant presets
    switch (this.variant) {
      case 'integer':
        return '^-?\\d*$';
      case 'decimal':
        return '^-?\\d*\\.?\\d*$';
      case 'text':
      case 'password':
      case 'email':
      case 'multiline':
      default:
        return '';
    }
  }

  private _dispatchError(message: string, code: string) {
    this._hasError = true;
    this.dispatchEvent(
      new CustomEvent('error', {
        detail: {
          message,
          code,
          value: this._internalValue,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _clearError() {
    this._hasError = false;
  }

  /**
   * Validate numeric min/max constraints
   */
  private _validateNumericRange(value: string): boolean {
    if (value === '' || value === '-' || value.endsWith('.')) {
      this._clearError();
      return true;
    }

    // Check for leading zeros (except "0" or "0.xxx")
    if (/^0\d+/.test(value) || /^-0\d+/.test(value)) {
      this._dispatchError('Number cannot have leading zeros', 'LEADING_ZERO');
      return false;
    }

    const numValue = this.variant === 'integer' ? parseInt(value, 10) : parseFloat(value);

    if (isNaN(numValue)) {
      this._clearError();
      return true; // Let regex handle format validation
    }

    // Check min
    if (this.min !== undefined && numValue < this.min) {
      this._dispatchError(`Value must be at least ${this.min}`, 'MIN_VALUE_ERROR');
      return false;
    }

    // Check max
    if (this.max !== undefined && numValue > this.max) {
      this._dispatchError(`Value must be at most ${this.max}`, 'MAX_VALUE_ERROR');
      return false;
    }

    this._clearError();
    return true;
  }

  /**
   * Validate text length
   */
  private _validateTextLength(value: string): boolean {
    if (this.maxlength !== undefined && value.length > this.maxlength) {
      this._dispatchError(`Text cannot exceed ${this.maxlength} characters`, 'MAX_LENGTH_ERROR');
      return false;
    }

    this._clearError();
    return true;
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    let newValue = target.value;

    // Get the effective regex pattern (custom or variant preset)
    const regexPattern = this._getVariantRegex();

    // Apply regex filter if pattern exists
    if (regexPattern) {
      try {
        const regex = new RegExp(regexPattern);
        if (!regex.test(newValue)) {
          // Revert to previous value if regex doesn't match
          target.value = this._internalValue;
          this._dispatchError('Input does not match required format', 'INVALID_FORMAT');
          return;
        }
      } catch (error) {
        console.warn('[aeva-input] Invalid regex pattern:', regexPattern);
      }
    }

    // Additional validation based on variant
    let isValid = true;

    // Numeric range validation for integer and decimal
    if (this.variant === 'integer' || this.variant === 'decimal') {
      isValid = this._validateNumericRange(newValue);
    }

    // Text length validation
    if (this.variant === 'text' || this.variant === 'multiline') {
      isValid = this._validateTextLength(newValue);
    }

    // If validation fails, revert to previous value
    if (!isValid) {
      target.value = this._internalValue;
      return;
    }

    this._internalValue = newValue;
    this.value = newValue;

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: newValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleChange(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: target.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const classes = {
      container: true,
      [`size-${this.size}`]: true,
      [`appearance-${this.appearance}`]: true,
      error: this._hasError,
    };

    if (this.variant === 'multiline') {
      return html`
        <div class="${classMap(classes)}" part="container">
          <textarea
            part="input"
            .value="${this._internalValue}"
            @input="${this._handleInput}"
            @change="${this._handleChange}"
            ?disabled="${this.disabled}"
            placeholder="${this.placeholder}"
            name="${this.name}"
            ?required="${this.required}"
            maxlength="${this.maxlength || ''}"
            rows="${this.rows || ''}"
            aria-invalid="${this._hasError}"
          ></textarea>
        </div>
      `;
    }

    // Determine input type
    let inputType = 'text';
    if (this.variant === 'password') inputType = 'password';
    else if (this.variant === 'integer' || this.variant === 'decimal')
      inputType = 'text'; // Use text to have full control over validation
    else if (this.variant === 'email') inputType = 'email';

    return html`
      <div class="${classMap(classes)}" part="container">
        <input
          part="input"
          type="${inputType}"
          .value="${this._internalValue}"
          @input="${this._handleInput}"
          @change="${this._handleChange}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          name="${this.name}"
          ?required="${this.required}"
          maxlength="${this.maxlength || ''}"
          inputmode="${this.variant === 'integer'
        ? 'numeric'
        : this.variant === 'decimal'
          ? 'decimal'
          : 'text'}"
          aria-invalid="${this._hasError}"
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-input': AevaInput;
  }
}
