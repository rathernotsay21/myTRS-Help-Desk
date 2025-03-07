/**
 * Lazy-loaded components for pages
 * 
 * This file centralizes all lazy-loaded components to:
 * 1. Reduce initial page load size
 * 2. Manage component loading in one place
 * 3. Provide consistent loading experience
 */

import { lazyLoad } from './lazyLoad';
import LoadingSpinner from '../components/LoadingSpinner';

// HomepageFeatures component removed - no longer used
// export const HomepageFeatures = lazyLoad(
//   () => import('@site/src/components/HomepageFeatures'),
//   { 
//     fallback: <LoadingSpinner text="Loading features..." />,
//     preload: true // Preload since it's visible on homepage
//   }
// );

export const ClientLogos = lazyLoad(
  () => import('@site/src/components/ClientLogos'),
  { 
    fallback: <LoadingSpinner size="sm" text="Loading clients..." /> 
  }
);

export const EventStatsCarousel = lazyLoad(
  () => import('@site/src/components/EventStatsCarousel'),
  { 
    fallback: <LoadingSpinner text="Loading stats..." /> 
  }
);

export const DemoForm = lazyLoad(
  () => import('@site/src/components/DemoForm'),
  { 
    fallback: <LoadingSpinner text="Loading form..." /> 
  }
);

export const SolutionGrid = lazyLoad(
  () => import('@site/src/components/SolutionGrid'),
  { 
    fallback: <LoadingSpinner text="Loading solutions..." /> 
  }
);

export const InfoCard = lazyLoad(
  () => import('@site/src/components/InfoCard'),
  { 
    fallback: <LoadingSpinner size="sm" text="Loading information..." /> 
  }
);

// Features page components
export const FeatureCards = lazyLoad(
  () => import('@site/src/components/FeatureCards'),
  { 
    fallback: <LoadingSpinner text="Loading features..." /> 
  }
);

export const ServicesSection = lazyLoad(
  () => import('@site/src/components/ServicesSection'),
  { 
    fallback: <LoadingSpinner text="Loading services..." /> 
  }
);

// Shared components with heavy dependencies
export const ChatBot = lazyLoad(
  () => import('@site/src/components/ChatBot'),
  { 
    fallback: <LoadingSpinner text="Loading assistant..." /> 
  }
);
