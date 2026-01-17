1. Inisialisasi Project Structure
Buat struktur folder standar untuk library: src/ untuk source code, demo/ untuk demo page, dist/ untuk build output
Tujuannya: Organisasi yang jelas memudahkan maintenance dan memenuhi standar npm package

2. Setup TypeScript Configuration
Install TypeScript sebagai dev dependency
Buat tsconfig.json dengan target ES2020+ dan module ESNext
Tujuannya: Type safety, better DX, dan menghasilkan declaration files (.d.ts) untuk autocomplete di IDE pengguna

3. Install Lit sebagai Core Dependency
Install lit sebagai dependency utama
Tujuannya: Framework untuk membuat web components yang ringan, reactive, dan modern. Lit dipilih karena bundle size kecil (~5KB), sudah built-in dengan reactive properties, dan memiliki ecosystem yang bagus

4. Setup Build Tool - Vite
Install Vite untuk bundling dan development
Sebenarnya ada beberapa pilihan lain yaitu Rollup, Webpack, dan esbuild
Tapi saya pilih Vite karena:
Hot reload super cepat (menggunakan ESM native)
Built-in support untuk TypeScript
Mudah setup untuk library mode
Bisa sekaligus serve demo page dengan HMR

5. Setup Demo/Playground Page
Buat folder demo/ dengan index.html dan contoh penggunaan semua komponen
Gunakan Vite dev server untuk hot reload
Tujuannya: Developer experience yang baik - pengguna bisa lihat semua komponen, dan Anda bisa develop dengan feedback visual langsung

6. Configure Package.json untuk NPM Publishing
Setup main, module, types, dan exports fields
Tambahkan files field untuk specify file apa saja yang di-publish
Setup scripts: dev, build, preview
Tujuannya: Memastikan package bisa digunakan di berbagai environment (CommonJS, ESM) dan tree-shakeable

7. CSS Custom Properties untuk Theming
Implementasi design tokens menggunakan CSS Custom Properties
Tujuannya: Memudahkan pengguna untuk customize styling tanpa perlu override CSS - tinggal set CSS variables

8. Setup Linting & Formatting
Install ESLint dan Prettier
Tujuannya: Code quality consistency, terutama penting untuk library yang akan digunakan banyak orang

9. Documentation Setup (Optional tapi Recommended)
Buat README.md dengan installation guide dan basic usage
Tujuannya: First impression di npmjs.com dan GitHub - dokumentasi yang baik = adoption yang lebih tinggi

10. Git & .gitignore
Initialize git repository
Setup .gitignore untuk exclude node_modules/, dist/, dll
Tujuannya: Version control dan kolaborasi

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