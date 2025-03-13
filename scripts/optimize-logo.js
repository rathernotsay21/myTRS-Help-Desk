/**
 * Simple script to ensure the logo is available in WebP format
 * This is a fallback for Windows environments where the shell script can't run
 */

const fs = require('fs');
const path = require('path');

// Configure paths
const IMG_DIR = path.join(__dirname, '..', 'static', 'img');
const PNG_LOGO = path.join(IMG_DIR, 'myTRSlogo.png');
const WEBP_LOGO = path.join(IMG_DIR, 'myTRSlogo.webp');

// Main function
function ensureWebPLogo() {
  console.log('Checking for WebP logo...');
  
  // Check if PNG logo exists
  if (!fs.existsSync(PNG_LOGO)) {
    console.error(`PNG logo not found at: ${PNG_LOGO}`);
    return false;
  }
  
  // Check if WebP logo already exists
  if (fs.existsSync(WEBP_LOGO)) {
    const pngStats = fs.statSync(PNG_LOGO);
    const webpStats = fs.statSync(WEBP_LOGO);
    
    console.log(`PNG logo size: ${(pngStats.size / 1024).toFixed(2)} KiB`);
    console.log(`WebP logo size: ${(webpStats.size / 1024).toFixed(2)} KiB`);
    
    // Check if WebP is newer than PNG
    if (webpStats.mtime > pngStats.mtime) {
      console.log('WebP logo is up to date.');
      return true;
    }
    
    console.log('WebP logo exists but may be outdated.');
  } else {
    console.log('WebP logo does not exist.');
  }
  
  try {
    // Try to use Sharp if available (need to check if installed)
    let sharp;
    try {
      sharp = require('sharp');
      console.log('Using Sharp for WebP conversion...');
      
      // Convert PNG to WebP using Sharp
      sharp(PNG_LOGO)
        .webp({ quality: 80 })
        .toFile(WEBP_LOGO)
        .then(() => {
          console.log(`Successfully created WebP logo at: ${WEBP_LOGO}`);
          const webpStats = fs.statSync(WEBP_LOGO);
          console.log(`WebP logo size: ${(webpStats.size / 1024).toFixed(2)} KiB`);
        })
        .catch(err => {
          console.error('Error converting to WebP:', err);
        });
      
      return true;
    } catch (err) {
      console.log('Sharp not installed, skipping WebP conversion.');
      
      // If Sharp is not available, recommend manual conversion
      console.log('\nTo manually convert the logo to WebP:');
      console.log('1. Install Sharp: npm install --save-dev sharp');
      console.log('2. Run this script again');
      console.log('- OR -');
      console.log('1. Use an online converter like https://convertio.co/png-webp/');
      console.log('2. Save the result as static/img/myTRSlogo.webp');
      
      return false;
    }
  } catch (error) {
    console.error('Error ensuring WebP logo:', error);
    return false;
  }
}

// Run the function
ensureWebPLogo();
