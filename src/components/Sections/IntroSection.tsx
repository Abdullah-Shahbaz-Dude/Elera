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
          
        </div>
      </div>
    </section>
  )
}

export default IntroSection

