# How to Publish Aeva UI to NPM

This guide explains how to release a new version of the **Aeva UI** library to the [NPM Registry](https://www.npmjs.com/).

## 1. Prepare your Package
Before publishing, ensure your metadata is correct in `package.json`:
- **Version**: Increment the `version` number (e.g., `0.1.0` to `0.1.1`).
- **Name**: Ensure the name is `aeva-ui`.
- **Files**: Make sure the `dist` folder is included in the `files` array.

## 2. Pre-publish Checks
Run these commands to ensure the code is clean and error-free:

```bash
# Format the code
npm run format

# Run the linter
npm run lint
```

## 3. Build the Library
Generate the production-ready files in the `dist` folder:

```bash
npm run build
```

> [!IMPORTANT]
> Always check the `dist` folder after building to ensure all necessary files (like `.js`, `.css`, and `.d.ts`) were generated correctly.

## 4. Authenticate with NPM
If you haven't logged in recently, authenticate your terminal:

```bash
npm login
```
*A browser window will open for you to complete the login.*

## 5. Dry Run (Optional)
To see exactly what will be uploaded without actually publishing, run:

```bash
npm publish --dry-run
```

## 6. Publish!
Once everything looks perfect, publish the library:

```bash
npm publish
```

If you are using a scoped package (e.g., `@your-username/aeva-ui`), use:
```bash
npm publish --access public
```

---

## 💡 Versioning Tip
Follow [Semantic Versioning (SemVer)](https://semver.org/):
- **Patch (0.0.x)**: For bug fixes.
- **Minor (0.x.0)**: For new features that don't break existing ones.
- **Major (x.0.0)**: For changes that break compatibility.
