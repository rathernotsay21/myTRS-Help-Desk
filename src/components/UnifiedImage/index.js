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
 * Unified Image component that combines features from both Image and ResponsiveImage
 * 
 * Features:
 * - WebP support with fallback
 * - Blur-up loading pattern (optional)
 * - Automatic srcset generation
 * - Support for predefined mobile variants
 * - Aspect ratio constraints
 * - Error handling
 * 
 * @param {Object} props - Component properties
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {number} [props.width] - Image width in pixels
 * @param {number} [props.height] - Image height in pixels
 * @param {string} [props.aspectRatio] - Optional aspect ratio (16:9, 4:3, 1:1)
 * @param {string} [props.srcSet] - Optional custom srcSet string
 * @param {string} [props.sizes] - Optional custom sizes string
 * @param {Object} [props.srcSetData] - Optional responsive srcset URLs as object
 * @param {Object} [props.sizesData] - Optional responsive sizes as object
 * @param {string} [props.objectFit='cover'] - CSS object-fit property
 * @param {string} [props.className=''] - Additional CSS class
 * @param {string} [props.placeholderColor='#f0f0f0'] - Dominant color for blur placeholder
 * @param {string} [props.context='default'] - Where the image is used (hero, card, thumbnail)
 * @param {boolean} [props.generateSrcSet=true] - Auto-generate srcset for responsive images
 * @param {boolean} [props.tryWebP=true] - Try to use WebP format if supported
 * @param {boolean} [props.useBlurEffect=true] - Use blur-up loading effect
 * @param {boolean} [props.lazy=true] - Use lazy loading
 * @param {boolean} [props.useEventPhotoPattern=false] - Look for mobile variants using event photo pattern
 * @param {number[]} [props.widths] - Width values for responsive images
 */
