import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer/Footer';
import hero from '@/assets/images/shutterstock_726121441.webp';
import image2 from '@/assets/images/shutterstock_1330833800.webp';
import image3 from '@/assets/images/shutterstock_2513386035.webp';
import image4 from '@/assets/images/shutterstock_2213352423.webp';
import { image1 } from '@/assets/images';
import {
  Accordion as SmoothAccordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@/components/ui/accordion';

const MindSyncForSchools = () => {
  const roadmapSteps = useMemo(
    () => [
      {
        step: 1,
        number: '01',
        title: 'Assessment',
        preview:
          'Every staff member completes a short online assessment in around 15 minutes.',
        bgImage: image4,
        modalTitle: 'Assessment ',
        modalIntro:
          'Every staff member completes a short online assessment in around 15 minutes.',
        icon: 'assignment_turned_in',
      },
      {
        step: 2,
        number: '02',
        title: 'Personal Insight Report',
        preview: 'Each staff member receives a personalised insight report.',
        bgImage: image2,
        modalTitle: 'Personal Insight Report ',
        modalIntro: 'Each staff member receives a personalised report showing:',
        modalBullets: [
          'How they currently respond to neurodiversity in the classroom',
        ],
        icon: 'description',
      },
      {
        step: 3,
        number: '03',
        title: 'Training & Support',
        preview:
          'Staff receive access to training resources, video modules, and classroom guides.',
        bgImage: image1,
        modalTitle: 'Training & Support ',
        modalIntro: 'Staff receive access to:',
        modalBullets: [
          'The Mind Sync training library',
          'Short practical video modules',
          'Downloadable classroom guides and resources tailored to common challenges',
        ],
        modalNote:
          'Topics include ADHD, autism, dyslexia, sensory needs, masking, emotional regulation, behaviour, and classroom engagement.',
        icon: 'school',
      },
      {
        step: 4,
        number: '04',
        title: 'Whole School Insight & Action Plan',
        preview:
          'Leadership receives a whole-school report, a 12-month action plan, and evidence to support inclusive practice.',
        bgImage: image3,
        modalTitle: 'Whole School Insight & Action Plan ',
        modalIntro: 'School leadership receives:',
        modalBullets: [
          'A whole-school insight report showing patterns, strengths, gaps, and priority areas across staff',
          'A practical 12-month action plan with recommended next steps, CPD focus areas, and ways to measure impact',
          'Evidence and insight that can support schools in demonstrating inclusive practice aligned to the evolving Ofsted Inclusion Framework',
        ],
        modalNote:
          'A follow-up reassessment tracks progress in staff confidence, classroom experiences, inclusion practices, and pupil outcomes over time.',
        icon: 'insights',
      },
    ],
    []
  );

  const [openStep, setOpenStep] = useState<number | null>(null);
  const activeRoadmapStep =
    roadmapSteps.find((s) => s.step === openStep) ?? null;

  useEffect(() => {
    if (openStep === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenStep(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openStep]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div className="absolute right-1/4 top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.18)] to-[rgba(147,51,234,0.18)] blur-[380px]" />
      <div className="absolute left-1/4 bottom-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.18)] to-[rgba(147,51,234,0.18)] blur-[380px]" />

      <section className="relative min-h-[520px] overflow-hidden pt-32 md:pt-36">
        <div className="absolute inset-0 z-0">
          <img
            className="h-full w-full object-cover opacity-45"
            src={hero}
            alt="Mind Sync for Schools"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/25 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6 z-10 py-16 md:py-20">
          <div className="max-w-4xl">
            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                }}
              >
                Mind Sync for Schools
              </span>
            </h1>
            <p className="mt-5 text-base md:text-xl text-white/80 leading-relaxed max-w-3xl">
              Supporting school staff manage and respond to Neurodiversity
              differently.
            </p>
          </div>
        </div>
      </section>

      <section className="relative isolate py-20 md:py-28 lg:py-32 bg-[#01115762]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020] via-[#050815] to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/28 via-transparent to-[#9333EA]/28" />
          <div className="absolute -left-28 -top-28 h-[520px] w-[520px] rounded-full bg-[#60A5FA]/28 blur-[120px]" />
          <div className="absolute -right-28 -bottom-28 h-[560px] w-[560px] rounded-full bg-[#9333EA]/28 blur-[130px]" />
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[#A78BFA]/18 blur-[150px]" />
          <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(255,255,255,0.05)]" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            {/* <header className="mb-10 md:mb-12 text-center">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/60">
                For leadership
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                The reality for schools
              </h2>
              <div
                className="mt-5 h-1 w-24 md:w-32 rounded-full mx-auto"
                style={{
                  background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                }}
              />
            </header> */}

            <SmoothAccordion multiple className="space-y-4">
              <AccordionItem
                value="schools-more"
                className="border-b border-white/10"
              >
                <AccordionHeader className="group flex w-full items-center justify-between gap-4 py-6 text-left">
                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      className="material-symbols-outlined text-[#60A5FA]"
                      aria-hidden
                      style={{ fontSize: '22px' }}
                    >
                      psychology
                    </span>
                    <span className="min-w-0 text-base md:text-lg font-semibold text-white">
                      Schools are being asked to do more, with less, faster.
                    </span>
                  </span>
                </AccordionHeader>
                <AccordionPanel className="overflow-hidden transition-[max-height] duration-300 ease-out">
                  <div className="pb-6 pl-10 md:pl-11">
                    <ul className="space-y-3 pl-6">
                      <li className="text-sm md:text-base text-white/75 leading-relaxed list-disc">
                        68% of primary teachers and 61% of secondary teachers
                        felt unprepared to teach SEND pupils after their initial
                        teacher training.
                        <span className="ml-2 text-white/50 underline decoration-white/20 underline-offset-4">
                          (Teacher Tapp, 2024)
                        </span>
                      </li>
                      <li className="text-sm md:text-base text-white/75 leading-relaxed list-disc">
                        Almost 9 out of 10 teachers (87%) say they need more
                        help to support their SEND learners.
                        <span className="ml-2 text-white/50 underline decoration-white/20 underline-offset-4">
                          (Teacher Tapp, June 2025)
                        </span>
                      </li>
                      <li className="text-sm md:text-base text-white/75 leading-relaxed list-disc">
                        56.2% of pupils with an EHCP are now in mainstream
                        schools, and that proportion is rising every year.
                        <span className="ml-2 text-white/50 underline decoration-white/20 underline-offset-4">
                          (DfE, 2025)
                        </span>
                      </li>
                      <li className="text-sm md:text-base text-white/75 leading-relaxed list-disc">
                        Solving the SEND Crisis (September 2025) found the
                        system is now defined by “limited resources, capacity
                        constraints, and a lack of authority,” leaving frontline
                        teachers to absorb the gap.
                      </li>
                    </ul>
                  </div>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem
                value="reforms"
                className="border-b border-white/10"
              >
                <AccordionHeader className="group flex w-full items-center justify-between gap-4 py-6 text-left">
                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      className="material-symbols-outlined text-[#60A5FA]"
                      aria-hidden
                      style={{ fontSize: '22px' }}
                    >
                      bolt
                    </span>
                    <span className="min-w-0 text-base md:text-lg font-semibold text-white">
                      What the 2026 Special Educational Need (SEND) reforms mean
                      for schools.
                    </span>
                  </span>
                </AccordionHeader>
                <AccordionPanel className="overflow-hidden transition-[max-height] duration-300 ease-out">
                  <div className="pb-6 pl-10 md:pl-11">
                    <ul className="space-y-3 pl-6">
                      <li className="text-sm md:text-base text-white/75 leading-relaxed list-disc">
                        The white paper proposes shifting the emphasis of SEND
                        support towards greater inclusion in mainstream
                        settings.
                      </li>
                      <li className="text-sm md:text-base text-white/75 leading-relaxed list-disc">
                        The Commons Education Committee has called for a focus
                        on “early intervention to support children and young
                        people as a way to restrain EHCP numbers and associated
                        costs.”
                        <span className="ml-2 text-white/50 underline decoration-white/20 underline-offset-4">
                          (Solving the SEND Crisis, September 2025)
                        </span>
                      </li>
                      <li className="text-sm md:text-base text-white/75 leading-relaxed list-disc">
                        High-needs funding has risen 66% in real terms over a
                        decade. But per-pupil funding has fallen by over £5,000
                        per EHCP since 2015/16.
                        <span className="ml-2 text-white/50 underline decoration-white/20 underline-offset-4">
                          (Institute for Government, November 2025)
                        </span>
                      </li>
                      <li className="text-sm md:text-base text-white/75 leading-relaxed list-disc">
                        Local authority SEND deficits are projected to exceed £5
                        billion by March 2026.
                        <span className="ml-2 text-white/50 underline decoration-white/20 underline-offset-4">
                          (Eton Academy analysis, 2025)
                        </span>
                      </li>
                    </ul>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </SmoothAccordion>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 -mt-10">
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <header className="mb-10 md:mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                How Mind Sync For Schools Works
              </h2>
              <div
                className="mt-5 h-1 w-24 md:w-32 rounded-full mx-auto"
                style={{
                  background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                }}
              />
            </header>

            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {roadmapSteps.map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setOpenStep(s.step)}
                    className="group relative overflow-hidden text-left rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_80px_rgba(96,165,250,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/50 min-h-[190px] flex flex-col justify-between"
                  >
                    <img
                      src={s.bgImage}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-[0.14] transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/85" />
                    <span
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(900px 220px at 20% 0%, rgba(96,165,250,0.18), transparent 60%), radial-gradient(700px 220px at 80% 100%, rgba(147,51,234,0.16), transparent 55%)',
                      }}
                    />
                    <div
                      className="relative h-12 w-12 rounded-full flex items-center justify-center font-bold mb-6 border border-white/15 text-white transition-colors"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(96,165,250,0.22), rgba(147,51,234,0.16))',
                      }}
                    >
                      {s.step}
                    </div>
                    <div className="relative">
                      <h3 className="text-lg font-semibold text-white">
                        {s.title}
                      </h3>
                    </div>
                    <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                      Click to explore
                      <span
                        className="material-symbols-outlined"
                        aria-hidden
                        style={{ fontSize: '18px' }}
                      >
                        arrow_forward
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {activeRoadmapStep && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <button
                  type="button"
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setOpenStep(null)}
                  aria-label="Close dialog"
                />

                <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0B1020]/90 backdrop-blur-xl p-7 md:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
                  <button
                    type="button"
                    className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
                    onClick={() => setOpenStep(null)}
                    aria-label="Close"
                  >
                    <span className="material-symbols-outlined" aria-hidden>
                      close
                    </span>
                  </button>

                  <div
                    className="h-14 w-14 rounded-2xl flex items-center justify-center border border-white/10"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(96,165,250,0.18), rgba(147,51,234,0.18))',
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#60A5FA', fontSize: '30px' }}
                      aria-hidden
                    >
                      {activeRoadmapStep.icon}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight text-white">
                    Step {activeRoadmapStep.step}:{' '}
                    {activeRoadmapStep.modalTitle}
                  </h3>
                  {activeRoadmapStep.modalIntro && (
                    <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
                      {activeRoadmapStep.modalIntro}
                    </p>
                  )}

                  {activeRoadmapStep.modalBullets?.length ? (
                    <ul className="mt-4 space-y-3 pl-6 list-disc marker:text-[#60A5FA] marker:font-semibold marker:text-lg">
                      {activeRoadmapStep.modalBullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="text-sm md:text-base text-white/75 leading-7"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {activeRoadmapStep.modalNote && (
                    <p className="mt-5 text-sm md:text-base text-white/70 leading-relaxed">
                      {activeRoadmapStep.modalNote}
                    </p>
                  )}

                  <button
                    type="button"
                    className="mt-8 w-full rounded-xl px-5 py-3 font-semibold text-white shadow-sm"
                    style={{
                      background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                    }}
                    onClick={() => setOpenStep(null)}
                  >
                    Understood
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mx-auto ">
            <header className="mb-10 md:mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Anticipated outcomes after 6 to 12 months
              </h2>
              <div
                className="mt-5 h-1 w-24 md:w-32 rounded-full mx-auto"
                style={{
                  background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                }}
              />
            </header>

            <div className="relative">
              <div
                className="hidden md:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, rgba(96,165,250,0.35) 45%, rgba(147,51,234,0.35) 100%)',
                }}
              />

              <div className="space-y-14 md:space-y-20">
                <div className="relative flex flex-col md:flex-row items-center justify-center gap-7 md:gap-0">
                  <div className="w-full md:w-5/12 md:pr-10 md:text-right flex md:justify-end">
                    <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-7 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
                      <h3 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-white">
                        For Ofsted and governors.
                      </h3>
                      <ul className="mt-6 space-y-3 pl-6 md:text-left list-disc marker:text-[#A78BFA] marker:font-semibold marker:text-lg">
                        <li className="text-sm md:text-base text-white/80 leading-relaxed">
                          Documented evidence of a structured, whole school
                          approach to inclusion.
                        </li>
                        <li className="text-sm md:text-base text-white/80 leading-relaxed">
                          Measurable changes in staff understanding of
                          neurodiversity.
                        </li>
                        <li className="text-sm md:text-base text-white/80 leading-relaxed">
                          A unified approach to Neurodiversity that staff,
                          pupils and parents can describe.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0B1020] shadow-[0_0_0_10px_rgba(0,0,0,0.35)]">
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#A78BFA' }}
                      aria-hidden
                    >
                      verified
                    </span>
                  </div>

                  <div className="w-full md:w-5/12 md:pl-10">
                    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                      <img
                        src={image2}
                        alt=""
                        className="h-52 w-full object-cover md:h-56"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row-reverse items-center justify-center gap-7 md:gap-0">
                  <div className="w-full md:w-5/12 md:pl-10 md:text-left flex md:justify-start">
                    <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-7 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
                      <h3 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-white">
                        For teachers and staff.
                      </h3>
                      <ul className="mt-6 space-y-3 pl-6 list-disc marker:text-[#60A5FA] marker:font-semibold marker:text-lg">
                        {[
                          'Reduction in conflict in the classroom, with knock on effects for staff retention and wellbeing.',
                          'Greater confidence responding to neurodivergent pupils.',
                          'Reduced workload pressure on SENDCos and pastoral leads.',
                          'Stronger relationships between teachers / parents and pastoral teams.',
                        ].map((text) => (
                          <li
                            key={text}
                            className="text-sm md:text-base text-white/80 leading-relaxed"
                          >
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0B1020] shadow-[0_0_0_10px_rgba(0,0,0,0.35)]">
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#60A5FA' }}
                      aria-hidden
                    >
                      volunteer_activism
                    </span>
                  </div>

                  <div className="w-full md:w-5/12 md:pr-10">
                    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                      <img
                        src={image4}
                        alt=""
                        className="h-52 w-full object-cover md:h-56"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-center gap-7 md:gap-0">
                  <div className="w-full md:w-5/12 md:pr-10 md:text-right flex md:justify-end">
                    <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-7 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
                      <h3 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-white">
                        For the school as a whole.
                      </h3>
                      <ul className="mt-6 space-y-3 pl-6 md:text-left list-disc marker:text-[#9333EA] marker:font-semibold marker:text-lg">
                        <li className="text-sm md:text-base text-white/80 leading-relaxed">
                          Fewer behaviour incidents.
                        </li>
                        <li className="text-sm md:text-base text-white/80 leading-relaxed">
                          Improved attendance among pupils who previously
                          struggled to feel safe or understood.
                        </li>
                        <li className="text-sm md:text-base text-white/80 leading-relaxed">
                          A culture of understanding around neurodiversity.
                        </li>
                        <li className="text-sm md:text-base text-white/80 leading-relaxed">
                          Reduced reliance on exclusions and reactive behaviour
                          management.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0B1020] shadow-[0_0_0_10px_rgba(0,0,0,0.35)]">
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#9333EA' }}
                      aria-hidden
                    >
                      diversity_3
                    </span>
                  </div>

                  <div className="w-full md:w-5/12 md:pl-10">
                    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                      <img
                        src={image3}
                        alt=""
                        className="h-52 w-full object-cover md:h-56"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1020]/60 backdrop-blur-xl px-6 py-12 md:px-12 md:py-14 text-center shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 opacity-60" aria-hidden>
                <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA]/25 via-[#0B1020]/60 to-[#9333EA]/25" />
                <div className="absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#60A5FA]/20 blur-[90px]" />
                <div className="absolute -right-24 -bottom-24 h-[360px] w-[360px] rounded-full bg-[#9333EA]/20 blur-[90px]" />
              </div>

              <div className="relative">
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                  Ready to start your journey?
                </h3>
                <p className="mt-4 text-sm md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                  Book a discovery call or request a sample report to see how
                  Mind Sync supports staff confidence and inclusive practice.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/mind-sync-school-discovery-call"
                    className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm md:text-base font-semibold text-black transition-all duration-300 hover:opacity-95"
                    style={{
                      background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
                    }}
                  >
                    Book a Mind Sync School Discovery Call
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '20px' }}
                      aria-hidden
                    >
                      arrow_forward
                    </span>
                  </Link>

                  <Link
                    to="/sample-school-report"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/0 px-8 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:bg-white/10"
                  >
                    Request a Sample School Report
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '20px' }}
                      aria-hidden
                    >
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MindSyncForSchools;
