import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isBundle = mode === 'bundle';

    return {
        build: {
            lib: {
                // Library entry point
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'AevaUI',
                formats: isBundle ? ['es'] : ['es', 'umd'],
                fileName: (format) => {
                    if (isBundle) return 'aeva-ui.bundle.js';
                    return `aeva-ui.${format === 'es' ? 'js' : 'umd.cjs'}`;
                }
            },
            rollupOptions: {
                // Externalize dependencies for npm build, bundle them for CDN
                external: isBundle ? [] : ['lit', /^lit\/.*/, '@lit-labs/context'],
                output: {
                    // Global variables for UMD build
                    globals: {
                        'lit': 'Lit',
                        'lit/decorators.js': 'LitDecorators',
                        '@lit-labs/context': 'LitContext'
                    },
                    // Ensure CSS is named style.css
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name === 'style.css' || assetInfo.name?.endsWith('.css')) return 'style.css';
                        return assetInfo.name || '[name][extname]';
                    }
                }
            },

            // Generate sourcemaps for debugging
            sourcemap: true,
            // Output directory
            outDir: 'dist',
            // Only empty outDir on the first build (the standard one)
            emptyOutDir: !isBundle
        },
        // Server configuration for demo page
        server: {
            open: '/demo/index.html',
            port: 3000
        }
    };
});
