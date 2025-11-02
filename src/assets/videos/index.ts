/**
 * Video Assets
 * 
 * Hero videos are loaded from './hero/' directory for use in the video carousel.
 */

// Hero video assets
import heroVideo1 from './hero/7020022_Brain_Science_3840x2160.mp4'
import heroVideo2 from './hero/shutterstock_1057813618.mp4'

// Export all videos with named exports
export { heroVideo1, heroVideo2 }

// Re-export with aliases for convenience
export const HeroVideo1 = heroVideo1
export const HeroVideo2 = heroVideo2

// Type for video assets
export type VideoAsset = string

