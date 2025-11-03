import { aiInsightEngineImage } from '@/assets/images'
import React from 'react'

const WhySection: React.FC = () => {
  // SVG Icons for each point
  const getIcon = (index: number) => {
    const icons = [
      // Understand
      <svg key={0} className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>,
      // Uncover
      <svg key={1} className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>,
      // Build
      <svg key={2} className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
    ]
    return icons[index]
  }

  return (
    <section className="relative w-full overflow-hidden bg-black py-12 md:py-24 lg:py-32">
      {/* Background Glow Effects */}
      <div className="absolute right-1/4 top-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.2)] to-[rgba(147,51,234,0.2)] blur-[400px]"></div>
      <div className="absolute left-1/4 bottom-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.2)] to-[rgba(147,51,234,0.2)] blur-[400px]"></div>

      <div className="relative container mx-auto px-4 md:px-6 z-10 py-12 md:py-20">
        <div className="mx-auto max-w-[1960px]">
          {/* Modern Split Layout */}
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div>
                <h2 className="mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
                  Why Elara Exists
                </h2>
                <div
                  className="h-1 w-20 md:w-24 rounded-full mx-auto lg:mx-0"
                  style={{
                    background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                  }}
                ></div>
              </div>
              
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90">
                We combine behavioural science, workforce data, and AI Platforms
                to help you
              </p>

              {/* Modern Bullet Points with SVG Icons */}
              <ul className="space-y-4 md:space-y-6">
                {[
                  {
                    text: 'Understand how your people think, decide, and perform under pressure',
                  },
                  {
                    text: 'Uncover hidden strengths, overlooked capabilities, and future potential in your work force',
                  },
                  {
                    text: 'Build agile teams and leadership strategies fit for a changing world',
                  },
                ].map((item, index) => (
                  <li key={index} className="group flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 text-center sm:text-left">
                    <div
                      className="flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-xl md:rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        background: `linear-gradient(135deg, ${
                          index === 0
                            ? '#60A5FA, #3B82F6'
                            : index === 1
                            ? '#8B5CF6, #7C3AED'
                            : '#A78BFA, #9333EA'
                        })`,
                        boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      {getIcon(index)}
                    </div>
                    <p className="flex-1 pt-1 md:pt-2 text-base md:text-lg lg:text-xl leading-relaxed text-white/90">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Image with Modern Frame - Using Different Image */}
            <div className="relative">
              {/* Gradient Border Effect */}
              <div
                className="relative rounded-3xl p-[3px]"
                style={{
                  background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
                  boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
                }}
              >
                <div className="relative overflow-hidden rounded-[29px] bg-black/50 backdrop-blur-sm">
                  <img
                    src={aiInsightEngineImage}
                    alt="Why Elara Exists"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* Overlay Gradient on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-20"
                    style={{
                      background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))',
                    }}
                  ></div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div
                className="absolute -right-8 -top-8 h-64 w-64 rounded-full blur-3xl opacity-30"
                style={{
                  background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhySection
