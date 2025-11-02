import React from 'react'

const IntroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black py-20 md:py-32">
      {/* Background Gradient Effects */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.15)] to-[rgba(147,51,234,0.15)] blur-[400px]"></div>
      <div className="absolute left-0 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.15)] to-[rgba(147,51,234,0.15)] blur-[400px]"></div>

      <div className="relative container mx-auto px-6 z-10">
        <div className="mx-auto max-w-[1926px] text-center">
          {/* Modern Gradient Text Effect */}
          <div className="relative inline-block">
            <h2 className="relative z-10 text-4xl font-bold text-white md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              We combine{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                }}
              >
                behavioural science
              </span>
              , workforce data, and{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #8B5CF6, #60A5FA)',
                }}
              >
                AI Platforms
              </span>
              {' '}to help you
            </h2>
            
            {/* Decorative Gradient Line */}
            <div
              className="mx-auto mt-8 h-1 w-32 rounded-full"
              style={{
                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection

