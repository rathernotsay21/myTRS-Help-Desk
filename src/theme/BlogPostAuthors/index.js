import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import BlogPostAuthor from '@theme/BlogPostAuthor';

export default function BlogPostAuthors({authors, className}) {
  const authorsCount = authors.length;
  if (authorsCount === 0) {
    return null;
  }
  
  const title = translate(
    {
      id: 'theme.blog.post.authorByline',
      description: 'Text that introduces the author of a blog post',
      message: 'Written by',
    }
  );

  // Override to use our custom BlogPostAuthor component
  return (
    <div className={clsx('margin-top--md margin-bottom--sm', className)}>
      <Heading as="h2" className="margin-bottom--sm">
        {title}
      </Heading>
      <div className="row">
        {authors.map((author) => (
          <div className="col col--6 margin-bottom--sm" key={author.key}>
            <BlogPostAuthor author={author} />
          </div>
        ))}
      </div>
    </div>
  );
}
