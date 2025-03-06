# Code Splitting & Bundle Optimization Guide

This document explains the code splitting strategy implemented in the myTRS-Help-Desk project to improve loading performance and reduce initial bundle size.

## Table of Contents

1. [Overview](#overview)
2. [Component-Level Code Splitting](#component-level-code-splitting)
3. [Page-Level Code Splitting](#page-level-code-splitting)
4. [Bundle Analysis](#bundle-analysis)
5. [Performance Metrics](#performance-metrics)
6. [Best Practices](#best-practices)

## Overview

Code splitting divides your application into smaller chunks that load on demand, improving initial page load times. We've implemented two levels of code splitting:

1. **Component-level**: Large UI components are lazy-loaded
2. **Page-level**: Entire pages are loaded only when needed

## Component-Level Code Splitting

We use React's `lazy` and `Suspense` for component-level code splitting. Components are imported through our custom `lazyLoad` utility:

```jsx
// src/pages/lazyComponents.js
import { lazyLoad } from '../utils/lazyLoad';

export const HomepageFeatures = lazyLoad(
  () => import('@site/src/components/HomepageFeatures'),
  { 
    fallback: <LoadingSpinner text="Loading features..." /> 
  }
);
```

### When to Lazy Load Components

Components should be lazy-loaded when:

- They are large (>20KB)
- They aren't immediately visible (below the fold)
- They use heavy dependencies not needed elsewhere
- They aren't critical for core functionality

### How to Use Lazy-Loaded Components

```jsx
// Import from lazyComponents.js
import { HomepageFeatures, ClientLogos } from './lazyComponents';

// Use like regular components
function HomePage() {
  return (
    <div>
      <ClientLogos />
      <HomepageFeatures />
    </div>
  );
}
```

## Page-Level Code Splitting

For route-based code splitting, we use the `lazyPage` utility:

```jsx
import { lazyPage } from '../utils/routeUtils';

const Features = lazyPage(() => import('@site/src/pages/features'));
```

This ensures that page code only loads when the route is accessed.

## Bundle Analysis

We use webpack-bundle-analyzer to identify optimization opportunities. Run the analysis with:

```bash
npm run analyze
```

This will:
1. Build the project
2. Generate a visual representation of bundle sizes
3. Open the report in your browser

### Analyzing the Report

The report shows:
- Bundle composition
- Individual module sizes
- Dependency relationships

Look for:
1. Unexpectedly large modules
2. Duplicate dependencies
3. Opportunities for further code splitting

## Performance Metrics

Our code splitting efforts target these performance metrics:

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Initial bundle size**: < 200KB gzipped

## Best Practices

1. **Only lazy-load appropriate components**
   - Don't lazy-load tiny components
   - Don't lazy-load components above the fold
   - Do lazy-load large feature sections

2. **Provide meaningful loading states**
   - Use the LoadingSpinner component
   - Set appropriate sizes and messages
   - Consider skeleton screens for important sections

3. **Prefetch important routes**
   - Use prefetchRoute for likely navigation paths
   - Trigger on hover for navigation links

4. **Monitor bundle sizes**
   - Run analysis before major releases
   - Address large dependencies promptly

5. **Consider webpack magic comments**
   For advanced scenarios, use webpack magic comments:

   ```js
   // Create a named chunk
   const FeatureX = lazy(() => import(/* webpackChunkName: "feature-x" */ './FeatureX'));

   // Preload a chunk
   const FeatureY = lazy(() => import(/* webpackPrefetch: true */ './FeatureY'));
   ```

## Implementation Notes

- All lazy-loaded components are centralized in `src/pages/lazyComponents.js`
- LoadingSpinner component provides consistent loading experiences
- Bundle analysis is configured in `docusaurus.analyzer.js`
- Page-level utilities are in `src/utils/routeUtils.js`

By following these patterns, we maintain good performance while keeping the codebase modular and maintainable.
