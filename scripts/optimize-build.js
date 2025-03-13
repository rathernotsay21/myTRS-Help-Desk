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
    'postcss-cli',
    'critical',
    'critical-css-webpack-plugin',
    'purgecss-webpack-plugin',
    'terser-webpack-plugin'
  ];
  
  console.log('Checking required dependencies...');
  
  try {
    // Just check if the dependencies are in package.json
    // We'll assume they're installed via the manual yarn add command
    const packageJson = require('../package.json');
    const devDeps = packageJson.devDependencies || {};
    
    const missingDeps = requiredDependencies.filter(dep => !devDeps[dep]);
    
    if (missingDeps.length > 0) {
      console.warn(`Some dependencies may be missing from package.json: ${missingDeps.join(', ')}`);
      console.log('Please run: yarn add --dev ' + missingDeps.join(' '));
    } else {
      console.log('All required dependencies found in package.json');
    }
  } catch (error) {
    console.error('Error checking dependencies:', error);
    console.log('Continue anyway...');
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
    
    // 2.1. Remove PNG logo version and ensure WebP is used everywhere
    console.log('\n=== Ensuring WebP Logo is Used ===');
    try {
      await runCommand('node', [path.join(__dirname, 'remove-png-logo.js')]);
    } catch (logoError) {
      console.warn('Logo optimization failed, but continuing:', logoError.message);
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
        
        // Extract critical CSS after build is complete
        console.log('\n=== Extracting Critical CSS ===');
        try {
          // Use our simplified critical CSS approach which doesn't rely on the critical package
          console.log('Adding inline critical CSS...');
          // Use native require to avoid module compatibility issues
          require('./extract-critical-css');
        } catch (criticalError) {
          console.warn('Critical CSS extraction failed:', criticalError.message);
          console.log('Continuing without critical CSS extraction...');
        }
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
