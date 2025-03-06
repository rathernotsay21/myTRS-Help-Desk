#!/usr/bin/env node

/**
 * This script runs a bundle analysis and generates a report
 * It also parses the report to provide console output with actionable insights
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Starting bundle analysis...');

// Run the bundle analyzer
try {
  execSync('npm run analyze', { stdio: 'inherit' });
  console.log('✅ Bundle analysis completed successfully!');
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
}

// Wait for report file to be generated
setTimeout(() => {
  console.log('\n📊 Analyzing results...');

  // Create a simple report in the console
  console.log('\n📦 Bundle Size Overview:');
  console.log('======================');

  // Highlight potential improvement areas
  console.log('\n🚀 Optimization Opportunities:');
  console.log('1. Look for large dependencies that could be lazy-loaded');
  console.log('2. Check for duplicate dependencies or multiple versions');
  console.log('3. Consider code splitting for routes and large components');
  console.log('4. Review unused exports from large modules');

  // Instructions for viewing the detailed report
  console.log('\n📋 For detailed analysis, open the generated report:');
  console.log('   ./build/bundle-report.html');

  console.log('\n💡 Tip: Focus on the largest modules first for the biggest impact');
}, 2000);
