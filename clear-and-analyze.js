const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Clear the build directory
const buildDir = path.join(__dirname, 'build');
if (fs.existsSync(buildDir)) {
  console.log('Removing build directory...');
  fs.rmSync(buildDir, { recursive: true, force: true });
}

// Clear the .docusaurus cache
const cacheDir = path.join(__dirname, '.docusaurus');
if (fs.existsSync(cacheDir)) {
  console.log('Removing .docusaurus cache...');
  fs.rmSync(cacheDir, { recursive: true, force: true });
}

// Run the analyze command
console.log('Running bundle analyzer...');
try {
  execSync('npm run analyze', { stdio: 'inherit' });
  console.log('Build and analysis completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
