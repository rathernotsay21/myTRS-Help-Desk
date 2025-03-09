# Image Optimization for myTRS-Help-Desk

This guide outlines the image optimization process implemented to improve page load times.

## What's Been Optimized

1. **All Images Converted to WebP Format**
   - WebP provides superior compression with high quality
   - 25-35% smaller file sizes compared to PNG/JPEG
   - Broad browser support (98.3% globally as of March 2025)

2. **Image Size Reduction**
   - Banner images resized to max width of 1200px
   - Client logos standardized to max width of 200px
   - Staff photos optimized to appropriate dimensions

3. **Code Updates**
   - Added lazy loading to images
   - Added width and height attributes to prevent layout shifts

## How to Run the Optimization

1. **Install Required Tools**
   ```bash
   brew install webp imagemagick
   npm install glob fs-extra
   ```

2. **Run the Optimization Script**
   ```bash
   chmod +x optimize_images.sh
   ./optimize_images.sh
   ```

3. **Update HTML to Reference WebP Images**
   ```bash
   node update_html_for_optimized_images.js
   ```

4. **Manual Verification**
   - Check optimized images in `/static/img/optimized` directory
   - Update image dimensions in HTML if `auto` doesn't work correctly

5. **Replace Original Images**
   ```bash
   # After backing up originals
   cp -r /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/optimized/* /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/
   ```

## Additional Performance Improvements

1. **Implement Responsive Images**
   ```html
   <img 
     src="image.webp" 
     srcset="image-small.webp 400w, image-medium.webp 800w, image-large.webp 1200w" 
     sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
     loading="lazy"
     width="800" height="600" 
     alt="Description">
   ```

2. **Advanced Options for Critical Images**
   - Consider inline critical images with base64 encoding
   - Use LQIP (Low Quality Image Placeholders) for better perceived performance

3. **Content Delivery Network (CDN)**
   - Consider using Cloudflare, BunnyCDN, or similar for image delivery

## Sources for Better Images

1. **Vector Logos**
   - [Brand Resource Centers](https://brandfolder.com/workbench/list-of-brand-guidelines-and-assets)
   - [The Noun Project](https://thenounproject.com/) for icon replacements

2. **High Quality Stock Photos**
   - [Unsplash](https://unsplash.com) - Free high-quality photos
   - [Pexels](https://pexels.com) - Free stock photos and videos
