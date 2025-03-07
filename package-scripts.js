module.exports = {
  scripts: {
    clean: 'rm -rf node_modules',
    install: 'npm install --legacy-peer-deps',
    start: 'docusaurus start',
    build: 'docusaurus build',
    serve: 'docusaurus serve',
    // Add a fallback script for npm start that will be used if the site won't start with the normal command
    fallback: {
      start: 'cross-env SKIP_TAILWIND=true docusaurus start',
      build: 'cross-env SKIP_TAILWIND=true docusaurus build'
    }
  }
};
