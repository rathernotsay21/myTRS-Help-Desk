require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Import the contentful utility functions
const contentful = require('../src/utils/contentful');

async function generateDocs() {
  try {
    const docPages = await contentful.getDocPages();
    
    // Create docs directory if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, '../docs'))) {
      fs.mkdirSync(path.join(__dirname, '../docs'));
    }
    
    console.log(`Found ${docPages.length} documentation pages in Contentful`);
    
    docPages.forEach(page => {
      if (!page.fields.content) {
        console.warn(`Warning: No content for "${page.fields.title}"`);
        return;
      }
      
      const content = `---
title: ${page.fields.title}
slug: ${page.fields.slug}
---

${page.fields.content}
`;
      
      const filePath = path.join(__dirname, `../docs/${page.fields.slug}.md`);
      fs.writeFileSync(filePath, content);
      console.log(`Generated: ${filePath}`);
    });
    
    console.log(`Successfully generated ${docPages.length} documentation pages`);
  } catch (error) {
    console.error('Error generating docs:', error);
    console.error(error.stack);
  }
}

generateDocs();