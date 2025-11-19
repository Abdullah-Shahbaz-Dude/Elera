import React, { useState } from 'react';
import Footer from '@/components/Footer/Footer';
import Newsletter from '@/components/Sections/Newsletter';
import {
  shutterstock1813285633,
  shutterstock2177507051,
  shutterstock2185008323,
  shutterstock2291668783,
  shutterstock2646062685,
  humanServicesImage,
} from '@/assets/images';

// Accordion component for expandable sections
interface AccordionItemProps {
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="group">
      <div
        className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
        style={{
          boxShadow: isExpanded
            ? '0 4px 20px rgba(96, 165, 250, 0.15)'
            : '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, rgba(96, 165, 250, 0.05), rgba(147, 51, 234, 0.05))',
          }}
        ></div>

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-bold text-base md:text-lg lg:text-xl text-white flex-1 leading-tight text-left">
              {title}
            </h3>
            <button
              onClick={onToggle}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                isExpanded ? 'text-white' : 'text-[#60A5FA] hover:text-white'
              }`}
              style={{
                background: isExpanded
                  ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(147, 51, 234, 0.2))'
                  : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isExpanded) {
                  e.currentTarget.style.background =
                    'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(147, 51, 234, 0.15))';
                }
              }}
              onMouseLeave={(e) => {
                if (!isExpanded) {
                  e.currentTarget.style.background = 'transparent';
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

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded
                ? 'max-h-[500px] opacity-100 mt-4'
                : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="pt-2">
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/80 text-left whitespace-pre-line">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Training Module Category Component (Accordion - for Digital Evolution)
interface TrainingModuleCategoryProps {
  title: string;
  modules: Array<{ title: string; description: string }>;
  expandedModules: Set<number>;
  onToggle: (index: number) => void;
}

const TrainingModuleCategory: React.FC<TrainingModuleCategoryProps> = ({
  title,
  modules,
  expandedModules,
  onToggle,
}) => {
  return (
    <div className="mb-16">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      <div className="mx-auto max-w-4xl">
        <ul className="space-y-3 md:space-y-4">
          {modules.map((module, index) => (
            <li key={index}>
              <AccordionItem
                title={module.title}
                content={module.description}
                isExpanded={expandedModules.has(index)}
                onToggle={() => onToggle(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Neurodiversity Category - Side-by-Side Preview Panel
interface NeurodiversityCategoryProps {
  title: string;
  modules: Array<{ title: string; description: string }>;
}

const NeurodiversityCategory: React.FC<NeurodiversityCategoryProps> = ({
  title,
  modules,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Map module titles to background images
  const getBackgroundImage = (index: number): string => {
    const imageMap: { [key: number]: string } = {
      0: shutterstock1813285633, // "Understanding Different Thinkers"
      1: shutterstock2177507051, // "Neurodiversity Strengths"
      2: shutterstock2185008323, // "Reasonable Adjustments That Unlock Performance"
      3: shutterstock2291668783, // "Matching Tasks to People's Natural Strengths"
      4: shutterstock2646062685, // "Unlocking Internal Talent Pipelines"
    };
    return imageMap[index] || shutterstock1813285633;
  };

  return (
    <div className="mb-16">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Module List - Left Side */}
          <div className="w-full lg:w-2/5 space-y-3 order-2 lg:order-1">
            {modules.map((module, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-full text-left rounded-xl border p-4 md:p-5 transition-all duration-300 ${
                  selectedIndex === index
                    ? 'border-[#60A5FA] bg-white/10 backdrop-blur-sm'
                    : 'border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 hover:bg-white/8'
                }`}
                style={{
                  boxShadow:
                    selectedIndex === index
                      ? '0 4px 20px rgba(96, 165, 250, 0.2)'
                      : '0 2px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                <h3
                  className={`font-bold text-base md:text-lg lg:text-xl leading-tight ${
                    selectedIndex === index ? 'text-white' : 'text-white/80'
                  }`}
                >
                  {module.title}
                </h3>
                {selectedIndex === index && (
                  <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Preview Panel - Right Side */}
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <div
              className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 transition-all duration-500 overflow-hidden"
              style={{
                boxShadow: '0 4px 20px rgba(96, 165, 250, 0.15)',
                minHeight: '300px',
                backgroundImage: `url(${getBackgroundImage(selectedIndex)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark Overlay for text readability */}
              <div
                className="absolute inset-0 rounded-xl transition-opacity duration-500"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                }}
              ></div>
              <div
                className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(96, 165, 250, 0.05), rgba(147, 51, 234, 0.05))',
                }}
              ></div>
              <div className="relative z-10">
                <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                  {modules[selectedIndex].title}
                </h3>
                <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                <p className="text-base leading-relaxed text-white/80 md:text-lg lg:text-xl whitespace-pre-line">
                  {modules[selectedIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wellbeing Category - Tabbed Interface
interface WellbeingCategoryProps {
  title: string;
  modules: Array<{ title: string; description: string }>;
}

const WellbeingCategory: React.FC<WellbeingCategoryProps> = ({
  title,
  modules,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="mb-16">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      <div className="mx-auto max-w-5xl">
        {/* Tab Buttons */}
        <div className="mb-6 flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4">
          {modules.map((module, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-sm lg:text-base transition-all duration-300 ${
                activeTab === index
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`}
              style={{
                background:
                  activeTab === index
                    ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))'
                    : 'rgba(255, 255, 255, 0.05)',
                border:
                  activeTab === index
                    ? '1px solid rgba(96, 165, 250, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  activeTab === index
                    ? '0 4px 20px rgba(96, 165, 250, 0.2)'
                    : '0 2px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              <span className="line-clamp-2 text-center">{module.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 transition-all duration-500"
          style={{
            boxShadow: '0 4px 20px rgba(96, 165, 250, 0.15)',
            minHeight: '200px',
          }}
        >
          <div
            className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(135deg, rgba(96, 165, 250, 0.05), rgba(147, 51, 234, 0.05))',
            }}
          ></div>
          <div className="relative">
            <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              {modules[activeTab].title}
            </h3>
            <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
            <p className="text-base leading-relaxed text-white/80 md:text-lg lg:text-xl whitespace-pre-line">
              {modules[activeTab].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Leadership Category - Timeline/Stepper Layout
interface LeadershipCategoryProps {
  title: string;
  modules: Array<{ title: string; description: string }>;
}

const LeadershipCategory: React.FC<LeadershipCategoryProps> = ({
  title,
  modules,
}) => {
  // Initialize with all modules expanded (non-collapsible)

  return (
    <div className="mb-16">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      <div className="mx-auto max-w-4xl">
        <div
          className="relative rounded-2xl p-6 md:p-8 lg:p-10 transition-all duration-500 overflow-hidden"
          style={{
            backgroundImage: `url(${shutterstock2185008323})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark Overlay for text readability */}
          <div
            className="absolute inset-0 rounded-2xl transition-opacity duration-500"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            }}
          ></div>

          <div className="relative z-10">
            {/* Timeline Line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block"
              style={{
                background:
                  'linear-gradient(to bottom, #60A5FA, #9333EA, #60A5FA)',
                opacity: 0.3,
              }}
            ></div>

            {/* Timeline Steps */}
            <div className="space-y-8">
              {modules.map((module, index) => {
                const isLast = index === modules.length - 1;

                return (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Step Indicator */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#60A5FA] bg-white/10 transition-all duration-300"
                        style={{
                          boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
                        }}
                      >
                        <div
                          className="h-3 w-3 rounded-full bg-[#60A5FA] transition-all duration-300"
                          style={{
                            boxShadow: '0 0 10px rgba(96, 165, 250, 0.6)',
                          }}
                        ></div>
                      </div>
                      {!isLast && (
                        <div
                          className="absolute left-1/2 top-16 h-8 w-0.5 -translate-x-1/2 md:hidden"
                          style={{
                            background:
                              'linear-gradient(to bottom, #60A5FA, #9333EA)',
                            opacity: 0.3,
                          }}
                        ></div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
                        {module.title}
                      </h3>
                      <div className="mt-4 opacity-100">
                        <div
                          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-6"
                          style={{
                            boxShadow: '0 4px 20px rgba(96, 165, 250, 0.15)',
                          }}
                        >
                          <p className="text-base leading-relaxed text-white/80 md:text-lg whitespace-pre-line">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PsychologyBasedTrainingAndMentoring = () => {
  // State for expanded accordions
  const [expandedDigitalEvolution, setExpandedDigitalEvolution] = useState<
    Set<number>
  >(new Set());
  const [expandedAccessMethods, setExpandedAccessMethods] = useState<
    Set<number>
  >(new Set());

  const toggleModule = (
    setter: React.Dispatch<React.SetStateAction<Set<number>>>,
    index: number
  ) => {
    setter((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Training Modules Data
  const digitalEvolutionModules = [
    {
      title:
        'Preparing Your Workforce for the Future of Work & Digital Evolution',
      description:
        'Helps staff understand how AI, automation and new technologies will change work and which of their existing strengths will help them adapt.',
    },
    {
      title: 'Bottom-Up Approaches to Digital Evolution',
      description:
        'Shows organisations how to involve staff in shaping digital change so new systems are understood, accepted and used.',
    },
    {
      title: 'Overcoming Bias That Blocks Digital Transformation',
      description:
        'Helps people recognise automatic habits such as risk-aversion or reverting to old tools, which quietly slow progress.',
    },
    {
      title: 'Building Digital Confidence',
      description:
        'Supports employees to take manageable steps with new digital tools, improving uptake and reducing fear.',
    },
    {
      title: 'Communicating Clearly During Change',
      description:
        'Strengthens the ability to explain new systems, expectations and updates without causing confusion or overwhelm.',
    },
    {
      title: 'Supporting Change Without Overwhelming People',
      description: '',
    },
  ];

  const neurodiversityModules = [
    {
      title: 'Understanding Different Thinkers',
      description:
        'Understanding the psychology on how people focus, process information and solve problems differently enabling better teamwork and fewer misunderstandings.',
    },
    {
      title: 'Neurodiversity Strengths',
      description:
        'Shows how the strengths of neurodivergent employees can drive innovation, accuracy and digital adoption.',
    },
    {
      title: 'Reasonable Adjustments That Unlock Performance',
      description:
        'Demonstrates how small, practical changes can significantly improve productivity and wellbeing reframing adjustments as performance enablers.',
    },
    {
      title: "Matching Tasks to People's Natural Strengths",
      description:
        'Helps managers understand how to allocate work in ways that improve performance, consistency and motivation.',
    },
    {
      title: 'Unlocking Internal Talent Pipelines',
      description:
        'Shows organisations how to identify future talent using the strengths and patterns revealed in the Insight Engines.',
    },
  ];

  const wellbeingModules = [
    {
      title: 'Creating Open, Safe Teams Where People Speak Up',
      description:
        'Builds trust and psychological safety so people feel able to ask questions, raise issues and share ideas without fear.',
    },
    {
      title: 'Managing Burnout, Stress & Energy Levels',
      description:
        'Helps staff and managers understand stress patterns, emotional triggers and burnout risks — improving consistency, resilience and wellbeing.',
    },
  ];

  const leadershipModules = [
    {
      title: 'Developing Managers to Lead Different Thinkers',
      description:
        'Provides practical tools for supporting diverse working styles, reducing overwhelm and improving fairness in teams.',
    },
    {
      title: 'Strategic Leadership for Digital Transformation',
      description:
        'Helps boards and senior leaders understand workforce psychology, make informed decisions and avoid costly digital mistakes.',
    },
    {
      title: 'One-to-One Leadership Mentoring & Psychological Support',
      description:
        'Helping leaders think more clearly, regulate stress and communicate with greater impact.',
    },
  ];

  // Access Methods Data
  const accessMethods = [
    {
      title: 'Personalised Online Learning',
      description:
        'Individuals complete the training online via the ELARA platform at their own pace',
    },
    {
      title: 'Team Development Days',
      description:
        'Teams take modules together to improve communication, digital readiness and team cohesion.',
    },
    {
      title: 'Leadership Mentoring & Boardroom Support',
      description:
        'Executives receive tailored psychological insight and mentoring aligned with their Mind Sync findings.',
    },
    {
      title: 'Away-Days & Immersive Capability Events',
      description:
        'Clusters of modules can be combined into powerful off-site team or leadership events.',
    },
    {
      title: 'Full Organisational Development Programmes',
      description:
        'Elara can design 3-, 6- or 12-month development programmes using combinations of the cluster modules.',
    },
  ];

  // Anticipated Impact Data
  const impactOutcomes = [
    'Future-Ready Strategic Outcomes',
    'Stronger Digital Evolution Across the Organisation',
    'Whole-Organisation Buy-In to Transformation',
    'Leadership Equipped for the Next Era of Work',
    'Integration Between Departments and Functions',
    'Harnessing Neurodiversity as a Source of Competitive Advantage',
    'More Open and Safer Working Environments',
    'Reduced Burnout and More Sustainable Performance',
    'Faster, Smoother Organisational Change',
    'A More Confident, Engaged and Future-Focused Workforce',
    'Modern Talent Mobility and Better Retention',
  ];

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

      {/* Dark Background Section */}
      <div className="relative bg-black pt-40 pb-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-[1960px]">
            {/* Hero Section */}
            <div className="mb-16">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="relative">
                  <div
                    className="relative h-full w-full rounded-3xl p-[3px]"
                    style={{
                      background:
                        'linear-gradient(to right, #60A5FA, #A78BFA, #9333EA)',
                      boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)',
                    }}
                  >
                    <div
                      className="relative h-full w-full rounded-3xl p-8 backdrop-blur-sm"
                      style={{
                        background: 'rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      <div className="space-y-6">
                        <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                          Psychology Based Training and Mentoring
                        </h1>
                        <p className="text-lg leading-relaxed text-white md:text-xl">
                          Training, mentoring, leadership development
                        </p>
                        <p className="text-lg leading-relaxed text-white md:text-xl">
                          Education and insight that accelerates digital
                          maturity, strengthens organisational thinking, and
                          builds the psychological capability needed for the
                          next decade of work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative h-full min-h-[500px] w-full rounded-3xl p-[4px]">
                    <div
                      className="relative h-full w-full overflow-hidden rounded-3xl"
                      style={{
                        background: 'transparent',
                        borderRadius: '2.5rem 1.5rem 1.5rem 1.5rem',
                      }}
                    >
                      <img
                        src={humanServicesImage}
                        alt="Psychology Based Training and Mentoring"
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

            {/* Training Modules Section */}
            <div className="mb-16">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  TRAINING Modules
                </h2>
              </div>

              {/* Digital Evolution */}
              <TrainingModuleCategory
                title="DIGITAL EVOLUTION"
                modules={digitalEvolutionModules}
                expandedModules={expandedDigitalEvolution}
                onToggle={(index) =>
                  toggleModule(setExpandedDigitalEvolution, index)
                }
              />

              {/* Separator Line */}
              <div
                className="my-16 h-[3px] w-full opacity-50"
                style={{
                  background:
                    'linear-gradient(to right, transparent, #60A5FA, transparent)',
                }}
              ></div>

              {/* Utilising Neurodiversity */}
              <NeurodiversityCategory
                title="UTILISING NEURODIVERSITY FOR STRATEGIC ADVANTAGE"
                modules={neurodiversityModules}
              />

              {/* Separator Line */}
              <div
                className="my-16 h-[3px] w-full opacity-50"
                style={{
                  background:
                    'linear-gradient(to right, transparent, #60A5FA, transparent)',
                }}
              ></div>

              {/* Wellbeing & Psychological Safety */}
              <WellbeingCategory
                title="WELLBEING & PSYCHOLOGICAL SAFETY"
                modules={wellbeingModules}
              />

              {/* Separator Line */}
              <div
                className="my-16 h-[3px] w-full opacity-50"
                style={{
                  background:
                    'linear-gradient(to right, transparent, #60A5FA, transparent)',
                }}
              ></div>

              {/* Leadership & Psychoeducation */}
              <LeadershipCategory
                title="LEADERSHIP & PSYCHOEDUCATION"
                modules={leadershipModules}
              />
            </div>

            {/* Separator Line */}
            <div className="my-16 h-[3px] w-full bg-gradient-to-r from-transparent via-primary-blue-accent to-transparent opacity-50"></div>

            {/* How Organisations Can Access Training Section */}
            <TrainingModuleCategory
              title="HOW ORGANISATIONS CAN ACCESS TRAINING"
              modules={accessMethods}
              expandedModules={expandedAccessMethods}
              onToggle={(index) =>
                toggleModule(setExpandedAccessMethods, index)
              }
            />

            {/* Separator Line */}
            <div className="my-16 h-[3px] w-full bg-gradient-to-r from-transparent via-primary-blue-accent to-transparent opacity-50"></div>

            {/* Anticipated Impact Section */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[rgba(96,165,250,0.1)] via-[rgba(167,139,250,0.1)] to-[rgba(147,51,234,0.1)] blur-3xl"></div>
              <div
                className="relative rounded-3xl p-[2px]"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(96, 165, 250, 0.4), rgba(167, 139, 250, 0.4), rgba(147, 51, 234, 0.4))',
                  boxShadow:
                    '0 8px 32px rgba(96, 165, 250, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)',
                }}
              >
                <div
                  className="relative rounded-3xl p-8 md:p-12 backdrop-blur-md"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.85))',
                  }}
                >
                  <div className="mb-8 flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                        boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      <svg
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white md:text-3xl tracking-tight">
                        ANTICIPATED IMPACT FOR ORGANISATIONS
                      </h4>
                      <div className="mt-1 h-1 w-20 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {impactOutcomes.map((outcome, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-lg p-4"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                        <p className="text-base leading-relaxed text-white/90 md:text-lg">
                          {outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(96,165,250,0.5)] to-transparent"></div>
                    <div className="h-2 w-2 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#9333EA]"></div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(147,51,234,0.5)] to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default PsychologyBasedTrainingAndMentoring;
