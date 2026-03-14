# Changelog

All notable changes to this project will be documented in this file.

## [0.1.7] - 2026-03-14

### Added
- **New Component**: \`aeva-kinetic-text\` (A playful, bouncy text component for engaging headings).
- **New Component**: \`aeva-squishy-button\` (A tactile, physics-based button with realistic squish mechanics).

### Improved
- **Responsive Layouts**: Added \`md-columns\` and \`lg-columns\` properties to \`aeva-masonry\` for dynamic layout responses across breakpoints.
- **Theme Delivery**: Resolved issues with custom components loading without \`aeva-theme\` initialized by injecting a default style layer.
- **Component Exports**: Added \`AevaAvatarGroup\` export to the main library entry file.

## [0.1.6] - 2026-03-01

### Improved
- **Branding Refresh**: Updated project metadata and documentation to a more "effortlessly chill" and youth-oriented tone.
- **Documentation**: Revamped `README.md` with clean, grouped component documentation and streamlined installation guides.
- **Visual Refinement**: Toned down visual clutter (emojis) in documentation for a cleaner professional look while keeping the relaxed tone.

## [0.1.5] - 2026-03-01

### Added
- **Developer Experience**: Integrated Custom Elements Manifest (CEM) to provide rich IDE support (VS Code hints, validation).
- **Manifest**: Added `custom-elements.json` manifest file to the build output.
- **Documentation**: Added comprehensive JSDoc annotations to core components for CEM analyzer compatibility.

## [0.1.4] - 2026-03-01

### Added
- **Featured Implementation**: "Application Board" page and component refinements for better integration.
- **New Component**: `aeva-select` (Highly customizable select component with support for themes and accessibility).

### Improved
- **Rapid Prototyping**: Refined `AevaStack`, `AevaInput`, `AevaTab`, and `AevaCard` for faster layout building and better defaults.
- **Metadata**: Introduced `llms.txt` for better LLM integration and understanding of the library.

## [0.1.3] - 2026-02-28

### Added
- **New Component**: `aeva-bar-chart` (Minimalist SVG bar chart with grouped and stacked variants).
- **New Component**: `aeva-line-chart` (Minimalist SVG line chart with area and smooth curve support).
- **New Component**: `aeva-doughnut-chart` (Minimalist SVG doughnut chart).
- **Chart Theming System**: Built-in 10-color categorical palette (`--aeva-chart-1` to `--aeva-chart-10`).
- **Standardized Documentation**: Added comprehensive Events, Properties, and Customization tables to all component documentation pages.

### Improved
- **Theme Visibility**: Fixed light theme contrast and visibility issues for `AevaSimpleTable`, `AevaDialog`, `AevaDivider`, and `AevaAvatar`.
- **Avatar Group**: Adjusted `AevaAvatarGroup` visual overlap to exactly 50% for a cleaner stacked appearance.
- **Animations**: Reverted experimental depth/physics animation changes in `AevaPage` to restore its original natural feel while retaining history synchronization.
- **Theme System**: Refined custom theme inheritance so custom themes (e.g., "Emerald City") correctly inherit from the light theme.

### Fixed
- **Modal Positioning**: Fixed a bug where `AevaModal` was incorrectly positioned, particularly in nested/scrolling contexts.
- **Switch Component**: Addressed precision and alignment issues of the switch thumb, particularly in the 'glass' variant.
- **Chart Documentation**: Fixed an issue where literal HTML tags in `<aeva-code>` were rendered as actual DOM elements rather than text.
- **Documentation Styling**: Fixed the styling of API tables inside the chart documentation components that were previously isolated by Shadow DOM.

## [0.1.2] - 2026-02-26

### Added
- **Physics-Driven Animations**: Integrated `SpringController` for organic, snappy motion across multiple components.
- **Component Enhancements**:
  - `AevaPage`: High-end slide-and-scale navigation transitions with synchronized backdrops.
  - `AevaPopupMenu`: Snappy, elastic pop-id animations.
  - `AevaTab`: Fluid indicator morphing and tactile interaction feedback.
  - `AevaSlider`: Smooth gliding progress bar and reactive thumb effects.
  - `AevaAccordionItem`: Organic, physics-based expansion logic.
  - `AevaModal`: Premium elastic entrance and settling animations.

### Improved
- **Codebase Localization**: Standardized all internal code comments and configuration files (`vite.config.ts`) to English.
- **Visual Feel**: Replaced legacy CSS transitions with a consistent, substantiative physics system (mass/stiffness/damping).

### Fixed
- **Slider Precision**: Resolved a track fill overflow glitch when value reached 100%.
- **Modal Stability**: Fixed an initial state glitch where the opening animation might not trigger correctly.
- **Tabs Demo**: Corrected a path typo in the demo that was causing content load failures.

## [0.1.1] - 2026-02-23

### Added
- **New Component**: `AevaProcess` & `AevaStep` for workflow/progress tracking.
- **New Component**: `AevaSlider` for range input selection.
- **New Component**: `AevaSwitch` with signature elastic "stretch" animations.
- Created `WithCloseAnimation` mixin for consistent overlay closing logic.
- Centralized `iconLibrary` in `src/utils/icons.ts` for easier reuse.
- Support for `prefers-reduced-motion` in core animations.

### Improved
- **Process Precision**: Refined connector line logic (z-index masking) and mathematical centering of step circles.
- **Switch Precision**: Refactored to absolute positioning for sub-pixel accuracy and perfect horizontal/vertical symmetry.
- **Accessibility**: Added ARIA attributes to `AevaInput`, `AevaSwitch`, and WCAG-compliant carousel pause.
- **Theming**: Replaced hardcoded values with centralized CSS variables and added `--aeva-step-circle-bg`.
- **Maintenance**: Standardized code formatting across 30+ components.

### Fixed
- **Switch Glass Variant**: Resolved vertical misalignment of thumb caused by borders.
- **FOUC**: Resolved "Flash of Unstyled Content" for all core components.
- **Documentation**: Fixed dark mode visual issues for headings and tables.
- **Animation**: Fixed modal closing glitches and toast duration logic.



## [0.1.0] - 2026-02-21

### Added
- Initial release of Aeva UI.
- Core components: Button, Modal, List, Sidebar, Carousel, etc.
- Glassmorphism design system.
- Theme management (Light/Dark mode).
- NPM and jsDelivr support.
- Open source documentation.
