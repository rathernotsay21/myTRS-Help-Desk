// Simple Node.js script to update image references from JPG/JPEG to WebP
const fs = require('fs');
const path = require('path');

// Directories to search
const dirsToSearch = [
  path.join(__dirname, 'src'),
  path.join(__dirname, 'static')
];

// File extensions to check
const fileExtensionsToCheck = ['.js', '.jsx', '.tsx', '.ts', '.css', '.md', '.mdx', '.html'];

// Extensions to replace
const replacements = [
  { from: '.jpg', to: '.webp' },
  { from: '.jpeg', to: '.webp' },
  { from: '.png', to: '.webp' }
];

// Skip social sharing images and logos unless they have a webp version
const skipPatterns = [
  'social-card',
  'favicon',
  'opengraph',
  'twitter-card'
];

// Function to recursively search directories
function searchDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('node_modules') && !file.startsWith('.')) {
        // Recursively search subdirectories
        searchDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(fullPath).toLowerCase();
        if (fileExtensionsToCheck.includes(ext)) {
          processFile(fullPath);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
}

// Function to process a file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check for image paths
    for (const replacement of replacements) {
      const regex = new RegExp(`(["'/][^"']*?)${replacement.from.replace('.', '\\.')}(["']|\\?)`, 'g');
      const newContent = content.replace(regex, (match, prefix, suffix) => {
        // Don't replace if the file doesn't exist in WebP format
        const possibleImgPath = match.replace(/["']/g, '');
        const webpPath = possibleImgPath.replace(replacement.from, replacement.to);
        const absoluteWebpPath = path.join(process.cwd(), webpPath.replace(/^\//, ''));
        
        // Skip if it's not likely a local file reference
        if (possibleImgPath.includes('http') || possibleImgPath.includes('data:')) {
          return match;
        }
        
        // Skip social media images and favicons
        for (const pattern of skipPatterns) {
          if (possibleImgPath.includes(pattern)) {
            return match;
          }
        }
        
        // Skip if WebP version doesn't exist
        try {
          if (!fs.existsSync(absoluteWebpPath)) {
            return match;
          }
        } catch {
          return match;
        }
        
        modified = true;
        return `${prefix}${replacement.to}${suffix}`;
      });
      
      if (content !== newContent) {
        content = newContent;
      }
    }
    
    // Write back the file if modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated image references in: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

// Start the search
console.log('Starting to update image references...');
for (const dir of dirsToSearch) {
  searchDirectory(dir);
}
console.log('Finished updating image references.');
