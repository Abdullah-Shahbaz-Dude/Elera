# Assets Directory

This directory contains all static assets (images, videos, fonts, etc.) for the Elerea website.

## Directory Structure

```
assets/
├── images/
│   ├── logo/
│   │   └── logo.png (or logo.jpg, logo.svg)
│   └── hero/
│       └── hero-background.jpg
└── videos/
    └── hero/
        ├── hero-video-1.mp4
        └── hero-video-2.mp4
```

## Adding Assets

### Images
1. Place logo image in `images/logo/` directory
   - Supported formats: `.png`, `.jpg`, `.jpeg`, `.svg`, `.webp`
   - Recommended: PNG or SVG for logos

2. Place hero background image in `images/hero/` directory
   - Recommended: High-resolution JPG or WebP

### Videos
1. Place hero videos in `videos/hero/` directory
   - Format: `.mp4` (H.264 codec recommended for best browser compatibility)
   - Alternative: `.webm` for modern browsers
   - Recommended resolution: 1920x1080 or higher
   - Keep file sizes optimized for web (use compression)

## Import Pattern

All assets are exported through barrel files (`index.ts`) for clean imports:

```typescript
// Import images
import { logoImage, heroBackground } from '@/assets/images'

// Import videos
import { heroVideo1, heroVideo2 } from '@/assets/videos'
```

## Notes

- After adding assets, update the corresponding `index.ts` file if needed
- Use descriptive filenames
- Optimize images and videos before adding (compress, resize if needed)
- Consider using WebP format for images when possible (better compression)

