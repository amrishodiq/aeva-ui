import { ThemeVariables } from '../types';
import { sharedTokens } from './token';
import { colorTokens } from './color';

export const lightTheme: ThemeVariables = {
    ...sharedTokens,
    ...colorTokens,
    // Global
    '--aeva-font-family': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    '--aeva-page-bg': 'var(--aeva-color-white)',
    '--aeva-page-gradient': 'linear-gradient(135deg, var(--aeva-color-gray-50) 0%, var(--aeva-color-gray-200) 100%)',
    '--aeva-primary-color': 'var(--aeva-color-indigo-500)',
    '--aeva-primary-hover': 'var(--aeva-color-indigo-600)',
    '--aeva-secondary-color': 'var(--aeva-color-gray-600)',
    '--aeva-text-color': 'var(--aeva-color-gray-900)',
    '--aeva-text-muted': 'var(--aeva-color-gray-500)',
    '--aeva-card-bg': 'var(--aeva-color-white)',
    '--aeva-card-border-color': 'var(--aeva-color-gray-200)',
    '--aeva-card-border-width': 'var(--aeva-border-thin)',
    '--aeva-card-border-hover-color': 'var(--aeva-color-indigo-500)',
    '--aeva-card-border-radius': 'var(--aeva-border-radius-md)',
    '--aeva-card-transition': 'var(--aeva-transition-normal)',
    '--aeva-card-padding-sm': 'var(--aeva-space-sm)',
    '--aeva-card-padding-md': 'var(--aeva-space-md)',
    '--aeva-card-padding-lg': 'var(--aeva-space-lg)',

    // Button
    '--aeva-button-font-family': "inherit",
    '--aeva-button-border-radius': '50vh',
    '--aeva-button-transition': 'var(--aeva-transition-normal)',
    '--aeva-button-gap': 'var(--aeva-space-xs)',
    '--aeva-button-focus-ring-color': 'var(--aeva-color-indigo-500)',
    '--aeva-button-focus-ring-width': '3px',
    '--aeva-button-focus-ring-offset': '2px',
    '--aeva-button-primary-bg': 'var(--aeva-color-indigo-500)',
    '--aeva-button-primary-color': 'var(--aeva-color-white)',
    '--aeva-button-primary-hover-bg': 'var(--aeva-color-indigo-600)',
    '--aeva-button-primary-active-bg': 'var(--aeva-color-indigo-700)',
    '--aeva-button-secondary-bg': 'var(--aeva-color-gray-600)',
    '--aeva-button-secondary-color': 'var(--aeva-color-white)',
    '--aeva-button-secondary-hover-bg': 'var(--aeva-color-gray-700)',
    '--aeva-button-secondary-active-bg': 'var(--aeva-color-gray-800)',
    '--aeva-button-outline-border-color': 'var(--aeva-color-indigo-500)',
    '--aeva-button-outline-color': 'var(--aeva-color-indigo-500)',
    '--aeva-button-outline-hover-bg': 'rgba(102, 126, 234, 0.1)',
    '--aeva-button-outline-active-bg': 'rgba(102, 126, 234, 0.2)',
    '--aeva-button-ghost-color': '#667eea',
    '--aeva-button-ghost-hover-bg': 'rgba(102, 126, 234, 0.1)',
    '--aeva-button-ghost-active-bg': 'rgba(102, 126, 234, 0.2)',
    '--aeva-button-danger-bg': 'var(--aeva-color-red-600)',
    '--aeva-button-danger-color': 'var(--aeva-color-white)',
    '--aeva-button-danger-hover-bg': 'var(--aeva-color-red-700)',
    '--aeva-button-danger-active-bg': 'var(--aeva-color-red-800)',
    '--aeva-button-disabled-opacity': '0.5',
    '--aeva-button-disabled-cursor': 'not-allowed',
    '--aeva-button-padding-sm': 'var(--aeva-space-xs) var(--aeva-space-lg)',
    '--aeva-button-font-size-sm': 'var(--aeva-font-size-sm)',
    '--aeva-button-padding-md': 'var(--aeva-space-smd) var(--aeva-space-xl)',
    '--aeva-button-font-size-md': 'var(--aeva-font-size-sm)',
    '--aeva-button-padding-lg': 'var(--aeva-space-sm) var(--aeva-space-2xl)',
    '--aeva-button-font-size-lg': 'var(--aeva-font-size-md)',
    '--aeva-button-icon-padding-sm': 'var(--aeva-space-xs)', // 8px
    '--aeva-button-icon-width-sm': '2.75rem',              // 44px
    '--aeva-button-icon-padding-md': 'var(--aeva-space-smd)', // 12px
    '--aeva-button-icon-width-md': '3rem',                 // 48px
    '--aeva-button-icon-padding-lg': 'var(--aeva-space-sm)',  // 16px
    '--aeva-button-icon-width-lg': '3.5rem',               // 56px

    // Input
    '--aeva-input-font-family': "inherit",
    '--aeva-input-border-radius': 'var(--aeva-border-radius-md)',
    '--aeva-input-transition': 'var(--aeva-transition-normal)',
    '--aeva-input-bg': 'var(--aeva-color-white)',
    '--aeva-input-border-color': 'var(--aeva-color-gray-300)',
    '--aeva-input-text-color': 'var(--aeva-color-gray-900)',
    '--aeva-input-placeholder-color': 'var(--aeva-color-gray-400)',
    '--aeva-input-error-border-color': 'var(--aeva-color-red-600)',
    '--aeva-input-focus-border-color': 'var(--aeva-color-indigo-500)',
    '--aeva-input-focus-ring-color': 'rgba(102, 126, 234, 0.3)',
    '--aeva-input-focus-ring-width': '3px',
    '--aeva-input-focus-ring-offset': '0px',
    '--aeva-input-hover-border-color': '#9ca3af',
    '--aeva-input-disabled-bg': 'var(--aeva-color-gray-100)',
    '--aeva-input-disabled-border-color': 'var(--aeva-color-gray-200)',
    '--aeva-input-disabled-text-color': 'var(--aeva-color-gray-400)',
    '--aeva-input-disabled-opacity': '0.6',
    '--aeva-input-flat-bg': 'transparent',
    '--aeva-input-flat-hover-bg': 'rgba(0, 0, 0, 0.05)',
    '--aeva-input-flat-focus-bg': 'rgba(0, 0, 0, 0.08)',
    '--aeva-input-padding-sm': 'var(--aeva-space-xs) var(--aeva-space-smd)',
    '--aeva-input-font-size-sm': 'var(--aeva-font-size-sm)',
    '--aeva-input-height-sm': '2.25rem', // 36px
    '--aeva-input-padding-md': 'var(--aeva-space-smd) var(--aeva-space-sm)',
    '--aeva-input-font-size-md': 'var(--aeva-font-size-sm)',
    '--aeva-input-height-md': '2.75rem', // 44px
    '--aeva-input-padding-lg': 'var(--aeva-space-sm) var(--aeva-space-xl)',
    '--aeva-input-font-size-lg': 'var(--aeva-font-size-md)',
    '--aeva-input-height-lg': '3.25rem', // 52px
    '--aeva-input-multiline-min-height': '100px',

    // Badge
    '--aeva-badge-font-family': "inherit",
    '--aeva-badge-border-radius': '16px',
    '--aeva-badge-transition': 'var(--aeva-transition-normal)',
    '--aeva-badge-gap': '6px',
    '--aeva-badge-primary-bg': 'var(--aeva-color-indigo-100)',
    '--aeva-badge-primary-color': 'var(--aeva-color-indigo-700)',
    '--aeva-badge-primary-border': 'var(--aeva-color-indigo-200)',
    '--aeva-badge-secondary-bg': 'var(--aeva-color-gray-100)',
    '--aeva-badge-secondary-color': 'var(--aeva-color-gray-700)',
    '--aeva-badge-secondary-border': 'var(--aeva-color-gray-200)',
    '--aeva-badge-success-bg': 'var(--aeva-color-green-100)',
    '--aeva-badge-success-color': 'var(--aeva-color-green-700)',
    '--aeva-badge-success-border': 'var(--aeva-color-green-200)',
    '--aeva-badge-warning-bg': 'var(--aeva-color-yellow-100)',
    '--aeva-badge-warning-color': 'var(--aeva-color-yellow-700)',
    '--aeva-badge-warning-border': 'var(--aeva-color-yellow-200)',
    '--aeva-badge-danger-bg': 'var(--aeva-color-red-100)',
    '--aeva-badge-danger-color': 'var(--aeva-color-red-700)',
    '--aeva-badge-danger-border': 'var(--aeva-color-red-200)',
    '--aeva-badge-info-bg': 'var(--aeva-color-blue-100)',
    '--aeva-badge-info-color': 'var(--aeva-color-blue-700)',
    '--aeva-badge-info-border': 'var(--aeva-color-blue-200)',
    '--aeva-badge-padding-sm': 'var(--aeva-space-xxs) var(--aeva-space-xs)', // 4px 8px
    '--aeva-badge-font-size-sm': 'var(--aeva-font-size-2xs)',
    '--aeva-badge-padding-md': 'var(--aeva-space-xs) var(--aeva-space-smd)', // 8px 12px
    '--aeva-badge-font-size-md': 'var(--aeva-font-size-sm)',
    '--aeva-badge-padding-lg': 'var(--aeva-space-smd) var(--aeva-space-sm)', // 12px 16px
    '--aeva-badge-font-size-lg': 'var(--aeva-font-size-sm)',
    '--aeva-badge-delete-size': '16px',
    '--aeva-badge-delete-hover-bg': 'rgba(0, 0, 0, 0.1)',

    // Modal
    '--aeva-modal-bg': 'rgba(255, 255, 255, 0.8)',
    '--aeva-modal-backdrop-bg': 'rgba(0, 0, 0, 0.4)',
    '--aeva-modal-border-color': 'rgba(255, 255, 255, 0.5)',
    '--aeva-modal-border-width': 'var(--aeva-border-thin)',
    '--aeva-modal-shadow-color': 'var(--aeva-shadow-md)',
    '--aeva-modal-blur': 'var(--aeva-blur-lg)',
    '--aeva-modal-padding': 'var(--aeva-space-lg)',
    '--aeva-modal-max-width': '600px',
    '--aeva-modal-border-radius': 'var(--aeva-border-radius-md)',
    '--aeva-modal-shimmer-gradient': 'linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.6) 100%)',

    // Progress
    '--aeva-progress-color': 'var(--aeva-color-indigo-500)',
    '--aeva-progress-bg': 'var(--aeva-color-gray-200)',
    '--aeva-progress-thickness': '0.5rem', // 8px
    '--aeva-progress-border-radius': '999px',
    '--aeva-progress-label-color': 'var(--aeva-color-gray-800)',
    '--aeva-progress-size-sm': '5rem',   // 80px
    '--aeva-progress-size-md': '7.5rem', // 120px
    '--aeva-progress-size-lg': '10rem',  // 160px
    '--aeva-progress-animation-duration': '1.5s',
    '--aeva-progress-label-font-size': '0.875rem', // 14px

    // Radio
    '--aeva-radio-unchecked-stroke': 'var(--aeva-color-gray-400)',
    '--aeva-radio-unchecked-bg': 'var(--aeva-color-white)',
    '--aeva-radio-checked-stroke': 'var(--aeva-color-indigo-500)',
    '--aeva-radio-checked-bg': 'var(--aeva-color-indigo-500)',
    '--aeva-radio-checkmark-color': 'var(--aeva-color-white)',
    '--aeva-radio-size': '20px',
    '--aeva-radio-transition': 'var(--aeva-transition-normal)',
    '--aeva-radio-disabled-opacity': '0.5',

    // Checkbox
    '--aeva-checkbox-unchecked-stroke': 'var(--aeva-color-gray-400)',
    '--aeva-checkbox-unchecked-bg': 'var(--aeva-color-white)',
    '--aeva-checkbox-checked-stroke': 'var(--aeva-color-indigo-500)',
    '--aeva-checkbox-checked-bg': 'var(--aeva-color-indigo-500)',
    '--aeva-checkbox-checkmark-color': 'var(--aeva-color-white)',
    '--aeva-checkbox-size': '20px',
    '--aeva-checkbox-border-radius': '6px',
    '--aeva-checkbox-transition': 'var(--aeva-transition-normal)',
    '--aeva-checkbox-disabled-opacity': '0.5',

    // Rating
    '--aeva-rating-color': '#fbbf24',
    '--aeva-rating-empty-color': 'var(--aeva-color-gray-200)',
    '--aeva-rating-hover-color': '#f59e0b',
    '--aeva-rating-label-color': '#6b7280',
    '--aeva-rating-size-sm': '16px',
    '--aeva-rating-size-md': '24px',
    '--aeva-rating-size-lg': '32px',

    // Tooltip
    '--aeva-tooltip-bg': 'rgba(0, 0, 0, 0.9)',
    '--aeva-tooltip-color': '#ffffff',
    '--aeva-tooltip-blur': 'var(--aeva-blur-md)',
    '--aeva-tooltip-border-radius': 'var(--aeva-border-radius-md)',
    '--aeva-tooltip-padding': '0.5rem 0.75rem',
    '--aeva-tooltip-font-size': 'var(--aeva-font-size-2xs)',
    '--aeva-tooltip-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.2)',

    // Icon
    '--aeva-icon-bg': 'var(--aeva-color-gray-50)',
    '--aeva-icon-color': 'var(--aeva-color-indigo-500)',
    '--aeva-icon-border-color': '#000000',
    '--aeva-icon-border-width': '2px',
    '--aeva-icon-size-sm': '2.5rem', // 40px
    '--aeva-icon-size-md': '3.5rem', // 56px
    '--aeva-icon-size-lg': '4.5rem', // 72px

    // List Item
    '--aeva-list-item-padding': 'var(--aeva-space-smd) var(--aeva-space-sm)',
    '--aeva-list-item-gap': 'var(--aeva-space-sm)',
    '--aeva-list-item-bg': 'transparent',
    '--aeva-list-item-color': '#1a1a1a',
    '--aeva-list-item-hover-bg': 'rgba(0, 0, 0, 0.04)',
    '--aeva-list-item-active-bg': 'rgba(102, 126, 234, 0.08)',
    '--aeva-list-item-border-radius': '0',
    '--aeva-list-item-transition': 'background-color var(--aeva-transition-normal)',

    // Page
    '--aeva-page-background': 'white',
    '--aeva-page-animation-duration': '350ms',
    '--aeva-page-backdrop-bg': 'rgba(0, 0, 0, 0.5)',
    '--aeva-page-z-index': '2000',

    // Popup Menu
    '--aeva-popup-bg': 'rgba(255, 255, 255, 0.7)',
    '--aeva-popup-border-radius': 'var(--aeva-border-radius-md)',
    '--aeva-popup-min-width': '200px',
    '--aeva-popup-max-width': '600px',
    '--aeva-popup-blur': 'var(--aeva-blur-md)',
    '--aeva-popup-border-color': 'rgba(255, 255, 255, 0.5)',
    '--aeva-popup-border-width': 'var(--aeva-border-thin)',
    '--aeva-popup-shadow-color': 'var(--aeva-shadow-sm)',

    // Ripple
    '--aeva-ripple-color': 'currentColor',
    '--aeva-ripple-duration': '600ms',
    '--aeva-ripple-opacity': '0.15',


    // Text
    '--aeva-text-font-family': "inherit",
    '--aeva-text-max-width': 'none',
    '--aeva-text-display-font-family': "inherit",
    '--aeva-text-display-weight': '800',
    '--aeva-text-display-line-height': '1.1',
    '--aeva-text-letter-spacing-display': '-0.02em',
    '--aeva-text-heading-font-family': "inherit",
    '--aeva-text-heading-weight': '700',
    '--aeva-text-heading-line-height': '1.2',
    '--aeva-text-letter-spacing-heading': '-0.01em',
    '--aeva-text-body-font-family': "inherit",
    '--aeva-text-body-weight': '400',
    '--aeva-text-body-line-height': '1.6',
    '--aeva-text-letter-spacing-body': 'normal',
    '--aeva-text-label-font-family': "inherit",
    '--aeva-text-label-weight': '500',
    '--aeva-text-label-line-height': '1.4',
    '--aeva-text-letter-spacing-label': '0.01em',
    '--aeva-text-size-xs': 'var(--aeva-font-size-2xs)',
    '--aeva-text-size-sm': 'var(--aeva-font-size-xs)',
    '--aeva-text-size-md': 'var(--aeva-font-size-sm)',
    '--aeva-text-size-lg': 'var(--aeva-font-size-md)',
    '--aeva-text-size-xl': 'var(--aeva-font-size-lg)',
    '--aeva-text-size-2xl': 'var(--aeva-font-size-xl)',
    '--aeva-text-size-3xl': 'var(--aeva-font-size-2xl)',
    '--aeva-text-muted-color': 'var(--aeva-color-gray-500)',
    '--aeva-text-inverse-color': 'var(--aeva-color-white)',
    '--aeva-text-error-color': 'var(--aeva-color-red-600)',
    '--aeva-text-link-color': 'var(--aeva-color-indigo-500)',
    '--aeva-text-link-hover-color': 'var(--aeva-color-indigo-600)',
    '--aeva-text-code-bg': 'rgba(0, 0, 0, 0.05)',
    '--aeva-code-border-radius': 'var(--aeva-border-radius-md)',

    // Action Bar
    '--aeva-action-bar-bg': 'transparent',
    '--aeva-action-bar-padding': 'var(--aeva-space-sm)',
    '--aeva-action-bar-gap': 'var(--aeva-space-xs)',
    '--aeva-action-bar-border-top': 'none',
    '--aeva-action-bar-border-bottom': 'none',
    '--aeva-action-bar-backdrop-filter': 'none',
    '--aeva-action-bar-drop-shadow': 'none',
    '--aeva-action-bar-sticky-bg': 'rgba(255, 255, 255, 0.95)',
    '--aeva-action-bar-sticky-blur': 'var(--aeva-blur-md)',
    '--aeva-action-bar-glassmorphism-border': 'var(--aeva-border-thin) solid rgba(0, 0, 0, 0.1)',
    '--aeva-action-bar-glassmorphism-shadow': '0 -2px 8px rgba(0, 0, 0, 0.05)',

    // Carousel
    '--aeva-carousel-height': '25rem', // 400px
    '--aeva-carousel-nav-bg': 'rgba(0, 0, 0, 0.5)',
    '--aeva-carousel-nav-color': 'white',
    '--aeva-carousel-nav-hover-bg': 'rgba(0, 0, 0, 0.7)',
    '--aeva-carousel-indicator-color': 'rgba(255, 255, 255, 0.5)',
    '--aeva-carousel-indicator-active-color': 'white',
    '--aeva-carousel-indicator-hover-bg': 'rgba(255, 255, 255, 0.7)',
    '--aeva-carousel-transition-duration': '300ms',

    // List
    '--aeva-list-padding': '0',
    '--aeva-list-gap': '0',
    '--aeva-list-border-radius': '23px',

    // Tab
    '--aeva-tab-bg': 'var(--aeva-color-gray-100)',
    '--aeva-tab-active-bg': 'var(--aeva-color-white)',
    '--aeva-tab-padding': 'var(--aeva-space-xxs)',
    '--aeva-tab-gap': 'var(--aeva-space-xxs)',
    '--aeva-tab-border-radius': 'var(--aeva-border-radius-full)',
    '--aeva-tab-transition-duration': 'var(--aeva-duration-normal)',
    '--aeva-tab-transition-timing': 'ease-in-out',

    // Tab Item
    '--aeva-tab-item-font-family': 'inherit',
    '--aeva-tab-item-font-size': 'var(--aeva-font-size-xs)',
    '--aeva-tab-item-padding': 'var(--aeva-space-xs) var(--aeva-space-md)',
    '--aeva-tab-item-border-radius': 'var(--aeva-border-radius-full)',
    '--aeva-tab-item-transition': 'var(--aeva-transition-normal)',
    '--aeva-tab-item-color-active': 'var(--aeva-text-color)',
    '--aeva-tab-item-color-inactive': 'var(--aeva-text-muted-color)',
    '--aeva-tab-item-color-disabled': 'var(--aeva-color-gray-400)',
    '--aeva-tab-item-cursor': 'pointer',
    '--aeva-tab-item-disabled-opacity': '0.5',

    // Toast
    '--aeva-toast-bg': 'rgba(255, 255, 255, 0.9)',
    '--aeva-toast-border-radius': '12px',
    '--aeva-toast-padding': 'var(--aeva-space-sm) var(--aeva-space-md)',
    '--aeva-toast-min-width': '300px',
    '--aeva-toast-max-width': '500px',
    '--aeva-toast-blur': 'var(--aeva-blur-md)',
    '--aeva-toast-border-color': 'rgba(255, 255, 255, 0.5)',
    '--aeva-toast-border-width': 'var(--aeva-border-thin)',
    '--aeva-toast-shadow-color': 'var(--aeva-shadow-sm)',
    '--aeva-toast-close-hover-bg': 'rgba(0, 0, 0, 0.1)',

    // Grid & Stack Gaps
    '--aeva-grid-gap-none': '0',
    '--aeva-grid-gap-xs': 'var(--aeva-space-xxs)',
    '--aeva-grid-gap-sm': 'var(--aeva-space-xs)',
    '--aeva-grid-gap-md': 'var(--aeva-space-sm)',
    '--aeva-grid-gap-lg': 'var(--aeva-space-md)',
    '--aeva-grid-gap-xl': 'var(--aeva-space-lg)',
    '--aeva-grid-auto-min-width': '250px',
    '--aeva-grid-auto-max-width': '1fr',

    '--aeva-stack-gap-none': '0',
    '--aeva-stack-gap-xs': 'var(--aeva-space-xxs)',
    '--aeva-stack-gap-sm': 'var(--aeva-space-xs)',
    '--aeva-stack-gap-md': 'var(--aeva-space-sm)',
    '--aeva-stack-gap-lg': 'var(--aeva-space-md)',
    '--aeva-stack-gap-xl': 'var(--aeva-space-lg)',

    // Bento Grid
    '--aeva-bento-grid-gap': 'var(--aeva-space-sm)',
    '--aeva-bento-grid-min-height': '200px',

    // Section
    '--aeva-section-gap': '0',
    '--aeva-section-padding': '0',
    '--aeva-section-header-padding': '0',
    '--aeva-section-body-padding': '0',
    '--aeva-section-footer-padding': '0',

    // Sidebar
    '--aeva-sidebar-bg': 'var(--aeva-color-white)',
    '--aeva-sidebar-width-sm': '12.5rem', // 200px
    '--aeva-sidebar-width-md': '17.5rem', // 280px
    '--aeva-sidebar-width-lg': '20rem',   // 320px
    '--aeva-sidebar-icon-width': '4.5rem', // 72px
    '--aeva-sidebar-transition': 'var(--aeva-transition-slow)',
    '--aeva-sidebar-shadow': 'var(--aeva-shadow-md)',
    '--aeva-sidebar-backdrop-bg': 'rgba(0, 0, 0, 0.5)',
    '--aeva-sidebar-z-index': 'var(--aeva-z-sidebar)',
    '--aeva-sidebar-border': 'var(--aeva-border-thin) solid var(--aeva-color-gray-200)',
    '--aeva-sidebar-glassmorphism-bg': 'rgba(255, 255, 255, 0.95)',
    '--aeva-sidebar-glassmorphism-border': 'rgba(0, 0, 0, 0.1)',
    '--aeva-sidebar-scrollbar-thumb': 'var(--aeva-color-gray-300)',
    '--aeva-sidebar-scrollbar-thumb-hover': 'var(--aeva-color-gray-400)',

    // Container
    '--aeva-container-max-width-sm': '40rem',   // 640px
    '--aeva-container-max-width-md': '48rem',   // 768px
    '--aeva-container-max-width-lg': '64rem',   // 1024px
    '--aeva-container-max-width-xl': '80rem',   // 1280px
    '--aeva-container-max-width-full': '100%',
    '--aeva-container-padding-none': '0',
    '--aeva-container-padding-sm': 'var(--aeva-space-sm)',
    '--aeva-container-padding-md': 'var(--aeva-space-md)',
    '--aeva-container-padding-lg': 'var(--aeva-space-lg)',

    // Grid Item
    '--aeva-grid-item-min-height': 'auto',

    // Masonry
    '--aeva-masonry-gap': '16px',
    '--aeva-masonry-column-count': 'auto',

    // Table (Documentation)
    '--aeva-table-header-border': '2px solid var(--aeva-color-gray-200)',
    '--aeva-table-row-border': '1px solid var(--aeva-color-gray-100)',
    '--aeva-table-header-color': 'var(--aeva-color-gray-900)',
    '--aeva-table-text-color': 'var(--aeva-color-gray-700)',
    '--aeva-table-accent-color': 'var(--aeva-primary-color)',
    '--aeva-table-header-bg': 'var(--aeva-color-gray-50)',
    '--aeva-table-row-bg': 'transparent'
};
