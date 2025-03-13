/**
 * Extract Critical CSS Script
 * 
 * This script extracts critical CSS for above-the-fold content and inlines it
 * into HTML files to improve First Contentful Paint and Largest Contentful Paint.
 */

// Use simple inline CSS approach without the critical package
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const BUILD_DIR = path.join(__dirname, '..', 'build');
const HTML_FILES = glob.sync(`${BUILD_DIR}/**/*.html`);

// Filter out unnecessary HTML files
const criticalPages = HTML_FILES.filter(file => {
  const relativePath = path.relative(BUILD_DIR, file);
  // Focus on main pages that would benefit from critical CSS
  return (
    relativePath === 'index.html' || 
    relativePath === 'docs/index.html' ||
    relativePath === 'features/index.html' ||
    relativePath === 'blog/index.html' ||
    relativePath === 'contact/index.html'
  );
});

function extractCriticalCSS() {
  console.log('Starting manual critical CSS extraction for important pages...');
  
  // Manually created critical CSS for key above-the-fold elements
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    .navbar { position: sticky; top: 0; z-index: 100; }
    .navbar-logo { height: 32px; width: 32px; }
    .navbar-items { display: flex; align-items: center; }
    .hero-banner { position: relative; overflow: hidden; }
    .image-column_ZZIb { position: relative; }
    .image-container_XFvx { background-size: cover; background-position: center; }
    .container { width: 100%; max-width: 1200px; margin: 0 auto; }
  `;
  
  for (const htmlFile of criticalPages) {
    const relativePath = path.relative(BUILD_DIR, htmlFile);
    console.log(`Processing: ${relativePath}`);
    
    try {
      // Read the HTML file
      let htmlContent = fs.readFileSync(htmlFile, 'utf8');
      
      // Insert critical CSS in the head
      htmlContent = htmlContent.replace('</head>', `<style id="critical-css">${criticalCSS}</style>\n</head>`);
      
      // Add preload for the main CSS
      htmlContent = htmlContent.replace('<head>', '<head>\n<link rel="preload" href="/assets/css/styles.f2301018.css" as="style">');
      
      // Write the modified HTML back
      fs.writeFileSync(htmlFile, htmlContent, 'utf8');
      
      console.log(`Critical CSS inserted for ${relativePath}`);
    } catch (error) {
      console.error(`Error processing ${relativePath}:`, error);
    }
  }
  
  console.log('Critical CSS extraction completed!');
}

// Execute the function
extractCriticalCSS();

// Export the function for direct require usage
module.exports = extractCriticalCSS;
