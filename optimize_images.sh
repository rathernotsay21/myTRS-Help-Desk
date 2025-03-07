#!/bin/bash

# Image Optimization Script for myTRS-Help-Desk
# This script requires: cwebp, imagemagick (for mogrify)
# Install with: brew install webp imagemagick

echo "Starting image optimization process..."

# Base directories
BASE_DIR="/Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk"
STATIC_DIR="$BASE_DIR/static/img"
OPTIMIZED_DIR="$BASE_DIR/static/img/optimized"

# Create optimized directories if they don't exist
mkdir -p "$OPTIMIZED_DIR/client_logos"
mkdir -p "$OPTIMIZED_DIR/event_photos"
mkdir -p "$OPTIMIZED_DIR/staff_photos"

# 1. Optimize banner and main images - convert to WebP and resize
echo "Optimizing banner and main images..."
for img in "$STATIC_DIR"/myTRS_logo*.png "$STATIC_DIR"/docusaurus.png; do
  filename=$(basename "$img")
  if [ -f "$img" ]; then
    cwebp -q 85 -resize 0 800 "$img" -o "$OPTIMIZED_DIR/${filename%.*}.webp"
    echo "Optimized: $filename"
  fi
done

# 2. Optimize client logos - convert to WebP, max size 200px
echo "Optimizing client logos..."
for img in "$STATIC_DIR/client_logos"/*.{png,jpg,jpeg,webp}; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    cwebp -q 85 -resize 200 0 "$img" -o "$OPTIMIZED_DIR/client_logos/${filename%.*}.webp"
    echo "Optimized: $filename"
  fi
done

# 3. Optimize event photos - resize to max width 1200px, convert to WebP
echo "Optimizing event photos..."
for img in "$STATIC_DIR/event_photos"/*.{jpg,jpeg,png}; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    cwebp -q 80 -resize 1200 0 "$img" -o "$OPTIMIZED_DIR/event_photos/${filename%.*}.webp"
    echo "Optimized: $filename"
  fi
done

# 4. Optimize staff photos
echo "Optimizing staff photos..."
for img in "$STATIC_DIR/staff_photos"/*.{jpg,jpeg,png}; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    cwebp -q 85 -resize 400 0 "$img" -o "$OPTIMIZED_DIR/staff_photos/${filename%.*}.webp"
    echo "Optimized: $filename"
  fi
done

echo "Optimization complete! Optimized images are in $OPTIMIZED_DIR"
echo "Check the quality of optimized images before replacing the originals."
echo "You can run the following to replace originals (after backing them up):"
echo "cp -r $OPTIMIZED_DIR/* $STATIC_DIR/"
