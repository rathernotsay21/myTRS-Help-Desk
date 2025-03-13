/**
 * Basic CSS Minification Script
 * 
 * This script performs simple minification of CSS files in the build output
 * without requiring external dependencies.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BUILD_DIR = path.join(__dirname, '..', 'build');
const CSS_DIR = path.join(BUILD_DIR, 'assets/css');

console.log('Starting basic CSS minification...');

// Check if directory exists
if (!fs.existsSync(CSS_DIR)) {
  console.error(`CSS directory not found: ${CSS_DIR}`);
  process.exit(1);
}

// Create backup directory
const backupDir = path.join(CSS_DIR, 'backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Get all CSS files
const cssFiles = fs.readdirSync(CSS_DIR).filter(file => 
  file.endsWith('.css') && !file.includes('.min.css')
);

console.log(`Found ${cssFiles.length} CSS files to minify`);

// Simple minification rules
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace
    .replace(/\s+/g, ' ')
    .replace(/\s*({|}|;|,|:)\s*/g, '$1')
    .replace(/;\s*}/g, '}')
    .replace(/\s*>\s*/g, '>')
    .trim();
}

// Process each file
let totalSavings = 0;
let totalOriginal = 0;

cssFiles.forEach(file => {
  const filePath = path.join(CSS_DIR, file);
  const backupPath = path.join(backupDir, file);
  
  // Skip if it's a directory
  if (fs.statSync(filePath).isDirectory()) return;
  
  console.log(`Processing ${file}...`);
  
  // Create backup
  fs.copyFileSync(filePath, backupPath);
  
  // Read file
  const css = fs.readFileSync(filePath, 'utf8');
  const originalSize = Buffer.byteLength(css, 'utf8');
  totalOriginal += originalSize;
  
  // Minify
  const minified = minifyCSS(css);
  const minifiedSize = Buffer.byteLength(minified, 'utf8');
  
  // Calculate savings
  const savings = originalSize - minifiedSize;
  const percentage = (savings / originalSize * 100).toFixed(2);
  totalSavings += savings;
  
  // Write minified file
  fs.writeFileSync(filePath, minified);
  
  console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KiB`);
  console.log(`  Minified: ${(minifiedSize / 1024).toFixed(2)} KiB`);
  console.log(`  Saved: ${(savings / 1024).toFixed(2)} KiB (${percentage}%)`);
});

const totalPercentage = (totalSavings / totalOriginal * 100).toFixed(2);
console.log(`\nTotal savings: ${(totalSavings / 1024).toFixed(2)} KiB (${totalPercentage}%)`);
console.log('CSS minification completed!');
