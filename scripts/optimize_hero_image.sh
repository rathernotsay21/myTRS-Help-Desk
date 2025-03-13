#!/bin/bash
# Script to optimize the hero image for better performance
# Make the script executable with: chmod +x optimize_hero_image.sh

# Set up script to use relative paths from project root
# Get the script's directory path
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Navigate to project root (1 level up from script location)
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Working from project root: $PROJECT_ROOT"

# Define paths relative to project root
SOURCE_DIR="$PROJECT_ROOT/static/img/event_photos"
OPTIMIZED_DIR="$PROJECT_ROOT/static/img/optimized/event_photos"
SOURCE_IMAGE="$SOURCE_DIR/hands_computer.webp"
BACKUP_IMAGE="$SOURCE_DIR/hands_computer.original.webp"
OPTIMIZED_IMAGE="$OPTIMIZED_DIR/hands_computer.webp"
TEMP_PNG="/tmp/hands_computer.png"

# Check if tools are installed
if ! command -v dwebp &> /dev/null || ! command -v cwebp &> /dev/null; then
    echo "Error: webp tools (dwebp, cwebp) are required but not installed."
    echo "Install with: brew install webp (Mac) or apt-get install webp (Linux)"
    exit 1
fi

# Verify source file exists
if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "Error: Source image not found: $SOURCE_IMAGE"
    echo "Make sure you're running this script from the project root or scripts directory."
    exit 1
fi

# Create optimized directory if it doesn't exist
mkdir -p "$OPTIMIZED_DIR"

# Create a backup of the original image if no backup exists
if [ ! -f "$BACKUP_IMAGE" ]; then
    echo "Creating backup of original image"
    cp "$SOURCE_IMAGE" "$BACKUP_IMAGE"
fi

echo "Converting hero image to optimized version..."

# Convert the WebP to optimized version with cwebp
# -resize 1200 0 = resize to width 1200px, maintaining aspect ratio
# -q 75 = quality 75%
# -m 6 = use highest compression method
# Using dwebp to decode and cwebp to re-encode with optimization
dwebp "$SOURCE_IMAGE" -o "$TEMP_PNG" && \
cwebp -q 75 -m 6 -resize 1200 0 "$TEMP_PNG" -o "$OPTIMIZED_IMAGE"

# Check if optimization was successful
if [ ! -f "$OPTIMIZED_IMAGE" ]; then
    echo "Error: Optimization failed"
    exit 1
fi

# Remove the temporary PNG file
rm -f "$TEMP_PNG"

# Print file sizes for comparison
echo "Original size:"
ls -lh "$SOURCE_IMAGE"
echo "Optimized size:"
ls -lh "$OPTIMIZED_IMAGE"

echo "Optimization complete. Optimized image is available at: $OPTIMIZED_IMAGE"
