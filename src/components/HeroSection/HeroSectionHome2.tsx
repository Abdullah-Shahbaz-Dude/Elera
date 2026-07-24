import VideoCarousel from './VideoCarousel';
import { heroBackground } from '@/assets/images';
import { useNavigate } from 'react-router-dom';

const HeroSectionHome2: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen min-h-[500px] md:min-h-[600px] w-full overflow-hidden pt-0">
      {/* Loading Placeholder Background - Shows while videos/images load */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

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
      <div className="absolute inset-0 z-[40] flex items-center mt-96 justify-start">
        <div className="w-full px-6 sm:px-8 md:pl-[120px] md:pr-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-lg">
              <span>Psychology Based Assessments</span>
              <br />
              That Help You <span>See Things</span>
              <br />
              <span>Differently</span>
            </h1>

            {/* <p className="mt-6 text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
              Empower schools, families, and organisations with neurodiversity
              insights, future-proof strategies, and science-led understanding.
            </p> */}

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="rounded-full px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                  boxShadow: '0 10px 30px rgba(96, 165, 250, 0.35)',
                }}
              >
                Explore Solutions
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="rounded-full px-7 py-3 text-sm sm:text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  border: '1.5px solid rgba(96, 165, 250, 0.9)',
                  color: '#60A5FA',
                  background: 'rgba(0,0,0,0.18)',
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionHome2;
