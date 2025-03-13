/**
 * Safe Optimization Script for myTRS-Help-Desk
 * This script applies minimal optimizations that won't break the CSS
 */

const { spawn } = require('child_process');
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

// Main function to run basic optimizations
async function safeOptimizeBuild() {
  try {
    console.log('========================================');
    console.log('myTRS-Help-Desk Safe Optimization Tool');
    console.log('========================================');
    
    // 1. Simple JS minification without affecting structure
    console.log('\n=== Basic JavaScript Minification ===');
    try {
      const mainJsPath = path.join(__dirname, '..', 'build', 'assets', 'js', 'main.*.js');
      const jsFiles = require('glob').sync(mainJsPath);
      
      if (jsFiles.length > 0) {
        console.log(`Found main JS file: ${path.basename(jsFiles[0])}`);
        const { minify } = require('terser');
        
        const content = fs.readFileSync(jsFiles[0], 'utf8');
        console.log(`Original size: ${(content.length / 1024).toFixed(2)} KiB`);
        
        const result = await minify(content, {
          compress: {
            drop_console: true
          },
          mangle: false, // Don't mangle to avoid breaking things
          format: {
            comments: false
          }
        });
        
        fs.writeFileSync(jsFiles[0], result.code);
        console.log(`Minified size: ${(result.code.length / 1024).toFixed(2)} KiB`);
        console.log('JavaScript minified successfully');
      } else {
        console.log('Main JS file not found, skipping minification');
      }
    } catch (error) {
      console.warn('JavaScript minification failed:', error.message);
      console.log('Continuing without JS minification...');
    }
    
    // 2. Convert logo to WebP
    console.log('\n=== Converting Logo to WebP ===');
    try {
      await runCommand('node', [path.join(__dirname, 'optimize-logo.js')]);
    } catch (error) {
      console.warn('Logo optimization failed:', error.message);
    }
    
    console.log('\n=== Safe Optimization Complete! ===');
    console.log('The build has been safely optimized for better performance.');
    console.log('Run a local server to test: yarn serve');
  } catch (error) {
    console.error('Build optimization failed:', error);
    process.exit(1);
  }
}

// Run the optimization process
safeOptimizeBuild();
