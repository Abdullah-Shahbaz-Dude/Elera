import React from 'react'
import { useNavigate } from 'react-router-dom'

interface PhilosophyCardProps {
  title: string
  children?: React.ReactNode
  isLarge?: boolean
  navigateTo?: string
  index: number
}

const PhilosophyCard: React.FC<PhilosophyCardProps> = ({
  title,
  children,
  isLarge = false,
  navigateTo,
  index,
}) => {
  const navigate = useNavigate()

  const handleReadMore = () => {
    navigate(navigateTo || '/our-services')
  }

  // Blue and Purple theme gradients - soft and subtle
  const gradients = [
    {
      bg: 'linear-gradient(135deg, #5FA5FB 0%, #9333EA 100%)',
      accent: '#6197FB',
      start: '#5FA5FB',
      end: '#9333EA',
    },
    {
      bg: 'linear-gradient(135deg, #6197FB 0%, #8B5CF6 100%)',
      accent: '#8B5CF6',
      start: '#6197FB',
      end: '#8B5CF6',
    },
    {
      bg: 'linear-gradient(135deg, #5FA5FB 0%, #A78BFA 100%)',
      accent: '#A78BFA',
      start: '#5FA5FB',
      end: '#A78BFA',
    },
    {
      bg: 'linear-gradient(135deg, #3851F9 0%, #9333EA 100%)',
      accent: '#9333EA',
      start: '#3851F9',
      end: '#9333EA',
    },
    {
      bg: 'linear-gradient(135deg, #6197FB 0%, #9333EA 100%)',
      accent: '#9333EA',
      start: '#6197FB',
      end: '#9333EA',
    },
  ]

  const gradient = gradients[index % gradients.length]

  // Enhanced SVG Icons for each philosophy
  const getIcon = () => {
    if (title === 'Psychology First') {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
    if (title === 'Neurodiversity as a Strategic Advantage') {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
    if (title === 'Human First Thinking') {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
    if (title === 'AI Insights') {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
    if (title === 'Equipping You for the 4th Industrial Revolution') {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
    return null
  }

  return (
    <div className={`group relative h-full ${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}`}>
      {/* Modern Card with Transparent Black and Border */}
      <div
        className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 ease-out group-hover:scale-[1.02]"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Subtle Gradient Border Glow on Hover */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-30"
          style={{
            background: gradient.bg,
            filter: 'blur(2px)',
            zIndex: -1,
          }}
        />

        {/* Very Subtle Gradient Overlay on Hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
          style={{
            background: gradient.bg,
          }}
        />

        <div className="relative p-6 md:p-8 h-full flex flex-col">
          {/* Icon Container with Gradient */}
          <div className="mb-4 md:mb-6">
            <div
              className="inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 border border-white/20"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-white" style={{ filter: `drop-shadow(0 0 4px ${gradient.accent}40)` }}>
                {getIcon()}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 leading-tight group-hover:text-white transition-colors duration-300">
            {title}
          </h3>

          {/* Content */}
          {children && (
            <div className="flex-1 mb-4 md:mb-6">
              <p className="text-sm md:text-base leading-relaxed text-white/70 group-hover:text-white/90 transition-colors duration-300">
                {children}
              </p>
            </div>
          )}

          {/* Learn More Button with Border */}
          <div className="mt-auto">
            <button
              onClick={handleReadMore}
              className="group/btn relative overflow-hidden rounded-xl px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
              aria-label={`Read more about ${title}`}
            >
              <span className="relative z-10 flex items-center gap-2">
                Learn More
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {/* Subtle Gradient Glow on Hover */}
              <div
                className="absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-300 group-hover/btn:opacity-30"
                style={{
                  background: gradient.bg,
                  filter: 'blur(1px)',
                  zIndex: -1,
                }}
              />
              {/* Very Subtle Shimmer Effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            </button>
          </div>
        </div>

        {/* Very Subtle Gradient Accent on Hover */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-8"
          style={{
            background: `radial-gradient(circle, ${gradient.accent}, transparent)`,
          }}
        />
      </div>
    </div>
  )
}

const ServicePhilosophy: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-dark-page to-black py-12 md:py-24 lg:py-32">
          {/* Blue and Purple Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-[300px] -top-[300px] h-[900px] w-[900px] rounded-full bg-gradient-to-br from-[rgba(95,165,251,0.15)] to-[rgba(147,51,234,0.15)] blur-[500px]"></div>
        <div className="absolute -left-[300px] top-1/2 h-[900px] w-[900px] -translate-y-1/2 rounded-full bg-gradient-to-br from-[rgba(97,151,251,0.15)] to-[rgba(139,92,246,0.15)] blur-[500px]"></div>
        <div className="absolute right-1/4 bottom-0 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(95,165,251,0.12)] to-[rgba(167,139,250,0.12)] blur-[500px]"></div>
        <div className="absolute left-1/3 top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[rgba(56,81,249,0.1)] to-[rgba(147,51,234,0.1)] blur-[400px]"></div>
      </div>

      <div className="relative container mx-auto px-4 md:px-6 z-10">
        <div className="mx-auto max-w-7xl">
          {/* Modern Section Header with Enhanced Styling */}
          <div className="mb-12 md:mb-16 lg:mb-20 text-center">
            <div className="inline-block mb-4 md:mb-6">
              <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
                Our Philosophy
              </h2>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <div
                className="h-1 w-20 md:w-32 lg:w-80 rounded-full"
                style={{
                  background: 'linear-gradient(to right, #5FA5FB, #9333EA)',
                }}
              />
            </div>
            <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4">
              Discover the principles that guide our innovative approach to transforming organizations
            </p>
          </div>

          {/* Modern Grid Layout - Responsive and Dynamic */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Psychology First - Card */}
            <PhilosophyCard
              title="Psychology First"
              isLarge={false}
              navigateTo="/our-services"
              index={0}
            >
              We use business psychology to understand how people think, work, and respond to change
            </PhilosophyCard>

            {/* Neurodiversity - Card */}
            <PhilosophyCard
              title="Neurodiversity as a Strategic Advantage"
              isLarge={false}
              navigateTo="/our-services"
              index={1}
            >
              We leverage neurodiversity to create inclusive environments that unlock unique talents and innovative thinking in your organization.
            </PhilosophyCard>

            {/* Human First Thinking - Card */}
            <PhilosophyCard
              title="Human First Thinking"
              isLarge={false}
              navigateTo="/our-services"
              index={2}
            >
              Putting people at the center of every decision, ensuring technology serves human needs and enhances workplace well-being.
            </PhilosophyCard>

            {/* AI Insights - Card */}
            <PhilosophyCard
              title="AI Insights"
              isLarge={false}
              navigateTo="/our-services"
              index={3}
            >
              Harness the power of artificial intelligence to gain deep insights into workforce dynamics, predict trends, and make data-driven decisions.
            </PhilosophyCard>

            {/* 4th Industrial Revolution - Large Card Spanning 2 columns on large screens */}
            <PhilosophyCard
              title="Equipping You for the 4th Industrial Revolution"
              isLarge={true}
              navigateTo="/our-services"
              index={4}
            >
              Prepare your organization for the future with cutting-edge tools and strategies that embrace digital transformation and innovation.
            </PhilosophyCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicePhilosophy
