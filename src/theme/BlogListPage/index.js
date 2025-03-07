import React from 'react';
import BlogListPage from '@theme-original/BlogListPage';
import Head from '@docusaurus/Head';

export default function BlogListPageWrapper(props) {
  // Extract all authors from the blog posts
  const blogPosts = props.items || [];
  const allAuthors = new Set();
  
  blogPosts.forEach(post => {
    const authors = post.content.metadata.authors || [];
    authors.forEach(author => {
      if (author.imageURL) {
        allAuthors.add(author.imageURL.replace(/\.(jpg|jpeg|png)$/, '.webp'));
      }
    });
  });

  return (
    <>
      <Head>
        {/* Preload author images for faster loading */}
        {Array.from(allAuthors).map((imageURL, index) => (
          <link key={index} rel="preload" href={imageURL} as="image" />
        ))}
      </Head>
      <BlogListPage {...props} />
    </>
  );
}
