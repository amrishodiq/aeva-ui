# aeva-input

A versatile input component with multiple variants, sizes, and comprehensive validation.

## Installation

```bash
npm install @aeva/ui
```

## Usage

### Basic Usage

```html
<aeva-input placeholder="Enter text"></aeva-input>
```

### With TypeScript/JavaScript

```typescript
import '@aeva/ui';

// Or import specifically
import { AevaInput } from '@aeva/ui';
```

## Variants

The input component supports six different variants:

### Text (default)
Standard text input with optional max-length validation and regex filtering.

```html
<aeva-input 
  variant="text" 
  placeholder="Enter your name"
  maxlength="50">
</aeva-input>
```

### Password
Masked input for sensitive information.

```html
<aeva-input variant="password" placeholder="Enter password"></aeva-input>
```

### Integer
Whole numbers only with automatic validation:
- **No leading zeros** (e.g., `01`, `0123` are invalid)
- **Min/max validation** supported
- Only allows: `-`, digits

```html
<aeva-input 
  variant="integer" 
  placeholder="Age" 
  min="1" 
  max="120">
</aeva-input>
```

### Decimal
Numbers with decimal points:
- **Allows decimals** like `0.5`, `123.45`
- **No leading zeros** except for decimals (e.g., `01.5` is invalid, but `0.5` is valid)
- **Min/max validation** supported
- Only allows: `-`, digits, `.`

```html
<aeva-input 
  variant="decimal" 
  placeholder="Price" 
  min="0" 
  max="9999.99">
</aeva-input>
```

### Email
Email input with built-in validation.

```html
<aeva-input variant="email" placeholder="your.email@example.com"></aeva-input>
```

### Multiline
Textarea for longer text content.

```html
<aeva-input 
  variant="multiline" 
  placeholder="Enter description..." 
  rows="5">
</aeva-input>
```

## Sizes

Three size options are available:

```html
<!-- Small -->
<aeva-input size="sm" placeholder="Small input"></aeva-input>

<!-- Medium (default) -->
<aeva-input size="md" placeholder="Medium input"></aeva-input>

<!-- Large -->
<aeva-input size="lg" placeholder="Large input"></aeva-input>
```

## Validation

### Mandatory Validation Rules

#### Integer Variant
1. **No leading zeros**: `01`, `0123` → ❌ Invalid
2. **Zero is allowed**: `0` → ✓ Valid
3. **Negative numbers**: `-5` → ✓ Valid (if min allows)
4. **Min/max validation**: Enforced automatically

#### Decimal Variant
1. **No leading zeros** (except decimals): `01.5` → ❌, but `0.5` → ✓
2. **Decimal point allowed**: `123.45` → ✓ Valid
3. **Min/max validation**: Enforced automatically

#### Text Variant
1. **Max-length validation**: Prevents exceeding character limit
2. **Regex filtering**: Optional character filtering

### Error Handling

The component dispatches an `error` event when validation fails:

```javascript
const input = document.querySelector('aeva-input');

input.addEventListener('error', (e) => {
  console.log('Error:', e.detail.message);
  console.log('Error Code:', e.detail.code);
  console.log('Invalid Value:', e.detail.value);
});
```

#### Error Codes

| Code | Description |
|------|-------------|
| `INVALID_INTEGER` | Value is not a valid integer |
| `INVALID_DECIMAL` | Value is not a valid decimal |
| `LEADING_ZERO` | Number has leading zeros |
| `MIN_VALUE_ERROR` | Value is below minimum |
| `MAX_VALUE_ERROR` | Value exceeds maximum |
| `MAX_LENGTH_ERROR` | Text exceeds max length |
| `REGEX_MISMATCH` | Text doesn't match regex pattern |

## Regex Filtering

For the **text variant only**, you can filter allowed characters using regex patterns:

