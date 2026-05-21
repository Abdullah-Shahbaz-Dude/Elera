import type { ReactNode } from 'react';
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
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
            <Reveal className="mx-auto max-w-4xl">
              <SectionTitle
                title="Our Goals & Values"
                subtitle="ELARA was founded by neurodiverse individuals to help society better understand neurodiversity and prepare for a digital future that depends on different thinking, adaptability and valuing different minds."
                center
              />
            </Reveal>

            <div className="grid gap-6 md:gap-8 md:grid-cols-2 mb-12 md:mb-14">
              <Reveal delay={0} className="h-full">
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
                      Creating awareness, reducing stigma, and building
                      inclusive environments in education and everyday life.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={110} className="h-full">
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
              </Reveal>
            </div>

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
                <SectionTitle
                  title="Our Values"
                  subtitle="Built on psychology, insight, and a deeper understanding of human thinking."
                  center
                />
                <div className="grid gap-4">
                  {values.map((v, idx) => (
                    <Reveal key={v.title} delay={idx * 90} className="w-full">
                      <button
                        type="button"
                        onClick={() => setOpenValue(v)}
                        className="group w-full text-left rounded-2xl border border-white/15 bg-[#0B1020]/60 backdrop-blur-md p-6 md:p-7 shadow-[0_18px_55px_rgba(0,0,0,0.55)] hover:border-white/25 hover:bg-[#0B1020]/70 hover:shadow-[0_22px_70px_rgba(0,0,0,0.65)] hover:-translate-y-[1px] transition-all duration-200"
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="text-white font-semibold text-base md:text-lg">
                            {v.title}
                          </div>
                          <div
                            className="h-10 w-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/7 group-hover:bg-white/10 transition"
                            aria-hidden
                          >
                            <svg
                              className="w-5 h-5 text-white/80"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="mt-2 text-white/60 text-sm">
                          Click to open
                        </div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
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
                    onClick={() => navigate('/our-services/mind-sync')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate('/our-services/mind-sync');
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
                      <div className="text-xs md:text-sm font-semibold tracking-wider text-white/80">
                        ASSESSMENT & LEARNING
                      </div>
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
                      <p className="text-sm md:text-base text-white/80 max-w-md leading-relaxed">
                        Helping society understand neurodiversity. Clinical
                        tools and empathetic education frameworks.
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/our-services/mind-sync');
                        }}
                        className="inline-flex items-center gap-3 rounded-full px-6 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold text-white transition-all hover:gap-4"
                        style={{
                          background:
                            'linear-gradient(135deg, #60A5FA, #9333EA)',
                          boxShadow: '0 10px 30px rgba(96, 165, 250, 0.35)',
                        }}
                      >
                        Explore Mind Sync
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
                      <div className="text-xs md:text-sm font-semibold tracking-wider text-white/80">
                        FUTURE-PROOF & STRATEGIC
                      </div>
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
                      <p className="text-sm md:text-base text-white/80 max-w-md leading-relaxed">
                        Helping organisations and their people get ready for the
                        future of work by unlocking cognitive diversity.
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
                        Explore Future Sync
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
