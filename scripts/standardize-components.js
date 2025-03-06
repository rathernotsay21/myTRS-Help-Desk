#!/usr/bin/env node

/**
 * This script helps standardize component structures following the established conventions:
 * - Components should be in their own directories
 * - Use index.js for the main component file
 * - Use styles.module.css for CSS modules
 * - Use camelCase for component names and kebab-case for CSS classes
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');

// Find all .js files in the components directory that are not in a subdirectory
const standaloneFiles = glob.sync(`${COMPONENTS_DIR}/*.js`);

console.log('Standardizing component structure...');

// Process each standalone component file
standaloneFiles.forEach(filePath => {
  const fileName = path.basename(filePath, '.js');
  const componentDir = path.join(COMPONENTS_DIR, fileName);
  
  // Skip if the file is not a component
  if (fileName.toLowerCase().includes('index')) {
    console.log(`Skipping ${fileName} as it appears to be an index file`);
    return;
  }

  console.log(`Processing ${fileName}...`);
  
  // Create directory for the component if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir);
    console.log(`  Created directory: ${componentDir}`);
    
    // Move the component file to the new directory as index.js
    const content = fs.readFileSync(filePath, 'utf8');
    fs.writeFileSync(path.join(componentDir, 'index.js'), content);
    console.log(`  Moved ${fileName}.js to ${fileName}/index.js`);
    
    // Create empty styles.module.css file
    fs.writeFileSync(
      path.join(componentDir, 'styles.module.css'),
      `/* Styles for ${fileName} component */\n`
    );
    console.log(`  Created empty styles.module.css file`);
    
    // Delete the original file
    fs.unlinkSync(filePath);
    console.log(`  Deleted original file: ${filePath}`);
  } else {
    console.log(`  Component directory already exists: ${componentDir}`);
  }
});

console.log('\nStandardization complete!');
