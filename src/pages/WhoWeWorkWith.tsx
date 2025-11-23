import React, { useState } from 'react';
import Footer from '@/components/Footer/Footer';
import {
  fourthIndustrialRevolutionImage,
  cognitiveBiasImage,
  digitalSectionImage,
  organisationalPsychologyImage,
} from '@/assets/images';

interface ResourceLink {
  title: string;
  url?: string; // External URL - if not provided, link will be disabled
  description?: string;
}

interface ResourceCategory {
  title: string;
  description: string;
  image: string;
  resources: ResourceLink[];
}

// Resource Card Component with Accordion
interface ResourceCardProps {
  category: ResourceCategory;
  isExpanded: boolean;
  onToggle: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  category,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="group relative h-full w-full">
      {/* Card Container */}
      <div
        className="relative h-full w-full rounded-xl overflow-hidden transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: isExpanded
            ? '0 8px 32px rgba(96, 165, 250, 0.3)'
            : '0 4px 20px rgba(96, 165, 250, 0.15)',
        }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${category.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
          }}
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
          }}
        />

        {/* Gradient Overlay on Hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(147, 51, 234, 0.2))',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
          {/* Title */}
          <h3 className="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-white text-left">
            {category.title}
          </h3>

          {/* Gradient Divider */}
          <div
            className="mb-4 h-1 w-16 rounded-full"
            style={{
              background: 'linear-gradient(to right, #60A5FA, #9333EA)',
            }}
          />

          {/* Understand More Button */}
          <button
            type="button"
            onClick={onToggle}
            className="w-fit mb-4 rounded-xl px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            style={{
              background:
                'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))',
              boxShadow: '0 4px 20px rgba(96, 165, 250, 0.3)',
            }}
          >
            <span>{isExpanded ? 'Understand Less' : 'Understand More'}</span>
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

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-4 space-y-4">
              {/* Description */}
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/90 text-left">
                {category.description}
              </p>

              {/* Resource Links Box */}
              <div
                className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm p-4 md:p-6 mt-4"
                style={{
                  boxShadow: '0 4px 20px rgba(96, 165, 250, 0.15)',
                }}
              >
                <h4 className="mb-4 text-lg md:text-xl font-bold text-white">
                  Resources:
                </h4>
                <ul className="space-y-3">
                  {category.resources.map((resource, index) => {
                    const hasUrl =
                      resource.url && resource.url.startsWith('http');
                    return (
                      <li key={index}>
                        {hasUrl ? (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm md:text-base text-[#60A5FA] hover:text-[#9333EA] transition-colors duration-200 underline underline-offset-2 hover:underline-offset-4 flex items-start gap-2"
                          >
                            <span className="flex-shrink-0 mt-1.5">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </span>
                            <span>{resource.title}</span>
                          </a>
                        ) : (
                          <span className="text-sm md:text-base text-white/80 flex items-start gap-2">
                            <span className="flex-shrink-0 mt-1.5">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </span>
                            <span>{resource.title}</span>
                          </span>
                        )}
                        {resource.description && (
                          <p className="text-xs md:text-sm text-white/70 mt-1 ml-6">
                            {resource.description}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Corner Glow */}
        <div
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          style={{
            background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
          }}
        />
      </div>
    </div>
  );
};

const WhoWeWorkWith = () => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Resource Categories Data
  const resourceCategories: ResourceCategory[] = [
    {
      title: 'The 4th Industrial Revolution (4IR)',
      description:
        'These research papers provide deeper insight into how AI, automation, and emerging technologies are reshaping work.',
      image: fourthIndustrialRevolutionImage,
      resources: [
        {
          title: 'Industry 4.0 – Applifast White Paper',
          description:
            'Overview of Industry 4.0 automation trends and manufacturing innovation.',
          // No URL provided
        },
        {
          title: 'Cisco – Industry 4.0 in Manufacturing',
          url: 'https://www.cisco.com/c/dam/en_us/solutions/industries/manufacturing/white-paper-c11-742529.pdf',
          description:
            'Cisco analysis of digital transformation and smart factories.',
        },
        {
          title: 'UNIDO Industry 4.0 Background Paper',
          url: 'https://hub.unido.org/sites/default/files/publications/UNIDO%20Background%20Paper%20on%20Industry%204.0_FINAL_TII.pdf',
          description:
            'UN report explaining global Industry 4.0 adoption and policy context.',
        },
        {
          title: 'McKinsey: Capturing Value in Industry 4.0',
          url: 'https://www.mckinsey.com/~/media/mckinsey/industries/advanced%20electronics/our%20insights/capturing%20value%20at%20scale%20in%20discrete%20manufacturing%20with%20industry%204%200/industry-4-0-capturing-value-at-scale-in-discrete-manufacturing-vf.pdf',
          description:
            'Insights on scaling Industry 4.0 value in manufacturing environments.',
        },
      ],
    },
    {
      title: 'Neurodiversity in the Workplace',
      description:
        'These papers explore the strengths, patterns, and workplace experiences of neurodivergent individuals.',
      image: digitalSectionImage,
      resources: [
        {
          title: 'CIPD & Uptimize – Neuroinclusion at Work 2024',
          url: 'https://www.cipd.org/globalassets/media/knowledge/knowledge-hub/reports/2024-pdfs/2024-neuroinclusion-at-work-report-8545.pdf',
          description:
            'Comprehensive guidance on neuroinclusive HR and organisational practice.',
        },
        {
          title: 'Neurodiversity in Business Report 2023',
          url: 'https://www.neurodiversityinbusiness.org/wp-content/uploads/2023/06/Neurodiversity-in-Business-report_June-2023_Digital.pdf',
          description:
            'UK-wide evidence on strengths, challenges and workplace inclusion gaps.',
        },
        {
          title: 'ACAS – Neurodiversity at Work',
          url: 'https://www.acas.org.uk/sites/default/files/2025-05/neurodiversity-at-work-report-research-practice-and-policy_2_0.odt',
          description:
            'Research and practical policy advice for employers supporting neurodivergent staff.',
        },
        {
          title: 'Autistica – Neurodiversity Employers Index (NDEI)',
          url: 'https://www.autistica.org.uk/downloads/files/NDEI-Market-Report-FINAL.pdf',
          description:
            'Benchmarking tool and analysis of employer maturity in neuroinclusion.',
        },
        {
          title: 'CREST – Neurodiversity in Technical Security',
          url: 'https://www.crest-approved.org/wp-content/uploads/2022/04/2020_CREST-Neurodiversity-in-the-Workplace-Report.pdf',
          description:
            'Study of ND strengths in cybersecurity and specialist technical roles.',
        },
      ],
    },
    {
      title: 'Cognitive Bias in the Workplace',
      description:
        'These readings examine the subtle thinking habits that influence judgement, decision-making,and organisational culture.',
      image: cognitiveBiasImage,
      resources: [
        {
          title: 'The Real Effects of Unconscious Bias (UNC Health)',
          url: 'https://teammates.atriumhealth.org/-/media/human-resources/documents/new-teammates/unc-white-paper-the-real-effects-of-unconscious-bias-in-the-workplace-final.pdf',
          description:
            'Explores how unconscious bias impacts workforce decisions and culture.',
        },
        {
          title: 'EHRC – Unconscious Bias Training Evidence Review',
          url: 'https://www.equalityhumanrights.com/sites/default/files/research-report-113-unconcious-bais-training-an-assessment-of-the-evidence-for-effectiveness-pdf.pdf',
          description:
            'Government review on whether unconscious bias training is effective.',
        },
        {
          title: 'Stephens et al – The Cycle of Workplace Bias',
          url: 'https://www.nicolemstephens.com/uploads/3/9/5/9/39596235/stephensrivera_townsend_rob.pdf',
          description:
            'Academic paper analysing systemic bias and organisational impact.',
        },
        {
          title: 'MITRE – The Assessment of Biases in Cognition',
          url: 'https://www.mitre.org/sites/default/files/publications/pr-16-0956-the-assessment-of-biases-in-cognition.pdf',
          description:
            'Model for identifying and measuring cognitive biases in decision making.',
        },
      ],
    },
    {
      title: 'Business / Organisational Psychology',
      description:
        'These research papers offer accessible insights into behaviour, motivation, leadership and team dynamics.',
      image: organisationalPsychologyImage,
      resources: [
        {
          title: 'APA – Industrial and Organisational Psychology Overview',
          url: 'https://www.apa.org/ed/graduate/specialize/industrial',
          description:
            'Introduction to I/O psychology practice, research, and applications.',
        },
        {
          title: 'CIPD – Evidence-Based Practice in HR',
          url: 'https://www.cipd.org/uk/knowledge/evidence/evidence-based-hr/',
          description:
            'Resources on applying scientific evidence in people and organisational decisions.',
        },
        {
          title: 'SIOP – Leading Research in Work Psychology',
          url: 'https://www.siop.org/Research-Publications',
          description:
            'Library of organisational psychology research and practice insights.',
        },
        {
          title: 'BPS – Occupational Psychology Division',
          url: 'https://www.bps.org.uk/member-microsites/division-occupational-psychology',
          description:
            'Professional resources on workplace psychology, behaviour and performance.',
        },
      ],
    },
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
            <div className="mb-16 text-center">
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Research & Educationx
              </h1>
              <p className="text-lg leading-relaxed text-white/80 md:text-xl">
                Research papers and reports offering deeper insight into the
                challenges, opportunities, and behaviours shaping today’s
                workplaces.
              </p>
            </div>

            {/* Resource Cards Grid */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {resourceCategories.map((category, index) => (
                  <ResourceCard
                    key={index}
                    category={category}
                    isExpanded={expandedCards.has(index)}
                    onToggle={() => toggleCard(index)}
                  />
                ))}
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

export default WhoWeWorkWith;
