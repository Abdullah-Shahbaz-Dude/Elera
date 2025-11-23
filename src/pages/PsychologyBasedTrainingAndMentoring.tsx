import React, { useState } from 'react';
import Footer from '@/components/Footer/Footer';
import {
  shutterstock1813285633,
  shutterstock2177507051,
  shutterstock2185008323,
  shutterstock2291668783,
  shutterstock2646062685,
  sideViewWomanFaceScan,
} from '@/assets/images';

// Feature Card Component with Hover Reveal
interface FeatureCardProps {
  title: string;
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
  moduleNumber?: number;
  subModuleIndex?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  isExpanded,
  onToggle,
  subModuleIndex,
}) => {
  return (
    <div className="group h-full">
      {/* Card Container */}
      <div
        className="relative w-full h-full rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-300 text-left hover:scale-[1.02] flex flex-col cursor-pointer"
        onClick={onToggle}
        style={{
          background:
            'linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(147, 51, 234, 0.1))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: isExpanded
            ? '0 4px 20px rgba(96, 165, 250, 0.3)'
            : '0 4px 20px rgba(96, 165, 250, 0.15)',
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            background:
              'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(147, 51, 234, 0.15))',
            opacity: isExpanded ? 1 : 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Module Number - Centered Above Title */}
          {subModuleIndex !== undefined && (
            <div className="text-center mb-2 sm:mb-3">
              <span className="text-[#60A5FA] text-sm sm:text-base md:text-lg font-semibold">
                Module {subModuleIndex + 1}
              </span>
            </div>
          )}
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            {/* Title */}
            <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight flex-1">
              {title}
            </h3>
            {/* Toggle Icon */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="flex-shrink-0 mt-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 ${
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

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded
                ? 'max-h-[500px] opacity-100 mt-3 sm:mt-4'
                : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <p className="text-sm sm:text-base md:text-lg text-white/90 pt-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Accordion component for expandable sections
interface AccordionItemProps {
  title: string;
  content: string;
  icon?: string;
  image?: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  icon,
  image,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="group">
      <div
        className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 sm:p-4 md:p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10 overflow-hidden"
        style={{
          boxShadow: isExpanded
            ? '0 4px 20px rgba(96, 165, 250, 0.15)'
            : '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Background Image */}
        {image && (
          <div
            className="absolute inset-0 rounded-xl opacity-20 transition-opacity duration-300"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        <div
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, rgba(96, 165, 250, 0.05), rgba(147, 51, 234, 0.05))',
          }}
        ></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {icon && (
                <span className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">
                  {icon}
                </span>
              )}
              <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white leading-tight text-left">
                {title}
              </h3>
            </div>
            <button
              onClick={onToggle}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap shrink-0 min-h-[44px] ${
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
              <span className="hidden sm:inline">
                {isExpanded ? 'Read less' : 'Read more'}
              </span>
              <span className="sm:hidden">{isExpanded ? 'Less' : 'More'}</span>
              <svg
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
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
                ? 'max-h-[500px] opacity-100 mt-3 sm:mt-4'
                : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="pt-2">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/80 text-left whitespace-pre-line">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Training Module Category Component (Feature Cards Grid)
interface TrainingModuleCategoryProps {
  title: string;
  modules: Array<{ title: string; description: string }>;
  moduleNumber?: number;
}

const TrainingModuleCategory: React.FC<TrainingModuleCategoryProps> = ({
  title,
  modules,
  moduleNumber,
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    new Set()
  );

  const toggleModule = (index: number) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="mb-12 sm:mb-16">
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
          {title}
        </h2>
      </div>
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-stretch">
          {modules.map((module, index) => (
            <FeatureCard
              key={index}
              title={module.title}
              description={module.description}
              isExpanded={expandedModules.has(index)}
              onToggle={() => toggleModule(index)}
              moduleNumber={moduleNumber}
              subModuleIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Accordion List Component for Access Training
interface AccordionListProps {
  title: string;
  modules: Array<{ title: string; description: string; image?: string }>;
  expandedModules: Set<number>;
  onToggle: (index: number) => void;
}

const AccordionList: React.FC<AccordionListProps> = ({
  title,
  modules,
  expandedModules,
  onToggle,
}) => {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
          {title}
        </h2>
      </div>
      <div className="mx-auto max-w-4xl w-full">
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          {modules.map((module, index) => (
            <AccordionItem
              key={index}
              title={module.title}
              content={module.description}
              image={module.image}
              isExpanded={expandedModules.has(index)}
              onToggle={() => onToggle(index)}
            />
          ))}
        </div>
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
    <div className="mb-12 sm:mb-16">
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
          {title}
        </h2>
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Module List - Left Side */}
          <div className="w-full lg:w-2/5 space-y-2 sm:space-y-3 order-2 lg:order-1">
            {modules.map((module, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-full text-left rounded-xl border p-3 sm:p-4 md:p-5 transition-all duration-300 min-h-[60px] sm:min-h-[70px] ${
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
                  className={`font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-tight ${
                    selectedIndex === index ? 'text-white' : 'text-white/80'
                  }`}
                >
                  {module.title}
                </h3>
                {selectedIndex === index && (
                  <div className="mt-2 h-1 w-10 sm:w-12 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Preview Panel - Right Side */}
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <div
              className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-500 overflow-hidden"
              style={{
                boxShadow: '0 4px 20px rgba(96, 165, 250, 0.15)',
                minHeight: '200px',
              }}
            >
              <div
                className="absolute inset-0 rounded-xl transition-opacity duration-500"
                style={{
                  backgroundImage: `url(${getBackgroundImage(selectedIndex)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              {/* Dark Overlay for text readability */}
              <div
                className="absolute inset-0 rounded-xl transition-opacity duration-500"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
                <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {modules[selectedIndex].title}
                </h3>
                <div className="mb-3 sm:mb-4 h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/80 whitespace-pre-line">
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

  // Map module indices to background images
  const getBackgroundImage = (index: number): string => {
    const imageMap: { [key: number]: string } = {
      0: sideViewWomanFaceScan, // "Creating Open, Safe Teams Where People Speak Up"
      1: shutterstock1813285633, // "Managing Burnout, Stress & Energy Levels"
    };
    return imageMap[index] || sideViewWomanFaceScan;
  };

  return (
    <div className="mb-12 sm:mb-16">
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
          {title}
        </h2>
      </div>
      <div className="mx-auto max-w-5xl">
        {/* Tab Buttons */}
        <div className="mb-4 sm:mb-6 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
          {modules.map((module, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 min-h-[44px] ${
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
          className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-500 overflow-hidden"
          style={{
            boxShadow: '0 4px 20px rgba(96, 165, 250, 0.15)',
            minHeight: '180px',
          }}
        >
          <div
            className="absolute inset-0 rounded-xl transition-opacity duration-500"
            style={{
              backgroundImage: `url(${getBackgroundImage(activeTab)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Dark Overlay for text readability */}
          <div
            className="absolute inset-0 rounded-xl transition-opacity duration-500"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
            <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {modules[activeTab].title}
            </h3>
            <div className="mb-3 sm:mb-4 h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/80 whitespace-pre-line">
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
    <div className="mb-12 sm:mb-16">
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
          {title}
        </h2>
      </div>
      <div className="mx-auto w-full">
        <div
          className="relative rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-500 overflow-hidden"
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
              className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 hidden md:block"
              style={{
                background:
                  'linear-gradient(to bottom, #60A5FA, #9333EA, #60A5FA)',
                opacity: 0.3,
              }}
            ></div>

            {/* Timeline Steps */}
            <div className="space-y-6 sm:space-y-8">
              {modules.map((module, index) => {
                const isLast = index === modules.length - 1;

                return (
                  <div
                    key={index}
                    className="relative flex items-start gap-3 sm:gap-4 md:gap-6"
                  >
                    {/* Step Indicator */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full border-2 border-[#60A5FA] bg-white/10 transition-all duration-300"
                        style={{
                          boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
                        }}
                      >
                        <div
                          className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#60A5FA] transition-all duration-300"
                          style={{
                            boxShadow: '0 0 10px rgba(96, 165, 250, 0.6)',
                          }}
                        ></div>
                      </div>
                      {!isLast && (
                        <div
                          className="absolute left-1/2 top-12 sm:top-14 md:top-16 h-6 sm:h-8 w-0.5 -translate-x-1/2 md:hidden"
                          style={{
                            background:
                              'linear-gradient(to bottom, #60A5FA, #9333EA)',
                            opacity: 0.3,
                          }}
                        ></div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-1 sm:pt-2">
                      <h3 className="mb-2 text-lg sm:text-xl md:text-2xl font-bold text-white">
                        {module.title}
                      </h3>
                      <div className="mt-3 sm:mt-4 opacity-100">
                        <div
                          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 sm:p-4 md:p-6"
                          style={{
                            boxShadow: '0 4px 20px rgba(96, 165, 250, 0.15)',
                          }}
                        >
                          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/80 whitespace-pre-line">
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
  // State for which category is expanded (default to first tab)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    'digital-evolution'
  );

  // State for expanded accordions in Access Training section
  const [expandedAccessMethods, setExpandedAccessMethods] = useState<
    Set<number>
  >(new Set());

  const toggleAccessMethod = (index: number) => {
    setExpandedAccessMethods((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleCategoryExpand = (category: string) => {
    // Toggle: if same category is clicked again, collapse it
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const scrollToSection = (sectionId: string) => {
    // Small delay to ensure section is rendered
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 150; // Account for navbar height (90px-100px + margin)
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const handleFindOutMore = (category: string) => {
    // Expand the category if not already expanded
    if (expandedCategory !== category) {
      handleCategoryExpand(category);
    }
    // Scroll to the section
    scrollToSection(`${category}-section`);
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
      image: shutterstock1813285633,
    },
    {
      title: 'Team Development Days',
      description:
        'Teams take modules together to improve communication, digital readiness and team cohesion.',
      image: shutterstock2177507051,
    },
    {
      title: 'Leadership Mentoring & Boardroom Support',
      description:
        'Executives receive tailored psychological insight and mentoring aligned with their Mind Sync findings.',
      image: shutterstock2185008323,
    },
    {
      title: 'Away-Days & Immersive Capability Events',
      description:
        'Clusters of modules can be combined into powerful off-site team or leadership events.',
      image: shutterstock2291668783,
    },
    {
      title: 'Full Organisational Development Programmes',
      description:
        'Elara can design 3-, 6- or 12-month development programmes using combinations of the cluster modules.',
      image: shutterstock2646062685,
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
            {/* Training Packages Section */}
            <div id="training-packages-section" className="mb-16">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  Training Modules
                </h2>
              </div>

              {/* Tab Navigation - 4 Permanent Tabs */}
              <div className="mb-6 sm:mb-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {/* Digital Evolution Tab */}
                <button
                  type="button"
                  onClick={() => handleCategoryExpand('digital-evolution')}
                  className={`relative rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 transition-all duration-300 hover:scale-105 active:scale-95 min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[250px] flex flex-col justify-between ${
                    expandedCategory === 'digital-evolution'
                      ? 'scale-105'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    background:
                      expandedCategory === 'digital-evolution'
                        ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))'
                        : 'rgba(255, 255, 255, 0.05)',
                    border:
                      expandedCategory === 'digital-evolution'
                        ? '2px solid rgba(96, 165, 250, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow:
                      expandedCategory === 'digital-evolution'
                        ? '0 4px 20px rgba(96, 165, 250, 0.4)'
                        : '0 4px 20px rgba(96, 165, 250, 0.15)',
                  }}
                >
                  {shutterstock1813285633 && (
                    <div
                      className="absolute inset-0 rounded-xl opacity-30"
                      style={{
                        backgroundImage: `url(${shutterstock1813285633})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col h-full">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white text-center mb-2 sm:mb-3 leading-tight">
                        DIGITAL EVOLUTION
                      </h3>
                      <div
                        className="mx-auto h-1 w-12 sm:w-16 rounded-full mb-3 sm:mb-4"
                        style={{
                          background:
                            'linear-gradient(to right, #60A5FA, #9333EA)',
                        }}
                      />
                    </div>
                    <div className="mt-auto flex justify-center">
                      <button
                        type="button"
                        className="rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(96, 165, 250, 0.5), rgba(147, 51, 234, 0.5))',
                          boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFindOutMore('digital-evolution');
                        }}
                      >
                        Find out more
                      </button>
                    </div>
                  </div>
                </button>

                {/* Neurodiversity Tab */}
                <button
                  type="button"
                  onClick={() => handleCategoryExpand('neurodiversity')}
                  className={`relative rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 transition-all duration-300 hover:scale-105 active:scale-95 min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[250px] flex flex-col justify-between ${
                    expandedCategory === 'neurodiversity'
                      ? 'scale-105'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    background:
                      expandedCategory === 'neurodiversity'
                        ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))'
                        : 'rgba(255, 255, 255, 0.05)',
                    border:
                      expandedCategory === 'neurodiversity'
                        ? '2px solid rgba(96, 165, 250, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow:
                      expandedCategory === 'neurodiversity'
                        ? '0 4px 20px rgba(96, 165, 250, 0.4)'
                        : '0 4px 20px rgba(96, 165, 250, 0.15)',
                  }}
                >
                  {shutterstock2177507051 && (
                    <div
                      className="absolute inset-0 rounded-xl opacity-30"
                      style={{
                        backgroundImage: `url(${shutterstock2177507051})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col h-full">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white text-center mb-2 sm:mb-3 leading-tight">
                        NEURODIVERSITY
                      </h3>
                      <div
                        className="mx-auto h-1 w-12 sm:w-16 rounded-full mb-3 sm:mb-4"
                        style={{
                          background:
                            'linear-gradient(to right, #60A5FA, #9333EA)',
                        }}
                      />
                    </div>
                    <div className="mt-auto flex justify-center">
                      <button
                        type="button"
                        className="rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(96, 165, 250, 0.5), rgba(147, 51, 234, 0.5))',
                          boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFindOutMore('neurodiversity');
                        }}
                      >
                        Find out more
                      </button>
                    </div>
                  </div>
                </button>

                {/* Wellbeing Tab */}
                <button
                  type="button"
                  onClick={() => handleCategoryExpand('wellbeing')}
                  className={`relative rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 transition-all duration-300 hover:scale-105 active:scale-95 min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[250px] flex flex-col justify-between ${
                    expandedCategory === 'wellbeing'
                      ? 'scale-105'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    background:
                      expandedCategory === 'wellbeing'
                        ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))'
                        : 'rgba(255, 255, 255, 0.05)',
                    border:
                      expandedCategory === 'wellbeing'
                        ? '2px solid rgba(96, 165, 250, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow:
                      expandedCategory === 'wellbeing'
                        ? '0 4px 20px rgba(96, 165, 250, 0.4)'
                        : '0 4px 20px rgba(96, 165, 250, 0.15)',
                  }}
                >
                  {sideViewWomanFaceScan && (
                    <div
                      className="absolute inset-0 rounded-xl opacity-30"
                      style={{
                        backgroundImage: `url(${sideViewWomanFaceScan})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col h-full">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white text-center mb-2 sm:mb-3 leading-tight">
                        WELLBEING
                      </h3>
                      <div
                        className="mx-auto h-1 w-12 sm:w-16 rounded-full mb-3 sm:mb-4"
                        style={{
                          background:
                            'linear-gradient(to right, #60A5FA, #9333EA)',
                        }}
                      />
                    </div>
                    <div className="mt-auto flex justify-center">
                      <button
                        type="button"
                        className="rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(96, 165, 250, 0.5), rgba(147, 51, 234, 0.5))',
                          boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFindOutMore('wellbeing');
                        }}
                      >
                        Find out more
                      </button>
                    </div>
                  </div>
                </button>

                {/* Leadership Tab */}
                <button
                  type="button"
                  onClick={() => handleCategoryExpand('leadership')}
                  className={`relative rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 transition-all duration-300 hover:scale-105 active:scale-95 min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[250px] flex flex-col justify-between ${
                    expandedCategory === 'leadership'
                      ? 'scale-105'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    background:
                      expandedCategory === 'leadership'
                        ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))'
                        : 'rgba(255, 255, 255, 0.05)',
                    border:
                      expandedCategory === 'leadership'
                        ? '2px solid rgba(96, 165, 250, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow:
                      expandedCategory === 'leadership'
                        ? '0 4px 20px rgba(96, 165, 250, 0.4)'
                        : '0 4px 20px rgba(96, 165, 250, 0.15)',
                  }}
                >
                  {shutterstock2185008323 && (
                    <div
                      className="absolute inset-0 rounded-xl opacity-30"
                      style={{
                        backgroundImage: `url(${shutterstock2185008323})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col h-full">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white text-center mb-2 sm:mb-3 leading-tight">
                        LEADERSHIP
                      </h3>
                      <div
                        className="mx-auto h-1 w-12 sm:w-16 rounded-full mb-3 sm:mb-4"
                        style={{
                          background:
                            'linear-gradient(to right, #60A5FA, #9333EA)',
                        }}
                      />
                    </div>
                    <div className="mt-auto flex justify-center">
                      <button
                        type="button"
                        className="rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(96, 165, 250, 0.5), rgba(147, 51, 234, 0.5))',
                          boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFindOutMore('leadership');
                        }}
                      >
                        Find out more
                      </button>
                    </div>
                  </div>
                </button>
              </div>

              {/* Tab Content - Shows below tabs */}
              <div className="mt-8">
                {/* Digital Evolution Content */}
                {expandedCategory === 'digital-evolution' && (
                  <div id="digital-evolution-section">
                    <TrainingModuleCategory
                      title="DIGITAL EVOLUTION"
                      modules={digitalEvolutionModules}
                      moduleNumber={1}
                    />
                  </div>
                )}

                {/* Neurodiversity Content */}
                {expandedCategory === 'neurodiversity' && (
                  <div id="neurodiversity-section">
                    <NeurodiversityCategory
                      title="UTILISING NEURODIVERSITY FOR STRATEGIC ADVANTAGE"
                      modules={neurodiversityModules}
                    />
                  </div>
                )}

                {/* Wellbeing Content */}
                {expandedCategory === 'wellbeing' && (
                  <div id="wellbeing-section">
                    <WellbeingCategory
                      title="WELLBEING & PSYCHOLOGICAL SAFETY"
                      modules={wellbeingModules}
                    />
                  </div>
                )}

                {/* Leadership Content */}
                {expandedCategory === 'leadership' && (
                  <div id="leadership-section">
                    <LeadershipCategory
                      title="LEADERSHIP & PSYCHOEDUCATION"
                      modules={leadershipModules}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Separator Line */}
            <div className="my-12 sm:my-16 h-[2px] sm:h-[3px] w-full bg-gradient-to-r from-transparent via-primary-blue-accent to-transparent opacity-50"></div>

            {/* How Organisations Can Access Training Section */}
            <AccordionList
              title="Training Delivery Options"
              modules={accessMethods}
              expandedModules={expandedAccessMethods}
              onToggle={toggleAccessMethod}
            />

            {/* Separator Line */}
            <div className="my-12 sm:my-16 h-[2px] sm:h-[3px] w-full bg-gradient-to-r from-transparent via-primary-blue-accent to-transparent opacity-50"></div>

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
                  className="relative rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-md overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.85))',
                    backgroundImage: `url(${shutterstock2646062685})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Dark Overlay for text readability */}
                  <div
                    className="absolute inset-0 rounded-3xl transition-opacity duration-500"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }}
                  ></div>
                  <div className="relative z-10">
                    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div
                        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl flex-shrink-0"
                        style={{
                          background:
                            'linear-gradient(135deg, #60A5FA, #9333EA)',
                          boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
                        }}
                      >
                        <svg
                          className="h-6 w-6 sm:h-8 sm:w-8 text-white"
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
                        <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                          ANTICIPATED IMPACT FOR ORGANISATIONS
                        </h4>
                        <div className="mt-1 h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                      {impactOutcomes.map((outcome, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 sm:gap-3 rounded-lg p-3 sm:p-4"
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
                            {outcome}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
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
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default PsychologyBasedTrainingAndMentoring;
