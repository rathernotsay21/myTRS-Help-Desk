# myTRS-Help-Desk Build Scripts

This directory contains scripts for building, analyzing, and optimizing the myTRS Help Desk site.

## Performance Optimization

### `optimize-build.js`

This is the main optimization script that runs several optimization processes:

```bash
# Run after building the site
node scripts/optimize-build.js
```

Or use the npm script:

```bash
# Build and optimize in one step
npm run build:optimized
```

### Dependencies

The optimization scripts require several dependencies:

```bash
npm install --save-dev terser glob cssnano purgecss postcss postcss-cli
```

These will be automatically installed when running the optimization script.

## Individual Optimization Scripts

### JavaScript Minification

```bash
node scripts/minify-js.js
```

This script minifies JavaScript files in the build output to reduce file size.

### CSS Optimization

```bash
node scripts/optimize-css.js
```

Uses PurgeCSS to remove unused CSS rules from the build output.

### Basic CSS Minification

```bash
node scripts/basic-css-minify.js
```

A simple CSS minification script that doesn't require external dependencies.

### Image Optimization

```bash
bash scripts/optimize-images.sh
```

Converts images to WebP format and creates optimized versions.

### Hero Image Optimization

```bash
bash scripts/optimize_hero_image.sh
```

Specifically optimizes the hero banner image for better performance.

## Analysis

### Bundle Analysis

```bash
npm run analyze
```

Analyzes the JavaScript bundle size using webpack-bundle-analyzer.

## Current Performance Issues

According to Lighthouse, the following issues need to be addressed:

1. JavaScript minification - Potential savings of 124 KiB
2. Reduce unused JavaScript - Potential savings of 61 KiB
3. Reduce unused CSS - Potential savings of 19 KiB
4. Eliminate render-blocking resources - Potential savings of 90 ms
5. Convert images to next-gen formats - Potential savings of 27 KiB
6. Optimize hero image loading - LCP currently 3.15s

The optimization scripts are designed to address these issues.
