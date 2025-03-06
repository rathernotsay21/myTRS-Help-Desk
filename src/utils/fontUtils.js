/**
 * Utility functions for font optimization
 */

/**
 * Generate font-face declarations with appropriate font-display settings
 * 
 * @param {Object} config - Font configuration
 * @param {string} config.family - Font family name
 * @param {Array} config.sources - Array of font file sources
 * @param {string} config.display - Font display strategy (swap, block, fallback, optional)
 * @param {string} config.weight - Font weight
 * @param {string} config.style - Font style
 * @returns {string} - CSS font-face declaration
 */
export const generateFontFace = ({
  family,
  sources = [],
  display = 'swap',
  weight = 'normal',
  style = 'normal'
}) => {
  if (!family || !sources.length) return '';
  
  const srcString = sources
    .map(src => {
      if (src.endsWith('.woff2')) {
        return `url('${src}') format('woff2')`;
      } else if (src.endsWith('.woff')) {
        return `url('${src}') format('woff')`;
      } else if (src.endsWith('.ttf')) {
        return `url('${src}') format('truetype')`;
      } else if (src.endsWith('.eot')) {
        return `url('${src}') format('embedded-opentype')`;
      } else if (src.endsWith('.svg')) {
        return `url('${src}') format('svg')`;
      }
      return `url('${src}')`;
    })
    .join(', ');
  
  return `
@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: ${display};
  src: ${srcString};
}`;
};

/**
 * Generate <link> tags for font preloading
 * 
 * @param {Array} fonts - Array of font objects
 * @param {string} fonts[].url - Font URL
 * @param {string} fonts[].type - Font MIME type
 * @param {boolean} fonts[].crossOrigin - Whether to use crossorigin attribute
 * @returns {Array} - Array of link tag objects for Docusaurus head
 */
export const generateFontPreloadTags = (fonts) => {
  if (!fonts || !fonts.length) return [];
  
  return fonts.map(font => {
    const linkTag = {
      tagName: 'link',
      rel: 'preload',
      href: font.url,
      as: 'font',
      type: font.type || getFontMimeType(font.url)
    };
    
    if (font.crossOrigin) {
      linkTag.crossorigin = 'anonymous';
    }
    
    return linkTag;
  });
};

/**
 * Get MIME type based on font file extension
 * 
 * @param {string} url - Font URL
 * @returns {string} - MIME type
 */
const getFontMimeType = (url) => {
  if (url.endsWith('.woff2')) {
    return 'font/woff2';
  } else if (url.endsWith('.woff')) {
    return 'font/woff';
  } else if (url.endsWith('.ttf')) {
    return 'font/ttf';
  } else if (url.endsWith('.eot')) {
    return 'application/vnd.ms-fontobject';
  } else if (url.endsWith('.svg')) {
    return 'image/svg+xml';
  }
  return '';
};

/**
 * Generate CSS for font optimization
 * 
 * @param {Array} fontConfig - Array of font configurations
 * @returns {string} - CSS for font optimization
 */
export const generateFontCSS = (fontConfig) => {
  if (!fontConfig || !fontConfig.length) return '';
  
  return fontConfig.map(font => generateFontFace(font)).join('\n');
};

/**
 * Get font fallback stacks for different font types
 * 
 * @param {string} type - Font type (sans, serif, mono)
 * @returns {string} - Fallback font stack
 */
export const getFontFallbacks = (type = 'sans') => {
  switch (type.toLowerCase()) {
    case 'serif':
      return 'Georgia, Cambria, "Times New Roman", Times, serif';
    case 'mono':
      return 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace';
    case 'sans':
    default:
      return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  }
};

/**
 * Generate variable font CSS
 * 
 * @param {Object} config - Variable font configuration
 * @param {string} config.family - Font family name
 * @param {string} config.url - Font URL
 * @param {Array} config.axes - Font variation axes
 * @returns {string} - CSS for variable font
 */
export const generateVariableFontCSS = ({
  family,
  url,
  axes = []
}) => {
  if (!family || !url) return '';
  
  const axesString = axes.length 
    ? `\n  font-variation-settings: ${axes.map(a => `'${a.axis}' var(--${family.toLowerCase()}-${a.axis}, ${a.default})`).join(', ')};` 
    : '';
  
  return `
@font-face {
  font-family: '${family}';
  src: url('${url}') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;${axesString}
}

/* Variable font custom properties */
:root {
  ${axes.map(a => `--${family.toLowerCase()}-${a.axis}: ${a.default};`).join('\n  ')}
}`;
};
