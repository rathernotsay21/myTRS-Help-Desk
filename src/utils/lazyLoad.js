import React, { lazy, Suspense } from 'react';

/**
 * Creates a lazy-loaded component with a loading fallback
 *
 * @param {Function} importFunc - Import function (e.g., () => import('./MyComponent'))
 * @param {Object} options - Additional options
 * @param {React.ReactNode} options.fallback - Fallback component to show while loading
 * @param {boolean} options.preload - Whether to preload the component (useful for critical components)
 * @returns {React.LazyExoticComponent} Lazy-loaded component with suspense wrapper
 */
export const lazyLoad = (importFunc, { fallback = null, preload = false } = {}) => {
  const LazyComponent = lazy(importFunc);
  
  // Optionally preload the component
  if (preload) {
    importFunc();
  }
  
  // Default loading component when none is provided
  const defaultLoading = (
    <div 
      style={{ 
        padding: '20px',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="loading-spinner">Loading...</div>
    </div>
  );
  
  return (props) => (
    <Suspense fallback={fallback || defaultLoading}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Creates a lazy-loaded component with a specified loading delay to prevent flashing
 * for fast connections
 *
 * @param {Function} importFunc - Import function (e.g., () => import('./MyComponent'))
 * @param {Object} options - Additional options
 * @param {React.ReactNode} options.fallback - Fallback component to show while loading
 * @param {number} options.minimumDelay - Minimum delay in ms before showing the component
 * @returns {React.LazyExoticComponent} Lazy-loaded component with suspense wrapper
 */
export const lazyLoadWithDelay = (
  importFunc, 
  { fallback = null, minimumDelay = 300 } = {}
) => {
  const LazyComponent = lazy(() => {
    const start = Date.now();
    return importFunc().then(module => {
      const delta = Date.now() - start;
      if (delta < minimumDelay) {
        // Wait for the minimum delay to prevent flickering
        return new Promise(resolve => {
          setTimeout(() => resolve(module), minimumDelay - delta);
        });
      }
      return module;
    });
  });
  
  return (props) => (
    <Suspense fallback={fallback || <div className="loading-placeholder">Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
