/**
 * BUSINESS PSYCHOLOGY CONSULTANCY PAGE - BACKUP
 * 
 * This is the old Business Psychology Consultancy page kept as a backup.
 * The new page is: PsychologyBasedTrainingAndMentoring.tsx
 * 
 * This file is commented out in App.tsx routing and should not be used in production.
 * It is kept for reference purposes only.
 */

import React from 'react'
import Footer from '@/components/Footer/Footer'
import { 
    humanServicesImage,
    shutterstock1330833800,
    shutterstock1502881307,
    shutterstock1717584028,
    shutterstock2213352423,
    shutterstock682503142,
    shutterstock726121441,
    sideViewWomanFaceScan
} from '@/assets/images'

interface CultureChangeSectionProps {
    noteText: string
    title: string
    description: string
    sectors: { name: string; image?: string }[]
    closingText: string
}

const CultureChangeSection: React.FC<CultureChangeSectionProps> = ({
    noteText,
    title,
    description,
    sectors,
    closingText,
}) => {
    return (
        <div className="relative mb-24">
            {/* Top Note Section - No background, transparent */}
            <div className="mb-8 p-6 md:p-8">
                <p className="text-center text-base text-gray-300 md:text-lg">
                    {noteText}
                </p>
            </div>

            {/* Main Section - No background overlay, blends with page background */}
            <div className="relative p-8 md:p-12">
                <div className="mb-8 text-center">
                    <h3 className="mb-6 text-3xl font-bold uppercase text-white md:text-4xl lg:text-5xl">
                        {title}
                    </h3>
                    <p className="mx-auto max-w-3xl text-base leading-relaxed text-white md:text-lg">
                        {description}
                    </p>
                </div>

                {/* Four Circular Images - Horizontally Arranged, Slightly Overlapping */}
                <div className="mb-16 flex flex-wrap justify-center items-center gap-0">
                    {sectors.map((sector, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center"
                            style={{
                                zIndex: sectors.length - index,
                                marginLeft: index > 0 ? '-4rem' : '0',
                            }}
                        >
                            <div className="relative h-64 w-64 rounded-full border-2 border-white overflow-hidden md:h-80 md:w-80">
                                {sector.image ? (
                                    <img
                                        src={sector.image}
                                        alt={sector.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="h-full w-full flex items-center justify-center"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))',
                                        }}
                                    >
                                        <span className="text-white text-sm font-semibold text-center px-4">{sector.name}</span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                <p className="text-sm font-bold uppercase text-white md:text-base">{sector.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing Text */}
                <p className="text-center text-base text-white md:text-lg">
                    {closingText}
                </p>
            </div>
        </div>
    )
}

interface LeadershipCoachingSectionProps {
    title: string
    description: string
    items: string[]
    closingNote: string
}

const LeadershipCoachingSection: React.FC<LeadershipCoachingSectionProps> = ({
    title,
    description,
    items,
    closingNote,
}) => {
    return (
        <div className="relative mb-24">
            {/* Modern Split Layout */}
            <div className="relative">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(96, 165, 250, 0.5) 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                ></div>

                {/* Main Container */}
                <div
                    className="relative grid gap-0 rounded-3xl overflow-hidden lg:grid-cols-2"
                    style={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        border: '2px solid rgba(96, 165, 250, 0.3)',
                        boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
                    }}
                >
                    {/* Left Side - Title and Description */}
                    <div
                        className="relative p-8 md:p-12 lg:p-16"
                        style={{
                            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(147, 51, 234, 0.1))',
                        }}
                    >
                        {/* Decorative Elements */}
                        <div
                            className="absolute -right-20 top-20 h-40 w-40 rounded-full blur-3xl opacity-30"
                            style={{
                                background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                            }}
                        ></div>

                        <div className="relative z-10">
                            <h3 className="mb-6 text-4xl font-bold uppercase text-white md:text-5xl lg:text-6xl">
                                {title}
                            </h3>
                            <p className="mb-8 text-lg leading-relaxed text-white/90 md:text-xl">
                                {description}
                            </p>

                            {/* Closing Note - Prominent */}
                            <div
                                className="relative mt-12 rounded-2xl p-6 md:p-8"
                                style={{
                                    background: 'rgba(96, 165, 250, 0.1)',
                                    border: '1px solid rgba(96, 165, 250, 0.3)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <p className="text-center text-base italic leading-relaxed text-white/90 md:text-lg">
                                    {closingNote}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Items with Modern Icons */}
                    <div className="relative p-8 md:p-12 lg:p-16">
                        <div className="space-y-6">
                            {items.map((item, index) => {
                                const icons = [
                                    <svg key={0} className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>,
                                    <svg key={1} className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>,
                                    <svg key={2} className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>,
                                    <svg key={3} className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>,
                                ]

                                const gradients = [
                                    'linear-gradient(135deg, #60A5FA, #3B82F6)',
                                    'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                                    'linear-gradient(135deg, #A78BFA, #9333EA)',
                                    'linear-gradient(135deg, #60A5FA, #9333EA)',
                                ]

                                return (
                                    <div
                                        key={index}
                                        className="group relative flex items-start gap-6 rounded-xl p-6 transition-all hover:scale-[1.02]"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                        }}
                                    >
                                        {/* Icon Badge */}
                                        <div
                                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                                            style={{
                                                background: gradients[index],
                                                boxShadow: '0 4px 16px rgba(96, 165, 250, 0.4)',
                                            }}
                                        >
                                            {icons[index]}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <p className="text-base leading-relaxed text-white md:text-lg">
                                                {item}
                                            </p>
                                        </div>

                                        {/* Number Indicator */}
                                        <div
                                            className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white text-xs"
                                            style={{
                                                background: gradients[index],
                                                boxShadow: '0 4px 12px rgba(96, 165, 250, 0.5)',
                                            }}
                                        >
                                            {index + 1}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BusinessPsychologyConsultancy = () => {
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
                    <div className="mx-auto">
                        {/* Hero Section */}
                        <div className="mb-16">
                            <div className="grid gap-8 lg:grid-cols-2">
                                {/* Left: Content Box with Gradient Border */}
                                <div className="relative w-full lg:w-[900px]">
                                    {/* Gradient Border Container */}
                                    <div
                                        className="relative h-full w-full rounded-3xl p-[3px]"
                                        style={{
                                            background: 'linear-gradient(to right, #60A5FA, #A78BFA, #9333EA)',
                                            boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)',
                                        }}
                                    >
                                        {/* Inner Container */}
                                        <div
                                            className="relative h-full w-full rounded-3xl p-8 backdrop-blur-sm"
                                            style={{
                                                background: 'rgba(0, 0, 0, 0.9)',
                                            }}
                                        >
                                            <div className="space-y-6 max-w-[500px]">
                                                <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                                                    ELARA HUMAN CONSULTANCY
                                                </h1>
                                                <p className="text-xl font-semibold leading-relaxed text-white md:text-2xl">
                                                    Making Insight Work for People, Not Just Processes
                                                </p>
                                                <p className="text-lg leading-relaxed text-white md:text-xl">
                                                    Elara's Business Psychology Consultancy helps organisations prepare for and thrive within the 4th Industrial Revolution — a time when people, machines, and digital systems must evolve together.
                                                </p>
                                                <p className="text-lg leading-relaxed text-white md:text-xl">
                                                    We help you to see your workforce needs and capabilities clearly, support them meaningfully, and design change they believe in.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Image Box */}
                                <div className="relative">
                                    <div
                                        className="relative h-full min-h-[500px] w-full rounded-3xl p-[4px]"
                                        style={{
                                            background: 'linear-gradient(to right, #60A5FA, #A78BFA, #9333EA)',
                                        }}
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
                                                src={humanServicesImage}
                                                alt="ELARA Human Consultancy"
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
                    </div>
                </div>
            </div>

            {/* Dark Background Section */}
            <div className="relative bg-black pt-16 pb-24">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-[1960px]">
                        {/* Digital Maturity & Readiness Audit - Modern Split Design */}
                        <div className="relative mb-24">
                            <div className="relative">
                                {/* Modern Split Layout - No borders */}
                                <div className="relative grid gap-0 lg:grid-cols-2 overflow-hidden">
                                    {/* Left Panel - Content */}
                                    <div
                                        className="relative p-8 md:p-12 lg:p-16"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(147, 51, 234, 0.1))',
                                        }}
                                    >
                                        {/* Decorative Gradient Elements */}
                                        <div
                                            className="absolute -right-20 top-20 h-40 w-40 rounded-full blur-3xl opacity-30"
                                            style={{
                                                background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                            }}
                                        ></div>

                                        <div className="relative z-10 space-y-8">
                                            {/* Title Section */}
                                            <div>
                                                <h2 className="mb-4 text-4xl font-bold uppercase text-white md:text-5xl lg:text-6xl">
                                                    WHAT WE OFFER
                                                </h2>
                                                <h3 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                                                    Digital Maturity & Readiness Audit
                                                </h3>
                                                <div
                                                    className="h-1 w-24 rounded-full"
                                                    style={{
                                                        background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                                                    }}
                                                ></div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                                                We assess your organisation's psychological and cultural readiness for digital transformation. Through direct engagement with leaders, frontline staff, and support teams, we identify:
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Panel - Items with Modern Timeline Design */}
                                    <div className="relative p-8 md:p-12 lg:p-16"
                                         style={{
                                             background: 'rgba(0, 0, 0, 0.6)',
                                         }}
                                    >
                                        {/* Vertical Timeline with Modern Design */}
                                        <div className="relative space-y-8">
                                            {[
                                                {
                                                    title: 'Cognitive Barriers',
                                                    description: 'Cognitive and emotional barriers to change',
                                                    icon: '🧩',
                                                    gradient: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
                                                },
                                                {
                                                    title: 'Digital Confidence',
                                                    description: 'Levels of digital confidence, adaptability, and innovation potential',
                                                    icon: '💡',
                                                    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                                                },
                                                {
                                                    title: 'Neurodivergent Strengths',
                                                    description: 'Untapped neurodivergent strengths within your workforce',
                                                    icon: '🌟',
                                                    gradient: 'linear-gradient(135deg, #A78BFA, #9333EA)',
                                                },
                                                {
                                                    title: 'Strategic Interventions',
                                                    description: 'Specific interventions to build trust, clarity, and momentum',
                                                    icon: '⚡',
                                                    gradient: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                                },
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative flex items-start gap-6"
                                                >
                                                    {/* Timeline Connector Line */}
                                                    {index < 3 && (
                                                        <div
                                                            className="absolute left-8 top-16 h-8 w-0.5"
                                                            style={{
                                                                background: `linear-gradient(to bottom, ${index === 0 ? '#60A5FA' : index === 1 ? '#8B5CF6' : '#A78BFA'}, ${index === 0 ? '#8B5CF6' : index === 1 ? '#A78BFA' : '#9333EA'})`,
                                                                opacity: 0.5,
                                                            }}
                                                        ></div>
                                                    )}

                                                    {/* Icon Badge */}
                                                    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                                                         style={{
                                                             background: item.gradient,
                                                             boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                                                         }}
                                                    >
                                                        {item.icon}
                                                        {/* Hover Glow */}
                                                        <div
                                                            className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60"
                                                            style={{
                                                                background: item.gradient,
                                                            }}
                                                        ></div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 pt-2">
                                                        <h4 className="mb-2 text-xl font-bold text-white md:text-2xl">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-base leading-relaxed text-white/80 md:text-lg">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Strategy & Planning - Modern Card Grid */}
                        <div className="relative mb-24">
                            <div className="relative">
                                {/* Background Glow Effect */}
                                <div
                                    className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
                                    style={{
                                        background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                    }}
                                ></div>

                                {/* Main Container */}
                                <div className="relative p-8 md:p-12 lg:p-16">
                                    {/* Title Section */}
                                    <div className="mb-12 text-center">
                                        <h3 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                                            Strategy & Planning
                                        </h3>
                                        <div
                                            className="mx-auto mt-4 h-1 w-32 rounded-full"
                                            style={{
                                                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                                            }}
                                        ></div>
                                        <p className="mx-auto mt-8 max-w-4xl text-base leading-relaxed text-white/90 md:text-lg">
                                            We co-create digital evolution strategies that are:
                                        </p>
                                    </div>

                                    {/* Modern Card Grid - 2x2 Layout */}
                                    <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                                        {[
                                            {
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                ),
                                                title: 'People-First',
                                                description: 'People-first, grounded in behavioural science',
                                                gradient: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
                                            },
                                            {
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                    </svg>
                                                ),
                                                title: 'Bottom-Up',
                                                description: 'Bottom-up, informed by frontline realities and insights',
                                                gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                                            },
                                            {
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                ),
                                                title: 'Culturally Aware',
                                                description: 'Culturally aware, recognising where resistance lives and where change can thrive',
                                                gradient: 'linear-gradient(135deg, #A78BFA, #9333EA)',
                                            },
                                            {
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                ),
                                                title: 'Flexible',
                                                description: 'Aligned with your operational goals, but flexible to real-world constraints',
                                                gradient: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                            },
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="group relative overflow-hidden rounded-2xl p-8 transition-all hover:scale-[1.02] hover:shadow-2xl"
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    backdropFilter: 'blur(10px)',
                                                }}
                                            >
                                                {/* Hover Gradient Overlay */}
                                                <div
                                                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                    style={{
                                                        background: item.gradient,
                                                        mixBlendMode: 'overlay',
                                                    }}
                                                ></div>

                                                {/* Content */}
                                                <div className="relative z-10">
                                                    {/* Icon Badge */}
                                                    <div
                                                        className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                                                        style={{
                                                            background: item.gradient,
                                                            boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                                                        }}
                                                    >
                                                        {item.icon}
                                                    </div>

                                                    {/* Title & Description */}
                                                    <h4 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-base leading-relaxed text-white/80 md:text-lg">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                {/* Decorative Corner Glow */}
                                                <div
                                                    className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                                                    style={{
                                                        background: item.gradient,
                                                    }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Training & Workshops - Modern Hexagonal/Arrow Design */}
                        <div className="relative mb-24">
                            <div className="relative">
                                {/* Title Section */}
                                <div className="mb-12 text-center">
                                    <h3 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                                        Training & Workshops
                                    </h3>
                                    <div
                                        className="mx-auto mt-4 h-1 w-32 rounded-full"
                                        style={{
                                            background: 'linear-gradient(to right, #8B5CF6, #9333EA)',
                                        }}
                                    ></div>
                                    <p className="mx-auto mt-8 max-w-4xl text-base leading-relaxed text-white/90 md:text-lg">
                                        We design high-impact sessions for leadership teams, HR, and frontline staff covering:
                                    </p>
                                </div>

                                {/* Modern Flow Layout with Arrow Connections */}
                                <div className="relative">
                                    {/* Connection Lines (on desktop) */}
                                    <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
                                         style={{
                                             background: 'linear-gradient(to bottom, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))',
                                         }}>
                                    </div>

                                    {/* Items in Vertical Flow with Alternating Sides */}
                                    <div className="relative space-y-8">
                                        {[
                                            {
                                                title: 'Future Skills',
                                                description: 'Future Skills for the Digital Age',
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                ),
                                                gradient: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
                                            },
                                            {
                                                title: 'Psychological Safety',
                                                description: 'Psychological Safety & Inclusive Cultures',
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                ),
                                                gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                                            },
                                            {
                                                title: 'Cognitive Bias',
                                                description: 'Cognitive Bias in Tech Adoption',
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                    </svg>
                                                ),
                                                gradient: 'linear-gradient(135deg, #A78BFA, #9333EA)',
                                            },
                                            {
                                                title: 'Leading Through Change',
                                                description: 'Leading Through Uncertainty & Change',
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                    </svg>
                                                ),
                                                gradient: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                            },
                                            {
                                                title: 'Neurodiversity',
                                                description: 'Neurodiversity as Strategic Advantage',
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                ),
                                                gradient: 'linear-gradient(135deg, #8B5CF6, #9333EA)',
                                            },
                                        ].map((item, index) => {
                                            const isEven = index % 2 === 0;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`relative flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                                >
                                                    {/* Left/Right Card */}
                                                    <div
                                                        className="group relative flex-1 overflow-hidden rounded-2xl p-6 transition-all hover:scale-105 md:p-8"
                                                        style={{
                                                            background: 'rgba(255, 255, 255, 0.05)',
                                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                                            backdropFilter: 'blur(10px)',
                                                        }}
                                                    >
                                                        {/* Hover Gradient */}
                                                        <div
                                                            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                            style={{
                                                                background: item.gradient,
                                                                mixBlendMode: 'overlay',
                                                            }}
                                                        ></div>

                                                        <div className="relative z-10 flex items-center gap-6">
                                                            {/* Icon Circle */}
                                                            <div
                                                                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                                                                style={{
                                                                    background: item.gradient,
                                                                    boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                                                                }}
                                                            >
                                                                {item.icon}
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-1">
                                                                <h4 className="mb-2 text-xl font-bold text-white md:text-2xl">
                                                                    {item.title}
                                                                </h4>
                                                                <p className="text-base leading-relaxed text-white/80 md:text-lg">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Center Connection Node (on desktop) */}
                                                    <div className="hidden h-16 w-16 shrink-0 items-center justify-center md:flex">
                                                        <div
                                                            className="h-12 w-12 rounded-full border-4 border-black transition-transform duration-300 group-hover:scale-110"
                                                            style={{
                                                                background: item.gradient,
                                                                boxShadow: '0 0 20px rgba(96, 165, 250, 0.6)',
                                                                borderColor: 'rgba(0, 0, 0, 0.3)',
                                                            }}
                                                        >
                                                            <div className="h-full w-full flex items-center justify-center">
                                                                <div className="h-4 w-4 rounded-full bg-white"></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Spacer for alternating layout */}
                                                    <div className="hidden w-0 flex-1 md:block"></div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Organisational Culture Change - Special Layout */}
                        <CultureChangeSection
                            noteText="All sessions are practical, engaging, and evidence-based blending behavioural science with lived industry realities."
                            title="ORGANISATIONAL CULTURE CHANGE"
                            description="We work with sectors where transformation is overdue but complex, including:"
                            sectors={[
                                { name: 'CONSTRUCTION', image: shutterstock682503142 },
                                { name: 'HEALTHCARE', image: sideViewWomanFaceScan },
                                { name: 'IT & ENGINEERING', image: shutterstock726121441 },
                                { name: 'EDUCATION', image: shutterstock1717584028 },
                            ]}
                            closingText="Our approach surfaces hidden talent, challenges outdated norms, and helps you evolve from the inside out."
                        />

                        {/* Strengths-Based Recruitment & Talent Design - Modern Design with Circular Images */}
                        <div className="relative mb-24">
                            <div className="relative">
                                {/* Main Container with Glass Morphism Effect */}
                                <div
                                    className="relative w-full rounded-3xl overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(147, 51, 234, 0.1))',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                    }}
                                >
                                    <div className="relative p-8 md:p-12 lg:p-16">
                                        {/* Title Section */}
                                        <div className="mb-12 text-center">
                                            <h3 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                                                Strengths-Based Recruitment
                                            </h3>
                                            <h4 className="mb-6 text-2xl font-semibold text-white/80 md:text-3xl">
                                                & Talent Design
                                            </h4>
                                            <p className="mx-auto max-w-4xl text-base leading-relaxed text-white/90 md:text-lg">
                                                We help you identify, attract, and retain the kinds of thinkers your future needs — especially those overlooked by traditional hiring. We support internal HR teams and external recruiters to:
                                            </p>
                                        </div>

                                        {/* Content Grid with Circular Image Backgrounds */}
                                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                                            {[
                                                {
                                                    title: 'Spot Potential',
                                                    description: 'Spot potential, not just polish',
                                                    image: shutterstock1330833800,
                                                },
                                                {
                                                    title: 'Inclusive Design',
                                                    description: 'Design inclusive interview processes',
                                                    image: shutterstock1502881307,
                                                },
                                                {
                                                    title: 'Diverse Pipelines',
                                                    description: 'Build talent pipelines with diversity of thought at the core',
                                                    image: shutterstock1717584028,
                                                },
                                                {
                                                    title: 'Strategic Asset',
                                                    description: 'Position neurodivergent talent as a strategic asset, not a checkbox',
                                                    image: shutterstock2213352423,
                                                },
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative flex flex-col items-center text-center"
                                                >
                                                    {/* Circular Image Background */}
                                                    <div className="relative mb-6 h-48 w-48 md:h-56 md:w-56">
                                                        <div
                                                            className="absolute inset-0 rounded-full overflow-hidden border-4"
                                                            style={{
                                                                borderColor: 'rgba(96, 165, 250, 0.5)',
                                                                boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                                                            }}
                                                        >
                                                            <img
                                                                src={item.image}
                                                                alt={item.title}
                                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                            />
                                                            {/* Overlay Gradient */}
                                                            <div
                                                                className="absolute inset-0"
                                                                style={{
                                                                    background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))',
                                                                }}
                                                            ></div>
                                                        </div>
                                                        {/* Number Badge */}
                                                        <div
                                                            className="absolute -top-2 -right-2 h-12 w-12 rounded-full flex items-center justify-center font-bold text-white"
                                                            style={{
                                                                background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                                                boxShadow: '0 4px 16px rgba(96, 165, 250, 0.6)',
                                                            }}
                                                        >
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    {/* Content */}
                                                    <h5 className="mb-3 text-xl font-bold text-white md:text-2xl">
                                                        {item.title}
                                                    </h5>
                                                    <p className="text-sm leading-relaxed text-white/80 md:text-base">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Workforce Interventions & Programmes - Modern Card Design */}
                        <div className="relative mb-24">
                            <div className="relative">
                                {/* Background Glow */}
                                <div
                                    className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                                    style={{
                                        background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                    }}
                                ></div>

                                {/* Main Container */}
                                <div className="relative rounded-3xl p-8 md:p-12 lg:p-16" style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
                                    {/* Title Section */}
                                    <div className="mb-12 text-center">
                                        <div className="mb-4 inline-block">
                                            <h3 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                                                Workforce Interventions
                                            </h3>
                                            <div
                                                className="mx-auto mt-2 h-1 w-24 rounded-full"
                                                style={{
                                                    background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                                                }}
                                            ></div>
                                        </div>
                                        <h4 className="mb-6 text-2xl font-semibold text-white/80 md:text-3xl">
                                            & Programmes
                                        </h4>
                                        <p className="mx-auto max-w-4xl text-base leading-relaxed text-white/90 md:text-lg">
                                            We create bespoke people programmes that help your teams:
                                        </p>
                                    </div>

                                    {/* Modern Card Grid */}
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {[
                                            {
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                ),
                                                title: 'Navigate Change',
                                                description: 'Navigate change (digital, structural, cultural)',
                                                gradient: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
                                            },
                                            {
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                ),
                                                title: 'Increase Inclusion',
                                                description: 'Increase inclusion, belonging, and motivation',
                                                gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                                            },
                                            {
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                ),
                                                title: 'Ethical Growth',
                                                description: 'Align with ethical business growth goals',
                                                gradient: 'linear-gradient(135deg, #A78BFA, #9333EA)',
                                            },
                                            {
                                                icon: (
                                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                    </svg>
                                                ),
                                                title: 'Build Resilience',
                                                description: 'Build resilience and readiness for emerging roles (e.g. AI leads, UX collaborators, prompt engineers)',
                                                gradient: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                                            },
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="group relative overflow-hidden rounded-2xl p-8 transition-all hover:scale-105"
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    backdropFilter: 'blur(10px)',
                                                }}
                                            >
                                                {/* Hover Gradient Effect */}
                                                <div
                                                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                    style={{
                                                        background: item.gradient,
                                                        mixBlendMode: 'overlay',
                                                    }}
                                                ></div>

                                                {/* Content */}
                                                <div className="relative z-10">
                                                    {/* Icon */}
                                                    <div
                                                        className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
                                                        style={{
                                                            background: item.gradient,
                                                            boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                                                        }}
                                                    >
                                                        {item.icon}
                                                    </div>

                                                    {/* Title & Description */}
                                                    <h5 className="mb-3 text-xl font-bold text-white md:text-2xl">
                                                        {item.title}
                                                    </h5>
                                                    <p className="text-sm leading-relaxed text-white/80 md:text-base">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                {/* Decorative Corner */}
                                                <div
                                                    className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
                                                    style={{
                                                        background: item.gradient,
                                                    }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leadership Coaching - Special Layout */}
                        <LeadershipCoachingSection
                            title="LEADERSHIP COACHING"
                            description="We support senior leaders, boards, and transformation leads to:"
                            items={[
                                'Lead through complexity with clarity and empathy',
                                'Unpick fear, bias, and resistance to change',
                                'Develop psychologically safe, high-accountability cultures',
                                'Adapt their style to engage diverse, evolving workforces',
                            ]}
                            closingNote="All Coaching Is Rooted In Behavioural Science, Systems Thinking, And The Realities Of Organisational Life"
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </main>
    )
}

export default BusinessPsychologyConsultancy
