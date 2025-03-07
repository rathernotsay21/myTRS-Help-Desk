import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';

// Root component to apply global fixes
export default function Root({children}) {
  useEffect(() => {
    // Helper to convert all image URLs to WebP
    const fixImageUrls = () => {
      // Find all images
      const images = document.querySelectorAll('img');
      
      // Process each image
      images.forEach(img => {
        const src = img.getAttribute('src');
        if (src && (src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png'))) {
          // Replace with WebP version
          const newSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
          img.setAttribute('src', newSrc);
        }
        
        // Handle specific author images
        if (src && (src.includes('Flory') || src.includes('flory'))) {
          img.setAttribute('src', '/img/staff_photos/Flory.webp');
        } else if (src && (src.includes('Giang') || src.includes('giang'))) {
          img.setAttribute('src', '/img/staff_photos/Giang.webp');
        }
        
        // Add width/height if missing
        if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
          img.setAttribute('width', img.width || 48);
          img.setAttribute('height', img.height || 48);
        }
      });
    };

    // Run once after initial render
    fixImageUrls();
    
    // Set up a mutation observer to handle dynamically loaded content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          fixImageUrls();
        }
      });
    });
    
    // Start observing the document
    observer.observe(document.body, { 
      childList: true,
      subtree: true 
    });
    
    // Clean up observer on unmount
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        {/* Force browser to prefer WebP images */}
        <meta httpEquiv="Accept-CH" content="DPR, Width, Viewport-Width, ECT, Save-Data" />
      </Head>
      {children}
    </>
  );
}
