# Responsive Background Images

This system automatically uses smaller, optimized background images on mobile devices to improve performance and reduce data usage.

## How It Works

1. Desktop devices load the full-size WebP images
2. Mobile devices (screens under 768px) load smaller optimized versions
3. Both versions are stored in the `static/img/event_photos` directory
4. Mobile versions are stored in the `static/img/event_photos/mobile` subdirectory

## Available Background Classes

Add these classes to any element to apply a responsive background:

- `bg-volunteer-checkin` - Volunteer check-in image
- `bg-special-olympics` - Special Olympics crowd image
- `bg-basketball` - Basketball tournament image

### Special Classes for ::before Pseudo-elements

For elements that use ::before pseudo-elements for backgrounds:

- `bg-special-olympics-before` - Special Olympics crowd image for ::before elements

## Usage

### For Direct Backgrounds

```jsx
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function HeroSection() {
  return (
    <header className={clsx(styles.hero, 'bg-volunteer-checkin')}>
      <div className="container">
        <h1>Welcome to myTRS</h1>
      </div>
    </header>
  );
}
```

### For ::before Pseudo-elements

```jsx
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function Features() {
  return (
    <div className={clsx(styles.heroWrapper, 'bg-special-olympics-before')}>
      <div className={styles.hero}>
        <h1>Powerful Features</h1>
      </div>
    </div>
  );
}
```

And in your CSS:

```css
.heroWrapper {
  position: relative;
}

.heroWrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: 1;
}
```

## Adding New Backgrounds

To add a new responsive background:

1. Add full-size version to `/static/img/event_photos/`
2. Create optimized version: `convert image.webp -resize 600x -strip mobile/image-mobile.webp`
3. Add the CSS rules to `/src/css/responsive-backgrounds.css`:

```css
.bg-new-image {
  background-image: url('/img/event_photos/new-image.webp');
}

@media (max-width: 768px) {
  .bg-new-image {
    background-image: url('/img/event_photos/mobile/new-image-mobile.webp');
  }
}
```

4. Use it in your components: `className={clsx(styles.myComponent, 'bg-new-image')}`

## Performance Benefits

- Reduces mobile data usage by 60-80%
- Improves page load time on mobile devices
- Maintains high quality on desktop devices
- Better Lighthouse performance scores
