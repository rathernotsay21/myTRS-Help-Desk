import React from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import Head from '@docusaurus/Head';

export default function BlogPostPageWrapper(props) {
  // Extract the image URL from front matter if available
  const imageUrl = props.content?.metadata?.frontMatter?.image;
  
  // Handle the author images to ensure they load correctly
  const authors = props.content?.metadata?.authors || [];

  return (
    <>
      <Head>
        {/* Preload author images for faster loading */}
        {authors.map((author, index) => (
          author.imageURL && (
            <link 
              key={index}
              rel="preload" 
              href={author.imageURL.replace(/\.(jpg|jpeg|png)$/, '.webp')} 
              as="image" 
            />
          )
        ))}
      </Head>
      <BlogPostPage {...props} />
    </>
  );
}
