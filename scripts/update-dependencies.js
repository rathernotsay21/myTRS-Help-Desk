/**
 * This script updates package.json to include all required optimization dependencies
 */
const fs = require('fs');
const path = require('path');

// Path to package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');

// Read the existing package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Dependencies to ensure are present
const requiredDevDependencies = {
  'terser': '^5.39.0',
  'glob': '^11.0.1',
  'cssnano': '^7.0.6',
  'purgecss': '^7.0.2',
  'postcss': '^8.5.3',
  'postcss-cli': '^11.0.1',
  'sharp': '^0.33.2'
};

// Update devDependencies
let updated = false;
Object.entries(requiredDevDependencies).forEach(([pkg, version]) => {
  if (!packageJson.devDependencies[pkg] || packageJson.devDependencies[pkg] !== version) {
    packageJson.devDependencies[pkg] = version;
    updated = true;
    console.log(`Updated ${pkg} to ${version}`);
  }
});

// Add build:optimized script if not present
if (!packageJson.scripts['build:optimized']) {
  packageJson.scripts['build:optimized'] = 'yarn build && yarn optimize-build';
  updated = true;
  console.log('Added build:optimized script');
}

// Save the updated package.json if changes were made
if (updated) {
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('package.json updated successfully');
} else {
  console.log('No updates needed for package.json');
}
