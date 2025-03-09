/**
 * Script to update HTML files to use optimized images
 * Run with: node update_html_for_optimized_images.js
 * Requires: npm install glob fs-extra
 */

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

// Configuration
const baseDir = path.join(__dirname, '..', '..');
const patterns = [
  path.join(baseDir, '**/*.html'),
  path.join(baseDir, '**/*.js'),
  path.join(baseDir, '**/*.jsx'),
  path.join(baseDir, '**/*.md'),
  path.join(baseDir, '**/*.mdx')
];

// Image extension map (old -> new)
const extensionMap = {
  '.png': '.webp',
  '.jpg': '.webp',
  '.jpeg': '.webp'
};

// Image paths to update
const imagePaths = [
  '/static/img/',
  '/img/'
];

// Function to process files
async function processFiles() {
  // Get all files that match patterns
  const files = [];
  for (const pattern of patterns) {
    const matches = glob.sync(pattern);
    files.push(...matches);
  }

  console.log(`Found ${files.length} files to check for image references`);

  // Process each file
  for (const file of files) {
    try {
      // Read file content
      const content = await fs.readFile(file, 'utf8');
      
      // Skip if no image references
      if (!imagePaths.some(path => content.includes(path))) {
        continue;
      }

      // Create modified content
      let newContent = content;
      
      // Replace image extensions
      for (const [oldExt, newExt] of Object.entries(extensionMap)) {
        for (const imgPath of imagePaths) {
          // Look for image references with old extension
          const imgRefRegex = new RegExp(`(${imgPath}[^"']+)\\${oldExt}["']`, 'g');
          newContent = newContent.replace(imgRefRegex, `$1${newExt}"`);
        }
      }

      // Add width and height attributes to img tags if missing
      newContent = newContent.replace(/<img([^>]*)src=["']([^"']+)["']([^>]*)>/g, (match, before, src, after) => {
        if (match.includes('width=') && match.includes('height=')) {
          // Already has width and height
          return match;
        }
        
        // Add loading="lazy" if not present
        let newAttr = before + ` src="${src}"`;
        if (!match.includes('loading=')) {
          newAttr += ' loading="lazy"';
        }
        
        // Add placeholder width/height - these should be updated manually
        if (!match.includes('width=')) {
          newAttr += ' width="auto"';
        }
        if (!match.includes('height=')) {
          newAttr += ' height="auto"';
        }
        
        newAttr += after;
        return `<img${newAttr}>`;
      });

      // Only write file if changes were made
      if (newContent !== content) {
        await fs.writeFile(file, newContent, 'utf8');
        console.log(`Updated: ${file}`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

// Run the process
processFiles()
  .then(() => console.log('HTML update complete!'))
  .catch(err => console.error('Error:', err));
