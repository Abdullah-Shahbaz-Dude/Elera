/**
 * Image Optimization Utilities
 * 
 * Provides utilities for responsive images, WebP support, and optimized loading.
 */

/**
 * Generate responsive image srcset for different screen sizes
 * 
 * @param baseImage - Base image path (JPG/PNG)
 * @param sizes - Array of widths in pixels
 * @returns srcset string for responsive images
 */
export const generateSrcSet = (
  baseImage: string,
  sizes: number[] = [640, 768, 1024, 1280, 1920]
): string => {
  // For now, return the base image
  // When WebP versions are available, this can be enhanced
  return sizes.map(size => `${baseImage} ${size}w`).join(', ');
};

/**
 * Get WebP version of an image if available
 * Falls back to original if WebP doesn't exist
 * 
 * @param imagePath - Original image path
 * @returns WebP path or original path
 */
export const getWebPImage = (imagePath: string): string => {
  // Replace extension with .webp
  // This assumes WebP versions will be created with same name
  if (imagePath.endsWith('.jpg') || imagePath.endsWith('.jpeg')) {
    return imagePath.replace(/\.(jpg|jpeg)$/i, '.webp');
  }
  if (imagePath.endsWith('.png')) {
    return imagePath.replace(/\.png$/i, '.webp');
  }
  return imagePath;
};

/**
 * Generate responsive image attributes for optimal loading
 * 
 * @param imagePath - Base image path
 * @param alt - Alt text for the image
 * @param options - Additional options
 * @returns Object with image attributes
 */
export const getResponsiveImageProps = (
  imagePath: string,
  alt: string,
  options: {
    sizes?: string;
    loading?: 'lazy' | 'eager';
    decoding?: 'async' | 'sync' | 'auto';
    webpAvailable?: boolean;
  } = {}
) => {
  const {
    sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 668px',
    loading = 'lazy',
    decoding = 'async',
    webpAvailable = false,
  } = options;

  const props: {
    src: string;
    alt: string;
    loading: 'lazy' | 'eager';
    decoding: 'async' | 'sync' | 'auto';
    srcSet?: string;
    sizes?: string;
  } = {
    src: imagePath,
    alt,
    loading,
    decoding,
  };

  // Add srcset for responsive images
  if (webpAvailable) {
    const webpPath = getWebPImage(imagePath);
    props.srcSet = generateSrcSet(webpPath);
    props.sizes = sizes;
  }

  return props;
};

