# Image Component Migration Guide

This document outlines the migration from the legacy `Image` and `ResponsiveImage` components to the new unified `UnifiedImage` component.

## Why We Unified the Image Components

Previously, the myTRS-Help-Desk project had two separate image components:
1. `Image` - A feature-rich component with WebP support, blur-up loading, aspect ratios, etc.
2. `ResponsiveImage` - A simpler component focused on responsive image loading for event photos

This duplication created several issues:
- Confusion about which component to use in which situation
- Maintenance challenges when fixing bugs or adding features
- Inconsistent image handling across the application
- Duplicate code with overlapping functionality

The new `UnifiedImage` component combines the best features of both components while maintaining a clean, flexible API.

## Compatibility Layer

To make migration easier, we've provided a compatibility layer that maintains the original APIs. This allows for a gradual transition to the new component.

The compatibility layer is available at:
```
src/components/UnifiedImage/compat.js
```

It exports the original `Image` and `ResponsiveImage` components that internally use the new `UnifiedImage` component with appropriate defaults.

## Migration Options

### Option 1: Use the Compatibility Layer (Easiest)

Simply change your import paths without modifying component usage:

```jsx
// Before
import Image from '@site/src/components/Image';
import ResponsiveImage from '@site/src/components/ResponsiveImage';

// After
import { Image, ResponsiveImage } from '@site/src/components/UnifiedImage/compat';
```

### Option 2: Direct Migration to UnifiedImage (Recommended)

For new code and when refactoring, use the `UnifiedImage` component directly:

```jsx
import UnifiedImage from '@site/src/components/UnifiedImage';

// Basic usage (like ResponsiveImage)
<UnifiedImage 
  src="/img/event_photos/volunteer_check-in.jpg"
  alt="Volunteer check-in"
  width={1200}
  height={800}
  useEventPhotoPattern={true}
/>

// Advanced usage (like Image)
<UnifiedImage 
  src="/img/example.jpg" 
  alt="Example image"
  aspectRatio="16:9"
  placeholderColor="#f0f0f0"
  context="hero"
  generateSrcSet={true}
  tryWebP={true}
/>
```

## Migration Examples

### From ResponsiveImage

```jsx
// Before
<ResponsiveImage 
  src="/img/event_photos/volunteer_check-in.jpg"
  alt="Volunteer check-in"
  width={1200}
  height={800}
  lazy={true}
/>

// After
<UnifiedImage 
  src="/img/event_photos/volunteer_check-in.jpg"
  alt="Volunteer check-in"
  width={1200}
  height={800}
  lazy={true}
  useEventPhotoPattern={true}
  useBlurEffect={false}
/>
```

### From Image

```jsx
// Before
<Image 
  src="/img/example.jpg"
  alt="Example image"
  aspectRatio="16:9"
  context="hero"
  generateSrcSet={true}
  tryWebP={true}
/>

// After
<UnifiedImage 
  src="/img/example.jpg"
  alt="Example image"
  aspectRatio="16:9"
  context="hero"
  generateSrcSet={true}
  tryWebP={true}
/>
```

## New Features in UnifiedImage

The unified component includes some improvements over the original components:

1. **Combined functionality** - All features from both components in one place
2. **More flexible API** - Control which features you want to use
3. **Better performance** - Optimized rendering and effects
4. **Improved error handling** - Better fallbacks for both WebP and responsive image failures
5. **Explicit mobile image support** - Control when to use the event photo mobile pattern

## Configuration Properties

See the README.md in the UnifiedImage component directory for a full list of properties and usage examples.

## Recommended Usage Patterns

- For basic images: Use with minimal props (src, alt, width, height)
- For event photos: Add `useEventPhotoPattern={true}`
- For hero/banner images: Add `context="hero"` and `aspectRatio="16:9"`
- For thumbnails: Add `context="thumbnail"` and consider `lazy={true}`

## Next Steps

1. For new components, use `UnifiedImage` directly
2. For existing components, either:
   - Use the compatibility layer (quick fix)
   - Migrate to `UnifiedImage` directly (recommended)
3. Once all components have been migrated, remove the legacy components
