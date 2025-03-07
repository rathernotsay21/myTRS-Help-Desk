#!/bin/bash
# Script to optimize images for myTRS Help Desk
# Run from the project root directory

# Configure paths
IMG_DIR="static/img"
EVENT_PHOTOS_DIR="$IMG_DIR/event_photos"
CLIENT_LOGOS_DIR="$IMG_DIR/client_logos"
MOBILE_DIR="$EVENT_PHOTOS_DIR/mobile"

# Create mobile directory if it doesn't exist
mkdir -p $MOBILE_DIR

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is required but not installed."
    echo "Install with: brew install imagemagick"
    exit 1
fi

# Choose the correct command (magick or convert)
if command -v magick &> /dev/null; then
    CONVERT_CMD="magick"
else
    CONVERT_CMD="convert"
fi

# Function to convert JPGs/PNGs to WebP
convert_to_webp() {
    local source_dir=$1
    
    echo "Converting images in $source_dir to WebP format..."
    
    # Find all JPG and PNG files and convert them to WebP
    find "$source_dir" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -not -path "*/mobile/*" | while read img; do
        filename=$(basename -- "$img")
        extension="${filename##*.}"
        filename="${filename%.*}"
        output_path="${img%.*}.webp"
        
        # Skip if WebP already exists and is newer
        if [ -f "$output_path" ] && [ "$output_path" -nt "$img" ]; then
            echo "Skipping $img (WebP is up to date)"
        else
            echo "Converting $img to WebP..."
            cwebp -q 80 "$img" -o "$output_path"
        fi
    done
}

# Function to create mobile versions of WebP images
create_mobile_versions() {
    local source_dir=$1
    local mobile_dir=$2
    
    echo "Creating mobile versions in $mobile_dir..."
    
    # Create mobile directory if it doesn't exist
    mkdir -p "$mobile_dir"
    
    # Find all WebP files and create mobile versions
    find "$source_dir" -type f -name "*.webp" -not -path "*/mobile/*" | while read img; do
        filename=$(basename -- "$img")
        mobile_path="$mobile_dir/${filename%.webp}-mobile.webp"
        
        # Skip if mobile version already exists and is newer
        if [ -f "$mobile_path" ] && [ "$mobile_path" -nt "$img" ]; then
            echo "Skipping $filename (mobile version is up to date)"
        else
            echo "Creating mobile version of $filename..."
            $CONVERT_CMD "$img" -resize 600x -strip "$mobile_path"
        fi
    done
}

# Main execution
echo "=== myTRS Image Optimization Tool ==="
echo "Converting all images to WebP format..."
convert_to_webp "$EVENT_PHOTOS_DIR"
convert_to_webp "$CLIENT_LOGOS_DIR"

echo "Creating mobile versions of event photos..."
create_mobile_versions "$EVENT_PHOTOS_DIR" "$MOBILE_DIR"

echo "Optimization complete!"
echo "Full-size WebP images: $EVENT_PHOTOS_DIR"
echo "Mobile WebP images: $MOBILE_DIR"
echo "Client logos: $CLIENT_LOGOS_DIR"
