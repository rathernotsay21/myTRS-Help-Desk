/**
 * This file is a safety measure in case other config methods fail
 * It explicitly sets build commands that should work on Netlify
 */
module.exports = {
  build: {
    command: "bash ./build.sh || npm install && npm run build",
    publish: "build",
    environment: {
      NODE_VERSION: "18.19.0",
      NPM_FLAGS: "--legacy-peer-deps",
      SKIP_TAILWIND: "true"
    }
  }
};
