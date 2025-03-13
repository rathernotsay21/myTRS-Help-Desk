/**
 * CSS Optimization Script
 * 
 * This script uses PurgeCSS to remove unused CSS from the build output.
 * Run after building with: node optimize-css.js
 */

const { PurgeCSS } = require('purgecss');
const fs = require('fs');
const path = require('path');

// Configuration
const BUILD_DIR = path.join(__dirname, '..', 'build');
const CSS_DIR = path.join(BUILD_DIR, 'assets/css');
const CONTENT_PATHS = [
  path.join(BUILD_DIR, '**/*.html'),
  path.join(BUILD_DIR, '**/*.js')
];

console.log(`Looking for CSS files in: ${CSS_DIR}`);

// Make sure the build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error(`Build directory does not exist: ${BUILD_DIR}`);
  process.exit(1);
}

// Create backup of original CSS files
const backupDirectory = path.join(CSS_DIR, 'backup');
if (!fs.existsSync(backupDirectory)) {
  fs.mkdirSync(backupDirectory, { recursive: true });
}

async function optimizeCSS() {
  try {
    // Get all CSS files in the build directory
    const cssFiles = fs.readdirSync(CSS_DIR)
      .filter(file => file.endsWith('.css'))
      .map(file => path.join(CSS_DIR, file));
    
    // Create backups
    cssFiles.forEach(file => {
      const backupPath = path.join(backupDirectory, path.basename(file));
      fs.copyFileSync(file, backupPath);
      console.log(`Created backup: ${backupPath}`);
    });
    
    // Run PurgeCSS on each file
    for (const cssFile of cssFiles) {
      const fileName = path.basename(cssFile);
      
      // Skip already optimized files
      if (fileName.includes('.min.css') || fileName.includes('.optimized.css')) {
        console.log(`Skipping already optimized file: ${fileName}`);
        continue;
      }
      
      console.log(`Optimizing: ${fileName}`);
      
      // Run PurgeCSS with more aggressive settings
      const purgeCSSResult = await new PurgeCSS().purge({
        content: CONTENT_PATHS,
        css: [cssFile],
        safelist: {
          standard: [/^html/, /^body/, /^:root/],
          deep: [/dark-mode/, /theme--/, /DocSearch/, /navbar/, /pagination/]
        },
        rejected: true, // Log removed selectors for debugging
        keyframes: true, // Remove unused keyframes
        fontFace: true, // Remove unused font faces
        variables: true // Remove unused variables
      });
      
      if (purgeCSSResult.length > 0) {
        const originalSize = fs.statSync(cssFile).size;
        
        // Write optimized file
        fs.writeFileSync(cssFile, purgeCSSResult[0].css);
        
        const optimizedSize = fs.statSync(cssFile).size;
        const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
        
        console.log(`Optimized ${fileName}: ${originalSize} → ${optimizedSize} bytes (${reduction}% reduction)`);
      }
    }
    
    console.log('CSS optimization completed successfully!');
  } catch (error) {
    console.error('Error optimizing CSS:', error);
  }
}

// Execute the function
optimizeCSS();
