/**
 * Custom webpack configuration to handle Tailwind CSS environment variable and optimization
 */
module.exports = function(context, options) {
  // Dynamically import TerserPlugin to avoid ESM issues
  let TerserPlugin;
  try {
    TerserPlugin = require('terser-webpack-plugin');
  } catch (error) {
    console.warn('TerserPlugin import failed, using default optimization');
    return {
      name: 'custom-webpack-plugin',
      configureWebpack(config, isServer, utils) {
        return {};
      }
    };
  }
  
  return {
    name: 'custom-webpack-plugin',
    configureWebpack(config, isServer, utils) {
      // Skip optimization for server builds
      if (isServer) {
        return {};
      }
      
      // Add optimization configuration for client builds
      const optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug'],
              },
              output: {
                comments: false,
              },
            },
            extractComments: false,
          }),
        ],
        splitChunks: {
          chunks: 'all',
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendors: {
              test: /[\\]node_modules[\\]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            common: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
        usedExports: true,
        sideEffects: true
      };
      
      // Check if SKIP_TAILWIND is set
      if (process.env.SKIP_TAILWIND === 'true') {
        // Find and modify the PostCSS loader rule
        const cssRules = config.module.rules.find(rule => 
          rule.test && rule.test.toString().includes('.css')
        );
        
        if (cssRules && cssRules.use) {
          // Find the PostCSS loader
          cssRules.use.forEach(loader => {
            if (loader && typeof loader === 'object' && loader.loader && loader.loader.includes('postcss-loader')) {
              // Replace options with a simpler configuration that avoids Tailwind
              loader.options = {
                postcssOptions: {
                  plugins: [
                    require('autoprefixer'),
                    require('postcss-preset-env')({
                      stage: 3,
                      features: {
                        'custom-properties': false
                      }
                    })
                  ]
                }
              };
            }
          });
        }
      }
      
      return {
        optimization: optimization,
      };
    }
  };
};
