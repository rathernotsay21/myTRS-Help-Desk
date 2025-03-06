import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './styles.module.css';
import { 
  isWebPSupported, 
  getWebPUrl, 
  generateBlurPlaceholder,
  generateResponsiveSrcSet,
  getSizesForContext 
} from '../../utils/imageUtils';

/**
 * Enhanced Image component with advanced features:
 * - WebP format support with fallback
 * - Blur-up loading pattern
 * - Automatic srcset generation
 * - Lazy loading
 * - Aspect ratio support
 *
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} aspectRatio - Optional aspect ratio (16:9, 4:3, 1:1)
 * @param {Object} sizes - Responsive sizes (e.g., {sm: '300w', md: '600w', lg: '1200w'})
 * @param {Object} srcset - Responsive srcset URLs
 * @param {string} objectFit - CSS object-fit property
 * @param {string} className - Additional CSS class
 * @param {string} placeholderColor - Dominant color for blur placeholder
 * @param {string} context - Where the image is used (hero, card, thumbnail)
 * @param {boolean} generateSrcSet - Auto-generate srcset for responsive images
 * @param {boolean} tryWebP - Try to use WebP format if supported
 * @param {number[]} widths - Width values for responsive images
 */
const Image = ({
  src,
  alt,
  aspectRatio,
  sizes,
  srcset,
  objectFit = 'cover',
  className = '',
  placeholderColor = '#f0f0f0',
  context = 'default',
  generateSrcSet = true,
  tryWebP = true,
  widths = [640, 768, 1024, 1280, 1536],
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLazySupported, setIsLazySupported] = useState(true);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [imgSrcSet, setImgSrcSet] = useState(srcset || {});
  const [imgSizes, setImgSizes] = useState(sizes || {});
  const imageRef = useRef(null);
  
  // Generate placeholder
  const blurPlaceholder = generateBlurPlaceholder(placeholderColor);

  // Check browser features
  useEffect(() => {
    // Check for lazy loading support
    setIsLazySupported('loading' in HTMLImageElement.prototype);
    
    // Check for WebP support
    if (tryWebP) {
      isWebPSupported().then(supported => {
        setSupportsWebP(supported);
      });
    }
  }, [tryWebP]);
  
  // Update image source when WebP support is detected
  useEffect(() => {
    if (tryWebP && supportsWebP) {
      const webPUrl = getWebPUrl(src);
      if (webPUrl) {
        setImgSrc(webPUrl);
      }
    } else {
      setImgSrc(src);
    }
  }, [src, supportsWebP, tryWebP]);
  
  // Generate srcset and sizes if needed
  useEffect(() => {
    // Generate srcset based on the image source
    if (generateSrcSet && !srcset) {
      const generatedSrcSet = generateResponsiveSrcSet(
        supportsWebP ? getWebPUrl(src) || src : src, 
        widths
      );
      setImgSrcSet(generatedSrcSet);
    } else {
      setImgSrcSet(srcset || {});
    }
    
    // Generate sizes based on context if not provided
    if (!sizes) {
      const generatedSizes = getSizesForContext(context);
      setImgSizes(generatedSizes);
    } else {
      setImgSizes(sizes);
    }
  }, [src, srcset, sizes, context, generateSrcSet, supportsWebP, widths]);

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
  
  // Handle image error
  const handleImageError = () => {
    setHasError(true);
    // Reset to original source if there was an error with WebP
    if (imgSrc !== src) {
      setImgSrc(src);
    }
  };

  // Build srcset string from object
  const buildSrcSet = () => {
    if (!Object.keys(imgSrcSet).length) return undefined;
    
    return Object.entries(imgSrcSet)
      .map(([size, url]) => `${url} ${size}`)
      .join(', ');
  };

  // Build sizes string from object
  const buildSizes = () => {
    if (!Object.keys(imgSizes).length) return undefined;
    
    return Object.entries(imgSizes)
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
    src: imgSrc,
    alt,
    loading: 'lazy', // Native lazy loading
    className: clsx(
      styles.image,
      !isLoaded && styles['image-loading'],
      isLoaded && styles['image-loaded'],
      className
    ),
    onLoad: handleImageLoad,
    onError: handleImageError,
    style: { 
      objectFit,
      background: `url("${blurPlaceholder}") no-repeat center center`,
      backgroundSize: 'cover'
    },
    srcSet: buildSrcSet(),
    sizes: buildSizes(),
    ref: imageRef,
    ...props
  };

  // If aspect ratio is specified, wrap in container
  if (aspectRatio) {
    return (
      <div className={clsx(
        styles['image-container'], 
        getAspectRatioClass()
      )}>
        {/* Blur placeholder that shows until image loads */}
        <div 
          className={clsx(
            styles.placeholder,
            isLoaded && styles['placeholder-hidden']
          )}
          style={{
            backgroundImage: `url(${blurPlaceholder})`,
          }}
        />
        <img {...imageProps} />
        
        {/* Fallback for image load error */}
        {hasError && (
          <div className={styles['error-fallback']}>
            <span>{alt || 'Image failed to load'}</span>
          </div>
        )}
      </div>
    );
  }
  
  // Otherwise, render the image with a simple container
  return (
    <div className={styles['image-container']}>
      {/* Blur placeholder that shows until image loads */}
      <div 
        className={clsx(
          styles.placeholder,
          isLoaded && styles['placeholder-hidden']
        )}
        style={{
          backgroundImage: `url(${blurPlaceholder})`,
        }}
      />
      <img {...imageProps} />
      
      {/* Fallback for image load error */}
      {hasError && (
        <div className={styles['error-fallback']}>
          <span>{alt || 'Image failed to load'}</span>
        </div>
      )}
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
  placeholderColor: PropTypes.string,
  context: PropTypes.oneOf(['default', 'hero', 'card', 'thumbnail', 'sidebar']),
  generateSrcSet: PropTypes.bool,
  tryWebP: PropTypes.bool,
  widths: PropTypes.arrayOf(PropTypes.number)
};

export default Image;
