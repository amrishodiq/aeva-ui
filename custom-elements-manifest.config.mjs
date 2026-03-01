export default {
    /** Globs to analyze */
    globs: ['src/components/**/*.ts', 'src/theme/aeva-theme.ts'],
    /** Globs to exclude */
    exclude: ['src/components/**/*.test.ts', 'src/components/**/*.spec.ts', 'src/components/**/*.js'],
    /** Directory to output manifest to */
    outdir: '.',
    /** Run in dev mode, provides extra logging */
    dev: false,
    /** Run in watch mode, re-builds on change */
    watch: false,
    /** Include third party custom elements manifests */
    dependencies: true,
    /** Output type-checking errors in the console */
    packagejson: true,
    /** Overwrite existing manifest file */
    override: true,
};
