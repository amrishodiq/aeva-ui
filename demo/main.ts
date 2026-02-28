// Demo page entry point
// Import all components from the library for showcase

// Import library
import '../src/index';

console.log('Demo page loaded!');
console.log('Hot reload is active - edit files in src/ to see changes');


// Future: Add more component showcases here
// Import components for demo
import '../src/components/atoms/aeva-button';
import '../src/components/atoms/aeva-text';
import '../src/components/atoms/aeva-input';
import '../src/components/atoms/aeva-radio';
import '../src/components/atoms/aeva-checkbox';
// import '../src/components/atoms/card';

// Import utilities
import { RadioGroupHelper } from '../src/utils/radio-group-helper';
import { CheckboxGroupHelper } from '../src/utils/checkbox-group-helper';

// Internal Documentation Components (not exported in library)
import './src/components/aeva-doc-page';
import './src/components/aeva-doc-section';
import './src/components/aeva-doc-example';

// Demo: Getting Selected Value examples
document.addEventListener('DOMContentLoaded', () => {
    const valueResult = document.getElementById('value-result');

    // Method 1: Direct Query
    document.getElementById('get-value-query')?.addEventListener('click', () => {
        const selected = document.querySelector('aeva-radio[name="payment"][checked]') as any;
        const value = selected ? selected.value : null;

        if (valueResult) {
            valueResult.innerHTML = `
        <strong>Method: Direct Query</strong><br>
        Code: document.querySelector('aeva-radio[name="payment"][checked]')<br>
        Result: <span style="color: #10b981; font-weight: bold;">${value || 'null (nothing selected)'}</span>
      `;
        }
    });

    // Method 2: RadioGroupHelper
    document.getElementById('get-value-helper')?.addEventListener('click', () => {
        const value = RadioGroupHelper.getValue('payment');

        if (valueResult) {
            valueResult.innerHTML = `
        <strong>Method: RadioGroupHelper</strong><br>
        Code: RadioGroupHelper.getValue('payment')<br>
        Result: <span style="color: #10b981; font-weight: bold;">${value || 'null (nothing selected)'}</span>
      `;
        }
    });

    // Set value to PayPal
    document.getElementById('set-value-paypal')?.addEventListener('click', () => {
        const success = RadioGroupHelper.setValue('payment', 'paypal');

        if (valueResult) {
            valueResult.innerHTML = `
        <strong>Method: RadioGroupHelper.setValue()</strong><br>
        Code: RadioGroupHelper.setValue('payment', 'paypal')<br>
        Result: <span style="color: #10b981; font-weight: bold;">${success ? 'Success! PayPal selected' : 'Failed'}</span>
      `;
        }
    });

    // Check if has selection
    document.getElementById('check-selection')?.addEventListener('click', () => {
        const hasSelection = RadioGroupHelper.hasSelection('payment');
        const value = RadioGroupHelper.getValue('payment');

        if (valueResult) {
            valueResult.innerHTML = `
        <strong>Method: RadioGroupHelper.hasSelection()</strong><br>
        Code: RadioGroupHelper.hasSelection('payment')<br>
        Has Selection: <span style="color: ${hasSelection ? '#10b981' : '#dc2626'}; font-weight: bold;">${hasSelection}</span><br>
        ${hasSelection ? `Selected Value: <span style="color: #10b981; font-weight: bold;">${value}</span>` : ''}
      `;
        }
    });

    // Checkbox Demo Handlers
    const checkboxResult = document.getElementById('checkbox-result');

    // AevaSelect Demo (Delegated because documentation is loaded via AJAX)
    document.addEventListener('selected', (e: any) => {
        if (e.target.id === 'select-demo') {
            const status = document.getElementById('selection-status');
            if (status) {
                status.innerHTML = `Selected: <span style="font-weight: 600; color: var(--aeva-primary-color);">${e.detail.label}</span>`;
            }
        }
    });

    // Get checkbox values
    document.getElementById('get-checkbox-values')?.addEventListener('click', () => {
        const values = CheckboxGroupHelper.getValues('interests');

        if (checkboxResult) {
            checkboxResult.innerHTML = `
        <strong>Method: CheckboxGroupHelper.getValues()</strong><br>
        Code: CheckboxGroupHelper.getValues('interests')<br>
        Result: <span style="color: #10b981; font-weight: bold;">[${values.length > 0 ? values.map(v => `"${v}"`).join(', ') : 'empty array'}]</span><br>
        Count: <span style="color: #10b981; font-weight: bold;">${values.length}</span>
      `;
        }
    });

    // Select all
    document.getElementById('select-all-interests')?.addEventListener('click', () => {
        CheckboxGroupHelper.selectAll('interests');

        if (checkboxResult) {
            checkboxResult.innerHTML = `
        <strong>Method: CheckboxGroupHelper.selectAll()</strong><br>
        Code: CheckboxGroupHelper.selectAll('interests')<br>
        Result: <span style="color: #10b981; font-weight: bold;">All checkboxes selected!</span>
      `;
        }
    });

    // Clear all
    document.getElementById('clear-all-interests')?.addEventListener('click', () => {
        CheckboxGroupHelper.clearAll('interests');

        if (checkboxResult) {
            checkboxResult.innerHTML = `
        <strong>Method: CheckboxGroupHelper.clearAll()</strong><br>
        Code: CheckboxGroupHelper.clearAll('interests')<br>
        Result: <span style="color: #10b981; font-weight: bold;">All checkboxes cleared!</span>
      `;
        }
    });

    // Check selection
    document.getElementById('check-checkbox-selection')?.addEventListener('click', () => {
        const hasSelection = CheckboxGroupHelper.hasSelection('interests');
        const count = CheckboxGroupHelper.getCount('interests');
        const values = CheckboxGroupHelper.getValues('interests');

        if (checkboxResult) {
            checkboxResult.innerHTML = `
        <strong>Method: CheckboxGroupHelper.hasSelection()</strong><br>
        Code: CheckboxGroupHelper.hasSelection('interests')<br>
        Has Selection: <span style="color: ${hasSelection ? '#10b981' : '#dc2626'}; font-weight: bold;">${hasSelection}</span><br>
        Count: <span style="color: #10b981; font-weight: bold;">${count}</span><br>
        ${hasSelection ? `Values: <span style="color: #10b981; font-weight: bold;">${values.join(', ')}</span>` : ''}
      `;
        }
    });
});

