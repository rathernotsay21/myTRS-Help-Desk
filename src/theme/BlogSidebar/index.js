import React from 'react';
import {useWindowSize} from '@docusaurus/theme-common';
import BlogSidebarDesktop from '@theme/BlogSidebar/Desktop';
import BlogSidebarMobile from '@theme/BlogSidebar/Mobile';

// Fix the image URLs in the sidebar items
function processSidebarItems(items) {
  if (!items || !Array.isArray(items)) {
    return items;
  }
  
  return items.map(item => {
    if (item.type === 'author' && item.imageUrl) {
      // Convert image URLs to WebP
      item.imageUrl = item.imageUrl.replace(/\.(jpg|jpeg|png)$/, '.webp');
    }
    return item;
  });
}

export default function BlogSidebar(props) {
  const windowSize = useWindowSize();

  // Process the sidebar items to use WebP image paths
  const fixedProps = {
    ...props,
    sidebar: processSidebarItems(props.sidebar)
  };
  
  if (windowSize === 'mobile') {
    return <BlogSidebarMobile {...fixedProps} />;
  }
  
  return <BlogSidebarDesktop {...fixedProps} />;
}
