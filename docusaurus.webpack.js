/**
 * Custom webpack configuration to handle Tailwind CSS environment variable
 */
module.exports = function(context, options) {
  return {
    name: 'custom-webpack-plugin',
    configureWebpack(config, isServer, utils) {
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
      
      return {};
    }
  };
};
