import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Enhanced Image component with lazy loading, responsive sizing, and aspect ratio support
 *
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} aspectRatio - Optional aspect ratio (16:9, 4:3, 1:1)
 * @param {Object} sizes - Responsive sizes (e.g., {sm: '300w', md: '600w', lg: '1200w'})
 * @param {Object} srcset - Responsive srcset URLs
 * @param {string} objectFit - CSS object-fit property
 * @param {string} className - Additional CSS class
 */
const Image = ({
  src,
  alt,
  aspectRatio,
  sizes,
  srcset,
  objectFit = 'cover',
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLazySupported, setIsLazySupported] = useState(true);

  // Check if browser supports native lazy loading
  useEffect(() => {
    setIsLazySupported('loading' in HTMLImageElement.prototype);
  }, []);

  // Determine aspect ratio class
  const getAspectRatioClass = () => {
    if (!aspectRatio) return '';
    
    switch (aspectRatio) {
      case '16:9':
        return styles['aspect-ratio-16-9'];
      case '4:3':
        return styles['aspect-ratio-4-3'];
      case '1:1':
        return styles['aspect-ratio-1-1'];
      default:
        return '';
    }
  };

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Build srcset string from object
  const buildSrcSet = () => {
    if (!srcset) return undefined;
    
    return Object.entries(srcset)
      .map(([size, url]) => `${url} ${size}`)
      .join(', ');
  };

  // Build sizes string from object
  const buildSizes = () => {
    if (!sizes) return undefined;
    
    return Object.entries(sizes)
      .map(([breakpoint, size]) => {
        // Convert breakpoint names to media queries
        let mediaQuery;
        switch (breakpoint) {
          case 'sm':
            mediaQuery = '(max-width: 480px)';
            break;
          case 'md':
            mediaQuery = '(max-width: 768px)';
            break;
          case 'lg':
            mediaQuery = '(max-width: 1200px)';
            break;
          case 'xl':
            mediaQuery = '(min-width: 1201px)';
            break;
          default:
            mediaQuery = '';
        }
        
        return mediaQuery ? `${mediaQuery} ${size}` : size;
      })
      .join(', ');
  };

  const imageProps = {
    src,
    alt,
    loading: 'lazy', // Native lazy loading
    className: clsx(
      styles.image,
      !isLoaded && styles['image-loading'],
      isLoaded && styles['image-loaded'],
      className
    ),
    onLoad: handleImageLoad,
    style: { objectFit },
    srcSet: buildSrcSet(),
    sizes: buildSizes(),
    ...props
  };

  // If aspect ratio is specified, wrap in container
  if (aspectRatio) {
    return (
      <div className={clsx(styles['image-container'], styles.aspect-ratio, getAspectRatioClass())}>
        <img {...imageProps} />
      </div>
    );
  }
  
  // Otherwise, render the image with a simple container
  return (
    <div className={styles['image-container']}>
      <img {...imageProps} />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  aspectRatio: PropTypes.oneOf(['16:9', '4:3', '1:1']),
  sizes: PropTypes.object,
  srcset: PropTypes.object,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  className: PropTypes.string,
};

export default Image;
