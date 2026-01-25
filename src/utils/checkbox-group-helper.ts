/**
 * Helper utility class for managing checkbox groups.
 * Provides convenient methods to get and set checked values in checkbox groups.
 * 
 * @example
 * ```typescript
 * // Get all checked values
 * const values = CheckboxGroupHelper.getValues('myGroup');
 * 
 * // Set checked values
 * CheckboxGroupHelper.setValues('myGroup', ['option1', 'option3']);
 * 
 * // Check if a specific value is checked
 * const isChecked = CheckboxGroupHelper.isChecked('myGroup', 'option2');
 * ```
 */
export class CheckboxGroupHelper {
    /**
     * Get all checked values in a checkbox group.
     * 
     * @param groupName - The name attribute of the checkbox group
     * @returns Array of checked values
     * 
     * @example
     * ```typescript
     * const selected = CheckboxGroupHelper.getValues('interests');
     * console.log(selected); // ['sports', 'music']
     * ```
     */
    static getValues(groupName: string): string[] {
        const checkboxes = document.querySelectorAll(`aeva-checkbox[name="${groupName}"]`);
        const values: string[] = [];

        checkboxes.forEach((checkbox: any) => {
            if (checkbox.checked && checkbox.value) {
                values.push(checkbox.value);
            }
        });

        return values;
    }

    /**
     * Get all checked checkbox elements in a group.
     * 
     * @param groupName - The name attribute of the checkbox group
     * @returns Array of checked checkbox elements
     * 
     * @example
     * ```typescript
     * const checkboxes = CheckboxGroupHelper.getChecked('interests');
     * checkboxes.forEach(cb => console.log(cb.value));
     * ```
     */
    static getChecked(groupName: string): HTMLElement[] {
        const checkboxes = document.querySelectorAll(`aeva-checkbox[name="${groupName}"]`);
        return Array.from(checkboxes).filter((cb: any) => cb.checked) as HTMLElement[];
    }

    /**
     * Set which checkboxes should be checked in a group.
     * 
     * @param groupName - The name attribute of the checkbox group
     * @param values - Array of values to check
     * 
     * @example
     * ```typescript
     * CheckboxGroupHelper.setValues('interests', ['sports', 'music']);
     * ```
     */
    static setValues(groupName: string, values: string[]): void {
        const checkboxes = document.querySelectorAll(`aeva-checkbox[name="${groupName}"]`);

        checkboxes.forEach((checkbox: any) => {
            checkbox.checked = values.includes(checkbox.value);
        });
    }

    /**
     * Check if a specific value is checked in a group.
     * 
     * @param groupName - The name attribute of the checkbox group
     * @param value - The value to check
     * @returns True if the value is checked, false otherwise
     * 
     * @example
     * ```typescript
     * if (CheckboxGroupHelper.isChecked('interests', 'sports')) {
     *   console.log('Sports is selected');
     * }
     * ```
     */
    static isChecked(groupName: string, value: string): boolean {
        const checkbox = document.querySelector(`aeva-checkbox[name="${groupName}"][value="${value}"]`) as any;
        return checkbox ? checkbox.checked : false;
    }

    /**
     * Check if any checkbox is checked in a group.
     * 
     * @param groupName - The name attribute of the checkbox group
     * @returns True if any checkbox is checked, false otherwise
     * 
     * @example
     * ```typescript
     * if (!CheckboxGroupHelper.hasSelection('interests')) {
     *   alert('Please select at least one interest');
     * }
     * ```
     */
    static hasSelection(groupName: string): boolean {
        return this.getValues(groupName).length > 0;
    }

    /**
     * Clear all selections in a checkbox group.
     * 
     * @param groupName - The name attribute of the checkbox group
     * 
     * @example
     * ```typescript
     * CheckboxGroupHelper.clearAll('interests');
     * ```
     */
    static clearAll(groupName: string): void {
        const checkboxes = document.querySelectorAll(`aeva-checkbox[name="${groupName}"]`);
        checkboxes.forEach((checkbox: any) => {
            checkbox.checked = false;
        });
    }

    /**
     * Select all checkboxes in a group.
     * 
     * @param groupName - The name attribute of the checkbox group
     * 
     * @example
     * ```typescript
     * CheckboxGroupHelper.selectAll('interests');
     * ```
     */
    static selectAll(groupName: string): void {
        const checkboxes = document.querySelectorAll(`aeva-checkbox[name="${groupName}"]`);
        checkboxes.forEach((checkbox: any) => {
            checkbox.checked = true;
        });
    }

    /**
     * Toggle a specific checkbox value.
     * 
     * @param groupName - The name attribute of the checkbox group
     * @param value - The value to toggle
     * 
     * @example
     * ```typescript
     * CheckboxGroupHelper.toggle('interests', 'sports');
     * ```
     */
    static toggle(groupName: string, value: string): void {
        const checkbox = document.querySelector(`aeva-checkbox[name="${groupName}"][value="${value}"]`) as any;
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
        }
    }

    /**
     * Get all checkboxes in a group.
     * 
     * @param groupName - The name attribute of the checkbox group
     * @returns Array of all checkbox elements in the group
     * 
     * @example
     * ```typescript
     * const all = CheckboxGroupHelper.getAll('interests');
     * console.log('Total options:', all.length);
     * ```
     */
    static getAll(groupName: string): HTMLElement[] {
        const checkboxes = document.querySelectorAll(`aeva-checkbox[name="${groupName}"]`);
        return Array.from(checkboxes) as HTMLElement[];
    }

    /**
     * Get count of checked checkboxes.
     * 
     * @param groupName - The name attribute of the checkbox group
     * @returns Number of checked checkboxes
     * 
     * @example
     * ```typescript
     * const count = CheckboxGroupHelper.getCount('interests');
     * console.log(`${count} interests selected`);
     * ```
     */
    static getCount(groupName: string): number {
        return this.getValues(groupName).length;
    }
}
