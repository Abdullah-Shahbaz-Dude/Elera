/**
 * Image Assets
 * 
 * IMPORTANT: Before running the development server, add your image assets:
 * 
 * 1. Logo: Place your logo file in './logo/' directory
 *    - Supported: logo.png, logo.jpg, logo.svg, logo.webp
 *    - Update the import path below to match your file name
 * 
 * 2. Hero Background: Place background image in './hero/' directory
 *    - Recommended: hero-background.jpg or hero-background.webp
 *    - Update the import path below to match your file name
 * 
 * After adding files, uncomment the imports below.
 */

// Logo assets
import logoImage from './logo/logo.png'

// Hero background image - ADD YOUR BACKGROUND IMAGE HERE and uncomment:
// import heroBackground from './hero/hero-background.jpg'

// Why Elara Exists image
import whyEleraExistImage from './homePage/whyEleraExist.svg'

// Service images
import aiInsightEngineImage from './homePage/service1.jpg'
import humanServicesImage from './homePage/service2.jpg'

// Additional images
import image1 from './services/Ei-consultancy/image-1.svg'
import shutterstock1330833800 from './shutterstock_1330833800.jpg'
import shutterstock1502881307 from './shutterstock_1502881307.jpg'
import shutterstock1717584028 from './shutterstock_1717584028.jpg'
import shutterstock2213352423 from './shutterstock_2213352423.jpg'
import shutterstock2291389905 from './shutterstock_2291389905.jpg'
import shutterstock2513386035 from './shutterstock_2513386035.jpg'
import shutterstock682503142 from './shutterstock_682503142.jpg'
import shutterstock726121441 from './shutterstock_726121441.jpg'
import sideViewWomanFaceScan from './side-view-woman-face-scan.jpeg'

// Temporary placeholders - Remove these and use imports above once files are added
const heroBackground: string | undefined = undefined

// Export all images with named exports
export { 
    logoImage, 
    heroBackground, 
    whyEleraExistImage, 
    aiInsightEngineImage, 
    humanServicesImage,
    image1,
    shutterstock1330833800,
    shutterstock1502881307,
    shutterstock1717584028,
    shutterstock2213352423,
    shutterstock2291389905,
    shutterstock2513386035,
    shutterstock682503142,
    shutterstock726121441,
    sideViewWomanFaceScan
}

// Re-export with aliases for convenience
export const Logo = logoImage
export const HeroBackground = heroBackground
export const WhyElereaExistImage = whyEleraExistImage
export const RevealHiddenBrillianceImage = image1
