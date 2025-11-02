import VideoCarousel from './VideoCarousel'
import { heroBackground } from '@/assets/images'

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden pt-0">
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
        <div className="pl-6 md:pl-12 lg:pl-16 xl:pl-24 pb-12 md:pb-16 lg:pb-20">
          <h1 className="max-w-5xl text-3xl font-medium leading-relaxed text-white md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-lg">
            Helping Individuals and Organisations thrive and adapt in an ever
            changing digital world.
          </h1>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

