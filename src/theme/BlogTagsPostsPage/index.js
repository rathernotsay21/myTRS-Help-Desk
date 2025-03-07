import React from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';

function BlogTagsPostPageMetadata({title, description}) {
  return (
    <>
      <PageMetadata title={title} description={description} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

function FixedAuthorAvatar({author}) {
  // Fix the image URL to use WebP format
  const fixImageUrl = (url) => {
    if (!url) return null;
    // Replace JPG/JPEG/PNG with WebP
    return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  const imageUrl = fixImageUrl(author.imageURL || '');
  
  return (
    <div className="avatar">
      {imageUrl && (
        <div className="avatar__photo-link avatar__photo">
          {author.url ? (
            <Link href={author.url}>
              <img 
                src={imageUrl} 
                alt={`${author.name}'s avatar`}
                width={64}
                height={64}
              />
            </Link>
          ) : (
            <img 
              src={imageUrl} 
              alt={`${author.name}'s avatar`} 
              width={64}
              height={64}
            />
          )}
        </div>
      )}
      <div className="avatar__intro">
        {author.url ? (
          <Link href={author.url} className="avatar__name">
            {author.name}
          </Link>
        ) : (
          <div className="avatar__name">{author.name}</div>
        )}
        {author.title && <small className="avatar__subtitle">{author.title}</small>}
      </div>
    </div>
  );
}

function BlogTagsPostsPageContent({metadata, items, sidebar, readingTime}) {
  const {allTagsPath, name, count} = metadata;
  const title = translateTagsPageTitle({
    tagName: name,
    count,
  });
  
  const description = (
    <Translate
      id="theme.blog.tagPage.description"
      values={{nPosts: count, tagName: name}}>
      {'{nPosts} posts tagged with "{tagName}"'}
    </Translate>
  );
  
  // Check if this is an author page (tag pages generated for authors)
  const isAuthorPage = metadata.permalink && metadata.permalink.includes('/authors/');
  const author = isAuthorPage ? { 
    name: name,
    url: metadata.authorURL,
    imageURL: metadata.authorImageURL,
    title: metadata.authorTitle
  } : null;

  return (
    <BlogLayout sidebar={sidebar}>
      <header className="margin-bottom--xl">
        <h1>{title}</h1>
        
        {author && (
          <div className="margin-top--md margin-bottom--md">
            <FixedAuthorAvatar author={author} />
          </div>
        )}
        
        <p>{description}</p>
        <Link href={allTagsPath}>
          <Translate
            id="theme.tags.tagsPageLink"
            description="The label of the link targeting the tag list page">
            View All Tags
          </Translate>
        </Link>
      </header>
      <BlogPostItems items={items} readingTime={readingTime} />
    </BlogLayout>
  );
}

export default function BlogTagsPostsPage(props) {
  // Fix up the author image URL in the metadata
  if (props.metadata && props.metadata.authorImageURL) {
    props.metadata.authorImageURL = props.metadata.authorImageURL.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}>
      <BlogTagsPostPageMetadata
        title={translateTagsPageTitle({
          tagName: props.metadata.name,
          count: props.metadata.count,
        })}
        description={`Posts tagged with ${props.metadata.name}`}
      />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
