import React, { useState } from 'react';
import Footer from '@/components/Footer/Footer';
import { shutterstock2513386035 } from '@/assets/images';

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
                ? 'max-h-none opacity-100 mt-4'
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

// Service Section Component
interface ServiceSectionProps {
  title: string;
  subtitle: string;
  whatItIs: string;
  howItWorksIntro: string;
  howItWorksItems: string[];
  whatYouGetItems: Array<{ title: string; content: string }>;
  caseStudyTitle: string;
  caseStudySubtitle: string;
  caseStudySections: Array<{ id: string; title: string; content: string }>;
  heroImage?: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  subtitle,
  whatItIs,
  howItWorksIntro,
  howItWorksItems,
  whatYouGetItems,
  caseStudyTitle,
  caseStudySubtitle,
  caseStudySections,
  heroImage = shutterstock2513386035,
}) => {
  const [expandedWhatYouGet, setExpandedWhatYouGet] = useState<Set<number>>(
    new Set()
  );
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<Set<string>>(
    new Set()
  );

  // Find challenge section and filter it out from accordion items
  const challengeSection = caseStudySections.find(
    (section) => section.id === 'challenge'
  );
  const accordionSections = caseStudySections.filter(
    (section) => section.id !== 'challenge'
  );

  const toggleWhatYouGet = (index: number) => {
    setExpandedWhatYouGet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleCaseStudy = (section: string) => {
    setExpandedCaseStudy((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  return (
    <div className="relative mb-32">
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
                    {title}
                  </h1>
                  <p className="text-lg leading-relaxed text-white md:text-xl">
                    {subtitle}
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
                  src={heroImage}
                  alt={title}
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

      {/* What It Is Section */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            What It Is
          </h2>
        </div>
        <div className="mx-auto max-w-4xl">
          <p className="text-lg leading-relaxed text-white/90 md:text-xl text-center">
            {whatItIs}
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            How It Works
          </h2>
        </div>
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-lg leading-relaxed text-white/90 md:text-xl">
            {howItWorksIntro}
          </p>
          <ul className="space-y-4 pl-6">
            {howItWorksItems.map((item, index) => (
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

      {/* Separator Line */}
      <div className="my-16 h-[3px] w-full bg-gradient-to-r from-transparent via-primary-blue-accent to-transparent opacity-50"></div>

      {/* What You Get Section */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            What Organisations Receive
          </h2>
        </div>
        <div className="mx-auto max-w-4xl">
          <ul className="space-y-3 md:space-y-4">
            {whatYouGetItems.map((item, index) => (
              <li key={index}>
                <AccordionItem
                  title={item.title}
                  content={item.content}
                  isExpanded={expandedWhatYouGet.has(index)}
                  onToggle={() => toggleWhatYouGet(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Separator Line */}
      <div className="my-16 h-[3px] w-full bg-gradient-to-r from-transparent via-primary-blue-accent to-transparent opacity-50"></div>

      {/* Case Study Section */}
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white md:text-3xl tracking-tight">
                  {caseStudyTitle}
                </h4>
                <div className="mt-1 h-1 w-20 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
              </div>
            </div>
            <div className="mb-8">
              <h5 className="text-xl font-semibold text-white md:text-2xl">
                {caseStudySubtitle}
              </h5>
            </div>
            {challengeSection && (
              <div className="mb-8">
                <p className="text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-line">
                  {challengeSection.content}
                </p>
              </div>
            )}
            <div className="space-y-4">
              {accordionSections.map((section) => (
                <AccordionItem
                  key={section.id}
                  title={section.title}
                  content={section.content}
                  isExpanded={expandedCaseStudy.has(section.id)}
                  onToggle={() => toggleCaseStudy(section.id)}
                />
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
  );
};

const RevealHiddenBrilliance = () => {
  const revealHiddenBrillianceData: ServiceSectionProps = {
    title: 'Discover the capability already inside your organisation',
    subtitle:
      'Reveal Hidden Brilliance is a psychology led insight engine that helps organisations see how their people naturally think, solve problems, and engage with digital systems / transformation.',
    heroImage: shutterstock2513386035,
    whatItIs:
      'Some organisations may assume innovation, data, or digital capability must be hired externally. Reveal Hidden Brilliance shows you what already exists inside your',
    howItWorksIntro:
      'Employees complete a short, structured digital assessment that identifies:',
    howItWorksItems: [
      'Hidden cognitive strengths that may show up outside work but not inside work',
      'Digital, data, systems, and problem-solving capability that is not currently being used',
      'Where strengths are visible, partially hidden, or actively held back',
      'Which individuals have natural potential for innovation, efficiency, or technical contribution, regardless of job title',
    ],
    whatYouGetItems: [
      {
        title: 'Individual Insight Reports',
        content:
          'Each employee receives a report that explains:\n• Their dominant thinking styles (analytical, creative, practical, or hybrid)\n• Where these strengths are visible, balanced, or hidden\n• Their digital confidence and capability signals\n• Where they are likely under-utilised or misaligned\n• Practical suggestions for development, contribution, or role expansion',
      },
      {
        title: 'Department & Organisation Dashboards',
        content:
          'At team or organisational level, leaders receive:\n• Visibility of where digital and innovation potential actually sits\n• Clear signals of capability gaps vs perception gaps\n• Evidence-based insight to support redeployment, upskilling, or internal progression\n• Potential business impact aligned to digital transformation strategies',
      },
    ],
    caseStudyTitle: 'Example Use Case',
    caseStudySubtitle:
      'Revealing Hidden Digital Capability in a Construction Apprenticeship Programme',
    caseStudySections: [
      {
        id: 'challenge',
        title: 'The Challenge',
        content:
          'A construction company used Reveal Hidden Brilliance as part of an internal review of its early-career workforce. The aim was not to "find high performers", but to better understand how people in operational roles naturally think, solve problems, and engage with technology.\n\nOne participant was a forklift truck driver on an apprenticeship programme, working full-time on site.\n\nAt work, he was known as reliable, quiet, and very literal in his approach. He followed instructions precisely, completed tasks as expected, and did not challenge processes or suggest changes. There were no performance issues but also no indication of interest or capability beyond his role.',
      },
      {
        id: 'findings',
        title: 'What the Assessment Revealed',
        content:
          'When comparing how he thought outside work versus inside work, Reveal Hidden Brilliance showed a very different picture.\n\nOutside work, the assessment flagged strong indicators for:\n• Analytical thinking\n• Systems and logic-based problem solving\n• Data structuring and pattern recognition\n• Experimentation with digital tools and algorithms\n\nIn his free time, he had been:\n• Teaching himself basic programming\n• Building complex algorithms and data models\n• Experimenting with automation and data workflows\n\nNone of this had ever been shared at work.\n\nFollow-up conversation revealed why this capability had never surfaced:\n• Due to his neurodiversity, he interpreted his role very literally\n• He believed his responsibility was to "do the job as written", not suggest improvements\n• He had never been asked about ideas, interests, or skills beyond the forklift role\n• Past experience had taught him that sticking strictly to the task was safest\n\nFrom his perspective, digital ideas simply weren\'t relevant to his job so he kept them to himself.',
      },
      {
        id: 'solution',
        title: 'What Happened Next',
        content:
          'After reviewing the Reveal Hidden Brilliance report, the organisation did something simple but critical:\n\nThey asked him directly about his thinking, his interests, and whether he had ideas for improving how digital and data were used across the business.\n\nOnce invited, he shared:\n• Practical ideas for improving on-site data capture\n• Suggestions for linking operational data with reporting systems\n• Early concepts for automating repetitive manual processes\n\nRather than remaining in a role where his strengths stayed hidden, he was:\n• Offered a role within the data and digital team\n• Supported through structured development and mentoring\n• Given space to apply his existing skills in a business context',
      },
      {
        id: 'impact',
        title: 'Impact',
        content:
          'He is now leading digital innovation and data strategy work within the organisation something that would never have likely to been identified through CV screening, performance reviews, or traditional assessments.',
      },
    ],
  };

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
            <ServiceSection {...revealHiddenBrillianceData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default RevealHiddenBrilliance;
