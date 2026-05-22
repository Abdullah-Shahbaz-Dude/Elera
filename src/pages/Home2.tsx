import type { ReactNode } from 'react';
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
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

function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${
        className ?? ''
      } transition-all duration-700 ease-out will-change-[transform,opacity] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

type Principle = {
  title: string;
  body: string;
};

type ValueItem = {
  title: string;
  body: string;
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
        title: 'Insight should lead to change',
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

  const valueIcons = useMemo<string[]>(
    () => [
      'psychology',
      'science',
      'bolt',
      'visibility',
      'groups',
      'manage_search',
    ],
    []
  );

  const goals = useMemo<ValueItem[]>(
    () => [
      {
        title:
          'Help Schools and Parents Create Better Understanding Around Neurodiversity',
        body: 'Helping schools and families create environments where neurodivergent children feel understood and supported.',
      },
      {
        title: 'Help Organisations Understand and Use Different Thinking',
        body: 'Supporting organisations to adapt to digital change, AI, innovation, and the future of work through better understanding of people, thinking styles, and hidden strengths.',
      },
    ],
    []
  );

  const [openValueIndex, setOpenValueIndex] = useState<number | null>(null);
  const [openGoalId, setOpenGoalId] = useState<string | undefined>('goal-0');

  return (
    <main className="pt-0 bg-black">
      <HeroSectionHome2 />
      {/* Goals & Values */}
      <section className="relative w-full overflow-hidden bg-black py-12 md:py-24 lg:py-28 ">
        <div className="absolute right-1/4 top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.18)] to-[rgba(147,51,234,0.18)] blur-[380px]"></div>
        <div className="absolute left-1/4 bottom-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.18)] to-[rgba(147,51,234,0.18)] blur-[380px]"></div>

        <div className="relative container mx-auto px-4 md:px-6 z-10">
          <div className="mx-auto max-w-[1960px]">
            <Reveal className="mx-auto max-w-4xl">
              <SectionTitle title="Our Goals " center />
            </Reveal>

            <Accordion.Root
              type="single"
              collapsible
              value={openGoalId}
              onValueChange={(v: string) => setOpenGoalId(v || undefined)}
              className="grid gap-6 md:gap-8 md:grid-cols-2 mb-12 md:mb-14 items-stretch"
              style={{ overflowAnchor: 'none' }}
            >
              {goals.map((g, idx) => {
                const iconName = idx === 0 ? 'diversity_3' : 'work_history';
                const itemValue = `goal-${idx}`;
                return (
                  <Reveal key={g.title} delay={idx * 90} className="h-full">
                    <Accordion.Item value={itemValue} className="h-full">
                      <div
                        className="relative h-full rounded-2xl p-[2px]"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(96,165,250,0.78), rgba(147,51,234,0.78))',
                        }}
                      >
                        <div
                          className="group relative h-full rounded-2xl border border-white/10 bg-[#0B1020]/90 backdrop-blur-md p-8 md:p-10 transition-all duration-300 hover:border-white/20 hover:bg-[#0B1020]/90"
                          style={{ boxShadow: '0 18px 55px rgba(0,0,0,0.45)' }}
                        >
                          <Accordion.Header>
                            <Accordion.Trigger className="group w-full text-left focus:outline-none">
                              <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                  <div className="flex items-center">
                                    <span
                                      className="material-symbols-outlined"
                                      style={{
                                        color: '#60A5FA',
                                        fontSize: '44px',
                                      }}
                                      aria-hidden
                                    >
                                      {iconName}
                                    </span>
                                  </div>

                                  <div className="mt-5 text-left text-white font-semibold text-xl md:text-2xl leading-snug">
                                    {g.title}
                                  </div>
                                </div>

                                <span
                                  className="material-symbols-outlined mt-1 transition-transform duration-150 ease-in-out text-white/70 group-hover:text-white group-data-[state=open]:rotate-180"
                                  style={{ fontSize: '34px' }}
                                  aria-hidden
                                >
                                  expand_more
                                </span>
                              </div>
                            </Accordion.Trigger>
                          </Accordion.Header>

                          <Accordion.Content className="overflow-hidden will-change-[height] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            <div className="pt-6">
                              <p className="text-white/70 leading-relaxed text-base md:text-lg text-left max-w-[34rem]">
                                {g.body}
                              </p>
                            </div>
                          </Accordion.Content>
                        </div>
                      </div>
                    </Accordion.Item>
                  </Reveal>
                );
              })}
            </Accordion.Root>

            <div>
              <Reveal className="mt-20 md:mt-32 lg:mt-36">
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
              </Reveal>

              <Reveal className="mt-20 md:mt-32 lg:mt-36">
                <SectionTitle title="Our Values" center />
                <div className="w-full">
                  {values.map((v, idx) => {
                    const isOpen = openValueIndex === idx;
                    const iconName = valueIcons[idx] ?? 'psychology';
                    return (
                      <Reveal key={v.title} delay={idx * 90} className="w-full">
                        <div className="border-b border-white/10 overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenValueIndex((cur) =>
                                cur === idx ? null : idx
                              )
                            }
                            className="group w-full flex items-center justify-between gap-6 py-8 md:py-10 text-left focus:outline-none"
                            aria-expanded={isOpen}
                          >
                            <div className="flex items-center gap-4">
                              <span
                                className="material-symbols-outlined"
                                style={{ color: '#60A5FA', fontSize: '36px' }}
                                aria-hidden
                              >
                                {iconName}
                              </span>
                              <h3 className="text-white font-semibold text-xl md:text-2xl">
                                {v.title}
                              </h3>
                            </div>

                            <span
                              className={`material-symbols-outlined transition-transform duration-300 text-white/70 group-hover:text-white ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                              style={{ fontSize: '34px' }}
                              aria-hidden
                            >
                              expand_more
                            </span>
                          </button>

                          <div
                            className={`grid transition-[grid-template-rows] duration-150 ease-in-out will-change-[grid-template-rows] ${
                              isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="pb-8 md:pb-10 pl-12 md:pl-16">
                                <p
                                  className={`text-white/70 leading-relaxed text-lg md:text-xl max-w-5xl transition-all duration-150 ease-in-out will-change-[transform,opacity] ${
                                    isOpen
                                      ? 'opacity-100 translate-y-0'
                                      : 'opacity-0 -translate-y-1'
                                  }`}
                                >
                                  {v.body}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Offer */}
      <section className="relative w-full overflow-hidden bg-black py-12 md:py-24 lg:py-28 -mt-20">
        <div className="relative container mx-auto px-4 md:px-6 z-10">
          <div className="mx-auto max-w-[1960px]">
            <Reveal>
              <SectionTitle title="Our Offer" center />
            </Reveal>

            <div className="grid gap-6 md:gap-10 lg:grid-cols-2">
              <Reveal delay={0} className="group relative w-full">
                <div
                  className="rounded-[2.5rem] p-[2px]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(96,165,250,0.60), rgba(147,51,234,0.60))',
                  }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    // onClick={() => navigate('/our-services/mind-sync')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        // navigate('/our-services/mind-sync');
                      }
                    }}
                    className="relative overflow-hidden rounded-[2.5rem] h-[520px] md:h-[600px] cursor-pointer bg-[#0B1020]/80 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <img
                      src={shutterstock1717584028}
                      alt="Mind Sync collaborative learning"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 668px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 space-y-5 md:space-y-6">
                      <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                        <span
                          className="bg-clip-text text-transparent"
                          style={{
                            backgroundImage:
                              'linear-gradient(135deg, #60A5FA, #9333EA)',
                          }}
                        >
                          Mind Sync
                        </span>
                      </h3>
                      <div className="-mt-2 text-base md:text-lg font-semibold text-white/85">
                        For School Staff and Parents
                      </div>
                      <p className="text-sm md:text-base text-white/80 max-w-md leading-relaxed">
                        Helping society understand neurodiversity.
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          // navigate('/our-services/mind-sync');
                        }}
                        className="inline-flex items-center gap-3 rounded-full px-6 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold text-white transition-all hover:gap-4"
                        style={{
                          background:
                            'linear-gradient(135deg, #60A5FA, #9333EA)',
                          boxShadow: '0 10px 30px rgba(96, 165, 250, 0.35)',
                        }}
                      >
                        {/* Explore Mind Sync */}
                        Explore More
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: '20px' }}
                        >
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120} className="group relative w-full">
                <div
                  className="rounded-[2.5rem] p-[2px]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(96,165,250,0.60), rgba(147,51,234,0.60))',
                  }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate('/future-sync')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate('/future-sync');
                      }
                    }}
                    className="relative overflow-hidden rounded-[2.5rem] h-[520px] md:h-[600px] cursor-pointer bg-[#0B1020]/80 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <img
                      src={shutterstock2291389905}
                      alt="Future Sync digital transformation"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 668px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 space-y-5 md:space-y-6">
                      <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                        <span
                          className="bg-clip-text text-transparent"
                          style={{
                            backgroundImage:
                              'linear-gradient(135deg, #60A5FA, #9333EA)',
                          }}
                        >
                          Future Sync
                        </span>
                      </h3>
                      <div className="-mt-2 text-base md:text-lg font-semibold text-white/85">
                        For Organisations
                      </div>
                      <p className="text-sm md:text-base text-white/80 max-w-md leading-relaxed">
                        Helping organisations and their people get ready for the
                        future of work.
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/future-sync');
                        }}
                        className="inline-flex items-center gap-3 rounded-full px-6 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold text-white transition-all hover:gap-4"
                        style={{
                          background:
                            'linear-gradient(135deg, #60A5FA, #9333EA)',
                          boxShadow: '0 10px 30px rgba(96, 165, 250, 0.25)',
                        }}
                      >
                        {/* Explore Future Sync */}
                        Explore More
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: '20px' }}
                        >
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
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
