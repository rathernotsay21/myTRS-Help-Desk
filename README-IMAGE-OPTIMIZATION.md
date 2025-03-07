# Image Optimization for myTRS Help Desk

The website has been optimized to use WebP images for faster loading. Here's how to work with the optimized images:

## What Changed

1. All JPG, JPEG, and PNG images have been converted to WebP format
2. CSS and JavaScript references have been updated to use WebP versions
3. Image loading time and page performance is significantly improved

## Important Notes

- **Keep original PNG/JPG files for social media**: Some social platforms don't support WebP yet
- **Both formats exist side-by-side**: WebP for website, original formats for compatibility
- **Always use WebP in your HTML/CSS**: For faster loading and better performance

## If Images Break After Updates

If you notice broken images after updating or editing the site, run the fix script:

```bash
chmod +x fix-image-issues.sh
./fix-image-issues.sh
```

## Adding New Images

When adding new images to the project:

1. Save the original high-quality image (PNG/JPG)
2. Convert to WebP format:
   ```bash
   cwebp -q 80 your_image.jpg -o your_image.webp
   ```
3. Use the WebP version in your code:
   ```html
   <img src="/img/your_image.webp" alt="Description" width="800" height="600">
   ```
4. Keep the original for social media sharing/compatibility

## Recommended Tools

- WebP conversion: `cwebp` (command line) or Squoosh.app (GUI)
- Batch conversion: `find . -type f \( -name "*.png" -o -name "*.jpg" \) -exec cwebp -q 80 {} -o {}.webp \;`
- Image compression: ImageOptim (Mac), TinyPNG (web)