const UnifiedImage = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  srcSet,
  sizes,
  srcSetData,
  sizesData,
  objectFit = 'cover',
  className = '',
  placeholderColor = '#f0f0f0',
  context = 'default',
  generateSrcSet = true,
  tryWebP = true,
  useBlurEffect = true,
  lazy = true,
  useEventPhotoPattern = false,
  widths = [640, 768, 1024, 1280, 1536],
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLazySupported, setIsLazySupported] = useState(true);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [imgSrcSet, setImgSrcSet] = useState(srcSet);
  const [imgSizes, setImgSizes] = useState(sizes);
  const imageRef = useRef(null);
  
  // Generate placeholder if blur effect is enabled
  const blurPlaceholder = useBlurEffect ? generateBlurPlaceholder(placeholderColor) : null;

  // Check browser features on mount
  useEffect(() => {
    // Check for lazy loading support
    setIsLazySupported('loading' in HTMLImageElement.prototype);
    
    // Check for WebP support if needed
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
  
  // Handle event photo pattern (from ResponsiveImage)
  useEffect(() => {
    if (useEventPhotoPattern && !srcSet && src.includes('/event_photos/')) {
      const lastDotIndex = src.lastIndexOf('.');
      const basePath = src.substring(0, lastDotIndex);
      const extension = src.substring(lastDotIndex);
      
      const mobileSrc = basePath.replace('/event_photos/', '/event_photos/mobile/') + '-mobile' + extension;
      setImgSrcSet(`${mobileSrc} 600w, ${src} 1200w`);
      
      // If no sizes provided, set a default
      if (!sizes) {
        setImgSizes("(max-width: 768px) 600px, 1200px");
      }
    }
  }, [src, srcSet, sizes, useEventPhotoPattern]);
  
  // Generate srcset and sizes if needed
  useEffect(() => {
    // Skip if we've already handled the event photo pattern or custom srcSet provided
    if (imgSrcSet || !generateSrcSet) return;
    
    // Handle object-based srcSet
    if (srcSetData) {
      const srcSetString = Object.entries(srcSetData)
        .map(([size, url]) => `${url} ${size}`)
        .join(', ');
      setImgSrcSet(srcSetString);
    } 
    // Generate srcset based on the image source and widths
    else if (generateSrcSet) {
      const imageSrc = supportsWebP && tryWebP ? getWebPUrl(src) || src : src;
      const generated = generateResponsiveSrcSet(imageSrc, widths);
      
      if (generated && Object.keys(generated).length) {
        const srcSetString = Object.entries(generated)
          .map(([size, url]) => `${url} ${size}`)
          .join(', ');
        setImgSrcSet(srcSetString);
      }
    }
  }, [src, srcSetData, generateSrcSet, supportsWebP, tryWebP, widths, imgSrcSet]);
  
  // Handle sizes attribute
  useEffect(() => {
    // Skip if we've already set sizes
    if (imgSizes || sizes) return;
    
    // Handle object-based sizes
    if (sizesData) {
      const sizesString = Object.entries(sizesData)
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
      setImgSizes(sizesString);
    } 
    // Generate sizes based on context
    else if (context !== 'default') {
      const contextSizes = getSizesForContext(context);
      if (contextSizes && Object.keys(contextSizes).length) {
        const sizesString = Object.entries(contextSizes)
          .map(([breakpoint, size]) => {
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
        setImgSizes(sizesString);
      }
    }
  }, [context, sizesData, imgSizes, sizes]);

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
    
    // If using event photo pattern and error occurs, fallback to main source
    if (useEventPhotoPattern) {
      setImgSrcSet('');
    }
    
    // Reset to original source if there was an error with WebP
    if (imgSrc !== src) {
      setImgSrc(src);
    }
  };

  // Prepare image attributes
  const imageProps = {
    src: imgSrc,
    alt,
    loading: lazy ? 'lazy' : 'eager',
    className: clsx(
      styles.image,
      !isLoaded && useBlurEffect && styles['image-loading'],
      isLoaded && styles['image-loaded'],
      className
    ),
    onLoad: handleImageLoad,
    onError: handleImageError,
    srcSet: imgSrcSet || undefined,
    sizes: imgSizes || undefined,
    ref: imageRef,
    ...props
  };
  
  // Add width and height if provided
  if (width) imageProps.width = width;
  if (height) imageProps.height = height;
  
  // Add blur placeholder styling if enabled
  if (useBlurEffect) {
    imageProps.style = { 
      objectFit,
      background: blurPlaceholder ? `url("${blurPlaceholder}") no-repeat center center` : undefined,
      backgroundSize: 'cover'
    };
  } else {
    imageProps.style = { 
      objectFit 
    };
  }

  // If aspect ratio is specified, wrap in container
  if (aspectRatio) {
    return (
      <div className={clsx(
        styles['image-container'], 
        getAspectRatioClass()
      )}>
        {/* Blur placeholder that shows until image loads */}
        {useBlurEffect && (
          <div 
            className={clsx(
              styles.placeholder,
              isLoaded && styles['placeholder-hidden']
            )}
            style={{
              backgroundImage: `url(${blurPlaceholder})`,
            }}
          />
        )}
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
  
  // Otherwise, render the image with a simple container or just the image itself
  if (useBlurEffect) {
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
  }
  
  // Simplest case: just the image itself (like ResponsiveImage)
  return <img {...imageProps} />;
};

UnifiedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  aspectRatio: PropTypes.oneOf(['16:9', '4:3', '1:1']),
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  srcSetData: PropTypes.object,
  sizesData: PropTypes.object,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  className: PropTypes.string,
  placeholderColor: PropTypes.string,
  context: PropTypes.oneOf(['default', 'hero', 'card', 'thumbnail', 'sidebar']),
  generateSrcSet: PropTypes.bool,
  tryWebP: PropTypes.bool,
  useBlurEffect: PropTypes.bool,
  lazy: PropTypes.bool,
  useEventPhotoPattern: PropTypes.bool,
  widths: PropTypes.arrayOf(PropTypes.number)
};

export default UnifiedImage;
