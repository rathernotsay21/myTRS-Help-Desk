#!/bin/bash

# Print node and yarn versions for debugging
echo "Node version: $(node -v)"
echo "Yarn version: $(yarn --version)"

# Install dependencies with Yarn
yarn install

# Build the site with SKIP_TAILWIND=true and optimization
SKIP_TAILWIND=true yarn build

# Install optimization dependencies first
npm install --save-dev terser glob cssnano purgecss postcss postcss-cli

# Run post-build optimization
node scripts/optimize-build.js
