# Changelog

All notable changes to this project will be documented in this file.

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
