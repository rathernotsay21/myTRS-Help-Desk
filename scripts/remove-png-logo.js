/**
 * Script to ensure only WebP logo is used
 * 
 * This script:
 * 1. Checks if both PNG and WebP versions of logo exist
 * 2. Creates a backup of the PNG if needed
 * 3. Removes references to the PNG logo in HTML files
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const STATIC_DIR = path.join(__dirname, '..', 'static');
const BUILD_DIR = path.join(__dirname, '..', 'build');
const PNG_LOGO_PATH = path.join(STATIC_DIR, 'img', 'myTRSlogo.png');
const WEBP_LOGO_PATH = path.join(STATIC_DIR, 'img', 'myTRSlogo.webp');
const BACKUP_DIR = path.join(STATIC_DIR, 'image_backup');

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Main function
async function ensureWebpLogoOnly() {
  console.log('Ensuring only WebP logo is used...');
  
  // 1. Check if both versions exist
  const pngExists = fs.existsSync(PNG_LOGO_PATH);
  const webpExists = fs.existsSync(WEBP_LOGO_PATH);
  
  if (!webpExists) {
    console.error('WebP logo not found! This script requires the WebP version to exist.');
    return false;
  }
  
  // 2. Create backup of PNG if needed
  if (pngExists) {
    const backupPath = path.join(BACKUP_DIR, 'myTRSlogo.png');
    console.log(`Creating backup of PNG logo to ${backupPath}...`);
    fs.copyFileSync(PNG_LOGO_PATH, backupPath);
    
    // Remove PNG version from static folder
    console.log('Removing PNG version from static folder...');
    fs.unlinkSync(PNG_LOGO_PATH);
  }
  
  // 3. Check if build directory exists
  if (fs.existsSync(BUILD_DIR)) {
    // Search for HTML files in build directory
    const htmlFiles = glob.sync(`${BUILD_DIR}/**/*.html`);
    
    console.log(`Found ${htmlFiles.length} HTML files in build directory.`);
    
    // Process each HTML file to replace PNG references with WebP
    let replacementCount = 0;
    
    for (const htmlFile of htmlFiles) {
      let content = fs.readFileSync(htmlFile, 'utf8');
      
      // Replace image references
      const newContent = content.replace(/myTRSlogo\.png/g, 'myTRSlogo.webp');
      
      if (newContent !== content) {
        fs.writeFileSync(htmlFile, newContent, 'utf8');
        replacementCount++;
      }
    }
    
    console.log(`Updated ${replacementCount} HTML files to use WebP logo.`);
  } else {
    console.log('Build directory not found. Run this script after building the site.');
  }
  
  console.log('WebP logo optimization complete!');
  return true;
}

// Run the function
ensureWebpLogoOnly();
