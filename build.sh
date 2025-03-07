#!/bin/bash

# Print node and npm versions for debugging
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies with fallback
npm install --legacy-peer-deps || npm install --force

# Build the site with SKIP_TAILWIND=true
SKIP_TAILWIND=true npm run build
