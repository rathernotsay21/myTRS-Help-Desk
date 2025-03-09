#!/bin/bash
# Script to optimize client logos to 200x200 max size

cd /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/client_logos
mkdir -p small

# Choose the right command based on what's available
if command -v magick &> /dev/null; then
    CONVERT="magick"
else
    CONVERT="convert"
fi

# Process each webp file
for f in *.webp; do
    echo "Resizing $f to 200px max dimension..."
    $CONVERT "$f" -resize "200x200>" -strip "small/${f%.webp}-small.webp"
done

echo "All logos optimized!"
