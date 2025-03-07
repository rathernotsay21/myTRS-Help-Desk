import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

export default function BlogPostItemHeaderAuthor({author, className}) {
  const {name, title, url, imageUrl, imageURL, email} = author;
  
  // Fix the image URL to use WebP
  const authorImageUrl = (imageUrl || imageURL)?.replace(/\.(jpg|jpeg|png)$/, '.webp');
  
  return (
    <div className={clsx('avatar margin-bottom--sm', className)}>
      {authorImageUrl && (
        <Link className="avatar__photo-link avatar__photo" href={url}>
          <img
            src={authorImageUrl}
            alt={`${name}'s avatar`}
            width={48}
            height={48} 
            loading="lazy"
          />
        </Link>
      )}

      <div
        className="avatar__intro"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person">
        <div className="avatar__name">
          {url ? (
            <Link href={url} itemProp="url">
              <span itemProp="name">{name}</span>
            </Link>
          ) : (
            <span itemProp="name">{name}</span>
          )}
        </div>
        {email && <div itemProp="email">{email}</div>}
        {title && <small className="avatar__subtitle" itemProp="description">{title}</small>}
      </div>
    </div>
  );
}
