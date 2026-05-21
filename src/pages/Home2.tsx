import type { ReactNode } from 'react';
import { Suspense, lazy, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSectionHome2 from '@/components/HeroSection/HeroSectionHome2';
import {
  shutterstock1717584028,
  shutterstock2291389905,
} from '@/assets/images';

const Footer = lazy(() => import('@/components/Footer/Footer'));

const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-pulse text-white/50">Loading...</div>
  </div>
);

type DropItem = {
  title: string;
  bullets: string[];
};

type Principle = {
  title: string;
  body: string;
};

type ValueItem = {
  title: string;
  body: string;
};

type StatItem = {
  stat: string;
  citation: string;
};

type StepItem = {
  title: string;
  bullets: string[];
};

type OutcomeGroup = {
  title: string;
  bullets: string[];
};

function SectionTitle({
  title,
  subtitle,
  center,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 md:mb-14 ${center ? 'text-center' : 'text-left'}`}>
      <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
        {title}
      </h2>
      <div
        className={`h-1 w-24 md:w-32 rounded-full ${center ? 'mx-auto' : ''}`}
        style={{ background: 'linear-gradient(to right, #60A5FA, #9333EA)' }}
      ></div>
      {subtitle && (
        <p
          className={`mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-4xl ${
            center ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Accordion({ items }: { items: DropItem[] }) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="space-y-6 md:space-y-10">
      {items.map((item, idx) => {
        const open = expanded.has(idx);
        return (
          <div
            key={item.title}
            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
            style={{ boxShadow: '0 12px 45px rgba(0,0,0,0.35)' }}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full text-left px-5 md:px-6 py-4 md:py-5 flex items-start justify-between gap-6"
            >
              <div>
                <div className="text-white font-semibold text-base md:text-lg">
                  {item.title}
                </div>
                <div className="text-white/60 text-sm mt-1">Tap to expand</div>
              </div>
              <div
                className={`shrink-0 mt-1 h-10 w-10 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
                style={{
                  background:
                    'linear-gradient(135deg, rgba(96,165,250,0.18), rgba(147,51,234,0.18))',
                }}
                aria-hidden
              >
                <svg
                  className="w-5 h-5 text-white"
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
              </div>
            </button>

            <div
              className={`grid transition-all duration-500 ease-in-out ${
                open
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden px-5 md:px-6 pb-5 md:pb-6">
                <ul className="mt-2 space-y-2">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span
                        className="mt-2 h-2 w-2 rounded-full shrink-0"
                        style={{ background: 'rgba(96,165,250,0.9)' }}
                      ></span>
                      <span className="text-white/80 text-sm md:text-base leading-relaxed">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200]">
      <div
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="w-full max-w-3xl rounded-3xl p-[2px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(96,165,250,0.78), rgba(147,51,234,0.78))',
          }}
        >
          <div
            className="rounded-3xl bg-[#0B1020]/80 backdrop-blur-xl overflow-hidden"
            style={{
              boxShadow: '0 30px 120px rgba(0,0,0,0.65)',
              animation: 'home2ModalIn 180ms ease-out forwards',
              willChange: 'transform, opacity',
            }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <style>
              {
                '@keyframes home2ModalIn { from { opacity: 0; transform: translateY(8px) scale(0.99); } to { opacity: 1; transform: translateY(0) scale(1); } }'
              }
            </style>
            <div className="px-6 md:px-8 py-6 border-b border-white/10 flex items-start justify-between gap-6">
              <div>
                <div className="text-white font-bold text-xl md:text-2xl">
                  {title}
                </div>
                <div className="text-white/60 text-sm mt-1">
                  Press ESC or click outside to close
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-10 w-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-6 md:px-8 py-6">
              <div className="text-white/85 leading-relaxed text-base md:text-lg">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Home2 = () => {
  const navigate = useNavigate();

  const principles = useMemo<Principle[]>(
    () => [
      {
        title: 'Recognise',
        body: 'The different ways the people around you think, work and experience the world.',
      },
      {
        title: 'Reflect',
        body: 'How you understand and react to these differences.',
      },
      {
        title: 'Respond',
        body: 'With training and insights to enable a greater understanding',
      },
    ],
    []
  );

  const values = useMemo<ValueItem[]>(
    () => [
      {
        title: 'Different thinking is valuable',
        body: 'Different ways of thinking can strengthen people, teams and organisations when understood properly.',
      },
      {
        title: 'Led by psychology and science',
        body: 'Everything we do is grounded in psychology, behavioural science and real world evidence.',
      },
      {
        title: 'Insight should lead to action',
        body: 'Understanding problems is important, but practical change matters more. We focus on what people and organisations can do next.',
      },
      {
        title: 'Look beyond behaviour',
        body: 'People are more than job titles, labels or reactions. We aim to understand what may be driving behaviour, not just respond to it.',
      },
      {
        title: 'People matter more than systems',
        body: 'Technology, workplaces and relationships work better when the people using them are properly understood and supported.',
      },
      {
        title: 'Be honest about the problem',
        body: 'Real progress starts with understanding what is actually getting in the way even when it is uncomfortable.',
      },
    ],
    []
  );

  const mindSyncStats = useMemo<StatItem[]>(
    () => [
      {
        stat: '1.7 million pupils in England now have identified Special Educational Needs. 20.5% of the school population.',
        citation: '(DfE, January 2025)',
      },
      {
        stat: 'Educational Health Care Plans have doubled since 2016 and rose 11.1% in the last year alone, to 483,000 children.',
        citation: '(DfE, June 2025)',
      },
      {
        stat: 'Autism is now the most common primary need for pupils with an Educational Health Care Plan, accounting for 33.6% of plans.',
        citation: '(DfE, 2025)',
      },
      {
        stat: 'Over 50% of neurodivergent individuals report burnout linked to masking and being misunderstood.',
        citation: '(CIPD, 2024)',
      },
    ],
    []
  );

  const schoolContext = useMemo<DropItem[]>(
    () => [
      {
        title: 'Schools are being asked to do more, with less, faster.',
        bullets: [
          '68% of primary teachers and 61% of secondary teachers felt unprepared to teach SEND pupils after their initial teacher training. (Teacher Tapp, 2024)',
          'Almost 9 out of 10 teachers (87%) say they need more help to support their SEND learners. (Teacher Tapp, June 2025)',
          '56.2% of pupils with an EHCP are now in mainstream schools, and that proportion is rising every year. (DfE, 2025)',
          'Solving the SEND Crisis (September 2025) found the system is now defined by “limited resources, capacity constraints, and a lack of authority,” leaving frontline teachers to absorb the gap.',
        ],
      },
      {
        title:
          'What the 2026 Special Educational Need (SEND) reforms mean for schools.',
        bullets: [
          'The white paper proposes shifting the emphasis of SEND support towards greater inclusion in mainstream settings. Meaning fewer pupils are likely to be moved to specialist provision.',
          'The Commons Education Committee has called for a focus on “early intervention to support children and young people as a way to restrain EHCP numbers and associated costs.” (Solving the SEND Crisis, September 2025)',
          'High-needs funding has risen 66% in real terms over a decade. But per-pupil funding has fallen by over £5,000 per EHCP since 2015/16. (Institute for Government, November 2025)',
          'Local authority SEND deficits are projected to exceed £5 billion by March 2026. (Eton Academy analysis, 2025)',
        ],
      },
    ],
    []
  );

  const mindSyncSchoolSteps = useMemo<StepItem[]>(
    () => [
      {
        title: 'Step 1 – Assessment',
        bullets: [
          'Every staff member completes a short online assessment in around 15 minutes.',
        ],
      },
      {
        title: 'Step 2  - Personal Insight Report',
        bullets: [
          'Each staff member receives a personalised report showing:',
          'How they currently respond to neurodiversity in the classroom',
        ],
      },
      {
        title: 'Step 3 - Training & Support',
        bullets: [
          'Staff receive access to:',
          'The Mind Sync training library',
          'Short practical video modules',
          'Downloadable classroom guides and resources tailored to common challenges',
          'Topics include ADHD, autism, dyslexia, sensory needs, masking, emotional regulation, behaviour, and classroom engagement.',
        ],
      },
      {
        title: 'Step 4 - Whole School Insight & Action Plan',
        bullets: [
          'School leadership receives:',
          'A whole-school insight report showing patterns, strengths, gaps, and priority areas across staff',
          'A practical 12-month action plan with recommended next steps, CPD focus areas, and ways to measure impact',
          'Evidence and insight that can support schools in demonstrating inclusive practice aligned to the evolving Ofsted Inclusion Framework',
          'A follow-up reassessment tracks progress in staff confidence, classroom experiences, inclusion practices, and pupil outcomes over time.',
        ],
      },
    ],
    []
  );

  const schoolOutcomes = useMemo<OutcomeGroup[]>(
    () => [
      {
        title: 'For Ofsted and governors.',
        bullets: [
          'Documented evidence of a structured, whole school approach to inclusion.',
          'Measurable changes in staff understanding of neurodiversity.',
          'A unified approach to Neurodiversity that staff, pupils and parents can describe.',
        ],
      },
      {
        title: 'For teachers and staff.',
        bullets: [
          'Reduction in conflict in the classroom, with knock on effects for staff retention and wellbeing.',
          'Greater confidence responding to neurodivergent pupils.',
          'Reduced workload pressure on SENDCos and pastoral leads.',
          'Stronger relationships between teachers / parents and pastoral teams.',
        ],
      },
      {
        title: 'For the school as a whole.',
        bullets: [
          'Fewer behaviour incidents.',
          'Improved attendance among pupils who previously struggled to feel safe or understood.',
          'A culture of understanding around neurodiversity.',
          'Reduced reliance on exclusions and reactive behaviour management.',
        ],
      },
    ],
    []
  );

  const parentsContext = useMemo<DropItem[]>(
    () => [
      {
        title:
          'When Behaviour Is Misunderstood, Managing behaviour can become harder',
        bullets: [
          'Up to 70% of parents report regular conflict at home linked to behaviour they don’t fully understand. (YoungMinds, 2023)',
          'Children with ADHD are significantly more likely to experience low self-esteem and emotional dysregulation when their behaviour is misunderstood. (NICE, 2023)',
          'Over 50% of neurodivergent individuals report burnout linked to masking and being misunderstood. (CIPD, 2024)',
          '385,540 children were waiting for first contact from community mental health services as of March 2025. Up 14.4% in a single year. (BMA, 2025)',
        ],
      },
    ],
    []
  );

  const parentSteps = useMemo<StepItem[]>(
    () => [
      {
        title: 'Step 1 - Assessment',
        bullets: [
          'Parents complete a short online assessment covering:',
          'Their child’s behaviour, emotions, routines, and school experiences',
          'Family dynamics and day to day challenges',
          'Their own parenting approach and responses',
        ],
      },
      {
        title: 'Step 2 - Personalised Insight',
        bullets: [
          'Parents receive a personalised report explaining:',
          'The patterns currently happening within the family',
          'How neurodiversity may be influencing behaviour, emotions, communication, and reactions',
          'Practical ways to respond differently and reduce conflict at home',
          'Where two parents complete the assessment for the same child:',
          'A third combined report is generated highlighting differences in parenting styles, communication approaches, consistency, and areas that may unintentionally create tension or mixed messages for the child',
        ],
      },
      {
        title: 'Step 3 - Training & Practical Support',
        bullets: [
          'Parents receive access to:',
          'Short training modules designed to be watched in around 10 minutes and applied immediately',
          'Downloadable practical guides covering Neurodiversity related parenting challenges',
          'Step-by step strategies to support communication, emotional regulation, routines, behaviour, school stress, and everyday family life',
        ],
      },
    ],
    []
  );

  const parentOutcomes = useMemo<DropItem[]>(
    () => [
      {
        title: 'Anticipated Outcomes',
        bullets: [
          'Reduced conflict and emotional escalation at home',
          'Greater consistency between parents and caregivers',
          'Better understanding of the child’s needs and behaviour',
          'Increased confidence in handling challenging situations',
          'Stronger communication and relationships within the family',
        ],
      },
    ],
    []
  );

  const futureSyncContext = useMemo<DropItem[]>(
    () => [
      {
        title:
          'Helping organisations and their people get ready for the future of work.',
        bullets: [
          'Future Sync helps organisations see neurodiversity as a strategic advantage, find the hidden barriers preventing change, and prepare their staff to work alongside AI in a rapidly changing world.',
        ],
      },
      {
        title: 'The future of work and business is changing fast.',
        bullets: [
          '44% of workforce skills will be disrupted by 2030. (World Economic Forum, 2023)',
          '40% of employees will require reskilling by 2030. (IBM, 2023)',
          'Only 50% of organisations report having the skills needed to successfully adapt for a digital future. (World Economic Forum, 2023)',
          'Only 20% of organisations have a workforce that is “AI-ready.” (IBM, 2023)',
          'Workforce resistance to change is cited as the number one barrier to digital adoption. (Gartner, 2023)',
        ],
      },
      {
        title: 'Recognising neurodiversity for strategic advantage.',
        bullets: [
          'Neurodivergent individuals often outperform peers in roles requiring.',
          'Identifying patterns, risks, and anomalies within complex data.',
          'Designing more efficient processes and improving ways of working.',
          'Approaching problems from different angles and challenging conventional thinking.',
          'Adapting quickly to new tools, systems, and AI technologies.',
          '(Harvard Business Review, 2024)',
          'Teams who harness neurodiversity effectively can be 30% more productive in digital transformation. (Accenture, 2020)',
          'Organisations actively supporting neurodiversity report 28% higher revenue, 30% higher profit margins, and 2x net income. (Accenture, 2024)',
          'In cybersecurity and data roles, neurodivergent employees have been shown to identify anomalies faster and more accurately. (IBM, 2023)',
          'Only 36% of organisations report having a clear understanding of neurodiversity within their workforce. (Deloitte, 2023)',
          'Over 50% of neurodivergent employees choose not to disclose due to concerns about stigma and lack of understanding. (Deloitte, 2024)',
          'Just 1 in 10 organisations have formal neurodiversity strategies in place. (CIPD, 2023)',
          'Skills and capability gaps are often not due to absence of talent, but a lack of visibility and understanding at an organisational level. (Deloitte, 2024)',
        ],
      },
    ],
    []
  );

  const futureSyncSteps = useMemo<StepItem[]>(
    () => [
      {
        title: 'Step 1.',
        bullets: [
          'Employees complete online psychology based assessments designed to understand how people think, work, and approach change.',
        ],
      },
      {
        title: 'Step 2.',
        bullets: [
          'Reports and data analysis are generated at both an organisational and departmental level.',
          'These highlight.',
          'Where digital capability already exists.',
          'Where gaps and barriers are slowing progress.',
          'Where neurodiverse thinking can be better utilised.',
        ],
      },
      {
        title: 'Step 3.',
        bullets: [
          'Future Sync delivers.',
          'Targeted workforce training to build digital and AI capability.',
          'Strategic recommendations for leaders.',
          'Practical implementation plans that can be applied day to day.',
        ],
      },
    ],
    []
  );

  const futureSyncBenefits = useMemo<DropItem[]>(
    () => [
      {
        title: 'Anticipated benefits to organisations',
        bullets: [
          'Reduced wasted spend on digital and AI projects.',
          'Better use of existing people and skills.',
          'Faster adoption of AI and digital tools.',
          'Stronger use of neurodiverse thinking.',
          'Improved workforce readiness for the future.',
          'Clear direction for the next 3 to 5 years.',
          'Removal of hidden barriers slowing progress.',
          'Reduced risk of falling behind competitors.',
        ],
      },
    ],
    []
  );

  const [openValue, setOpenValue] = useState<ValueItem | null>(null);

  return (
    <main className="pt-0 bg-black">
      <HeroSectionHome2 />
      {/* Goals & Values */}
      <section className="relative w-full overflow-hidden bg-black py-12 md:py-24 lg:py-28 ">
        <div className="absolute right-1/4 top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.18)] to-[rgba(147,51,234,0.18)] blur-[380px]"></div>
        <div className="absolute left-1/4 bottom-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.18)] to-[rgba(147,51,234,0.18)] blur-[380px]"></div>

        <div className="relative container mx-auto px-4 md:px-6 z-10">
          <div className="mx-auto max-w-[1960px]">
            <div className="mx-auto max-w-4xl">
              <SectionTitle
                title="Our Goals & Values"
                subtitle="ELARA was founded by neurodiverse individuals to help society better understand neurodiversity and prepare for a digital future that depends on different thinking, adaptability and valuing different minds."
                center
              />
            </div>

            <div className="grid gap-6 md:gap-8 md:grid-cols-2 mb-12 md:mb-14">
              <div
                className="relative rounded-2xl p-[2px]"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(96,165,250,0.78), rgba(147,51,234,0.78))',
                }}
              >
                <div
                  className="relative rounded-2xl border border-white/10 bg-[#0B1020]/70 backdrop-blur-md p-7 md:p-8"
                  style={{ boxShadow: '0 18px 55px rgba(0,0,0,0.45)' }}
                >
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(96,165,250,0.22), rgba(147,51,234,0.22))',
                      border: '1px solid rgba(96,165,250,0.25)',
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 11c1.657 0 3-1.343 3-3S17.657 5 16 5s-3 1.343-3 3 1.343 3 3 3Z"
                        stroke="#60A5FA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3Z"
                        stroke="#A78BFA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 19a4 4 0 0 0-4-4h-2"
                        stroke="#60A5FA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11 15H7a4 4 0 0 0-4 4"
                        stroke="#A78BFA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-white font-bold text-lg md:text-xl">
                    To Help society understand neurodiversity.
                  </h3>
                  <p className="mt-3 text-base md:text-lg leading-relaxed text-white">
                    Creating awareness, reducing stigma, and building inclusive
                    environments in education and everyday life.
                  </p>
                </div>
              </div>

              <div
                className="relative rounded-2xl p-[2px]"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(96,165,250,0.78), rgba(147,51,234,0.78))',
                }}
              >
                <div
                  className="relative rounded-2xl border border-white/10 bg-[#0B1020]/70 backdrop-blur-md p-7 md:p-8"
                  style={{ boxShadow: '0 18px 55px rgba(0,0,0,0.45)' }}
                >
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(96,165,250,0.22), rgba(147,51,234,0.22))',
                      border: '1px solid rgba(96,165,250,0.25)',
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"
                        stroke="#60A5FA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-white font-bold text-lg md:text-xl">
                    Help organisations prepare for the future of work.
                  </h3>
                  <p className="mt-3 text-base md:text-lg leading-relaxed text-white">
                    Future-proof teams with AI-readiness, neuro-strategic
                    advantage and inclusive leadership.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="mt-20 md:mt-32 lg:mt-36">
                <SectionTitle title="Our Core Principles" center />

                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(56px,1fr)_minmax(0,1fr)_minmax(56px,1fr)_minmax(0,1fr)] items-start gap-10 md:gap-0">
                  {principles.map((p, idx) => {
                    const iconName =
                      p.title === 'Recognise'
                        ? 'visibility'
                        : p.title === 'Reflect'
                          ? 'auto_fix_high'
                          : 'bolt';

                    return (
                      <div key={p.title} className="contents">
                        <div className="flex flex-col items-center text-center">
                          <div
                            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 flex items-center justify-center mb-5 md:mb-6"
                            style={{
                              borderColor: 'rgba(96,165,250,0.25)',
                              background: 'rgba(96,165,250,0.06)',
                              boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                            }}
                            aria-hidden
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{ color: '#60A5FA', fontSize: '34px' }}
                            >
                              {iconName}
                            </span>
                          </div>

                          <div className="font-semibold tracking-[0.2em] uppercase text-white text-base md:text-lg">
                            {p.title}
                          </div>
                          <div className="mt-2 text-white/60 text-sm leading-relaxed max-w-[260px]">
                            {p.body}
                          </div>
                        </div>

                        {idx < principles.length - 1 && (
                          <div className="hidden md:block relative" aria-hidden>
                            <div
                              className="absolute left-0 right-0 h-[2px] w-full top-[56px] md:top-[64px]"
                              style={{
                                background:
                                  'linear-gradient(to right, rgba(96,165,250,0), rgba(96,165,250,0.35), rgba(96,165,250,0))',
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-20 md:mt-32 lg:mt-36">
                <SectionTitle
                  title="Our Values"
                  subtitle="Built on psychology, insight, and a deeper understanding of human thinking."
                  center
                />
                <div className="grid gap-4">
                  {values.map((v) => (
                    <button
                      key={v.title}
                      type="button"
                      onClick={() => setOpenValue(v)}
                      className="text-left rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 hover:bg-white/10"
                    >
                      <div className="text-white font-semibold text-base md:text-lg">
                        {v.title}
                      </div>
                      <div className="mt-2 text-white/65 text-sm">
                        Click to open
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Modal
              open={openValue !== null}
              onClose={() => setOpenValue(null)}
              title={openValue?.title ?? ''}
            >
              {openValue?.body}
            </Modal>
          </div>
        </div>
      </section>

      {/* Our Offer */}
      <section className="relative w-full overflow-hidden bg-black py-12 md:py-24 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6 z-10">
          <div className="mx-auto max-w-[1960px]">
            <SectionTitle title="Our Offer" center />

            <div className="grid gap-6 md:gap-2 lg:grid-cols-2">
              <div className="group relative w-full">
                <div
                  className="relative w-full rounded-[20px] overflow-hidden transition-all duration-300 hover:scale-[1.02] flex flex-col"
                  style={{
                    background: 'rgba(45, 45, 51, 1)',
                    border: '1px solid rgba(63, 63, 71, 1)',
                  }}
                >
                  <div className="px-[28px] pt-[28px]">
                    <div
                      className="relative w-full rounded-[16px] overflow-hidden bg-gray-800"
                      style={{ height: '310px' }}
                    >
                      <img
                        src={shutterstock1717584028}
                        alt="Mind Sync"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        style={{ height: '310px' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 668px"
                      />
                    </div>
                  </div>

                  <div
                    className="px-[28px] pb-[28px] flex flex-col"
                    style={{ gap: '32px', marginTop: '27px' }}
                  >
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                        Mind Sync
                      </h3>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-white">
                        Helping society understand neurodiversity.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="w-fit mt-auto rounded-xl px-6 md:px-10 py-3 md:py-4 text-sm md:text-base font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                        boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      Explore Mind Sync
                    </button>
                  </div>
                </div>
              </div>

              <div className="group relative w-full">
                <div
                  className="relative w-full rounded-[20px] overflow-hidden transition-all duration-300 hover:scale-[1.02] flex flex-col"
                  style={{
                    background: 'rgba(45, 45, 51, 1)',
                    border: '1px solid rgba(63, 63, 71, 1)',
                  }}
                >
                  <div className="px-[28px] pt-[28px]">
                    <div
                      className="relative w-full rounded-[16px] overflow-hidden bg-gray-800"
                      style={{ height: '310px' }}
                    >
                      <img
                        src={shutterstock2291389905}
                        alt="Future Sync"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        style={{ height: '310px' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 668px"
                      />
                    </div>
                  </div>

                  <div
                    className="px-[28px] pb-[28px] flex flex-col"
                    style={{ gap: '32px', marginTop: '27px' }}
                  >
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                        Future Sync
                      </h3>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-white">
                        Helping organisations and their people get ready for the
                        future of work.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate('/future-sync')}
                      className="w-fit mt-auto rounded-xl px-6 md:px-10 py-3 md:py-4 text-sm md:text-base font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                        boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                      }}
                    >
                      Explore Future Sync
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Home2;
