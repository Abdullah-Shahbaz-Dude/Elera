# Elerea Website

A professional, industry-level React website built with Vite, TypeScript, and Tailwind CSS.

## Features

- ⚡️ Vite for lightning-fast development
- ⚛️ React 18 with TypeScript
- 🎨 Tailwind CSS for styling
- 🧭 React Router for navigation
- 📱 Fully responsive design
- 🎥 Video carousel hero section with auto-play
- 🎯 Professional asset management system
- 🚀 Optimized for production

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Add your assets:

Before running the development server, add your assets:

- **Logo**: Place your logo image in `src/assets/images/logo/` (e.g., `logo.png`)
- **Hero Background**: Place background image in `src/assets/images/hero/` (e.g., `hero-background.jpg`)
- **Hero Videos**: Place two video files in `src/assets/videos/hero/` (e.g., `hero-video-1.mp4`, `hero-video-2.mp4`)

See `src/assets/README.md` for detailed instructions.

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
elerea-website/
├── src/
│   ├── assets/          # Images, videos, and other static assets
│   ├── components/      # Reusable React components
│   │   ├── HeroSection/ # Hero section with video carousel
│   │   ├── Navbar/      # Navigation bar component
│   │   └── Logo/        # Logo component
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Public static files
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Navigation Pages

- `/` - Home page with hero section
- `/why-elerea` - Why Elerea
- `/our-services` - Our Services
- `/who-we-are` - Who we are
- `/Research & Education` - Research & Education
- `/contact-us` - Contact Us

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Code Quality**: ESLint + Prettier

## Path Aliases

The project uses path aliases for clean imports:

- `@/components` → `src/components`
- `@/pages` → `src/pages`
- `@/assets` → `src/assets`
- `@/hooks` → `src/hooks`
- `@/utils` → `src/utils`

## Production Build

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - Elerea
