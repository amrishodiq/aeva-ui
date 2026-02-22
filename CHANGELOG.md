# Changelog

All notable changes to this project will be documented in this file.

## [0.1.1] - 2026-02-22

### Added
- Created `WithCloseAnimation` mixin for consistent overlay closing logic.
- Centralized `iconLibrary` in `src/utils/icons.ts` for easier reuse.
- Support for `prefers-reduced-motion` in core animations.

### Improved
- **Accessibility**: Added ARIA attributes to `AevaInput` and WCAG-compliant carousel pause.
- **Theming**: Replaced hardcoded values with centralized CSS variables.
- **Maintenance**: Refactored `AevaList` focus detection and optimized `AevaTab` layout.

### Fixed
- **FOUC**: Resolved "Flash of Unstyled Content" for all 30+ components.
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
