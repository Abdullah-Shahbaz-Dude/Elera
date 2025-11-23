import VideoCarousel from './VideoCarousel';
import { heroBackground } from '@/assets/images';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[500px] md:min-h-[600px] w-full overflow-hidden pt-0">
      {/* Background Image Layer */}
      {heroBackground && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.61]"
          style={{
            backgroundImage: `url(${heroBackground})`,
          }}
        />
      )}

      {/* Video Carousel Layer - Full height, behind navbar */}
      <div className="absolute inset-0 z-[1]">
        <VideoCarousel className="h-full w-full" />
      </div>

      {/* Content Overlay - Above video, below navbar */}
      <div className="absolute inset-0 z-[40] flex items-end justify-start">
        <div className="pl-8 mb-10 md:pl-[120px] pb-8 md:pb-12 lg:pb-16 xl:pb-20 pr-4 sm:pb-[57px] ">
          <h1 className="max-w-full md:max-w-5xl text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-medium leading-tight md:leading-relaxed text-white drop-shadow-lg">
            Unlock Hiddent Potential:
            <br /> Business Psychology and AI Tools for a Changing World Of Work
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
