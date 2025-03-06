// docusaurus.analyzer.js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./docusaurus.config');

// Add webpack-bundle-analyzer to the webpack config if 
// the environment variable WEBPACK_BUNDLE_ANALYZER is set
const analyzerEnabled = process.env.WEBPACK_BUNDLE_ANALYZER === 'true';

if (analyzerEnabled) {
  config.webpack = {
    ...config.webpack,
    plugins: [
      ...(config.webpack?.plugins || []),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: true,
      }),
    ],
  };
}

module.exports = config;
