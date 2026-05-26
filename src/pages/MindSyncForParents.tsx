import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Accordion from '@radix-ui/react-accordion';
import Footer from '@/components/Footer/Footer';
import { shutterstock1717584028 } from '@/assets/images';

const MindSyncForParents = () => {
  const steps = useMemo(
    () => [
      {
        step: 1,
        title: 'Assessment',
        preview:
          'A short online assessment covering behaviour, routines, school experience, and family dynamics.',
        icon: 'assignment',
        modalTitle: 'Step 1 - Assessment (Pop Up Bar)',
        modalIntro: 'Parents complete a short online assessment covering:',
        modalBullets: [
          'Their child’s behaviour, emotions, routines, and school experiences',
          'Family dynamics and day to day challenges',
          'Their own parenting approach and responses',
        ],
      },
      {
        step: 2,
        title: 'Personalised Insight',
        preview:
          'A personalised report explaining patterns, how neurodiversity may be influencing behaviour, and practical responses.',
        icon: 'insights',
        modalTitle: 'Step 2 - Personalised Insight (Pop Up Bar)',
        modalIntro: 'Parents receive a personalised report explaining:',
        modalBullets: [
          'The patterns currently happening within the family',
          'How neurodiversity may be influencing behaviour, emotions, communication, and reactions',
          'Practical ways to respond differently and reduce conflict at home',
        ],
        modalSecondaryTitle:
          'Where two parents complete the assessment for the same child:',
        modalSecondaryBullets: [
          'A third combined report is generated highlighting differences in parenting styles, communication approaches, consistency, and areas that may unintentionally create tension or mixed messages for the child',
        ],
      },
      {
        step: 3,
        title: 'Training & Practical Support',
        preview:
          'Short training modules, downloadable guides, and step-by-step strategies for everyday family life.',
        icon: 'school',
        modalTitle: 'Step 3 - Training & Practical Support (Pop Up Bar)',
        modalIntro: 'Parents receive access to:',
        modalBullets: [
          'Short training modules designed to be watched in around 10 minutes and applied immediately',
          'Downloadable practical guides covering Neurodiversity related parenting challenges',
          'Step-by step strategies to support communication, emotional regulation, routines, behaviour, school stress, and everyday family life',
        ],
      },
    ],
    []
  );

  const [openStep, setOpenStep] = useState<number | null>(null);
  const activeStep = steps.find((s) => s.step === openStep) ?? null;

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
            src={shutterstock1717584028}
            alt="Mind Sync for Parents"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/25 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6 z-10 py-16 md:py-20">
          <div className="max-w-4xl">
            <p className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.22em] uppercase text-white/85">
              Personal
            </p>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                }}
              >
                Mind Sync for Parents
              </span>
            </h1>
            <p className="mt-5 text-base md:text-xl text-white/80 leading-7 md:leading-relaxed max-w-3xl">
              Mind Sync for Parents is a direct service for families trying to
              understand and support a neurodivergent child (diagnosed or
              undiagnosed)
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm md:text-base font-semibold text-black transition-all duration-300 hover:opacity-95"
                style={{
                  background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
                }}
              >
                Enquire Now
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '20px' }}
                  aria-hidden
                >
                  arrow_forward
                </span>
              </Link>
              <Link
                to="/our-offer/mind-sync"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/0 px-7 py-3 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Back to Mind Sync Offer
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
      </section>

      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020]/40 to-black pointer-events-none" />

        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <header className="mb-10 md:mb-12 text-center">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/60">
                For families
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                When Behaviour Is Misunderstood, Managing behaviour can become
                harder
              </h2>
              <div
                className="mt-5 h-1 w-24 md:w-32 rounded-full mx-auto"
                style={{
                  background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                }}
              />
            </header>

            <Accordion.Root type="single" collapsible className="space-y-4">
              <Accordion.Item
                value="behaviour-drop"
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 px-5 py-5 md:px-6 md:py-6 text-left">
                    <span className="text-base md:text-lg font-semibold text-white">
                      When Behaviour Is Misunderstood, Managing behaviour can
                      become harder (Drop Down)
                    </span>
                    <span
                      className="material-symbols-outlined text-white/70 transition-transform duration-300 group-data-[state=open]:rotate-180"
                      style={{ fontSize: '28px' }}
                      aria-hidden
                    >
                      expand_more
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-5 pb-6 md:px-6">
                    <ul className="space-y-3 pl-6 list-disc marker:text-[#60A5FA] marker:font-semibold marker:text-lg">
                      <li className="text-sm md:text-base text-white/75 leading-7">
                        Up to 70% of parents report regular conflict at home
                        linked to behaviour they don’t fully understand.
                        <span className="ml-2 text-white/50 underline decoration-white/20 underline-offset-4">
                          (YoungMinds, 2023)
                        </span>
                      </li>
                      <li className="text-sm md:text-base text-white/75 leading-7">
                        Children with ADHD are significantly more likely to
                        experience low self-esteem and emotional dysregulation
                        when their behaviour is misunderstood.
                        <span className="ml-2 text-white/50 underline decoration-white/20 underline-offset-4">
                          (NICE, 2023)
                        </span>
                      </li>
                      <li className="text-sm md:text-base text-white/75 leading-7">
                        Over 50% of neurodivergent individuals report burnout
                        linked to masking and being misunderstood.
                        <span className="ml-2 text-white/50 underline decoration-white/20 underline-offset-4">
                          (CIPD, 2024)
                        </span>
                      </li>
                      <li className="text-sm md:text-base text-white/75 leading-7">
                        385,540 children were waiting for first contact from
                        community mental health services as of March 2025. Up
                        14.4% in a single year.
                        <span className="ml-2 text-white/50 underline decoration-white/20 underline-offset-4">
                          (BMA, 2025)
                        </span>
                      </li>
                    </ul>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>
      </section>
      <section className="relative py-16 md:py-20">
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <header className="mb-10 md:mb-12 text-center">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/60">
                Implementation
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                How Mind Sync For Parents Works
              </h2>
              <div
                className="mt-5 h-1 w-24 md:w-32 rounded-full mx-auto"
                style={{
                  background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                }}
              />
            </header>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {steps.map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setOpenStep(s.step)}
                    className="group relative text-left rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_80px_rgba(96,165,250,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/50"
                  >
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
                    <h3 className="relative text-lg font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="relative mt-2 text-sm text-white/75 leading-relaxed">
                      {s.preview}
                    </p>
                    <span className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
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

            {activeStep && (
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
                      {activeStep.icon}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {activeStep.modalTitle}
                  </h3>
                  <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
                    {activeStep.modalIntro}
                  </p>

                  <ul className="mt-4 space-y-3 pl-6 list-disc marker:text-[#60A5FA] marker:font-semibold marker:text-lg">
                    {activeStep.modalBullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-sm md:text-base text-white/75 leading-7"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {activeStep.modalSecondaryTitle &&
                    activeStep.modalSecondaryBullets && (
                      <>
                        <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed">
                          {activeStep.modalSecondaryTitle}
                        </p>
                        <ul className="mt-4 space-y-3 pl-6 list-disc marker:text-[#A78BFA] marker:font-semibold marker:text-lg">
                          {activeStep.modalSecondaryBullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="text-sm md:text-base text-white/75 leading-7"
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </>
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020]/40 to-black pointer-events-none" />

        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_22px_70px_rgba(0,0,0,0.45)]">
                <img
                  src={shutterstock1717584028}
                  alt=""
                  className="h-[420px] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/60">
                Results
              </p>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-white">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #60A5FA, #9333EA)',
                  }}
                >
                  Anticipated Outcomes
                </span>
              </h2>
              <div
                className="mt-5 h-1 w-24 md:w-32 rounded-full"
                style={{
                  background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                }}
              />

              <div className="mt-8 space-y-5">
                {[
                  {
                    title: 'Reduced conflict',
                    body: 'Reduced conflict and emotional escalation at home',
                  },
                  {
                    title: 'Greater consistency',
                    body: 'Greater consistency between parents and caregivers',
                  },
                  {
                    title: 'Better understanding',
                    body: 'Better understanding of the child’s needs and behaviour',
                  },
                  {
                    title: 'Increased confidence',
                    body: 'Increased confidence in handling challenging situations',
                  },
                  {
                    title: 'Stronger relationships',
                    body: 'Stronger communication and relationships within the family',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div
                      className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(96,165,250,0.22), rgba(147,51,234,0.16))',
                      }}
                      aria-hidden
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: '18px',
                          color: '#E9D5FF',
                          fontVariationSettings: "'FILL' 1",
                        }}
                        aria-hidden
                      >
                        check
                      </span>
                    </div>
                    <div>
                      <div className="text-sm md:text-base font-semibold text-white">
                        {item.title}
                      </div>
                      <div className="mt-1 text-sm md:text-base text-white/75 leading-7">
                        {item.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-12 md:py-14"
        style={{
          background:
            'linear-gradient(135deg, rgba(14, 88, 110, 0.92), rgba(7, 32, 55, 0.92))',
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#60A5FA]/20 blur-[90px]" />
          <div className="absolute -right-24 -bottom-24 h-[360px] w-[360px] rounded-full bg-[#9333EA]/20 blur-[90px]" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Ready to explore Mind Sync for your family?
            </h3>
            <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              Request more information or book a call to understand how Mind
              Sync supports families.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact-us"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm md:text-base font-semibold text-black transition-all duration-300 hover:opacity-95"
                style={{
                  background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
                }}
              >
                Enquire Now
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '20px' }}
                  aria-hidden
                >
                  arrow_forward
                </span>
              </Link>
              <Link
                to="/our-offer/mind-sync"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/0 px-7 py-3 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Back to Mind Sync Offer
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
      </section>
      <Footer />
    </main>
  );
};

export default MindSyncForParents;
