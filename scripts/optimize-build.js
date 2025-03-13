/**
 * Post-Build Optimization Script for myTRS-Help-Desk
 * 
 * This script optimizes the build output to improve performance.
 * Run this script after building the site: node scripts/optimize-build.js
 */

const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Utility function to run a command and log output
function runCommand(command, args = [], options = {}) {
  console.log(`> ${command} ${args.join(' ')}`);
  
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, {
      stdio: 'inherit',
      ...options,
      shell: process.platform === 'win32' // Use shell on Windows
    });
    
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    childProcess.on('error', (err) => {
      reject(err);
    });
  });
}

// Install required dependencies if needed
async function ensureDependencies() {
  const requiredDependencies = [
    'terser',
    'glob',
    'cssnano',
    'purgecss',
    'postcss',
    'postcss-cli'
  ];
  
  console.log('Installing required dependencies...');
  
  try {
    // Always install dependencies to ensure they're available
    console.log(`Installing optimization dependencies: ${requiredDependencies.join(', ')}`);
    await runCommand('npm', ['install', '--save-dev', ...requiredDependencies]);
    console.log('Dependencies installed successfully.');
  } catch (error) {
    console.error('Error installing dependencies:', error);
    throw error;
  }
}

// Main function to run all optimizations
async function optimizeBuild() {
  try {
    console.log('========================================');
    console.log('myTRS-Help-Desk Build Optimization Tool');
    console.log('========================================');
    
    // Make sure we have all required dependencies
    await ensureDependencies();
    
    // 1. Optimize images
    console.log('\n=== Optimizing Images ===');
    try {
      // Run the shell script for image optimization
      if (process.platform === 'win32') {
        // On Windows, use the Node.js approach
        console.log('Using Node.js for image optimization on Windows...');
        
        // Try to optimize at least the logo using our custom script
        await runCommand('node', [path.join(__dirname, 'optimize-logo.js')]);
        
        console.log('For full image optimization, consider:');
        console.log('1. Installing WSL and running: bash scripts/optimize-images.sh');
        console.log('2. Using an online WebP converter for other images');
      } else {
        // On Linux/Mac, we can run the shell script directly
        await runCommand('bash', [path.join(__dirname, 'optimize-images.sh')]);
      }
    } catch (error) {
      console.warn('Image optimization failed, but continuing with other optimizations:', error.message);
    }
    
    // 2. Optimize Hero Image specifically (critical for LCP)
    console.log('\n=== Optimizing Hero Image ===');
    try {
      if (process.platform !== 'win32') {
        await runCommand('bash', [path.join(__dirname, 'optimize_hero_image.sh')]);
      } else {
        console.log('Hero image optimization requires manual steps on Windows...');
      }
    } catch (error) {
      console.warn('Hero image optimization failed, but continuing:', error.message);
    }
    
    // 3. Minify JavaScript
    console.log('\n=== Minifying JavaScript ===');
    try {
      await runCommand('node', [path.join(__dirname, 'minify-js.js')]);
    } catch (error) {
      console.error('JavaScript minification failed:', error);
      throw error;
    }
    
    // 4. Optimize CSS
    console.log('\n=== Optimizing CSS ===');
    try {
      try {
        console.log('Attempting advanced CSS optimization with PurgeCSS...');
        await runCommand('node', [path.join(__dirname, 'optimize-css.js')]);
      } catch (purgeError) {
        console.warn('Advanced CSS optimization failed, falling back to basic minification:', purgeError.message);
        console.log('Running basic CSS minification...');
        await runCommand('node', [path.join(__dirname, 'basic-css-minify.js')]);
      }
    } catch (error) {
      console.error('All CSS optimization attempts failed:', error);
      console.log('Continuing without CSS optimization...');
    }
    
    console.log('\n=== Optimization Complete! ===');
    console.log('The build has been optimized for better performance.');
    console.log('Run a local server to test: npm run serve');
  } catch (error) {
    console.error('Build optimization failed:', error);
    process.exit(1);
  }
}

// Run the optimization process
optimizeBuild();
