import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  shutterstock1330833800,
  shutterstock1717584028,
  shutterstock682503142,
  shutterstock726121441,
  humanServicesImage,
} from '@/assets/images';

interface ServiceCardProps {
  title: string;
  description: string;
  backgroundImage?: string;
  imageOpacity?: number;
  navigateTo?: string;
  isComingSoon?: boolean;
  insightEngineNumber?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  backgroundImage,
  imageOpacity = 1,
  navigateTo = '/our-services',
  isComingSoon = false,
  insightEngineNumber,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isComingSoon && navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <div className="group relative w-full max-w-[668px]">
      {/* Card Container - Matching Figma Design */}
      <div
        className="relative w-full rounded-[20px] overflow-hidden transition-all duration-300 hover:scale-[1.02] flex flex-col"
        style={{
          background: 'rgba(45, 45, 51, 1)',
          border: '1px solid rgba(63, 63, 71, 1)',
        }}
      >
        {/* Image Section - Top with 28px padding */}
        {backgroundImage && (
          <div className="px-[28px] pt-[28px]">
            <div
              className="w-full rounded-[16px] overflow-hidden"
              style={{
                height: '310px',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        )}

        {/* Text Section - 28px padding, 27px gap from image */}
        <div
          className="px-[28px] pb-[28px] flex flex-col"
          style={{
            gap: '32px',
            marginTop: backgroundImage ? '27px' : '0',
          }}
        >
          {/* Title */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-base md:text-lg leading-relaxed text-white">
            {description}
          </p>

          {/* Button */}
          <button
            onClick={handleClick}
            disabled={isComingSoon}
            className={`w-fit mt-auto rounded-xl px-6 md:px-10 py-3 md:py-4 text-sm md:text-base font-semibold text-white transition-all ${
              isComingSoon
                ? 'cursor-not-allowed opacity-60 bg-gray-600'
                : 'hover:scale-105 active:scale-95 cursor-pointer'
            }`}
            style={{
              background: isComingSoon
                ? 'rgba(107, 114, 128, 1)'
                : 'linear-gradient(135deg, #60A5FA, #9333EA)',
              boxShadow: isComingSoon
                ? 'none'
                : '0 8px 32px rgba(96, 165, 250, 0.4)',
            }}
          >
            {isComingSoon ? 'Coming soon' : 'Click Here To Read More →'}
          </button>
        </div>
      </div>
    </div>
  );
};

const OurServicesSection: React.FC = () => {
  const services = [
    {
      title: 'Reveal Hidden Brilliance',
      description: 'Discover the untapped strengths already in your workforce',
      backgroundImage: shutterstock1330833800,
      imageOpacity: 1,
      navigateTo: '/our-services/reveal-hidden-brilliance',
      isComingSoon: false,
      insightEngineNumber: 1,
    },
    {
      title: 'Mind Sync',
      description:
        'Helps managers & Team leaders understand neurodiversity for strategic advantage',
      backgroundImage: shutterstock1717584028,
      imageOpacity: 1,
      navigateTo: '/our-services/mind-sync',
      isComingSoon: false,
      insightEngineNumber: 2,
    },
    {
      title: 'Digital Bias Impact Assessment',
      description:
        'Organisational assessment that identifies cultural and psychological barriers that can block digital transformation',
      backgroundImage: shutterstock682503142,
      imageOpacity: 1,
      navigateTo: '/our-services/digital-bias',
      isComingSoon: false,
      insightEngineNumber: 3,
    },
    {
      title: 'Elara Data Engine',
      description: 'Coming soon',
      backgroundImage: shutterstock726121441,
      imageOpacity: 1,
      navigateTo: undefined,
      isComingSoon: true,
      insightEngineNumber: 4,
    },
    {
      title: 'Business Psychology Consultancy',
      description:
        'Training and mentoring that supports the psychological capability needed for the next decade of work.',
      backgroundImage: humanServicesImage,
      imageOpacity: 1,
      navigateTo: '/our-services/psychology-based-training-and-mentoring',
      isComingSoon: false,
      insightEngineNumber: 5,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-black py-12 md:py-24 lg:py-32">
      {/* Background Blur Effects - Gradient Ellipses */}
      <div className="absolute right-[1657px] top-0 h-[1106px] w-[1182px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.2)] to-[rgba(147,51,234,0.2)] blur-[400px]"></div>
      <div className="absolute -left-[411px] top-0 h-[1106px] w-[1182px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.2)] to-[rgba(147,51,234,0.2)] blur-[400px]"></div>

      <div className="relative container mx-auto px-4 md:px-6 z-10">
        <div className="mx-auto max-w-[1960px]">
          {/* Modern Section Title */}
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
              Our Ideas
            </h2>
            <div
              className="mx-auto h-1 w-32 rounded-full"
              style={{
                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
              }}
            ></div>
          </div>

          {/* Five Cards Grid */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 justify-center items-start">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex justify-center ${
                  index === 4 ? 'md:col-span-2' : ''
                }`}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  backgroundImage={service.backgroundImage}
                  imageOpacity={service.imageOpacity}
                  navigateTo={service.navigateTo}
                  isComingSoon={service.isComingSoon}
                  insightEngineNumber={service.insightEngineNumber}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
