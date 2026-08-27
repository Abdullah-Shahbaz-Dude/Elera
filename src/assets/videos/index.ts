/**
 * Video Assets
 *
 * Hero videos are now hosted on Cloudinary for optimized CDN delivery.
 * This removes ~74MB from the bundle and provides automatic optimization.
 */

import { getCloudinaryVideoUrl } from '@/config/cloudinary';

// Cloudinary public IDs for hero videos
const HERO_VIDEO_1_PUBLIC_ID = 'shutterstock_1020761695_1_rov4bv';
const HERO_VIDEO_2_PUBLIC_ID = 'shutterstock_1020761656_1_pqkgsr';

// Generate optimized Cloudinary URLs with transformations:
// - f_auto: Auto format (serves best format for browser - WebM/MP4)
// - q_auto: Auto quality (adaptive quality based on connection)
// - w_1920: Responsive width (1080p, reduces from 4K for faster loading)
const heroVideo1 = getCloudinaryVideoUrl(HERO_VIDEO_1_PUBLIC_ID, {
  format: 'auto',
  quality: 'auto',
  width: 1920, // 1080p width (maintains aspect ratio)
});

const heroVideo2 = getCloudinaryVideoUrl(HERO_VIDEO_2_PUBLIC_ID, {
  format: 'auto',
  quality: 'auto',
  width: 1920, // 1080p width (maintains aspect ratio)
});

// Export all videos with named exports
export { heroVideo1, heroVideo2 };

// Re-export with aliases for convenience
export const HeroVideo1 = heroVideo1;
export const HeroVideo2 = heroVideo2;

// Type for video assets
export type VideoAsset = string;
