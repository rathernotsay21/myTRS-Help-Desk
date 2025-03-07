import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import ResponsiveImage from '@site/src/components/ResponsiveImage';

// Add custom responsive image handling for all MDX content
export default {
  ...MDXComponents,
  // Override the default img component to use ResponsiveImage
  img: (props) => {
    // Calculate aspect ratio based on dimensions in URL or use defaults
    let width = 800;
    let height = 600;
    
    // Look for dimensions in alt text with format [WxH]
    const dimensionMatch = props.alt && props.alt.match(/\[(\d+)x(\d+)\]/);
    if (dimensionMatch) {
      width = parseInt(dimensionMatch[1], 10);
      height = parseInt(dimensionMatch[2], 10);
      // Remove dimensions from alt text for accessibility
      props.alt = props.alt.replace(/\[\d+x\d+\]/, '').trim();
    }

    // Fix blog image paths that might be broken
    let src = props.src;
    if (src && src.includes('.jpg')) {
      src = src.replace('.jpg', '.webp');
    } else if (src && src.includes('.jpeg')) {
      src = src.replace('.jpeg', '.webp');
    } else if (src && src.includes('.png')) {
      src = src.replace('.png', '.webp');
    }

    return (
      <ResponsiveImage
        src={src}
        alt={props.alt || ''}
        width={width}
        height={height}
        className={props.className}
        lazy={true}
      />
    );
  },
};
