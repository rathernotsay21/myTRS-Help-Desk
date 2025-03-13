#!/bin/bash
# This script fixes any image issues caused by conversion

# Set up script to use relative paths from project root
# Get the script's directory path
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Navigate to project root (2 levels up from script location)
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "Working from project root: $PROJECT_ROOT"
echo "Checking for missing image files..."

# Use project root to build paths
IMG_DIR="$PROJECT_ROOT/static/img"
CLIENT_LOGOS_DIR="$IMG_DIR/client_logos"

# Verify directories exist
if [ ! -d "$IMG_DIR" ]; then
    echo "Error: Image directory not found: $IMG_DIR"
    echo "Make sure you're running this script from the project root or scripts directory."
    exit 1
fi

if [ ! -d "$CLIENT_LOGOS_DIR" ]; then
    echo "Error: Client logos directory not found: $CLIENT_LOGOS_DIR"
    echo "Make sure the directory structure is correct."
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is required but not installed."
    echo "Install with: brew install imagemagick (Mac) or apt-get install imagemagick (Linux)"
    exit 1
fi

# Navigate to img directory using absolute path
cd "$IMG_DIR"

# Check for missing original logo files that may be needed for social sharing
if [ ! -f "myTRSlogo.png" ] && [ -f "myTRSlogo.webp" ]; then
    echo "Restoring myTRSlogo.png from WebP version"
    convert myTRSlogo.webp myTRSlogo.png
fi

# Navigate to client logos directory using absolute path
cd "$CLIENT_LOGOS_DIR"

# Create original versions for social media compatibility
declare -a logos=(
    "NCAA_Logo"
    "NFL_Draft_Logo"
    "National_FFA-Logo"
    "Special_Olympics_Logo"
    "USA_Track_and_Field_Logo"
    "superbowl_logo_processed"
)

for logo in "${logos[@]}"; do
    if [ ! -f "${logo}.png" ] && [ -f "${logo}.webp" ]; then
        echo "Creating ${logo}.png from WebP for social media compatibility"
        convert "${logo}.webp" "${logo}.png"
    fi
done

echo "Done fixing image issues!"
