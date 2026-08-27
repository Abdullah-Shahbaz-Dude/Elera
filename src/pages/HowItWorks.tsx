import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo/Logo';
import { sideViewWomanFaceScan } from '@/assets/images';

export default function HowItWorks() {
  const [scrolled, setScrolled] = useState(false);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bulletIcon = (
    <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#1E4FBF] to-[#2E7CF6] flex items-center justify-center flex-shrink-0">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );

  const toggleAccordion = (id: string) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className="min-h-screen bg-white text-[#1F2937]"
      style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
    >
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-lg border-b border-[#E5E9F0]'
              : 'bg-transparent border-b border-transparent'
          }`}
        >
          <div className="w-full px-6 sm:px-8 md:pl-[63px] md:pr-10 h-24 py-14 flex items-center justify-between">
            <Logo to="/" className="h-10 w-auto brightness-100 invert-0" />

            <nav
              className={`hidden md:flex items-center gap-6 lg:gap-8 text-[14px] font-semibold transition-colors duration-300 ${
                scrolled ? 'text-[#4B5563]' : 'text-[#0447b2]'
              }`}
            >
              <Link
                to="/"
                className={
                  scrolled ? 'hover:text-[#2E7CF6]' : 'hover:text-[#0565f4]'
                }
              >
                Home
              </Link>
              <Link
                to="/how-it-works"
                className={scrolled ? 'text-[#2E7CF6]' : 'text-[#0565f4]'}
              >
                How it works
              </Link>
              <Link
                to="/ofsted"
                className={
                  scrolled ? 'hover:text-[#2E7CF6]' : 'hover:text-[#0565f4]'
                }
              >
                Ofsted
              </Link>
              <Link
                to="/meet-the-team"
                className={
                  scrolled ? 'hover:text-[#2E7CF6]' : 'hover:text-[#0565f4]'
                }
              >
                Meet the team
              </Link>
              <Link
                to="/faq"
                className={
                  scrolled ? 'hover:text-[#2E7CF6]' : 'hover:text-[#0565f4]'
                }
              >
                FAQs
              </Link>
              <Link
                to="/contact"
                className={
                  scrolled ? 'hover:text-[#2E7CF6]' : 'hover:text-[#0565f4]'
                }
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-white pt-28 md:pt-32">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#6BA3F8]/10 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#2E7CF6]/5 blur-3xl pointer-events-none" />

          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${sideViewWomanFaceScan})` }}
            />
            <div className="absolute inset-0 " />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-white/10" />
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-10 lg:pt-14 pb-4 lg:pb-6 relative text-center">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#2E7CF6]" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#1E4FBF]">
                How it works
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#2E7CF6]" />
            </div>

            <h1 className="text-[40px] md:text-[56px] lg:text-[64px] leading-[1.02] text-[#0A1F44] font-extrabold mb-6 tracking-[-0.04em]">
              How Mind Sync{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #1E4FBF 0%, #2E7CF6 60%, #6BA3F8 100%)',
                }}
              >
                works
              </span>
              .
            </h1>
            <p className="text-[17px] md:text-[18px] leading-[1.7] text-[#4B5563] max-w-2xl mx-auto">
              The philosophy, the process, and the five parts that make it up.
            </p>
          </div>
        </section>

        <section className="bg-white pt-12 lg:pt-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 pb-16 lg:pb-20">
            <div className="text-center mb-10">
              <h2 className="text-[32px] md:text-[44px] leading-[1.05] text-[#0A1F44] font-extrabold mb-4 tracking-[-0.04em]">
                The Three{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #1E4FBF 0%, #2E7CF6 60%, #6BA3F8 100%)',
                  }}
                >
                  Rs
                </span>
                .
              </h2>
              <p className="text-[16px] text-[#1E4FBF] font-semibold uppercase tracking-wider">
                How Mind Sync thinks about neurodiversity
              </p>
            </div>

            <p className="text-[17px] md:text-[18px] leading-[1.75] text-[#4B5563] text-center mb-12 max-w-3xl mx-auto">
              Every child may experience the classroom differently. What looks
              like difficult behaviour could often be a child trying to tell us
              something, without the words to say it. Mind Sync helps school
              staff work through three steps, in order, before they respond.
            </p>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-start gap-5 pb-6 border-b border-[#E5E9F0]">
                <h3 className="text-[26px] font-extrabold text-[#0A1F44] tracking-[-0.03em] w-40 flex-shrink-0">
                  Recognise
                </h3>
                <p className="text-[16px] leading-relaxed text-[#4B5563] pt-1.5">
                  that neurodivergent children may experience and understand a
                  situation differently.
                </p>
              </div>
              <div className="flex items-start gap-5 pb-6 border-b border-[#E5E9F0]">
                <h3 className="text-[26px] font-extrabold text-[#0A1F44] tracking-[-0.03em] w-40 flex-shrink-0">
                  Reflect
                </h3>
                <p className="text-[16px] leading-relaxed text-[#4B5563] pt-1.5">
                  on how I am seeing the situation, and what I might be missing.
                </p>
              </div>
              <div className="flex items-start gap-5">
                <h3 className="text-[26px] font-extrabold text-[#0A1F44] tracking-[-0.03em] w-40 flex-shrink-0">
                  Respond
                </h3>
                <p className="text-[16px] leading-relaxed text-[#4B5563] pt-1.5">
                  to the child's needs, not just the behaviour.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white pt-8">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="space-y-20 lg:space-y-32">
              <div>
                <div className="flex items-start gap-6 mb-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E4FBF] to-[#2E7CF6] flex items-center justify-center flex-shrink-0 text-white font-extrabold text-[20px]">
                    1
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#1E4FBF] mb-2">
                      Voice-gathering
                    </div>
                    <h3 className="text-[28px] md:text-[36px] leading-[1.1] text-[#0A1F44] font-extrabold tracking-[-0.03em]">
                      Assessment, Pupil and Parent Voice
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Staff.',
                      icon: (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                      ),
                      body: 'All teaching staff complete a short assessment. It helps us understand what good practice is already in place, and where we could offer some support.',
                    },
                    {
                      title: 'Pupils.',
                      icon: (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="8" r="4" />
                          <path d="M20 21a8 8 0 0 0-16 0" />
                        </svg>
                      ),
                      body: 'Selected pupils are asked to complete an online assessment to help us understand how they experience the classroom, and to give them an opportunity to share feedback on how things could be done differently.',
                    },
                    {
                      title: 'Parents and carers.',
                      icon: (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      ),
                      body: "Selected parents and carers are asked to complete an online assessment on how they feel the school is doing at meeting their child's needs.",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="bg-white rounded-2xl p-8 border border-[#E5E9F0] shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08),0_2px_6px_-2px_rgba(10,31,68,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#6BA3F8]"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E4FBF] to-[#2E7CF6] flex items-center justify-center mb-6">
                        {card.icon}
                      </div>
                      <h4 className="text-[20px] font-bold text-[#0A1F44] mb-3 tracking-[-0.03em]">
                        {card.title}
                      </h4>
                      <p className="text-[15px] leading-relaxed text-[#4B5563]">
                        {card.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 bg-[#EEF3FA]/60 rounded-2xl p-6 lg:p-8 border border-[#E5E9F0]">
                  <p className="text-[16px] leading-relaxed text-[#4B5563]">
                    This process is{' '}
                    <span className="font-bold text-[#0A1F44]">
                      not about finding fault
                    </span>
                    . It is about highlighting good practice and offering help
                    and support if required. We believe that when all three
                    voices are synced, the school environment improves for
                    everyone.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E4FBF] to-[#2E7CF6] flex items-center justify-center flex-shrink-0 text-white font-extrabold text-[20px]">
                      2
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#1E4FBF] mb-2">
                        For each teacher
                      </div>
                      <h3 className="text-[28px] md:text-[36px] leading-[1.1] text-[#0A1F44] font-extrabold tracking-[-0.03em]">
                        The Individual Teacher Report
                      </h3>
                    </div>
                  </div>

                  <p className="text-[17px] leading-[1.75] text-[#4B5563] mb-8">
                    Every teacher receives their own report from the assessment.
                    It is private to them and not shared with anyone else in the
                    school.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        strong: 'A six-domain snapshot',
                        rest: 'of their inclusive practice.',
                      },
                      {
                        strong: 'Two clear strengths',
                        rest: 'with practical examples of what those strengths do for pupils.',
                      },
                      {
                        strong: 'Two focus areas',
                        rest: 'with next steps they can try this week.',
                      },
                      {
                        strong: 'Recommended training modules',
                        rest: 'tailored to their responses.',
                      },
                      {
                        strong: 'One small thing',
                        rest: 'to try in the next lesson they teach.',
                      },
                    ].map((row) => (
                      <div key={row.strong} className="flex items-start gap-4">
                        <div className="mt-1">{bulletIcon}</div>
                        <p className="text-[15px] leading-relaxed text-[#1F2937]">
                          <span className="font-bold text-[#0A1F44]">
                            {row.strong}
                          </span>{' '}
                          {row.rest}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
                  <div className="shadow-[0_10px_40px_-12px_rgba(10,31,68,0.15)] rounded-2xl overflow-hidden bg-white w-[340px]">
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-[#1E4FBF] via-[#2E7CF6] to-[#6BA3F8] overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <svg
                          className="absolute -top-10 -right-10 w-64 h-64"
                          viewBox="0 0 200 200"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="60"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="40"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="20"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                      <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-white/25 rounded-md flex items-center justify-center backdrop-blur">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              >
                                <path d="M12 2v20M2 12h20" />
                              </svg>
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">
                              Elara · Mind Sync
                            </span>
                          </div>
                          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/70 mb-1">
                            Confidential
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/70 mb-2">
                            Report
                          </p>
                          <h4 className="text-[26px] font-extrabold tracking-[-0.03em] leading-tight mb-1">
                            Individual
                          </h4>
                          <h4 className="text-[26px] font-extrabold tracking-[-0.03em] leading-tight mb-6">
                            Teacher Report
                          </h4>
                          <div className="pt-4 border-t border-white/25">
                            <p className="text-[11px] text-white/70">
                              Prepared for
                            </p>
                            <p className="text-[14px] font-semibold">
                              [Teacher name]
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-5 flex justify-center">
                  <div className="shadow-[0_10px_40px_-12px_rgba(10,31,68,0.15)] rounded-2xl overflow-hidden bg-white w-[340px]">
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-[#0A1F44] via-[#12295A] to-[#1E4FBF] overflow-hidden">
                      <div className="absolute inset-0 opacity-15">
                        <svg
                          className="absolute -bottom-10 -left-10 w-72 h-72"
                          viewBox="0 0 200 200"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M40 60 L100 100 L160 60"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M40 100 L100 140 L160 100"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M40 140 L100 180 L160 140"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                          />
                          <circle cx="40" cy="60" r="3" fill="white" />
                          <circle cx="100" cy="100" r="3" fill="white" />
                          <circle cx="160" cy="60" r="3" fill="white" />
                          <circle cx="40" cy="100" r="3" fill="white" />
                          <circle cx="100" cy="140" r="3" fill="white" />
                          <circle cx="160" cy="100" r="3" fill="white" />
                        </svg>
                      </div>
                      <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-white/25 rounded-md flex items-center justify-center backdrop-blur">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
                              </svg>
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">
                              Elara · Mind Sync
                            </span>
                          </div>
                          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#6BA3F8] mb-1">
                            For Senior Leadership
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#6BA3F8] mb-2">
                            Report
                          </p>
                          <h4 className="text-[26px] font-extrabold tracking-[-0.03em] leading-tight mb-1">
                            Whole School
                          </h4>
                          <h4 className="text-[26px] font-extrabold tracking-[-0.03em] leading-tight mb-6">
                            Report
                          </h4>
                          <div className="pt-4 border-t border-white/25">
                            <p className="text-[11px] text-white/70">
                              Mapped to
                            </p>
                            <p className="text-[13px] font-semibold leading-tight">
                              Ofsted Inclusion Framework
                              <br />
                              <span className="text-[11px] font-medium text-white/70">
                                November 2025
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0A1F44] to-[#12295A] flex items-center justify-center flex-shrink-0 text-white font-extrabold text-[20px]">
                      3
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#0A1F44] mb-2">
                        For senior leadership
                      </div>
                      <h3 className="text-[28px] md:text-[36px] leading-[1.1] text-[#0A1F44] font-extrabold tracking-[-0.03em]">
                        The Whole School Report
                      </h3>
                    </div>
                  </div>

                  <p className="text-[17px] leading-[1.75] text-[#4B5563] mb-8">
                    One report, written for senior leadership and mapped to the
                    November 2025 Ofsted Education Inspection Framework.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      'Executive summary for governors.',
                      'Ofsted inclusion descriptor map.',
                      'Staff capability across six inclusion domains.',
                      'Pupil and parent feedback.',
                      'Where staff, pupils and parents see things differently.',
                      'Prioritised whole-school action plan, tied to the evidence.',
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-4">
                        <div className="mt-1">{bulletIcon}</div>
                        <p className="text-[15px] leading-relaxed text-[#1F2937]">
                          <span className="font-bold text-[#0A1F44]">
                            {t.split(' ')[0]}
                          </span>{' '}
                          {t.substring(t.indexOf(' ') + 1)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`bg-white border rounded-[20px] overflow-hidden transition-all duration-300 ${
                      openAccordionId === 'whole-school-versions'
                        ? 'border-[#2E7CF6] shadow-[0_12px_30px_-8px_rgba(46,124,246,0.18)]'
                        : 'border-[#E5E9F0]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion('whole-school-versions')}
                      aria-expanded={
                        openAccordionId === 'whole-school-versions'
                      }
                      className="w-full flex items-center gap-5 px-7 py-6 text-left"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1E4FBF] to-[#2E7CF6] flex items-center justify-center flex-shrink-0">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <path d="M9 3v18" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="text-[20px] font-extrabold tracking-[-0.02em] leading-[1.2] text-[#0A1F44]">
                          Two versions available
                        </span>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] whitespace-nowrap">
                        {openAccordionId === 'whole-school-versions'
                          ? ''
                          : 'Read more'}
                      </span>
                      <span
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          openAccordionId === 'whole-school-versions'
                            ? 'bg-gradient-to-br from-[#1E4FBF] to-[#2E7CF6] rotate-180'
                            : 'bg-[#F1F4F9]'
                        }`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={
                            openAccordionId === 'whole-school-versions'
                              ? 'white'
                              : '#6B7280'
                          }
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    {openAccordionId === 'whole-school-versions' && (
                      <div className="px-7 pb-7">
                        <p className="text-[15px] leading-[1.7] text-[#4B5563]">
                          The full report brings together all three voices. A
                          staff-only version is available for schools that start
                          with staff alone. We help you choose at the planning
                          meeting.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-6 mb-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E4FBF] to-[#2E7CF6] flex items-center justify-center flex-shrink-0 text-white font-extrabold text-[20px]">
                    4
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#1E4FBF] mb-2">
                      Development
                    </div>
                    <h3 className="text-[28px] md:text-[36px] leading-[1.1] text-[#0A1F44] font-extrabold tracking-[-0.03em]">
                      Interactive training for teachers
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7">
                    <p className="text-[17px] leading-[1.75] text-[#4B5563] mb-6">
                      Teachers get access to interactive, scenario-based
                      training. Each module walks through a classroom scenario
                      that has been developed in consultation with pupils and
                      teachers.
                    </p>

                    <div
                      className={`bg-white border rounded-[20px] overflow-hidden transition-all duration-300 ${
                        openAccordionId === 'delivery'
                          ? 'border-[#2E7CF6] shadow-[0_12px_30px_-8px_rgba(46,124,246,0.18)]'
                          : 'border-[#E5E9F0]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleAccordion('delivery')}
                        aria-expanded={openAccordionId === 'delivery'}
                        className="w-full flex items-center gap-5 px-7 py-6 text-left"
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1E4FBF] to-[#2E7CF6] flex items-center justify-center flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="text-[20px] font-extrabold tracking-[-0.02em] leading-[1.2] text-[#0A1F44]">
                            Your choice of delivery
                          </span>
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] whitespace-nowrap">
                          {openAccordionId === 'delivery' ? '' : 'Read more'}
                        </span>
                        <span
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            openAccordionId === 'delivery'
                              ? 'bg-gradient-to-br from-[#1E4FBF] to-[#2E7CF6] rotate-180'
                              : 'bg-[#F1F4F9]'
                          }`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={
                              openAccordionId === 'delivery'
                                ? 'white'
                                : '#6B7280'
                            }
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </button>
                      {openAccordionId === 'delivery' && (
                        <div className="px-7 pb-7">
                          <p className="text-[15px] leading-[1.7] text-[#4B5563]">
                            Online at each teacher's own pace, in-house
                            delivered by the Mind Sync team, or a mix of the
                            two.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative bg-gradient-to-br from-[#0A1F44] to-[#12295A] rounded-2xl overflow-hidden shadow-[0_10px_40px_-12px_rgba(10,31,68,0.15)] p-6 aspect-[4/3] flex flex-col justify-between text-white">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-9 h-9 rounded-lg bg-[#2E7CF6]/25 backdrop-blur flex items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22 6 12 13 2 6" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6BA3F8]">
                              Module 01
                            </div>
                            <div className="text-[11px] font-semibold text-white/80">
                              15 minutes
                            </div>
                          </div>
                        </div>
                        <h4 className="text-[22px] font-extrabold tracking-[-0.03em] leading-tight mb-2">
                          The Three Second Pause
                        </h4>
                        <p className="text-[13px] text-white/70 leading-relaxed">
                          Reading behaviour in the moment. How to tell the
                          difference between distress, defiance and overwhelm.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                            Progress
                          </span>
                          <span className="text-[11px] font-bold text-[#6BA3F8]">
                            4 of 5
                          </span>
                        </div>
                        <div className="h-1 bg-white/15 rounded-full overflow-hidden">
                          <div className="h-full w-4/5 bg-gradient-to-r from-[#6BA3F8] to-[#2E7CF6]" />
                        </div>
                      </div>

                      <div className="absolute -right-10 -bottom-10 opacity-15">
                        <svg
                          width="180"
                          height="180"
                          viewBox="0 0 100 100"
                          fill="none"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="white"
                            strokeWidth="0.8"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="35"
                            stroke="white"
                            strokeWidth="0.8"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="25"
                            stroke="white"
                            strokeWidth="0.8"
                          />
                        </svg>
                      </div>
                    </div>

                    <p className="text-center text-[12px] text-[#6B7280] italic mt-4">
                      Preview of one training module
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-7">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E4FBF] to-[#2E7CF6] flex items-center justify-center flex-shrink-0 text-white font-extrabold text-[20px]">
                      5
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#1E4FBF] mb-2">
                        Ongoing progress
                      </div>
                      <h3 className="text-[28px] md:text-[36px] leading-[1.1] text-[#0A1F44] font-extrabold tracking-[-0.03em]">
                        The Review
                      </h3>
                    </div>
                  </div>

                  <p className="text-[17px] leading-[1.75] text-[#4B5563]">
                    After twelve months we repeat the process. Providing the
                    school with the data to show distance travelled, how much
                    staff understanding has improved, where pupil experience has
                    changed, and where to focus next.
                  </p>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br from-[#1E4FBF] via-[#2E7CF6] to-[#6BA3F8] shadow-[0_10px_40px_-12px_rgba(10,31,68,0.15)] overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20">
                      <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >
                        <circle
                          cx="100"
                          cy="100"
                          r="90"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="50"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>

                    <div className="relative text-center text-white p-8">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto mb-4"
                      >
                        <path d="M23 4v6h-6" />
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                      </svg>
                      <p className="text-[13px] font-bold tracking-[0.15em] uppercase text-white/80 mb-2">
                        The same assessment
                      </p>
                      <p className="text-[22px] font-extrabold tracking-[-0.03em] leading-tight">
                        Repeated after twelve months.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#1E4FBF] via-[#2E7CF6] to-[#6BA3F8] p-12 lg:p-16 text-center shadow-[0_20px_60px_-20px_rgba(30,79,191,0.35)]">
              <div className="relative">
                <h3 className="text-[30px] md:text-[42px] leading-tight text-white font-extrabold tracking-[-0.03em] mb-5">
                  Book a call with us.
                </h3>
                <p className="text-[16px] text-white/85 max-w-xl mx-auto mb-9 leading-relaxed">
                  A short conversation about your school, and whether Mind Sync
                  would be useful.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="bg-white text-[#0A1F44] font-bold px-7 py-3.5 rounded-full inline-flex items-center gap-2 hover:bg-[#F7F9FC] transition text-[14px] uppercase tracking-wide"
                  >
                    Book a discovery call
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-[#E5E9F0] pt-12 pb-8">
        <div className="w-full px-6 sm:px-8 md:pl-[63px] md:pr-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8">
            <Logo to="/" className="h-10 w-auto brightness-100 invert-0" />
            <div className="flex items-center gap-6 text-[13px] text-[#6B7280] font-medium">
              <Link to="/privacy" className="hover:text-[#2E7CF6]">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-[#2E7CF6]">
                Terms
              </Link>
              <Link to="/contact" className="hover:text-[#2E7CF6]">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-[#E5E9F0] pt-6">
            <p className="text-[12px] text-[#6B7280] text-center font-medium">
              Mind Sync is an Elara product. © Elara 2026. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
