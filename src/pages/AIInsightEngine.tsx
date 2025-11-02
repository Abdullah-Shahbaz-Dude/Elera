import React from 'react'
import Footer from '@/components/Footer/Footer'
import Newsletter from '@/components/Sections/Newsletter'
import { 
    RevealHiddenBrillianceImage,
    shutterstock2291389905,
    shutterstock2513386035
} from '@/assets/images'

interface InsightEngineSectionProps {
    engineNumber: number
    subtitle: string
    description: string
    howItWorks: string[]
    outputs: string[]
    caseStudyTitle: string
    caseStudyText: string
    caseStudyImage?: string
}

const InsightEngineSection: React.FC<InsightEngineSectionProps> = ({
    engineNumber,
    subtitle,
    description,
    howItWorks,
    outputs,
    caseStudyTitle,
    caseStudyText,
    caseStudyImage,
}) => {
    return (
        <div className="relative mb-24">
            {/* Section Title */}
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                    INSIGHT ENGINE {engineNumber}
                </h2>
                <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                    {subtitle}
                </h3>
                <p className="mx-auto mt-4 max-w-4xl text-base text-white md:text-lg lg:text-xl">
                    {description}
                </p>
            </div>

            {/* Conditionally render different layouts based on engineNumber */}
            {engineNumber === 1 ? (
                /* Engine 1: Overlapping Boxes Design */
                <div className="relative grid gap-8 lg:grid-cols-2">
                    {/* Left: How it works - Timeline Design */}
                    <div className="relative z-10">
                        <h4 className="mb-8 text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl flex items-center justify-center"
                                 style={{
                                     background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                     boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                                 }}>
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            How it works:
                        </h4>
                        
                        {/* Timeline Container */}
                        <div className="relative pl-8 md:pl-12">
                            {/* Vertical Timeline Line */}
                            <div className="absolute left-6 top-0 h-full w-1 rounded-full"
                                 style={{
                                     background: 'linear-gradient(to bottom, #60A5FA, #9333EA)',
                                     boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
                                 }}>
                            </div>
                            
                            {/* Timeline Items */}
                            <div className="space-y-8">
                                {howItWorks.map((item, index) => (
                                    <div key={index} className="relative flex gap-6">
                                        {/* Timeline Node */}
                                        <div className="relative z-10 mt-1.5">
                                            <div className="h-6 w-6 rounded-full border-4 border-black flex items-center justify-center"
                                                 style={{
                                                     background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                                     boxShadow: '0 0 16px rgba(96, 165, 250, 0.6)',
                                                 }}>
                                                <div className="h-2 w-2 rounded-full bg-white"></div>
                                            </div>
                                        </div>
                                        
                                        {/* Content Card */}
                                        <div className="flex-1 pb-2">
                                            <div className="rounded-xl p-6 border-l-4"
                                                 style={{
                                                     background: 'rgba(96, 165, 250, 0.08)',
                                                     borderColor: '#60A5FA',
                                                     boxShadow: '0 4px 16px rgba(96, 165, 250, 0.15)',
                                                 }}>
                                                <div className="mb-2 text-sm font-semibold text-white/70 uppercase tracking-wider">
                                                    Step {index + 1}
                                                </div>
                                                <p className="text-base leading-relaxed text-white/95 md:text-lg">
                                                    {item}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Outputs include - Single box with bullet list (overlaps left) */}
                    <div className="relative z-20 -ml-8 lg:ml-[-4rem] mt-20">
                        <h4 className="mb-4 text-2xl font-bold ml-12 text-white tracking-tight">Outputs include:</h4>
                        {/* Gradient Border Container */}
                        <div
                            className="relative w-full rounded-xl p-[1px]"
                            style={{
                                background: 'linear-gradient(to right, #60A5FA, #A78BFA, #9333EA)',
                                boxShadow: '0 4px 14px rgba(96, 165, 250, 0.2)',
                            }}
                        >
                            {/* Inner Container */}
                            <div
                                className="relative w-full rounded-xl p-6 backdrop-blur-sm"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.85)',
                                }}
                            >
                                <ul className="space-y-4">
                                    {outputs.map((item, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                                            <p className="flex-1 text-base leading-relaxed text-white/95 md:text-lg">
                                                {item}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : engineNumber === 2 ? (
                /* Engine 2: Vertical Timeline/Step Design */
                <div className="relative space-y-12">
                    {/* How it works - Timeline Design */}
                    <div className="relative">
                        <h4 className="mb-8 text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl flex items-center justify-center"
                                 style={{
                                     background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                     boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                                 }}>
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            How it works:
                        </h4>
                        
                        {/* Timeline Container */}
                        <div className="relative pl-8 md:pl-12">
                            {/* Vertical Timeline Line */}
                            <div className="absolute left-6 top-0 h-full w-1 rounded-full"
                                 style={{
                                     background: 'linear-gradient(to bottom, #60A5FA, #9333EA)',
                                     boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
                                 }}>
                            </div>
                            
                            {/* Timeline Items */}
                            <div className="space-y-8">
                                {howItWorks.map((item, index) => (
                                    <div key={index} className="relative flex gap-6">
                                        {/* Timeline Node */}
                                        <div className="relative z-10 mt-1.5">
                                            <div className="h-6 w-6 rounded-full border-4 border-black flex items-center justify-center"
                                                 style={{
                                                     background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                                     boxShadow: '0 0 16px rgba(96, 165, 250, 0.6)',
                                                 }}>
                                                <div className="h-2 w-2 rounded-full bg-white"></div>
                                            </div>
                                        </div>
                                        
                                        {/* Content Card */}
                                        <div className="flex-1 pb-2">
                                            <div className="rounded-xl p-6 border-l-4"
                                                 style={{
                                                     background: 'rgba(96, 165, 250, 0.08)',
                                                     borderColor: '#60A5FA',
                                                     boxShadow: '0 4px 16px rgba(96, 165, 250, 0.15)',
                                                 }}>
                                                <div className="mb-2 text-sm font-semibold text-white/70 uppercase tracking-wider">
                                                    Step {index + 1}
                                                </div>
                                                <p className="text-base leading-relaxed text-white/95 md:text-lg">
                                                    {item}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Outputs - Grid Card Design */}
                    <div className="relative">
                        <h4 className="mb-8 text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl flex items-center justify-center"
                                 style={{
                                     background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                                     boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
                                 }}>
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            Outputs include:
                        </h4>
                        
                        {/* Grid of Output Cards */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {outputs.map((item, index) => (
                                <div key={index}
                                     className="group relative rounded-xl p-5 transition-all hover:scale-105"
                                     style={{
                                         background: 'rgba(139, 92, 246, 0.1)',
                                         border: '1px solid rgba(139, 92, 246, 0.3)',
                                         boxShadow: '0 4px 16px rgba(139, 92, 246, 0.15)',
                                     }}>
                                    <div className="mb-3 flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                                             style={{
                                                 background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                                             }}>
                                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-sm leading-relaxed text-white/90 md:text-base">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                /* Engine 3: Horizontal Flow/Card Design */
                <div className="relative space-y-12">
                    {/* How it works - Horizontal Flow */}
                    <div className="relative">
                        <h4 className="mb-8 text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl flex items-center justify-center"
                                 style={{
                                     background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                     boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                                 }}>
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                            How it works:
                        </h4>
                        
                        {/* Horizontal Flow Cards */}
                        <div className="flex flex-col gap-6 md:flex-row md:gap-4">
                            {howItWorks.map((item, index) => (
                                <div key={index} className="relative flex-1 group">
                                    {/* Connection Arrow (hidden on last item) */}
                                    {index < howItWorks.length - 1 && (
                                        <div className="absolute -right-2 top-1/2 z-20 hidden -translate-y-1/2 md:block">
                                            <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                    
                                    {/* Card */}
                                    <div className="relative h-full rounded-2xl p-6 transition-all group-hover:scale-105"
                                         style={{
                                             background: 'rgba(96, 165, 250, 0.1)',
                                             border: '2px solid rgba(96, 165, 250, 0.4)',
                                             boxShadow: '0 4px 20px rgba(96, 165, 250, 0.2)',
                                         }}>
                                        {/* Number Badge */}
                                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white"
                                             style={{
                                                 background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                                 boxShadow: '0 4px 12px rgba(96, 165, 250, 0.4)',
                                             }}>
                                            {index + 1}
                                        </div>
                                        
                                        <p className="text-base leading-relaxed text-white/95 md:text-lg">
                                            {item}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Outputs - Split Panel Design */}
                    <div className="relative">
                        <h4 className="mb-8 text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl flex items-center justify-center"
                                 style={{
                                     background: 'linear-gradient(135deg, #A78BFA, #9333EA)',
                                     boxShadow: '0 4px 20px rgba(167, 139, 250, 0.4)',
                                 }}>
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            Outputs include:
                        </h4>
                        
                        {/* Split Panel with Icon List */}
                        <div className="rounded-2xl p-8"
                             style={{
                                 background: 'rgba(167, 139, 250, 0.08)',
                                 border: '2px solid rgba(167, 139, 250, 0.3)',
                                 boxShadow: '0 8px 32px rgba(167, 139, 250, 0.2)',
                             }}>
                            <div className="grid gap-6 md:grid-cols-2">
                                {outputs.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4 group">
                                        {/* Icon Badge */}
                                        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all group-hover:scale-110"
                                             style={{
                                                 background: 'linear-gradient(135deg, #A78BFA, #9333EA)',
                                                 boxShadow: '0 4px 16px rgba(167, 139, 250, 0.4)',
                                             }}>
                                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        
                                        {/* Text */}
                                        <p className="flex-1 pt-2 text-base leading-relaxed text-white/95 md:text-lg">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Case Study Section - Different Design for Each Engine */}
            {engineNumber === 1 ? (
                /* Engine 1: Traditional Card Design with Image on Right */
                <div className="mt-20">
                    <div className="relative">
                        {/* Background Glow Effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[rgba(96,165,250,0.1)] via-[rgba(167,139,250,0.1)] to-[rgba(147,51,234,0.1)] blur-3xl"></div>
                        
                        {/* Main Card Container */}
                        <div
                            className="relative rounded-3xl p-[2px]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.4), rgba(167, 139, 250, 0.4), rgba(147, 51, 234, 0.4))',
                                boxShadow: '0 8px 32px rgba(96, 165, 250, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)',
                            }}
                        >
                            <div
                                className="relative rounded-3xl p-8 md:p-12 backdrop-blur-md"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.85))',
                                }}
                            >
                                {/* Header with Icon */}
                                <div className="mb-8 flex items-center gap-4">
                                    <div
                                        className="flex h-14 w-14 items-center justify-center rounded-xl"
                                        style={{
                                            background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                            boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                                        }}
                                    >
                                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-white md:text-3xl tracking-tight">
                                            {caseStudyTitle}
                                        </h4>
                                        <div className="mt-1 h-1 w-20 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                                    </div>
                                </div>

                                {/* Content Grid */}
                                <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
                                    {/* Text Content */}
                                    <div className="space-y-6">
                                        <div className="relative pl-6">
                                            <div
                                                className="absolute left-0 top-0 h-full w-1 rounded-full"
                                                style={{
                                                    background: 'linear-gradient(to bottom, #60A5FA, #9333EA)',
                                                    boxShadow: '0 0 10px rgba(96, 165, 250, 0.5)',
                                                }}
                                            ></div>
                                            <p className="text-lg leading-relaxed text-white/90 md:text-xl md:leading-8">
                                                {caseStudyText}
                                            </p>
                                        </div>

                                        {/* Key Highlights */}
                                        <div className="flex flex-wrap gap-3 pt-4">
                                            <span className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                                                  style={{
                                                      background: 'rgba(96, 165, 250, 0.2)',
                                                      border: '1px solid rgba(96, 165, 250, 0.4)',
                                                  }}>
                                                ✓ Real Results
                                            </span>
                                            <span className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                                                  style={{
                                                      background: 'rgba(167, 139, 250, 0.2)',
                                                      border: '1px solid rgba(167, 139, 250, 0.4)',
                                                  }}>
                                                ✓ Proven Impact
                                            </span>
                                            <span className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                                                  style={{
                                                      background: 'rgba(147, 51, 234, 0.2)',
                                                      border: '1px solid rgba(147, 51, 234, 0.4)',
                                                  }}>
                                                ✓ Transformative Change
                                            </span>
                                        </div>
                                    </div>

                                    {/* Visual Element - Right Side */}
                                    {caseStudyImage && (
                                        <div className="relative lg:ml-8">
                                            <div
                                                className="relative h-64 w-64 rounded-2xl p-[2px] lg:h-80 lg:w-80"
                                                style={{
                                                    background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
                                                    boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                                                }}
                                            >
                                                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black/50">
                                                    <img
                                                        src={caseStudyImage}
                                                        alt={caseStudyTitle}
                                                        className="h-full w-full object-cover"
                                                        style={{
                                                            filter: 'grayscale(20%) contrast(1.1) brightness(0.8)',
                                                            opacity: 0.85,
                                                        }}
                                                    />
                                                    {/* Overlay Gradient */}
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{
                                                            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.25), rgba(147, 51, 234, 0.35))',
                                                            mixBlendMode: 'overlay',
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            {/* Decorative Elements */}
                                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.3)] to-[rgba(147,51,234,0.3)] blur-2xl"></div>
                                            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.2)] to-[rgba(147,51,234,0.2)] blur-2xl"></div>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="mt-8 flex items-center gap-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(96,165,250,0.5)] to-transparent"></div>
                                    <div className="h-2 w-2 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#9333EA]"></div>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(147,51,234,0.5)] to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : engineNumber === 2 ? (
                /* Engine 2: Quote/Testimonial Style Design */
                <div className="mt-20">
                    <div className="relative">
                        {/* Quote Mark Decorative Element */}
                        <div className="absolute -left-4 -top-8 z-0">
                            <svg className="h-32 w-32 text-white/5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 9.017-9.57V2.846C23.731 2.846 20.017 1 15.017 1c-5.704 0-9.017 3.463-9.017 8.308v11.692h8.017zm-14.017 0v-7.391c0-5.704 3.731-9.57 9.017-9.57V2.846C9.731 2.846 6.017 1 1.017 1c-5.704 0-9.017 3.463-9.017 8.308v11.692H0z"/>
                            </svg>
                        </div>

                        {/* Main Container */}
                        <div className="relative rounded-2xl border-2 p-8 md:p-12"
                             style={{
                                 borderColor: 'rgba(96, 165, 250, 0.3)',
                                 background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.05), rgba(167, 139, 250, 0.05))',
                                 boxShadow: '0 8px 32px rgba(96, 165, 250, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                             }}>
                            {/* Header - Centered */}
                            <div className="mb-8 text-center">
                                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full"
                                     style={{
                                         background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
                                         boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                                     }}>
                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-2xl font-bold text-white md:text-3xl tracking-tight">
                                    {caseStudyTitle}
                                </h4>
                                <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#3B82F6]"></div>
                            </div>

                            {/* Content - Centered with Quote Style */}
                            <div className="relative">
                                {caseStudyImage && (
                                    <div className="mb-8 flex justify-center">
                                        <div className="relative h-40 w-40 rounded-full p-[2px]"
                                             style={{
                                                 background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
                                                 boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                                             }}>
                                            <div className="relative h-full w-full overflow-hidden rounded-full bg-black/50">
                                                <img
                                                    src={caseStudyImage}
                                                    alt={caseStudyTitle}
                                                    className="h-full w-full object-cover"
                                                    style={{
                                                        filter: 'grayscale(20%) contrast(1.1) brightness(0.8)',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Text Content - Quote Style */}
                                <div className="relative mx-auto max-w-4xl">
                                    <div className="relative rounded-xl p-8"
                                         style={{
                                             background: 'rgba(0, 0, 0, 0.4)',
                                             borderLeft: '4px solid #60A5FA',
                                         }}>
                                        <p className="text-lg italic leading-relaxed text-white/95 md:text-xl md:leading-8">
                                            "{caseStudyText}"
                                        </p>
                                    </div>

                                    {/* Key Metrics - Bottom */}
                                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="rounded-lg p-4 text-center"
                                             style={{
                                                 background: 'rgba(96, 165, 250, 0.1)',
                                                 border: '1px solid rgba(96, 165, 250, 0.3)',
                                             }}>
                                            <div className="mb-2 text-2xl font-bold text-white">✓</div>
                                            <div className="text-sm text-white/80">Real Results</div>
                                        </div>
                                        <div className="rounded-lg p-4 text-center"
                                             style={{
                                                 background: 'rgba(167, 139, 250, 0.1)',
                                                 border: '1px solid rgba(167, 139, 250, 0.3)',
                                             }}>
                                            <div className="mb-2 text-2xl font-bold text-white">✓</div>
                                            <div className="text-sm text-white/80">Proven Impact</div>
                                        </div>
                                        <div className="rounded-lg p-4 text-center"
                                             style={{
                                                 background: 'rgba(147, 51, 234, 0.1)',
                                                 border: '1px solid rgba(147, 51, 234, 0.3)',
                                             }}>
                                            <div className="mb-2 text-2xl font-bold text-white">✓</div>
                                            <div className="text-sm text-white/80">Transformative</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Engine 3: Split Panel Design with Image on Left */
                <div className="mt-20">
                    <div className="relative">
                        {/* Main Container - Split Layout */}
                        <div className="grid gap-0 lg:grid-cols-2">
                            {/* Left: Image Panel */}
                            {caseStudyImage && (
                                <div className="relative order-2 lg:order-1">
                                    <div className="relative h-full min-h-[400px] overflow-hidden rounded-l-3xl lg:rounded-l-3xl lg:rounded-r-none rounded-r-3xl"
                                         style={{
                                             background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(167, 139, 250, 0.2))',
                                         }}>
                                        <div className="absolute inset-0 p-[2px]"
                                             style={{
                                                 background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
                                             }}>
                                            <div className="relative h-full w-full overflow-hidden rounded-l-3xl lg:rounded-l-3xl lg:rounded-r-none rounded-r-3xl bg-black/50">
                                                <img
                                                    src={caseStudyImage}
                                                    alt={caseStudyTitle}
                                                    className="h-full w-full object-cover"
                                                    style={{
                                                        filter: 'grayscale(30%) contrast(1.2) brightness(0.7)',
                                                        opacity: 0.9,
                                                    }}
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0"
                                                     style={{
                                                         background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.4), rgba(147, 51, 234, 0.5))',
                                                     }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Right: Content Panel */}
                            <div className="relative order-1 lg:order-2"
                                 style={{
                                     background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.9))',
                                 }}>
                                <div className="h-full rounded-r-3xl lg:rounded-r-3xl lg:rounded-l-none rounded-l-3xl p-8 md:p-12"
                                     style={{
                                         border: '2px solid rgba(96, 165, 250, 0.3)',
                                         borderLeft: caseStudyImage ? 'none' : '2px solid rgba(96, 165, 250, 0.3)',
                                         borderRight: !caseStudyImage ? 'none' : '2px solid rgba(96, 165, 250, 0.3)',
                                         boxShadow: '0 8px 32px rgba(96, 165, 250, 0.2)',
                                     }}>
                                    {/* Header */}
                                    <div className="mb-8">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg"
                                                 style={{
                                                     background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                                     boxShadow: '0 4px 16px rgba(96, 165, 250, 0.4)',
                                                 }}>
                                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <h4 className="text-2xl font-bold text-white md:text-3xl tracking-tight">
                                                {caseStudyTitle}
                                            </h4>
                                        </div>
                                        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="mb-8">
                                        <p className="text-base leading-relaxed text-white/90 md:text-lg md:leading-7">
                                            {caseStudyText}
                                        </p>
                                    </div>

                                    {/* Highlights - Horizontal List */}
                                    <div className="flex flex-wrap gap-3">
                                        <div className="flex items-center gap-2 rounded-lg px-4 py-2"
                                             style={{
                                                 background: 'rgba(96, 165, 250, 0.15)',
                                                 border: '1px solid rgba(96, 165, 250, 0.3)',
                                             }}>
                                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm font-semibold text-white">Real Results</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-lg px-4 py-2"
                                             style={{
                                                 background: 'rgba(167, 139, 250, 0.15)',
                                                 border: '1px solid rgba(167, 139, 250, 0.3)',
                                             }}>
                                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm font-semibold text-white">Proven Impact</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-lg px-4 py-2"
                                             style={{
                                                 background: 'rgba(147, 51, 234, 0.15)',
                                                 border: '1px solid rgba(147, 51, 234, 0.3)',
                                             }}>
                                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm font-semibold text-white">Transformative</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Separator Line */}
            <div className="my-16 h-[3px] w-full bg-gradient-to-r from-transparent via-primary-blue-accent to-transparent opacity-50"></div>
        </div>
    )
}

const AIInsightEngine = () => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-black">
            {/* Background Blur Effects - Purple Gradient Ellipses */}
            <div className="absolute right-[1657px] top-[916px] h-[862px] w-[862px] rounded-full bg-gradient-to-br from-[rgba(147,51,234,0.4)] to-[rgba(168,85,247,0.4)] blur-[400px]"></div>
            <div className="absolute left-[1851px] top-[2897px] h-[1081px] w-[1132px] rounded-full bg-gradient-to-br from-[rgba(147,51,234,0.4)] to-[rgba(192,132,252,0.4)] blur-[400px]"></div>
            <div className="absolute left-[351px] top-[5714px] h-[1116px] w-[1116px] rounded-full bg-gradient-to-br from-[rgba(126,34,206,0.35)] to-[rgba(168,85,247,0.35)] blur-[400px]"></div>
            <div className="absolute -left-[72px] top-[1202px] h-[1114px] w-[1114px] rounded-full bg-gradient-to-br from-[rgba(192,132,252,0.3)] to-[rgba(147,51,234,0.3)] blur-[400px]"></div>
            <div className="absolute right-[1657px] top-[4684px] h-[1106px] w-[1182px] rounded-full bg-gradient-to-br from-[rgba(168,85,247,0.4)] to-[rgba(147,51,234,0.4)] blur-[400px]"></div>
            <div className="absolute -left-[411px] top-[4623px] h-[1106px] w-[1182px] rounded-full bg-gradient-to-br from-[rgba(192,132,252,0.35)] to-[rgba(126,34,206,0.35)] blur-[400px]"></div>

            {/* Additional Purple Glow Effects */}
            <div className="absolute right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[rgba(147,51,234,0.25)] to-[rgba(168,85,247,0.25)] blur-[300px]"></div>
            <div className="absolute left-1/4 top-3/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[rgba(192,132,252,0.3)] to-[rgba(147,51,234,0.3)] blur-[350px]"></div>
            <div className="absolute right-1/3 bottom-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(126,34,206,0.3)] to-[rgba(192,132,252,0.3)] blur-[400px]"></div>

            {/* Hero Section - Black Background */}
            <div className="relative bg-black pt-40 pb-16">
                <div className="container mx-auto px-6 py-12">
                    <div className="mx-auto ">
                        {/* Hero Section */}
                        <div className="mb-16">
                            <div className="grid gap-8 lg:grid-cols-2">
                                {/* Left: Content Box with Gradient Border */}
                                <div className="relative w-[900px]">
                                    {/* Gradient Border Container - Rounded rectangular frame */}
                                    <div
                                        className="relative h-full w-full rounded-3xl p-[3px]"
                                        style={{
                                            background: 'linear-gradient(to right, #60A5FA, #A78BFA, #9333EA) ',
                                            boxShadow: '0 0 20px rgba(96, 165, 250, 0.)',
                                        }}
                                    >
                                        {/* Inner Container */}
                                        <div
                                            className="relative h-full w-full rounded-3xl p-8 backdrop-blur-sm"
                                            style={{
                                                background: 'rgba(0, 0, 0, 0.9)',
                                            }}
                                        >
                                            <div className="space-y-6 w-[600px]">
                                                <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                                                    ELARA AI Consultancy
                                                </h1>
                                                <p className="text-lg leading-relaxed text-white md:text-xl">
                                                    Elara's AI Insight Engines are a set of smart, psychology-powered tools that give you a deeper view of your workforce beyond their job titles, CVs, or formal qualifications.
                                                </p>
                                                <p className="text-lg font-semibold text-white md:text-xl">
                                                    They help you answer important questions like:
                                                </p>
                                                <ul className="space-y-4">
                                                    <li className="flex items-start gap-4">
                                                        <div className="mt-1 h-[18px] w-[18px] shrink-0 rounded-full bg-white"></div>
                                                        <p className="flex-1 text-base leading-relaxed text-white md:text-lg">
                                                            Who on our team is ready to lead digital change?
                                                        </p>
                                                    </li>
                                                    <li className="flex items-start gap-4">
                                                        <div className="mt-1 h-[18px] w-[18px] shrink-0 rounded-full bg-white"></div>
                                                        <p className="flex-1 text-base leading-relaxed text-white md:text-lg">
                                                            What hidden strengths with our workforce are we not using?
                                                        </p>
                                                    </li>
                                                    <li className="flex items-start gap-4">
                                                        <div className="mt-1 h-[18px] w-[18px] shrink-0 rounded-full bg-white"></div>
                                                        <p className="flex-1 text-base leading-relaxed text-white md:text-lg">
                                                            How do we spot future talent not just experience?
                                                        </p>
                                                    </li>
                                                    <li className="flex items-start gap-4">
                                                        <div className="mt-1 h-[18px] w-[18px] shrink-0 rounded-full bg-white"></div>
                                                        <p className="flex-1 text-base leading-relaxed text-white md:text-lg">
                                                            Are we missing opportunities to support neurodivergent thinkers?
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Image Box with Gradient Border */}
                                <div className="relative">
                                    {/* Gradient Border Container - Matching Figma design with specific corner radius */}
                                    <div
                                        className="relative h-full min-h-[500px] w-full rounded-3xl p-[4px]"
                                       
                                    >
                                        {/* Inner Container */}
                                        <div
                                            className="relative h-full w-full overflow-hidden rounded-3xl"
                                            style={{
                                                background: 'transparent',
                                                borderRadius: '2.5rem 1.5rem 1.5rem 1.5rem',
                                            }}
                                        >
                                            <img
                                                src={RevealHiddenBrillianceImage}
                                                alt="ELARA AI Insight Engine"
                                                className="h-full w-full object-cover"
                                                style={{
                                                    borderRadius: '2.5rem 1.5rem 1.5rem 1.5rem',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Title */}
                        <div className="mb-16">
                            <h2 className="text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                                We combine behavioural science, workforce data, and AI Platforms to help you
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dark Background Section */}
            <div className="relative bg-black pt-16 pb-24">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-[1960px]">
                        {/* Insight Engine 1 - Reveal Hidden Brilliance */}
                        <InsightEngineSection
                            engineNumber={1}
                            subtitle="Reveal Hidden Brilliance"
                            description="Our tools find hidden strengths, thinking styles, and patterns within your workforce that support smarter decisions from recruitment to culture change."
                            howItWorks={[
                                'Simple, friendly diagnostic that explores strengths, working styles, and hidden talents',
                                'Looks at skills used both at work and outside of work',
                                'Produces individual profiles and team-level maps of strengths and skills gaps',
                            ]}
                            outputs={[
                                'A profile of problem-solving and adaptability strengths',
                                'Audit of hidden or outside-work skills (e.g. coding, data, creativity)',
                                'Collaboration and communication preferences',
                                'Digital confidence and comfort with AI/tools',
                                'Readiness to learn and adapt to change',
                            ]}
                            caseStudyTitle="CASE STUDY EXAMPLE:"
                            caseStudyText="John, a forklift truck driver on an apprenticeship, was diagnosed with Autism. He completed Reveal Hidden Brilliance and it uncovered that he built his own algorithms at home and had a strong ability with data and patterns. His managers had no idea, as John never thought these skills were relevant to his job. With Elara's insights, John was offered a role in the data team, where his strengths helped the company improve efficiency and transition into new digital systems."
                            caseStudyImage={RevealHiddenBrillianceImage}
                        />

                        {/* Insight Engine 2 - Mind Sync */}
                        <InsightEngineSection
                            engineNumber={2}
                            subtitle="Mind Sync"
                            description="For managers and leaders showing how leadership style, decision-making, and communication impact teams and innovation."
                            howItWorks={[
                                'Leaders complete a diagnostic assessment',
                                'They receive an individual leadership profile',
                                'One-to-one coaching with a business psychologist interprets results',
                                'Cluster analysis highlights patterns across leadership teams',
                                'Training and coaching target blind spots',
                            ]}
                            outputs={[
                                'Leadership decision-making style (data vs instinct, risk appetite)',
                                'Awareness of common biases (status quo bias, optimism bias, sunk cost)',
                                'Strengths and weaknesses in communication',
                                'Openness to innovation and experimentation',
                                'Impact of leadership on team motivation and trust',
                            ]}
                            caseStudyTitle="CASE STUDY EXAMPLE:"
                            caseStudyText="Sarah, a site manager, completed the Mind Sync process. Results showed she often made decisions without input from her team. With coaching, Sarah began holding short 'innovation huddles,' where team members suggested process and digital improvements. Within three months, the team saved time on reporting and morale improved showing how small changes in leadership style can unlock big results."
                            caseStudyImage={shutterstock2291389905}
                        />

                        {/* Insight Engine 3 - Digital Bias */}
                        <InsightEngineSection
                            engineNumber={3}
                            subtitle="Digital Bias"
                            description="For the whole organisation identifying cultural and psychological barriers that block digital adoption."
                            howItWorks={[
                                'Staff across all roles complete a structured set of questions',
                                'AI analysis highlights where psychological barriers exist (resistance to change, fear of loss, choice overload, lack of trust in tech)',
                                'Consultants design workshops, training, and culture programmes to tackle blockers',
                            ]}
                            outputs={[
                                'Heatmaps showing which departments are most resistant to change',
                                'Organisational readiness score for digital adoption',
                                'Tailored training and communication plans',
                                'Practical actions to increase trust in new tools and systems',
                            ]}
                            caseStudyTitle="CASE STUDY EXAMPLE:"
                            caseStudyText="A large contractor used the Digital Bias engine across their business. The results showed widespread 'status quo bias,' where staff preferred older systems even when new ones were better. With targeted training and role redesign, the company improved trust in technology, and adoption rates for a new digital inspection app rose by 60% in six months."
                            caseStudyImage={shutterstock2513386035}
                        />
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <Newsletter />

            {/* Footer */}
            <Footer />
        </main>
    )
}

export default AIInsightEngine
