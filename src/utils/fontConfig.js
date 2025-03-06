/**
 * Font configuration for the myTRS Help Desk site
 * This file centralizes all font configurations
 */

export const fontConfig = {
  // Primary fonts for the site
  primary: [
    {
      family: 'Inter',
      display: 'swap', // Use 'swap' for text fonts to prevent FOIT
      weights: [
        {
          weight: '400',
          style: 'normal',
          sources: [
            '/fonts/inter-v13-latin-regular.woff2',
            '/fonts/inter-v13-latin-regular.woff'
          ]
        },
        {
          weight: '500',
          style: 'normal',
          sources: [
            '/fonts/inter-v13-latin-500.woff2',
            '/fonts/inter-v13-latin-500.woff'
          ]
        },
        {
          weight: '600',
          style: 'normal',
          sources: [
            '/fonts/inter-v13-latin-600.woff2',
            '/fonts/inter-v13-latin-600.woff'
          ]
        },
        {
          weight: '700',
          style: 'normal',
          sources: [
            '/fonts/inter-v13-latin-700.woff2',
            '/fonts/inter-v13-latin-700.woff'
          ]
        }
      ],
      fallbacks: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }
  ],
  
  // Monospace font for code blocks
  mono: [
    {
      family: 'JetBrains Mono',
      display: 'swap',
      weights: [
        {
          weight: '400',
          style: 'normal',
          sources: [
            '/fonts/jetbrains-mono-v18-latin-regular.woff2',
            '/fonts/jetbrains-mono-v18-latin-regular.woff'
          ]
        },
        {
          weight: '700',
          style: 'normal',
          sources: [
            '/fonts/jetbrains-mono-v18-latin-700.woff2',
            '/fonts/jetbrains-mono-v18-latin-700.woff'
          ]
        }
      ],
      fallbacks: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace'
    }
  ],
  
  // Variable fonts (if used)
  variable: [
    {
      family: 'InterVariable',
      url: '/fonts/inter-v13-latin-variable.woff2',
      axes: [
        { axis: 'wght', default: '400', min: '100', max: '900' }
      ]
    }
  ],
  
  // Critical fonts that should be preloaded
  preload: [
    {
      url: '/fonts/inter-v13-latin-regular.woff2',
      type: 'font/woff2',
      crossOrigin: true
    },
    {
      url: '/fonts/inter-v13-latin-600.woff2',
      type: 'font/woff2',
      crossOrigin: true
    }
  ]
};

/**
 * Function to generate all font CSS declarations
 * 
 * @returns {string} - Complete CSS for all fonts
 */
export const generateFontCSS = () => {
  let css = '';
  
  // Add primary fonts
  fontConfig.primary.forEach(font => {
    font.weights.forEach(weight => {
      css += `
@font-face {
  font-family: '${font.family}';
  font-style: ${weight.style};
  font-weight: ${weight.weight};
  font-display: ${font.display};
  src: ${weight.sources.map(src => {
    if (src.endsWith('.woff2')) {
      return `url('${src}') format('woff2')`;
    } else if (src.endsWith('.woff')) {
      return `url('${src}') format('woff')`;
    }
    return `url('${src}')`;
  }).join(', ')};
}`;
    });
  });
  
  // Add monospace fonts
  fontConfig.mono.forEach(font => {
    font.weights.forEach(weight => {
      css += `
@font-face {
  font-family: '${font.family}';
  font-style: ${weight.style};
  font-weight: ${weight.weight};
  font-display: ${font.display};
  src: ${weight.sources.map(src => {
    if (src.endsWith('.woff2')) {
      return `url('${src}') format('woff2')`;
    } else if (src.endsWith('.woff')) {
      return `url('${src}') format('woff')`;
    }
    return `url('${src}')`;
  }).join(', ')};
}`;
    });
  });
  
  // Add variable fonts
  fontConfig.variable.forEach(font => {
    css += `
@font-face {
  font-family: '${font.family}';
  src: url('${font.url}') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
  ${font.axes ? `font-variation-settings: ${font.axes.map(a => `'${a.axis}' var(--${font.family.toLowerCase()}-${a.axis}, ${a.default})`).join(', ')};` : ''}
}

/* Variable font custom properties */
:root {
  ${font.axes ? font.axes.map(a => `--${font.family.toLowerCase()}-${a.axis}: ${a.default};`).join('\n  ') : ''}
}`;
  });
  
  return css;
};

/**
 * Generate font family CSS variables
 * 
 * @returns {string} - CSS for font family variables
 */
export const generateFontVariables = () => {
  return `
:root {
  --font-family-base: ${fontConfig.primary[0]?.family || 'Inter'}, ${fontConfig.primary[0]?.fallbacks || 'sans-serif'};
  --font-family-heading: ${fontConfig.primary[0]?.family || 'Inter'}, ${fontConfig.primary[0]?.fallbacks || 'sans-serif'};
  --font-family-mono: ${fontConfig.mono[0]?.family || 'JetBrains Mono'}, ${fontConfig.mono[0]?.fallbacks || 'monospace'};
  --font-family-variable: ${fontConfig.variable[0]?.family || 'InterVariable'}, ${fontConfig.primary[0]?.fallbacks || 'sans-serif'};
}`;
};

/**
 * Get font preload tags for head
 * 
 * @returns {Array} - Array of preload tags for Docusaurus head
 */
export const getFontPreloadTags = () => {
  return fontConfig.preload.map(font => ({
    tagName: 'link',
    rel: 'preload',
    href: font.url,
    as: 'font',
    type: font.type,
    crossorigin: font.crossOrigin ? 'anonymous' : undefined
  }));
};

/**
 * Get font-face observer script for critical fonts
 * 
 * @returns {Object} - Script tag for font loading
 */
export const getFontObserverScript = () => {
  return {
    tagName: 'script',
    innerHTML: `
(function() {
  // Simple font loading detection
  function fontIsLoaded(fontFamily) {
    return document.fonts.check('1em ' + fontFamily);
  }
  
  // Add font loading class to help prevent FOIT
  if (!fontIsLoaded('${fontConfig.primary[0]?.family || 'Inter'}')) {
    document.documentElement.classList.add('fonts-loading');
  }
  
  // Remove the class when fonts are loaded
  document.fonts.ready.then(function() {
    document.documentElement.classList.remove('fonts-loading');
    document.documentElement.classList.add('fonts-loaded');
  });
})();`
  };
};
