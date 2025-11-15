import { aiInsightEngineImage } from '@/assets/images'
import React, { useState } from 'react'

const WhySection: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const items = [
    {
      title: 'Psychology First',
      subText: 'We start with business psychology to understand how people think, behave, and respond to change.',
    },
    {
      title: 'Advanced AI and Data Intelligence',
      subText: 'We build cutting-edge AI and data algorithms that go far beyond basic analytics. Our technology identifies hidden patterns, emerging strengths, and untapped potential across your workforce.',
    },
    {
      title: 'Harnessing Neurodiversity and Different Thinkers for Real Advantage',
      subText: 'We help organisations identify and elevate the strengths of neurodiverse individuals, unlocking problem-solving, creativity, and innovation that can go unnoticed in traditional workplaces.',
    },
    {
      title: 'People-Led Transformation',
      subText: 'We help organisations build cultures where people shape progress, not resist it making transformation smoother, faster, and more sustainable.',
    },
    {
      title: 'Preparing You for What Comes Next',
      subText: 'We equip your people, systems, and culture for the demands of the 4th Industrial Revolution helping your organisation adapt, innovate, and thrive in a rapidly shifting digital world.',
    },
  ]

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
              
              {/* Expandable List Items */}
              <ul className="space-y-3 md:space-y-4">
                {items.map((item, index) => {
                  const isExpanded = expandedItems.has(index)
                  return (
                    <li key={index} className="group">
                      <div
                        className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                        style={{
                          boxShadow: isExpanded
                            ? '0 4px 20px rgba(96, 165, 250, 0.15)'
                            : '0 2px 10px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        {/* Gradient accent on hover */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.05), rgba(147, 51, 234, 0.05))',
                          }}
                        ></div>

                        <div className="relative">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-bold text-base md:text-lg lg:text-xl text-white flex-1 leading-tight">
                              {item.title}
                            </h3>
                            <button
                              onClick={() => toggleItem(index)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                                isExpanded
                                  ? 'text-white'
                                  : 'text-[#60A5FA] hover:text-white'
                              }`}
                              style={{
                                background: isExpanded
                                  ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(147, 51, 234, 0.2))'
                                  : 'transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.style.background =
                                    'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(147, 51, 234, 0.15))'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.style.background = 'transparent'
                                }
                              }}
                            >
                              <span>{isExpanded ? 'Read less' : 'Read more'}</span>
                              <svg
                                className={`w-4 h-4 transition-transform duration-300 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Expandable content with smooth animation */}
                          <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                            }`}
                          >
                            <div className="pt-2">
                              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/80">
                                {item.subText}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
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
