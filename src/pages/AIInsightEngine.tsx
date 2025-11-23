import React, { useState } from 'react';
import Footer from '@/components/Footer/Footer';
import {
  shutterstock2513386035,
  shutterstock1813285633,
  shutterstock2177507051,
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
            What You Get
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

const AIInsightEngine = () => {
  // Reveal Hidden Brilliance Data
  const revealHiddenBrillianceData: ServiceSectionProps = {
    title:
      'Psychology Led Tools That Help Organisations See Things Differently',
    subtitle: 'Discover the untapped strengths already in your workforce',
    heroImage: shutterstock2513386035,
    whatItIs:
      "Reveal Hidden Brilliance identifies the natural thinking styles, strengths, and digital confidence levels of your workforce. It uncovers hidden potential the people whose analytical, creative, practical, or hybrid abilities are not currently being used to their full advantage. It shows you the talent you already have, but haven't yet unlocked.",
    howItWorksIntro:
      'Employees complete a digital assessment. The engine analyses cognitive patterns across work and everyday life to reveal:',
    howItWorksItems: [
      'Who has hidden digital, data, or problem-solving strengths',
      'Which strengths are being used and which are held back',
      'Where talent is misaligned with roles or opportunities',
      'Who has natural potential for innovation, efficiency, or technical work',
    ],
    whatYouGetItems: [
      {
        title: 'Individual Reports:',
        content:
          'clear breakdowns of thinking styles, strengths, and digital confidence',
      },
      {
        title: 'Hidden Talent Alerts:',
        content: ' visibility on employees with underused potential',
      },
      {
        title: 'Department Dashboards:',
        content: ' heatmaps showing cognitive strengths across teams',
      },
      {
        title: 'Actionable Recommendations:',
        content:
          ' focused suggestions for redeployment, development, and upskilling',
      },
    ],
    caseStudyTitle: 'CASE STUDY Example',
    caseStudySubtitle:
      'Uncovering Untapped Digital Talent in a Traditional Engineering Firm',
    caseStudySections: [
      {
        id: 'challenge',
        title: 'The Challenge',
        content:
          'A national engineering firm believed they needed to recruit externally for a new digital and data role. Before proceeding, they used Reveal Hidden Brilliance to assess 120 employees across admin, support, and junior operational roles.',
      },
      {
        id: 'findings',
        title: 'What the Engine Found',
        content:
          'The assessment uncovered a group of employees with strong analytical and digital thinking profiles none of whom were currently in technical positions.\n\nOne long-standing administrator showed exceptional potential for:\n• Analytical problem-solving\n• Systems thinking\n• Digital tool adoption\n• Data visualisation\n\nHer icapabilities had previously gone unnoticed because her role did not require them.',
      },
      {
        id: 'solution',
        title: 'What Happened Next',
        content:
          'She was moved onto an internal development pathway and paired with the business intelligence team.',
      },
      {
        id: 'impact',
        title: 'Impact',
        content:
          '• The business avoided an external recruitment process\n• Productivity in her area increased by double-digit percentages\n• Internal mobility and engagement improved across the wider team\n• Leadership gained a new model for identifying digital talent internally',
      },
    ],
  };

  // Mind Sync Data
  const mindSyncData: ServiceSectionProps = {
    title: 'Mind Sync',
    subtitle: 'Understand how well your managers harness neurodiverse thinking',
    heroImage: shutterstock1813285633,
    whatItIs:
      'Mind Sync assesses how effectively managers recognise, support, and leverage different ways of thinking particularly neurodiversity as a strategic advantage, not just an inclusion initiative. It highlights where leadership habits enable performance, and where they unintentionally hold back diverse thinkers. It gives managers a clear, honest picture of their own capability.',
    howItWorksIntro:
      'Managers complete a short digital self-assessment. The engine analyses leadership behaviour and mindset patterns to reveal:',
    howItWorksItems: [
      'How well they understand neurodiversity and different thinking styles',
      'Whether they use these strengths intentionally in task allocation and decision-making',
      'Where their everyday habits support or block performance',
      'How psychologically safe their team is likely to feel',
      'Their readiness to lead neurodiverse and cognitively diverse teams',
    ],
    whatYouGetItems: [
      {
        title: 'Leadership Capability Scores:',
        content:
          ' clear ratings across awareness, action, adaptability, and culture',
      },
      {
        title: 'Strengths & Gaps Summary:',
        content: " plain-English insights into what's working and what isn't",
      },
      {
        title: 'Practical Development Plan:',
        content:
          ' targeted actions and training recommendations to improve how they support different thinkers',
      },
      {
        title: 'Strategic Recommendations:',
        content:
          ' guidance on building high-performing, cognitively diverse teams',
      },
      {
        title: 'Progress Tracking:',
        content:
          ' optional follow-up assessments to measure improvement over time',
      },
    ],
    caseStudyTitle: 'CASE STUDY Example',
    caseStudySubtitle:
      'Strengthening Leadership Capability and Reducing Turnover in a Construction IT Team',
    caseStudySections: [
      {
        id: 'challenge',
        title: 'The Challenge',
        content:
          'A construction company had ongoing retention and communication challenges within their IT support team. Several neurodivergent team members reported feeling misunderstood or overwhelmed.\n\nTo diagnose the root cause, the organisation deployed Mind Sync across all managers and team leaders.',
      },
      {
        id: 'findings',
        title: 'What Mind Sync Revealed',
        content:
          "Mind Sync revealed that:\n• Managers valued cognitive diversity but weren't consistently using it in everyday leadership\n• Task allocation often clashed with natural strengths\n• Communication styles unintentionally created stress for certain thinkers\n• Psychological safety was inconsistent\n• Leadership intentions were strong, but behaviours needed refining\n\nManagers scored high on values, low on practical application.",
      },
      {
        id: 'solution',
        title: 'What Happened Next',
        content:
          'Using the Mind Sync report:\n• Managers introduced small but meaningful adjustments to their routines\n• Task-to-strength matching increased\n• Weekly communication was redesigned around clarity and cognitive preference\n• Structured feedback routines created more psychological safety\n• Completed training and Upskilling to support improved understanding',
      },
      {
        id: 'impact',
        title: 'Impact',
        content:
          'Results from the interventions included improved team communication, reduced stress levels among neurodivergent team members, and better alignment between individual strengths and assigned tasks. The organization saw a shift from good intentions to effective practices in supporting cognitive diversity.',
      },
    ],
  };

  // Digital Bias Engine Data
  const digitalBiasEngineData: ServiceSectionProps = {
    title: 'Digital Bias Engine',
    subtitle:
      'Find the hidden cultural blockers that slow down digital transformation',
    heroImage: shutterstock2177507051,
    whatItIs:
      "The Digital Bias Engine exposes the invisible behaviours and attitudes that silently sabotage digital change risk aversion, fear of failure, low confidence with new tools, outdated leadership habits, or simply not understanding why change is happening. It's the cultural intelligence piece most organisations overlook.",
    howItWorksIntro:
      'Your workforce completes a short pulse survey or quick interviews. The engine analyses sentiment, confidence, and behaviour patterns to reveal:',
    howItWorksItems: [
      'Where resistance to change is strongest',
      'Which teams feel least confident with digital tools',
      'Whether leadership behaviours are supporting or blocking transformation',
      'The psychological barriers slowing down adoption',
    ],
    whatYouGetItems: [
      {
        title: 'Cultural Heatmaps:',
        content:
          "clear hotspots showing where change will stick — and where it won't",
      },
      {
        title: 'Readiness Scores:',
        content: ' simple indicators of digital confidence and mindset gaps',
      },
      {
        title: 'Practical Action Plans:',
        content:
          ' targeted interventions to improve adoption, confidence, and culture',
      },
      {
        title: 'Quarterly Tracking:',
        content: ' see how culture shifts over time',
      },
    ],
    caseStudyTitle: 'CASE STUDY Example',
    caseStudySubtitle:
      'Preventing a Costly Digital Failure and Building a Culture Ready for Change',
    caseStudySections: [
      {
        id: 'challenge',
        title: 'The Challenge',
        content:
          'A logistics company planned to implement a new digital scheduling system across their workforce. Before committing, they used the Digital Bias Engine with a group of 50 employees to understand readiness.',
      },
      {
        id: 'findings',
        title: 'What the Engine Found',
        content:
          'The engine identified significant cultural and behavioural barriers:\n• Low digital confidence among frontline staff\n• High levels of risk aversion in supervisors\n• Fragmented communication from leadership\n• A belief that new systems make work harder\n• Limited psychological readiness for change\n\nReadiness scores showed the system had a high likelihood of low adoption, risking substantial waste.',
      },
      {
        id: 'solution',
        title: 'What Happened Next',
        content:
          'Instead of pushing ahead, leaders paused implementation and:\n• Introduced a bottom-up digital readiness programme\n• Staff completed training programmes\n• Provided targeted training based on actual workforce needs\n• Engaged respected staff as digital champions\n• Ran small operational pilots before wider rollout',
      },
      {
        id: 'impact',
        title: 'Impact',
        content:
          '• Workforce digital confidence increased by over 60%\n• Adoption success in pilots reached well above typical industry averages\n• The organisation selected a solution better aligned with staff readiness\n• Cultural resistance significantly reduced across several departments',
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
            {/* Reveal Hidden Brilliance Section */}
            <ServiceSection {...revealHiddenBrillianceData} />

            {/* Major Separator */}
            <div
              className="my-24 h-[3px] w-full opacity-70"
              style={{
                background:
                  'linear-gradient(to right, transparent, #60A5FA, #9333EA, transparent)',
              }}
            ></div>

            {/* Mind Sync Section */}
            <ServiceSection {...mindSyncData} />

            {/* Major Separator */}
            <div
              className="my-24 h-[3px] w-full opacity-70"
              style={{
                background:
                  'linear-gradient(to right, transparent, #60A5FA, #9333EA, transparent)',
              }}
            ></div>

            {/* Digital Bias Engine Section */}
            <ServiceSection {...digitalBiasEngineData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default AIInsightEngine;
