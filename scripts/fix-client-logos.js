/**
 * This script verifies that all client logo files referenced in ClientLogos component exist
 * and generates a report of any missing files.
 */

const fs = require('fs');
const path = require('path');

// Path to ClientLogos component
const COMPONENT_PATH = path.join(__dirname, '../src/components/ClientLogos/index.js');
// Path to client logos directory
const LOGOS_DIR = path.join(__dirname, '../static/img/client_logos');

// Read the component file
const componentCode = fs.readFileSync(COMPONENT_PATH, 'utf8');

// Extract the clientLogos array definition
const clientLogosMatch = componentCode.match(/const clientLogos = \[([\s\S]*?)\];/);

if (!clientLogosMatch) {
  console.error('Could not find clientLogos array in component!');
  process.exit(1);
}

// Parse the array to extract filenames
const logoFilesRegex = /file: '([^']+)'/g;
let match;
const logoFiles = [];

while ((match = logoFilesRegex.exec(clientLogosMatch[0])) !== null) {
  logoFiles.push(match[1]);
}

console.log(`Found ${logoFiles.length} logo files referenced in component`);

// Check which files exist in the directory
const existingFiles = fs.readdirSync(LOGOS_DIR);
console.log(`Found ${existingFiles.length} files in logos directory`);

// Check for missing files
const missingFiles = logoFiles.filter(file => !existingFiles.includes(file));

if (missingFiles.length > 0) {
  console.log('\nMissing files:');
  missingFiles.forEach(file => console.log(`- ${file}`));
  
  // Generate a fix command for each missing file
  console.log('\nPossible fixes:');
  missingFiles.forEach(file => {
    // Find similar files by base name (without extension)
    const baseName = file.substring(0, file.lastIndexOf('.'));
    const possibleMatches = existingFiles.filter(existingFile => 
      existingFile.startsWith(baseName) || 
      existingFile.toLowerCase().includes(baseName.toLowerCase())
    );
    
    if (possibleMatches.length > 0) {
      console.log(`- For ${file}, possible replacements: ${possibleMatches.join(', ')}`);
    } else {
      console.log(`- No similar files found for ${file}`);
    }
  });
} else {
  console.log('All logo files exist! No issues found.');
}

// Verify the small directory exists
const smallDirPath = path.join(LOGOS_DIR, 'small');
if (!fs.existsSync(smallDirPath)) {
  console.log('\nSmall logos directory does not exist. Creating it...');
  fs.mkdirSync(smallDirPath, { recursive: true });
  console.log('Created small logos directory at:', smallDirPath);
}

console.log('\nScript completed!');
