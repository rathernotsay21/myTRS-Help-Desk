import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

export default function Avatar({className, children, ...props}) {
  // Handle the image URL
  if (props.src && (props.src.includes('.jpg') || props.src.includes('.jpeg') || props.src.includes('.png'))) {
    props.src = props.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  const {
    size = 'md',
    alt,
    style,
    src,
    srcSet,
    name,
    url,
    isLink = url !== undefined,
  } = props;
  
  const imageStyle = {
    ...style,
    width: size === 'sm' ? 24 : size === 'md' ? 40 : 64,
    height: size === 'sm' ? 24 : size === 'md' ? 40 : 64,
  };
  
  const content = (
    <img
      className={clsx('avatar__photo', className)}
      alt={alt || name}
      src={src}
      srcSet={srcSet}
      style={imageStyle}
      loading="lazy"
      width={imageStyle.width}
      height={imageStyle.height}
    />
  );
  
  return (
    <div className="avatar">
      <div className="avatar__photo-link avatar__photo">
        {isLink ? <Link href={url}>{content}</Link> : content}
      </div>
      {children && <div className="avatar__intro">{children}</div>}
    </div>
  );
}