```html
<!-- Numbers only -->
<aeva-input 
  variant="text" 
  placeholder="Numbers only" 
  regex="^[0-9]*$">
</aeva-input>

<!-- Letters only -->
<aeva-input 
  variant="text" 
  placeholder="Letters only" 
  regex="^[a-zA-Z]*$">
</aeva-input>

<!-- Alphanumeric -->
<aeva-input 
  variant="text" 
  placeholder="Username" 
  regex="^[a-zA-Z0-9]*$">
</aeva-input>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'text' \| 'password' \| 'integer' \| 'decimal' \| 'email' \| 'multiline'` | `'text'` | Input variant type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `placeholder` | `string` | `''` | Placeholder text |
| `value` | `string` | `''` | Input value |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `regex` | `string` | `''` | Regex pattern for filtering (text variant only) |
| `name` | `string` | `''` | Input name attribute |
| `required` | `boolean` | `false` | Whether input is required |
| `min` | `number` | `undefined` | Minimum value (integer/decimal variants) |
| `max` | `number` | `undefined` | Maximum value (integer/decimal variants) |
| `step` | `number` | `undefined` | Step value (integer/decimal variants) |
| `maxlength` | `number` | `undefined` | Maximum character length (text variant) |
| `rows` | `number` | `undefined` | Number of rows (multiline variant) |

## Events

### input
Fired when the input value changes (only for valid values).

```javascript
input.addEventListener('input', (e) => {
  console.log('Value:', e.detail.value);
});
```

### change
Fired when the input loses focus after value change.

```javascript
input.addEventListener('change', (e) => {
  console.log('Final value:', e.detail.value);
});
```

### error
Fired when validation fails.

```javascript
input.addEventListener('error', (e) => {
  console.log('Error:', e.detail.message);
  console.log('Code:', e.detail.code);
  console.log('Value:', e.detail.value);
});
```

## Complete Examples

### Integer with Validation

```html
<aeva-input
  variant="integer"
  placeholder="Enter age"
  min="18"
  max="120"
  required
  id="age-input"
></aeva-input>

<script>
  const ageInput = document.getElementById('age-input');
  
  ageInput.addEventListener('error', (e) => {
    alert(`Validation Error: ${e.detail.message}`);
  });
  
  ageInput.addEventListener('input', (e) => {
    console.log('Valid age:', e.detail.value);
  });
</script>
```

### Decimal with Min/Max

```html
<aeva-input
  variant="decimal"
  placeholder="Enter price"
  min="0"
  max="9999.99"
  id="price-input"
></aeva-input>
```

### Text with Max-Length and Regex

```html
<aeva-input
  variant="text"
  placeholder="Username (alphanumeric only)"
  regex="^[a-zA-Z0-9]*$"
  maxlength="20"
  required
></aeva-input>
```

## CSS Customization

### Colors

```css
aeva-input {
  --aeva-input-bg: #ffffff;
  --aeva-input-border-color: #d1d5db;
  --aeva-input-text-color: #1a1a1a;
  --aeva-input-placeholder-color: #9ca3af;
  --aeva-input-error-border-color: #dc2626;
}
```

### Focus State

```css
aeva-input {
  --aeva-input-focus-border-color: #667eea;
  --aeva-input-focus-ring-color: rgba(102, 126, 234, 0.3);
  --aeva-input-focus-ring-width: 3px;
}
```

### Sizes

```css
aeva-input {
  /* Small */
  --aeva-input-padding-sm: 8px 12px;
  --aeva-input-font-size-sm: 14px;
  --aeva-input-height-sm: 36px;

  /* Medium */
  --aeva-input-padding-md: 12px 16px;
  --aeva-input-font-size-md: 16px;
  --aeva-input-height-md: 44px;

  /* Large */
  --aeva-input-padding-lg: 16px 20px;
  --aeva-input-font-size-lg: 18px;
  --aeva-input-height-lg: 52px;
}
```

## Accessibility

- Semantic HTML elements (`<input>` and `<textarea>`)
- Support for `required` attribute
- Proper `placeholder` support
- `disabled` state handling
- Focus management with visible focus rings
- Error state visual feedback
- `inputmode` attribute for mobile keyboards

## Browser Support

Works in all modern browsers supporting:
- Web Components (Custom Elements v1)
- Shadow DOM v1
- ES2015+
