#!/bin/bash

# Print node and yarn versions for debugging
echo "Node version: $(node -v)"
echo "Yarn version: $(yarn --version)"

# Install dependencies with Yarn
yarn install

# Build the site with SKIP_TAILWIND=true and optimization
SKIP_TAILWIND=true yarn build

# Run post-build optimization
yarn optimize-build
