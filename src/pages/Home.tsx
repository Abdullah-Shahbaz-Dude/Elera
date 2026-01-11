import { lazy, Suspense } from 'react';
import HeroSection from '@/components/HeroSection/HeroSection';
import SpeakToUs from '@/components/Sections/ContactForm';

// Lazy load below-fold sections for code splitting and faster initial load
const WhySection = lazy(() => import('@/components/Sections/WhySection'));
const OurServicesSection = lazy(
  () => import('@/components/Sections/OurServicesSection')
);
const Footer = lazy(() => import('@/components/Footer/Footer'));

// Loading placeholder component
const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-pulse text-white/50">Loading...</div>
  </div>
);

const Home = () => {
  return (
    <main className="pt-0">
      {/* Above-fold: Load immediately */}
      <HeroSection />

      {/* Below-fold: Lazy load with Suspense boundaries */}
      <Suspense fallback={<SectionLoader />}>
        <WhySection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <OurServicesSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <SpeakToUs />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Home;
