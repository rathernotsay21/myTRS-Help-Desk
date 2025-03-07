import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import SearchMetadata from '@theme/SearchMetadata';
import Link from '@docusaurus/Link';
import BlogPostItems from '@theme/BlogPostItems';

function AuthorCard({author}) {
  const {name, title, url, imageUrl, imageURL, socials = {}} = author;
  
  // Fix image URL path - ensure we're using WebP
  const authorImageUrl = (imageUrl || imageURL)?.replace(/\.(jpg|jpeg|png)$/, '.webp');
  
  return (
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <div className="avatar margin-bottom--md">
          {authorImageUrl && (
            <div className="avatar__photo-link avatar__photo">
              {url ? (
                <Link href={url}>
                  <img 
                    src={authorImageUrl} 
                    alt={name}
                    width={64}
                    height={64}
                  />
                </Link>
              ) : (
                <img 
                  src={authorImageUrl} 
                  alt={name}
                  width={64}
                  height={64}
                />
              )}
            </div>
          )}
          <div className="avatar__intro">
            {url ? (
              <div className="avatar__name">
                <Link href={url}>{name}</Link>
              </div>
            ) : (
              <div className="avatar__name">{name}</div>
            )}
            {title && <small className="avatar__subtitle">{title}</small>}
          </div>
        </div>
      </div>

      {socials && Object.keys(socials).length > 0 && (
          <div className="card__footer margin-top--sm">
            {Object.entries(socials).map(([platform, handle]) => (
              <Link
                key={platform}
                href={
                  platform === 'twitter'
                    ? `https://twitter.com/${handle}`
                    : platform === 'linkedin'
                    ? `https://www.linkedin.com/in/${handle}`
                    : platform === 'github'
                    ? `https://github.com/${handle}`
                    : platform === 'website'
                    ? handle
                    : `https://${platform}.com/${handle}`
                }
                className="margin-right--sm"
                title={`Link to ${name}'s ${platform}`}
              >
                <i
                  className={clsx(
                    'fa-brands',
                    {
                      'fa-x-twitter': platform === 'twitter',
                      'fa-linkedin': platform === 'linkedin',
                      'fa-github': platform === 'github',
                      'fa-globe': platform === 'website',
                      [`fa-${platform}`]: !['twitter', 'linkedin', 'github', 'website'].includes(platform),
                    }
                  )}
                />
                <span className="sr-only">{platform}</span>
              </Link>
            ))}
          </div>
        )}
    </div>
  );
}

export default function BlogAuthorPage({
  metadata,
  items,
  sidebar,
  readingTime,
}) {
  const {author, title} = metadata;

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogAuthorPage,
      )}>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_author_page" />
      <BlogLayout sidebar={sidebar}>
        <div className="margin-top--lg margin-bottom--xl">
          <AuthorCard author={author} />
        </div>

        <h2 className="margin-bottom--lg">
          <Translate
            id="theme.blog.author.posts.title"
            description="Title of the page listing the blog posts by a specific author"
            values={{nPosts: items.length, author: author.name}}>
            {"Posts by {author} ({nPosts})"}
          </Translate>
        </h2>

        <BlogPostItems items={items} readingTime={readingTime} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
