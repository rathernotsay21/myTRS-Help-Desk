/**
 * JavaScript Minification Script
 * 
 * This script minifies JavaScript files in the build output using terser.
 * Run after building with: node scripts/minify-js.js
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const glob = require('glob');

// Paths
const BUILD_DIR = path.join(__dirname, '..', 'build');
const JS_DIR = path.join(BUILD_DIR, 'assets/js');

console.log(`Looking for JavaScript files in: ${JS_DIR}`);

// Make sure the backup directory exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error(`Build directory does not exist: ${BUILD_DIR}`);
  process.exit(1);
}

// Create backup directory
const BACKUP_DIR = path.join(JS_DIR, 'backup');
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

async function minifyJavaScript() {
  console.log('Starting JavaScript minification...');
  
  try {
    // Get all JavaScript files in the build directory
    // Use a more comprehensive glob pattern to find all JS files
    const jsFiles = glob.sync(`${JS_DIR}/**/*.js`, { nodir: true });
    // Filter out files that might be already minified
    const filesToMinify = jsFiles.filter(file => {
      const fileName = path.basename(file);
      return !file.includes('.min.js') && !fileName.includes('.LICENSE.txt');
    });
    
    // Log what we found
    console.log(`Found ${jsFiles.length} JavaScript files, ${filesToMinify.length} eligible for minification.`);
    filesToMinify.forEach(file => {
      console.log(`  - ${path.basename(file)}`);
    });
    
    let totalOriginalSize = 0;
    let totalMinifiedSize = 0;
    
    for (const filePath of filesToMinify) {
      const fileName = path.basename(filePath);
      
      // Skip already minified files
      if (fileName.includes('.min.js')) {
        console.log(`Skipping already minified file: ${fileName}`);
        continue;
      }
      
      // Create backup
      const backupPath = path.join(BACKUP_DIR, fileName);
      fs.copyFileSync(filePath, backupPath);
      
      // Read file content
      const code = fs.readFileSync(filePath, 'utf8');
      const originalSize = Buffer.byteLength(code, 'utf8');
      totalOriginalSize += originalSize;
      
      // Minify using terser
      console.log(`Minifying: ${fileName}`);
      const minified = await minify(code, {
        compress: {
          drop_console: false,
          drop_debugger: true
        },
        mangle: true,
        format: {
          comments: false
        }
      });
      
      // Write minified content back to the file
      fs.writeFileSync(filePath, minified.code);
      
      // Calculate size reduction
      const minifiedSize = Buffer.byteLength(minified.code, 'utf8');
      totalMinifiedSize += minifiedSize;
      const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
      
      console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KiB`);
      console.log(`  Minified: ${(minifiedSize / 1024).toFixed(2)} KiB`);
      console.log(`  Reduction: ${reduction}%`);
    }
    
    // Summary
    const totalReduction = ((totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100).toFixed(2);
    console.log('\nSummary:');
    console.log(`Total original size: ${(totalOriginalSize / 1024).toFixed(2)} KiB`);
    console.log(`Total minified size: ${(totalMinifiedSize / 1024).toFixed(2)} KiB`);
    console.log(`Total reduction: ${totalReduction}%`);
    
    console.log('\nJavaScript minification completed successfully!');
  } catch (error) {
    console.error('Error during JavaScript minification:', error);
  }
}

minifyJavaScript();
