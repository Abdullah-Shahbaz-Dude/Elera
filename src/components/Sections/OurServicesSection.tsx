import React from 'react'
import { useNavigate } from 'react-router-dom'
import { aiInsightEngineImage, humanServicesImage } from '@/assets/images'

interface ServiceCardProps {
  title: string
  description: string
  backgroundImage?: string
  imageOpacity?: number
  navigateTo?: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  backgroundImage,
  imageOpacity = 0.42,
  navigateTo = '/our-services',
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(navigateTo)
  }
  
  const gradients = [
    'linear-gradient(135deg, #60A5FA, #9333EA)',
    'linear-gradient(135deg, #8B5CF6, #9333EA)',
  ]
  const cardGradient = gradients[title.includes('AI') ? 0 : 1]
  
  return (
    <div className="group relative h-[400px] md:h-[508px] w-full max-w-[668px]">
      {/* Modern Card with Glass Morphism */}
      <div
        className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(96, 165, 250, 0.2)',
        }}
      >
        {/* Background Image */}
        {backgroundImage && (
          <div
            className="absolute inset-0 rounded-3xl transition-transform duration-500 group-hover:scale-110"
            style={{
              opacity: imageOpacity,
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
          style={{
            background: cardGradient,
            mixBlendMode: 'overlay',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col p-6 md:p-8 justify-between">
          <div>
            <h3 className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
              {title}
            </h3>
            <p className="mb-6 md:mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
              {description}
            </p>
          </div>

          {/* Modern Button */}
          <button
            onClick={handleClick}
            className="w-fit rounded-xl px-6 md:px-10 py-3 md:py-4 text-sm md:text-base font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background: cardGradient,
              boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
            }}
          >
            Click Here To Read More →
          </button>
        </div>

        {/* Decorative Corner Glow */}
        <div
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          style={{
            background: cardGradient,
          }}
        ></div>
      </div>
    </div>
  )
}

const OurServicesSection: React.FC = () => {
  const services = [
    {
      title: "Elaras AI Insight Engine",
      description:
        'Using psychology, data, and algorithms, our AI tools (Insight Engines) reveal the hidden strengths, thinking styles, and future skills within your workforce.',
      backgroundImage: aiInsightEngineImage,
      imageOpacity: 0.42,
      navigateTo: '/our-services/ai-insight-engine',
    },
    {
      title: 'Elaras Human Services',
      description:
        'We work directly with your people to assess digital maturity, understand workforce culture, and support transformation from the ground up.',
      backgroundImage: humanServicesImage,
      imageOpacity: 0.36,
      navigateTo: '/our-services/business-psychology-consultancy',
    },
  ]

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
              Our Services
            </h2>
            <div
              className="mx-auto h-1 w-32 rounded-full"
              style={{
                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
              }}
            ></div>
          </div>

          {/* Two Cards Grid */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 justify-center items-start">
            {services.map((service, index) => (
              <div key={index} className="flex justify-center">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  backgroundImage={service.backgroundImage}
                  imageOpacity={service.imageOpacity}
                  navigateTo={service.navigateTo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurServicesSection

