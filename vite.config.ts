import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            // Library entry point
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'AevaUI',
            formats: ['es', 'umd'],
            fileName: (format) => `aeva-ui.${format === 'es' ? 'js' : 'umd.cjs'}`
        },
        rollupOptions: {
            // Externalize Lit - don't bundle Lit into the library
            external: [
                'lit',
                'lit/decorators.js',
                'lit/directives/class-map.js',
                '@lit-labs/context'
            ],
            output: {
                // Global variables for UMD build
                globals: {
                    lit: 'Lit',
                    'lit/decorators.js': 'LitDecorators',
                    'lit/directives/class-map.js': 'LitClassMap',
                    '@lit-labs/context': 'LitContext'
                }
            }
        },
        // Generate sourcemaps for debugging
        sourcemap: true,
        // Output directory
        outDir: 'dist',
        // Clear output directory before build
        emptyOutDir: true
    },
    // Server configuration for demo page
    server: {
        open: '/demo/index.html',
        port: 3000
    }
});
