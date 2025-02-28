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

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Add the search plugin
  plugins: [
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
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/my-trs/helpdesk/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/my-trs/helpdesk/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/my-trs-social-card.jpg',
      head: [
        {
          tagName: 'link',
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
          integrity: 'sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer',
        }
      ],
      navbar: {
        title: 'myTRS',
        logo: {
          alt: 'myTRS Logo',
          src: 'img/myTRSlogo.png',
        },
        items: [
          {to: '/why-trs', label: 'Why TRS?', position: 'left'},
          {
            to: '/features',
            position: 'left',
            label: 'Features',
          },
          {to: '/blog', label: 'Updates', position: 'left'},
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
                to: '/docs/tutorial-extras/manage-docs-versions',
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
                href: 'https://www.my-trs.com/contact',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/my-trs',
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
        copyright: `Copyright ${new Date().getFullYear()} myTRS, Inc. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;