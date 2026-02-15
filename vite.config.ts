import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            // Entry point untuk library
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'AevaUI',
            formats: ['es', 'umd'],
            fileName: (format) => `aeva-ui.${format === 'es' ? 'js' : 'umd.cjs'}`
        },
        rollupOptions: {
            // Externalize Lit - jangan bundle Lit ke dalam library
            external: [
                'lit',
                'lit/decorators.js',
                'lit/directives/class-map.js',
                '@lit-labs/context'
            ],
            output: {
                // Global variables untuk UMD build
                globals: {
                    lit: 'Lit',
                    '@lit-labs/context': 'LitContext'
                }
            }
        },
        // Generate sourcemaps untuk debugging
        sourcemap: true,
        // Output directory
        outDir: 'dist',
        // Clear output directory sebelum build
        emptyOutDir: true
    },
    // Server configuration untuk demo page
    server: {
        open: '/demo/index.html',
        port: 3000
    }
});
