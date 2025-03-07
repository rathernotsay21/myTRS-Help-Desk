import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

// Custom author component to handle image paths correctly
export default function BlogPostAuthor({author, className}) {
  const {name, title, url, imageURL, socials} = author;
  const imageUrl = imageURL?.replace(/\.(jpg|jpeg|png)$/, '.webp');

  return (
    <div className={clsx('card margin-bottom--md', className)}>
      <div className="card__body">
        <div className="avatar margin-bottom--sm">
          {imageUrl && (
            <div className="avatar__photo-link avatar__photo">
              {url ? (
                <Link href={url}>
                  <img
                    src={imageUrl}
                    alt={name}
                    width={48} 
                    height={48}
                    loading="lazy"
                  />
                </Link>
              ) : (
                <img
                  src={imageUrl}
                  alt={name}
                  width={48}
                  height={48}
                  loading="lazy" 
                />
              )}
            </div>
          )}
          <div className="avatar__intro">
            {url ? (
              <Link href={url} className="avatar__name">
                {name}
              </Link>
            ) : (
              <div className="avatar__name">{name}</div>
            )}
            {title && <small className="avatar__subtitle">{title}</small>}
          </div>
        </div>

        {socials && Object.keys(socials).length > 0 && (
          <div className="margin-top--sm">
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
    </div>
  );
}
