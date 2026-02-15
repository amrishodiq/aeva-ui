1. Initialize Project Structure
Create a standard folder structure for the library: src/ for source code, demo/ for the demo page, dist/ for build output.
Goal: Clear organization facilitates maintenance and meets npm package standards.

2. Setup TypeScript Configuration
Install TypeScript as a dev dependency.
Create tsconfig.json with ES2020+ target and ESNext module.
Goal: Type safety, better DX, and generating declaration files (.d.ts) for IDE autocomplete for users.

3. Install Lit as Core Dependency
Install lit as the main dependency.
Goal: A lightweight, reactive, and modern framework for creating web components. Lit was chosen for its small bundle size (~5KB), built-in reactive properties, and a great ecosystem.

4. Setup Build Tool - Vite
Install Vite for bundling and development.
There were several other options like Rollup, Webpack, and esbuild.
Vite was chosen because:
- Super fast hot reload (using native ESM).
- Built-in TypeScript support.
- Easy library mode setup.
- Simultaneously serves the demo page with HMR.

5. Setup Demo/Playground Page
Create a demo/ folder with index.html and examples for all components.
Use the Vite dev server for hot reload.
Goal: Good developer experience - users can see all components, and you can develop with immediate visual feedback.

6. Configure Package.json for NPM Publishing
Set up main, module, types, and exports fields.
Add the files field to specify which files to publish.
Set up scripts: dev, build, preview.
Goal: Ensure the package can be used in various environments (CommonJS, ESM) and is tree-shakeable.

7. CSS Custom Properties for Theming
Implement design tokens using CSS Custom Properties.
Goal: Make it easy for users to customize styling without needing to override CSS - just set the CSS variables.

8. Setup Linting & Formatting
Install ESLint and Prettier.
Goal: Consistency in code quality, which is especially important for a library used by many people.

9. Documentation Setup (Optional but Recommended)
Create README.md with an installation guide and basic usage.
Goal: A good first impression on npmjs.com and GitHub - good documentation = higher adoption.

10. Git & .gitignore
Initialize the git repository.
Set up .gitignore to exclude node_modules/, dist/, etc.
Goal: Version control and collaboration.

aeva-ui/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   |   ├── button/
│   │   |   ├── card/
│   │   |   └── ...
│   │   ├── molecules/│   │       
│   │   |   └── ...
│   │   ├── organisms/
│   │   |   └── ...
│   │   ├── templates/
│   │   |   └── page/
│   │   |   └── layout/ 
│   │   |   └── ...
│   │   └── ...
│   └── index.ts (main entry point)
├── demo/
│   ├── index.html
│   └── main.ts
├── dist/ (generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md