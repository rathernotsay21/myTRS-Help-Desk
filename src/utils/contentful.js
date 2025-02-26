const contentful = require('contentful');

// Client for fetching published content
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Client for fetching preview/draft content (optional)
const previewClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: 'preview.contentful.com'
});

// Helper functions to fetch content
async function getDocPages() {
  const entries = await client.getEntries({
    content_type: 'myTrsHelpDesk', // Replace with your content type ID
  });
  return entries.items;
}

async function getDocPage(slug) {
  const entries = await client.getEntries({
    content_type: 'myTrsHelpDesk', // Replace with your content type ID
    'fields.slug': slug,
  });
  return entries.items[0];
}

// Use CommonJS exports
module.exports = {
  getDocPages,
  getDocPage,
  client,
  previewClient
};