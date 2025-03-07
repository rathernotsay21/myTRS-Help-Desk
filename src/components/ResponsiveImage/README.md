# ResponsiveImage Component

This component automatically selects the appropriate image size based on the user's viewport width, helping improve page load times on mobile devices.

## Features

- Automatically selects smaller images for mobile devices
- Adds width and height attributes to prevent layout shifts
- Implements lazy loading by default
- Supports both event photos (with mobile versions) and regular images

## Usage

```jsx
import ResponsiveImage from '@site/src/components/ResponsiveImage';

// For event photos (which have mobile versions)
<ResponsiveImage 
  src="/img/event_photos/volunteer_check-in-min.webp"
  alt="Volunteer check-in"
  width={1200}
  height={800}
  className="my-custom-class"
  lazy={true} // optional, defaults to true
/>

// For regular images (no mobile version)
<ResponsiveImage 
  src="/img/client_logos/NCAA_Logo.webp"
  alt="NCAA Logo"
  width={400}
  height={300}
/>
```

## How It Works

1. For event photos, it automatically looks for a mobile version in the `/img/event_photos/mobile/` directory
2. Uses the HTML5 `srcset` and `sizes` attributes to let the browser choose the right image
3. Smaller devices load smaller images, saving bandwidth and improving load times
4. Adds explicit width and height to prevent layout shifts (CLS)

## Example Implementation in HomepageHeader

```jsx
import React from 'react';
import ResponsiveImage from '@site/src/components/ResponsiveImage';
import styles from './styles.module.css';

export default function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      {/* Background image is handled in CSS */}
      <div className="container">
        <h1 className={styles.heroTitle}>
          Event Management <span className={styles.accentText}>Made Simple</span>
        </h1>
        <div className={styles.buttons}>
          <a className="button button--primary button--lg" href="#demo">
            Request Free Demo
          </a>
          <a className="button button--outline button--lg" href="/features">
            Explore Solutions
          </a>
        </div>
      </div>
    </header>
  );
}
```

## Notes

- Event photos automatically use the mobile version with the naming convention: `imagename-mobile.webp`
- Original images should be in `/img/event_photos/`
- Mobile images should be in `/img/event_photos/mobile/`
- For best results, provide accurate width and height attributes
