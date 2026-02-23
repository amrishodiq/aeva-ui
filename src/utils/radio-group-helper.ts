import { AevaRadio } from '../components/atoms/aeva-radio';

/**
 * Helper utility class for managing radio button groups.
 * Provides convenient methods to get and set selected values in radio groups.
 *
 * @example
 * ```typescript
 * // Get selected value
 * const value = RadioGroupHelper.getValue('myGroup');
 *
 * // Set selected value
 * RadioGroupHelper.setValue('myGroup', 'option2');
 *
 * // Get the selected radio element
 * const radio = RadioGroupHelper.getRadio('myGroup');
 *
 * // Check if any radio is selected
 * const hasSelection = RadioGroupHelper.hasSelection('myGroup');
 * ```
 */
export class RadioGroupHelper {
  /**
   * Get the value of the selected radio in a group.
   *
   * @param groupName - The name attribute of the radio group
   * @returns The value of the selected radio, or null if none selected
   *
   * @example
   * ```typescript
   * const selectedValue = RadioGroupHelper.getValue('paymentMethod');
   * console.log(selectedValue); // 'credit-card' or null
   * ```
   */
  static getValue(groupName: string): string | null {
    const radios = document.querySelectorAll(`aeva-radio[name="${groupName}"]`);
    const checked = Array.from(radios).find((r) => (r as AevaRadio).checked) as
      | AevaRadio
      | undefined;
    return checked ? checked.value : null;
  }

  /**
   * Get the selected radio element in a group.
   *
   * @param groupName - The name attribute of the radio group
   * @returns The selected radio element, or null if none selected
   *
   * @example
   * ```typescript
   * const radio = RadioGroupHelper.getRadio('paymentMethod');
   * if (radio) {
   *   console.log('Selected:', radio.value);
   * }
   * ```
   */
  static getRadio(groupName: string): AevaRadio | null {
    const radios = document.querySelectorAll(`aeva-radio[name="${groupName}"]`);
    return (Array.from(radios).find((r) => (r as AevaRadio).checked) as AevaRadio) || null;
  }

  /**
   * Set the selected radio in a group by value.
   *
   * @param groupName - The name attribute of the radio group
   * @param value - The value to select
   * @returns True if a radio was found and selected, false otherwise
   *
   * @example
   * ```typescript
   * RadioGroupHelper.setValue('paymentMethod', 'paypal');
   * ```
   */
  static setValue(groupName: string, value: string): boolean {
    const radios = document.querySelectorAll(`aeva-radio[name="${groupName}"]`);
    let found = false;

    radios.forEach((radio) => {
      const r = radio as AevaRadio;
      if (r.value === value) {
        r.checked = true;
        found = true;
      } else {
        r.checked = false;
      }
    });

    return found;
  }

  /**
   * Check if any radio is selected in a group.
   *
   * @param groupName - The name attribute of the radio group
   * @returns True if any radio is selected, false otherwise
   *
   * @example
   * ```typescript
   * if (!RadioGroupHelper.hasSelection('paymentMethod')) {
   *   alert('Please select a payment method');
   * }
   * ```
   */
  static hasSelection(groupName: string): boolean {
    return this.getValue(groupName) !== null;
  }

  /**
   * Clear the selection in a radio group (uncheck all radios).
   * Note: This is not standard radio behavior, use with caution.
   *
   * @param groupName - The name attribute of the radio group
   *
   * @example
   * ```typescript
   * RadioGroupHelper.clearSelection('paymentMethod');
   * ```
   */
  static clearSelection(groupName: string): void {
    const radios = document.querySelectorAll(`aeva-radio[name="${groupName}"]`);
    radios.forEach((radio) => {
      (radio as AevaRadio).checked = false;
    });
  }

  /**
   * Get all radios in a group.
   *
   * @param groupName - The name attribute of the radio group
   * @returns Array of radio elements in the group
   *
   * @example
   * ```typescript
   * const radios = RadioGroupHelper.getAll('paymentMethod');
   * console.log('Total options:', radios.length);
   * ```
   */
  static getAll(groupName: string): AevaRadio[] {
    const radios = document.querySelectorAll(`aeva-radio[name="${groupName}"]`);
    return Array.from(radios) as AevaRadio[];
  }
}
