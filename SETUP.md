# Quick Setup Guide

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Your Assets**

   Before running the development server, add your assets:

   ### Images
   - **Logo**: Place your logo file in `src/assets/images/logo/` (e.g., `logo.png`)
   - **Hero Background**: Place background image in `src/assets/images/hero/` (e.g., `hero-background.jpg`)

   ### Videos
   - **Hero Videos**: Place two video files in `src/assets/videos/hero/`:
     - `hero-video-1.mp4`
     - `hero-video-2.mp4`

3. **Update Asset Imports**

   After adding your assets, edit these files to uncomment the import statements:

   - `src/assets/images/index.ts` - Uncomment the image imports
   - `src/assets/videos/index.ts` - Uncomment the video imports

   Example:
   ```typescript
   // Change this:
   // import logoImage from './logo/logo.png'
   
   // To this:
   import logoImage from './logo/logo.png'
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── assets/
│   ├── images/
│   │   ├── logo/        ← Place logo here
│   │   └── hero/        ← Place hero background here
│   └── videos/
│       └── hero/        ← Place hero videos here
├── components/
│   ├── HeroSection/     ← Video carousel hero section
│   ├── Navbar/          ← Navigation bar
│   └── Logo/            ← Logo component
├── pages/               ← All page components
└── hooks/               ← Custom React hooks
```

## ✅ What's Already Set Up

- ✅ Vite + React + TypeScript configuration
- ✅ Tailwind CSS with custom theme matching Figma design
- ✅ React Router with all navigation pages
- ✅ Hero section with video carousel (auto-play, fade transitions, pagination dots)
- ✅ Navigation bar with gradient border
- ✅ All page components (ready for content)
- ✅ Path aliases for clean imports (@/components, @/assets, etc.)
- ✅ ESLint + Prettier configuration
- ✅ Professional asset management system

## 🎨 Features

- **Video Carousel**: Auto-plays with fade transitions every 6 seconds
- **Pagination Dots**: Interactive dots for manual video navigation
- **Responsive Design**: Mobile-friendly with responsive breakpoints
- **Professional Navigation**: Gradient border, smooth transitions
- **Type Safety**: Full TypeScript support

## 📝 Next Steps

1. Add your assets (images and videos)
2. Update the asset imports
3. Customize page content based on your Figma designs
4. Run `npm run dev` to start developing

For more details, see the main [README.md](./README.md) file.

