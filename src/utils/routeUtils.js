import React from 'react';
import { lazyLoad } from './lazyLoad';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Create a lazy-loaded page component with appropriate loading state
 * 
 * @param {Function} importFunc - Import function for the page component
 * @param {string} loadingMessage - Message to display during loading
 * @returns {React.LazyExoticComponent} - Lazy-loaded page component
 */
export const lazyPage = (importFunc, loadingMessage = 'Loading page...') => {
  return lazyLoad(importFunc, {
    fallback: <LoadingSpinner size="lg" text={loadingMessage} fullPage />,
  });
};

/**
 * Creates page routes with code splitting
 * 
 * @param {Object} routes - Route definitions object
 * @returns {Object} - Route definitions with code-split components
 * 
 * @example
 * const routes = createLazyRoutes({
 *   features: () => import('@site/src/pages/features'),
 *   blog: () => import('@site/src/pages/blog'),
 * });
 */
export const createLazyRoutes = (routes) => {
  const lazyRoutes = {};
  
  Object.entries(routes).forEach(([key, importFunc]) => {
    const routeName = key.charAt(0).toUpperCase() + key.slice(1);
    lazyRoutes[key] = lazyPage(importFunc, `Loading ${routeName} Page...`);
  });
  
  return lazyRoutes;
};

/**
 * Pre-fetches a route for faster navigation
 * Call this function when a user hovers over a link
 * 
 * @param {string} route - Route to prefetch
 * @param {Function} importFunc - Import function for the route
 */
export const prefetchRoute = (route, importFunc) => {
  // Only prefetch in production to avoid unnecessary loads during development
  if (process.env.NODE_ENV === 'production') {
    // Use requestIdleCallback if available, otherwise use setTimeout
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          importFunc();
        });
      } else {
        setTimeout(() => {
          importFunc();
        }, 200);
      }
    }
  }
};
