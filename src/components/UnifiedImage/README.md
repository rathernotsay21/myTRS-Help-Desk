# UnifiedImage Component

This component combines the features of both the `Image` and `ResponsiveImage` components into a single, flexible image component that can handle all use cases.

## Features

- WebP format support with automatic fallback
- Responsive image loading with custom or auto-generated srcSet
- Blur-up loading pattern (optional)
- Mobile-optimized images for event photos
- Aspect ratio control
- Lazy loading
- Error handling with fallbacks
- Width/height attributes to prevent layout shifts (CLS)

## Usage Examples

### Basic Usage

```jsx
import UnifiedImage from '@site/src/components/UnifiedImage';

// Simple usage (similar to original ResponsiveImage)
<UnifiedImage 
  src="/img/example.jpg" 
  alt="Example image"
  width={800}
  height={600}
/>
```

### Event Photos with Mobile Variants

```jsx
// For event photos with mobile variants
<UnifiedImage 
  src="/img/event_photos/volunteer_check-in.jpg"
  alt="Volunteer check-in"
  width={1200}
  height={800}
  useEventPhotoPattern={true}
/>
```

### Advanced Features

```jsx
// With all advanced features (similar to original Image component)
<UnifiedImage 
  src="/img/example.jpg" 
  alt="Example image"
  aspectRatio="16:9"
  placeholderColor="#f0f0f0"
  context="hero"
  generateSrcSet={true}
  tryWebP={true}
  useBlurEffect={true}
  lazy={true}
  widths={[640, 768, 1024, 1280, 1536]}
/>
```

## Configuration Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | (required) | Image source URL |
| `alt` | string | (required) | Alternative text for accessibility |
| `width` | number | - | Image width in pixels |
| `height` | number | - | Image height in pixels |
| `aspectRatio` | string | - | Aspect ratio (16:9, 4:3, 1:1) |
| `srcSet` | string | - | Custom srcSet attribute |
| `sizes` | string | - | Custom sizes attribute |
| `srcSetData` | object | - | Responsive srcset URLs as object |
| `sizesData` | object | - | Responsive sizes as object |
| `objectFit` | string | 'cover' | CSS object-fit property |
| `className` | string | '' | Additional CSS class |
| `placeholderColor` | string | '#f0f0f0' | Color for blur placeholder |
| `context` | string | 'default' | Usage context (hero, card, thumbnail) |
| `generateSrcSet` | boolean | true | Auto-generate srcset for responsive images |
| `tryWebP` | boolean | true | Try to use WebP format if supported |
| `useBlurEffect` | boolean | true | Use blur-up loading effect |
| `lazy` | boolean | true | Use lazy loading |
| `useEventPhotoPattern` | boolean | false | Look for mobile variants using event photo pattern |
| `widths` | number[] | [640, 768, 1024, 1280, 1536] | Width values for responsive images |

## Migration Guide

### From ResponsiveImage

```jsx
// Old ResponsiveImage usage
<ResponsiveImage 
  src="/img/event_photos/volunteer_check-in.jpg"
  alt="Volunteer check-in"
  width={1200}
  height={800}
  lazy={true}
/>

// New UnifiedImage equivalent
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
// Old Image usage
<Image 
  src="/img/example.jpg"
  alt="Example image"
  aspectRatio="16:9"
  placeholderColor="#f0f0f0"
  context="hero"
  generateSrcSet={true}
  tryWebP={true}
/>

// New UnifiedImage equivalent (nearly identical)
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

## Performance Benefits

- Prevents layout shifts by supporting explicit width/height
- Optimizes for mobile devices with appropriate image sizes
- Reduces bandwidth usage with WebP format when supported
- Improves perceived performance with optional blur-up loading
