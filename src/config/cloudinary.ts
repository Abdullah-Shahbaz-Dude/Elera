/**
 * Cloudinary Configuration
 *
 * Cloudinary provides CDN delivery and automatic optimization for videos and images.
 */

export const CLOUDINARY_CONFIG = {
  cloudName: 'dbqg9ls2s',
  baseUrl: 'https://res.cloudinary.com/dbqg9ls2s',
} as const;

/**
 * Generate optimized Cloudinary video URL
 *
 * @param publicId - The public ID of the video in Cloudinary
 * @param transformations - Optional transformation parameters
 * @returns Optimized Cloudinary video URL
 */
export const getCloudinaryVideoUrl = (
  publicId: string,
  transformations: {
    format?: 'auto' | 'mp4' | 'webm';
    quality?: 'auto' | number;
    width?: number;
    height?: number;
  } = {}
): string => {
  const { format = 'auto', quality = 'auto', width, height } = transformations;

  const transformParts: string[] = [];

  // Auto format (serves best format for browser)
  if (format === 'auto') {
    transformParts.push('f_auto');
  } else {
    transformParts.push(`f_${format}`);
  }

  // Auto quality (adaptive quality based on connection)
  if (quality === 'auto') {
    transformParts.push('q_auto');
  } else {
    transformParts.push(`q_${quality}`);
  }

  // Responsive width (optimize for screen size)
  if (width) {
    transformParts.push(`w_${width}`);
  }

  // Height (maintain aspect ratio if only width is specified)
  if (height) {
    transformParts.push(`h_${height}`);
  }

  const transformString =
    transformParts.length > 0 ? `${transformParts.join(',')}/` : '';

  return `${CLOUDINARY_CONFIG.baseUrl}/video/upload/${transformString}${publicId}`;
};

/**
 * Generate Cloudinary image URL for poster/thumbnail
 *
 * @param publicId - The public ID of the video in Cloudinary
 * @param transformations - Optional transformation parameters
 * @returns Cloudinary image URL for video thumbnail
 */
export const getCloudinaryVideoPoster = (
  publicId: string,
  transformations: {
    format?: 'auto' | 'jpg' | 'webp';
    quality?: 'auto' | number;
    width?: number;
  } = {}
): string => {
  const { format = 'auto', quality = 'auto', width = 1920 } = transformations;

  const transformParts: string[] = [];

  // Get thumbnail from video
  transformParts.push('so_0'); // Start offset (first frame)

  // Format
  if (format === 'auto') {
    transformParts.push('f_auto');
  } else {
    transformParts.push(`f_${format}`);
  }

  // Quality
  if (quality === 'auto') {
    transformParts.push('q_auto');
  } else {
    transformParts.push(`q_${quality}`);
  }

  // Width
  transformParts.push(`w_${width}`);

  const transformString = transformParts.join(',');

  return `${CLOUDINARY_CONFIG.baseUrl}/video/upload/${transformString}/${publicId}.jpg`;
};
