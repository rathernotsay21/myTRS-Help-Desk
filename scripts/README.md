# myTRS Help Desk Scripts

This directory contains utility scripts for maintaining and optimizing the myTRS Help Desk website.

## Available Scripts

### optimize-images.sh

This script optimizes images for web delivery by:

1. Converting all JPG and PNG images to WebP format
2. Creating mobile-optimized versions of event photos 
3. Preserving original files for compatibility

#### Usage:

```bash
# Make the script executable
chmod +x scripts/optimize-images.sh

# Run from the project root directory
./scripts/optimize-images.sh
```

#### Requirements:

- ImageMagick (`magick` or `convert` command)
- cwebp (from WebP package)

Install on macOS:
```bash
brew install imagemagick webp
```

Install on Ubuntu/Debian:
```bash
sudo apt-get install imagemagick webp
```

## When to Run Scripts

- After adding new images to the project
- Before building the site for deployment
- When updating existing images

## Troubleshooting

If you see warnings about "convert" command being deprecated, you can safely ignore them - the script will automatically use the "magick" command when available.
