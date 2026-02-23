import { css } from 'lit';

/**
 * Shared accessibility styles for all Aeva UI components.
 *
 * Features:
 * 1. Respects prefers-reduced-motion: reduce by disabling animations and transitions globally
 * 2. Forces instant scroll behavior
 * 3. High contrast mode adjustments (if needed in future)
 */
export const accessibilityStyles = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after,
    :host {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
