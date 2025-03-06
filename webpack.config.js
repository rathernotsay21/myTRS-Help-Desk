/**
 * Custom webpack configuration for the myTRS-Help-Desk project
 * This extends the default Docusaurus webpack configuration
 * 
 * @param {Object} config - Original webpack configuration
 * @param {boolean} isServer - Whether this is a server-side build
 * @param {Object} options - Additional options
 * @returns {Object} - Modified webpack configuration
 */
function extendWebpackConfig(config, isServer, options) {
  // Add bundle analyzer in analyze mode
  if (process.env.WEBPACK_BUNDLE_ANALYZER === 'true' && !isServer) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: true,
      })
    );
  }

  // Configure chunking strategy
  if (!isServer) {
    // Create a more aggressive code-splitting configuration
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        maxAsyncRequests: 25,
        minSize: 20000,
        maxSize: 244000,
        // Create specific chunks for common dependencies
        cacheGroups: {
          // Default vendors chunk
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          // React and related libraries
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: 'vendor-react',
            chunks: 'all',
            priority: 40,
            enforce: true,
          },
          // Docusaurus core
          docusaurus: {
            test: /[\\/]node_modules[\\/]@docusaurus[\\/]/,
            name: 'vendor-docusaurus',
            chunks: 'all',
            priority: 30,
            enforce: true,
          },
          // Font Awesome (used across the site)
          fontawesome: {
            test: /[\\/]node_modules[\\/]@fortawesome[\\/]/,
            name: 'vendor-fontawesome',
            chunks: 'all',
            priority: 20,
            enforce: true,
          },
          // Common utils and small packages
          common: {
            name: 'common',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };
  }

  return config;
}

module.exports = extendWebpackConfig;
