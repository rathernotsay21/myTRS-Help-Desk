#!/bin/bash
# This script fixes any image issues caused by conversion

# First, restore any original images from .webp files if originals are missing

echo "Checking for missing image files..."

cd /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img

# Check for missing original logo files that may be needed for social sharing
if [ ! -f "myTRSlogo.png" ]; then
    echo "Restoring myTRSlogo.png from WebP version"
    convert myTRSlogo.webp myTRSlogo.png
fi

# Check for missing original client logo files
cd /Users/rathernotsay/Documents/GitHub/myTRS-Help-Desk/static/img/client_logos

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
    if [ ! -f "${logo}.png" ]; then
        echo "Creating ${logo}.png from WebP for social media compatibility"
        convert "${logo}.webp" "${logo}.png"
    fi
done

echo "Done fixing image issues!"
