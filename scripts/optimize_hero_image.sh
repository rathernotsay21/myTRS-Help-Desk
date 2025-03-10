#!/bin/bash
# Make the script executable with: chmod +x optimize_hero_image.sh

# Create optimized directory if it doesn't exist
mkdir -p /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/optimized/event_photos

# Create a backup of the original image
cp /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/event_photos/hands_computer.webp \
   /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/event_photos/hands_computer.original.webp

# Convert the WebP to optimized version with cwebp (assuming it's installed)
# -resize 1200 0 = resize to width 1200px, maintaining aspect ratio
# -q 75 = quality 75%
# -m 6 = use highest compression method
# Using dwebp to decode and cwebp to re-encode with optimization
dwebp /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/event_photos/hands_computer.webp \
  -o /tmp/hands_computer.png && \
cwebp -q 75 -m 6 -resize 1200 0 /tmp/hands_computer.png \
  -o /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/optimized/event_photos/hands_computer.webp

# Remove the temporary PNG file
rm /tmp/hands_computer.png

# Print file sizes for comparison
echo "Original size:"
ls -lh /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/event_photos/hands_computer.webp
echo "Optimized size:"
ls -lh /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/optimized/event_photos/hands_computer.webp
