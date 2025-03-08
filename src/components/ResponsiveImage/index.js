import React from 'react';
import PropTypes from 'prop-types';

/**
 * ResponsiveImage component automatically selects the right image size based on viewport
 * 
 * @param {Object} props Component properties
 * @param {string} props.src The base path to the image
 * @param {string} props.alt Alternative text for the image
 * @param {number} props.width Original image width
 * @param {number} props.height Original image height
 * @param {string} props.className Additional CSS class names
 * @param {boolean} props.lazy Whether to use lazy loading
 * @param {string} props.srcSet Optional srcSet value
 * @param {string} props.sizes Optional sizes value
 * @returns {JSX.Element} Responsive image component
 */
export default function ResponsiveImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  lazy = true,
  srcSet,
  sizes
}) {
  // Basic validation - ensure src is provided
  if (!src) {
    console.warn('ResponsiveImage component requires src prop');
    return null;
  }

  // Handle event photos mobile versions
  let finalSrcSet = srcSet;
  let finalSizes = sizes;

  // If no srcSet is provided, check if it's an event photo and generate one
  if (!srcSet && src.includes('/event_photos/')) {
    const lastDotIndex = src.lastIndexOf('.');
    const basePath = src.substring(0, lastDotIndex);
    const extension = src.substring(lastDotIndex);
    
    const mobileSrc = basePath.replace('/event_photos/', '/event_photos/mobile/') + '-mobile' + extension;
    finalSrcSet = `${mobileSrc} 600w, ${src} 1200w`;
    
    // If no sizes provided, set a default
    if (!sizes) {
      finalSizes = "(max-width: 768px) 600px, 1200px";
    }
  }

  return (
    <img 
      src={src}
      srcSet={finalSrcSet || undefined}
      sizes={finalSizes || undefined}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? "lazy" : "eager"}
      className={className}
      onError={(e) => {
        // Fallback to main source if there's an error loading the image
        e.target.onerror = null;
        e.target.srcset = '';
      }}
    />
  );
}

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  lazy: PropTypes.bool,
  srcSet: PropTypes.string,
  sizes: PropTypes.string
};
