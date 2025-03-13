/**
 * Compatibility layer for legacy Image and ResponsiveImage components
 * This helps with migrating existing code to the new UnifiedImage component
 */

import React from 'react';
import UnifiedImage from './index';

/**
 * Legacy Image component that redirects to UnifiedImage
 * Preserves the original Image component API
 */
export const Image = (props) => {
  return (
    <UnifiedImage
      useBlurEffect={true}
      {...props}
    />
  );
};

/**
 * Legacy ResponsiveImage component that redirects to UnifiedImage
 * Preserves the original ResponsiveImage component API
 */
export const ResponsiveImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  lazy = true,
  srcSet,
  sizes
}) => {
  return (
    <UnifiedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      lazy={lazy}
      srcSet={srcSet}
      sizes={sizes}
      useBlurEffect={false}
      useEventPhotoPattern={src && src.includes('/event_photos/')}
    />
  );
};
