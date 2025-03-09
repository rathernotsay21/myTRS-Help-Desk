// This script can be run in the browser console to fix author images dynamically
(function fixAuthorImages() {
  // Find all image elements
  const images = document.querySelectorAll('img');
  
  // Replace image sources for author images
  images.forEach(img => {
    const src = img.getAttribute('src');
    
    // Skip if no src
    if (!src) return;
    
    // Handle specific author images
    if (src.includes('Flory.jpg') || src.includes('Flory.jpeg') || src.includes('Flory.png')) {
      img.setAttribute('src', '/img/staff_photos/Flory.webp');
    } else if (src.includes('Giang.jpg') || src.includes('Giang.jpeg') || src.includes('Giang.png')) {
      img.setAttribute('src', '/img/staff_photos/Giang.webp');
    } else if (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png')) {
      // Convert other image formats to WebP if WebP version exists
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
      
      // Create a test image to check if WebP version exists
      const testImg = new Image();
      testImg.onload = function() {
        img.setAttribute('src', webpSrc);
      };
      testImg.src = webpSrc;
    }
  });
  
  // Also add width and height attributes to any missing ones
  images.forEach(img => {
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      // Default sizes for avatars
      img.setAttribute('width', img.width || 48);
      img.setAttribute('height', img.height || 48);
    }
  });
  
  console.log('Author images fixed');
})();
