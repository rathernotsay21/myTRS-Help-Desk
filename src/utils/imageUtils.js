/**
 * Utility functions for image optimization
 */

/**
 * Generates a tiny blurred placeholder for images
 * This is a lightweight implementation that creates a base64 encoded SVG placeholder
 * 
 * @param {string} color - The dominant color of the image (hex format)
 * @param {number} width - Width of the original image
 * @param {number} height - Height of the original image
 * @returns {string} - Base64 encoded SVG
 */
export const generateBlurPlaceholder = (color = '#f0f0f0', width = 100, height = 100) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <filter id="b" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="20"/>
      </filter>
      <rect width="100%" height="100%" fill="${color}" filter="url(#b)"/>
    </svg>
  `.trim();
  
  // Base64 encode the SVG
  const encoded = Buffer.from ? Buffer.from(svg).toString('base64') : btoa(svg);
  return `data:image/svg+xml;base64,${encoded}`;
};

/**
 * Checks if WebP format is supported in the current browser
 * 
 * @returns {Promise<boolean>} - Promise that resolves with true if WebP is supported
 */
export const isWebPSupported = () => {
  if (typeof window === 'undefined') return Promise.resolve(false);
  
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve(image.width > 0 && image.height > 0);
    image.onerror = () => resolve(false);
    image.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  });
};

/**
 * Generates WebP image URL if the original is a JPEG or PNG
 * 
 * @param {string} src - Original image source URL
 * @returns {string|null} - WebP URL if applicable, null otherwise
 */
export const getWebPUrl = (src) => {
  if (!src) return null;
  
  // Check if the URL ends with .jpg, .jpeg, or .png
  const isJpg = /\.(jpg|jpeg)$/i.test(src);
  const isPng = /\.png$/i.test(src);
  
  if (!isJpg && !isPng) return null;
  
  // Create WebP URL by replacing the extension
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
};

/**
 * Extracts image dimensions from filename if it follows naming convention
 * Example: image-800x600.jpg would return {width: 800, height: 600}
 * 
 * @param {string} src - Image source URL
 * @returns {Object|null} - Object with width and height if found, null otherwise
 */
export const getDimensionsFromFilename = (src) => {
  if (!src) return null;
  
  const regex = /-(\d+)x(\d+)\.[a-zA-Z]+$/;
  const match = src.match(regex);
  
  if (match && match.length === 3) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10)
    };
  }
  
  return null;
};

/**
 * Generates multiple sizes of an image based on a base URL
 * 
 * @param {string} src - Original image source URL
 * @param {Array<number>} widths - Array of width values for the different sizes
 * @returns {Object} - Object with srcset URLs keyed by width
 */
export const generateResponsiveSrcSet = (src, widths = [640, 768, 1024, 1280, 1536]) => {
  if (!src) return {};
  
  // Check if the URL can be transformed
  const canTransform = /\.(jpe?g|png|webp)$/i.test(src);
  if (!canTransform) return {};
  
  // Extract the base URL and extension
  const lastDotIndex = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDotIndex);
  const extension = src.substring(lastDotIndex);
  
  // Generate URLs for different sizes
  const srcSet = {};
  widths.forEach(width => {
    srcSet[`${width}w`] = `${basePath}-${width}w${extension}`;
  });
  
  return srcSet;
};

/**
 * Determines appropriate sizes attribute based on the image's usage context
 * 
 * @param {string} context - Where the image is used (e.g., 'hero', 'card', 'thumbnail')
 * @returns {Object} - Object with sizes attributes for different breakpoints
 */
export const getSizesForContext = (context = 'default') => {
  switch (context) {
    case 'hero':
      return {
        sm: '100vw',
        md: '100vw',
        lg: '100vw',
        xl: '100vw'
      };
    case 'card':
      return {
        sm: '100vw',
        md: '50vw',
        lg: '33vw',
        xl: '25vw'
      };
    case 'thumbnail':
      return {
        sm: '50vw',
        md: '33vw',
        lg: '25vw',
        xl: '20vw'
      };
    case 'sidebar':
      return {
        sm: '100vw',
        md: '33vw',
        lg: '25vw',
        xl: '20vw'
      };
    default:
      return {
        sm: '100vw',
        md: '100vw',
        lg: '100vw',
        xl: '100vw'
      };
  }
};
