// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'myTRS',
  tagline: 'Your resource for all things TRS',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://helpdesk.my-trs.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'my-trs', // Usually your GitHub org/user name.
  projectName: 'helpdesk', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Add the search plugin
  plugins: [
    // Custom webpack configuration
    require('./docusaurus.webpack.js'),
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // Options for the search plugin
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarPosition: 'right',
        searchBarShortcutHint: true,
        // Customize the index
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
      },
    ],
    // Add bundle analyzer plugin (simpler implementation)
    function (context, options) {
      return {
        name: 'webpack-bundle-analyzer',
        configureWebpack(config, isServer) {
          if (process.env.WEBPACK_BUNDLE_ANALYZER === 'true' && !isServer) {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            return {
              plugins: [
                new BundleAnalyzerPlugin({
                  analyzerMode: 'static',
                  reportFilename: 'bundle-report.html',
                  openAnalyzer: true,
                }),
              ],
            };
          }
          return {};
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          sidebarCollapsible: true,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // Enable sitemap generation
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/my-trs-social-card.jpg', // Keep as JPG for social sharing compatibility
      head: [
        // Font preloading for better performance
        {
          tagName: 'link',
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          tagName: 'link',
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          tagName: 'link',
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap',
          media: 'print',
          onload: "this.media='all'"
        },
        {
          tagName: 'link',
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
          integrity: 'sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer',
        },
        // Add font observer script for better font loading
        {
          tagName: 'script',
          innerHTML: `
            (function() {
              // Simple font loading detection
              function fontIsLoaded(fontFamily) {
                return document.fonts.check('1em ' + fontFamily);
              }
              
              // Add font loading class to help prevent FOIT
              if (!fontIsLoaded('Inter')) {
                document.documentElement.classList.add('fonts-loading');
              }
              
              // Remove the class when fonts are loaded
              document.fonts.ready.then(function() {
                document.documentElement.classList.remove('fonts-loading');
                document.documentElement.classList.add('fonts-loaded');
              });
            })();
          `,
        },
        // Add prefetch hints for important pages
        {
          tagName: 'link',
          rel: 'prefetch',
          href: '/docs/intro',
        },
        {
          tagName: 'link',
          rel: 'prefetch',
          href: '/features',
        },
        {
          tagName: 'link',
          rel: 'prefetch',
          href: '/blog',
        }
      ],
      navbar: {
        title: 'myTRS',
        logo: {
          alt: 'myTRS Logo',
          src: 'img/myTRSlogo.webp',
        },
        items: [
          {
            to: '/features',
            position: 'left',
            label: 'Features',
          },
          {to: '/blog', label: 'Updates', position: 'left'},
          {
            to: '/contact',
            position: 'left',
            label: 'Contact',
          },
          {
            to: '/docs/intro',
            label: 'Support',
            position: 'right',
          },
          {
            href: 'https://admin.my-trs.com/administrators/sign_in',
            label: 'myTRS Login',
            position: 'right',
          },
          
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Features',
            items: [
              {
                label: 'Getting Started',
                to: '/features',
              },
              {
                label: 'Platform Overview',
                to: '/features',
              },
              {
                label: 'Support Resources',
                to: '/docs/overview/dashboard_navigation',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About myTRS',
                href: 'https://www.my-trs.com/about',
              },
              {
                label: 'Contact Us',
                to: '/contact',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/groups/1900016/profile',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Privacy Policy',
                href: 'https://www.my-trs.com/privacy',
              },
              {
                label: 'Terms of Service',
                href: 'https://www.my-trs.com/terms',
              },
            ],
          },
        ],
        copyright: `<div class="footer-social-links">
          <a href="https://www.facebook.com/myTRSVolunteers/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 320 512">
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/groups/1900016/profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
            </svg>
          </a>
          <a href="https://mobile.twitter.com/trsonline" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 512 512">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
            </svg>
          </a>
          <a href="https://www.google.com/maps/place/412+S+Maple+St,+Fortville,+IN+46040/@39.9307352,-85.8481937,20z/data=!4m5!3m4!1s0x8814cc9e304e27ab:0xedfee02aa7c90ad5!8m2!3d39.9307057!4d-85.8478644" target="_blank" rel="noopener noreferrer" aria-label="Location">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 384 512">
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
            </svg>
          </a>
        </div>`,
      },
      metadata: [
        {name: 'keywords', content: 'myTRS, volunteer management, event registration, transaction reporting system'},
        {name: 'description', content: 'myTRS Help Desk - Resources, guides, and support for myTRS volunteer management system'},
        {name: 'og:title', content: 'myTRS Help Desk'},
        {name: 'og:description', content: 'Resources, guides, and support for myTRS volunteer management system'},
      ],
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;