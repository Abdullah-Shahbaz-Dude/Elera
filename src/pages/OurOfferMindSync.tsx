import { Link } from 'react-router-dom';
import Footer from '@/components/Footer/Footer';
import {
  shutterstock1717584028,
  shutterstock2291389905,
} from '@/assets/images';
import hero from '@/assets/images/shutterstock_726121441.webp';

const OurOfferMindSync = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute right-1/4 top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.18)] to-[rgba(147,51,234,0.18)] blur-[380px]" />
      <div className="absolute left-1/4 bottom-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.18)] to-[rgba(147,51,234,0.18)] blur-[380px]" />

      <section className="relative min-h-[540px] overflow-hidden pt-32 md:pt-36">
        <div className="absolute inset-0 z-0">
          <img
            className="h-full w-full object-cover opacity-45"
            src={hero}
            alt="Mind Sync"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/15 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6 z-10 py-16 md:py-20 mt-52">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                }}
              >
                Mind Sync
              </span>
            </h1>
            <p className="mt-5 text-base md:text-xl text-white/80 leading-relaxed max-w-2xl">
              Mind Sync is an assessment and learning system for Schools and
              Parents
            </p>
          </div>
        </div>
      </section>

      {/* <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020]/40 to-black pointer-events-none" />

        <div className="relative container mx-auto px-4 md:px-6">
          <header className="mb-10 pb-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Neurodiversity is now part of everyday life.
            </h2>
            <div
              className="mt-5 h-1 w-24 md:w-32 rounded-full mx-auto"
              style={{
                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
              }}
            />
          </header>

          <div className="flex flex-col">
            <ul className="space-y-5 md:space-y-6 pl-6 max-w-5xl">
              <li className="flex items-start gap-4">
                <div
                  className="mt-[0.72rem] h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                    boxShadow: '0 0 14px rgba(96,165,250,0.30)',
                  }}
                  aria-hidden
                />
                <div>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed">
                    1.7 million pupils in England now have identified Special
                    Educational Needs. 20.5% of the school population.
                  </p>
                  <div className="mt-2 text-sm text-white/50">
                    (DfE, January 2025)
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div
                  className="mt-[0.72rem] h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                    boxShadow: '0 0 14px rgba(96,165,250,0.30)',
                  }}
                  aria-hidden
                />
                <div>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed">
                    Educational Health Care Plans have doubled since 2016 and
                    rose 11.1% in the last year alone, to 483,000 children.
                  </p>
                  <div className="mt-2 text-sm text-white/50">
                    (DfE, June 2025)
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div
                  className="mt-[0.72rem] h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                    boxShadow: '0 0 14px rgba(96,165,250,0.30)',
                  }}
                  aria-hidden
                />
                <div>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed">
                    Autism is now the most common primary need for pupils with
                    an Educational Health Care Plan, accounting for 33.6% of
                    plans.
                  </p>
                  <div className="mt-2 text-sm text-white/50">(DfE, 2025)</div>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div
                  className="mt-[0.72rem] h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                    boxShadow: '0 0 14px rgba(96,165,250,0.30)',
                  }}
                  aria-hidden
                />
                <div>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed">
                    Over 50% of neurodivergent individuals report burnout linked
                    to masking and being misunderstood.
                  </p>
                  <div className="mt-2 text-sm text-white/50">(CIPD, 2024)</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section> */}

      <section className="relative py-20 md:py-24 mx-auto ">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020]/40 to-black pointer-events-none" />

        <div className="relative container mx-auto px-4 md:px-6">
          <header className="mb-10 pb-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Neurodiversity is now part of everyday life.
            </h2>
            <div
              className="mt-5 h-1 w-24 md:w-32 rounded-full mx-auto"
              style={{
                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
              }}
            />
          </header>

          <div className="flex flex-col">
            <div className="w-full">
              <div className="border-b border-white/10 overflow-hidden">
                <div className="w-full flex items-start gap-4 py-7 md:py-8 text-left">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: '#60A5FA', fontSize: '34px' }}
                    aria-hidden
                  >
                    groups
                  </span>
                  <div>
                    <p className="text-base md:text-lg text-white/75 leading-relaxed">
                      1.7 million pupils in England now have identified Special
                      Educational Needs. 20.5% of the school population.
                    </p>
                    <div className="mt-2 text-sm text-white/50 underline decoration-white/20 underline-offset-4">
                      (DfE, January 2025)
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-white/10 overflow-hidden">
                <div className="w-full flex items-start gap-4 py-7 md:py-8 text-left">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: '#60A5FA', fontSize: '34px' }}
                    aria-hidden
                  >
                    monitoring
                  </span>
                  <div>
                    <p className="text-base md:text-lg text-white/75 leading-relaxed">
                      Educational Health Care Plans have doubled since 2016 and
                      rose 11.1% in the last year alone, to 483,000 children.
                    </p>
                    <div className="mt-2 text-sm text-white/50 underline decoration-white/20 underline-offset-4">
                      (DfE, June 2025)
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-white/10 overflow-hidden">
                <div className="w-full flex items-start gap-4 py-7 md:py-8 text-left">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: '#60A5FA', fontSize: '34px' }}
                    aria-hidden
                  >
                    psychology
                  </span>
                  <div>
                    <p className="text-base md:text-lg text-white/75 leading-relaxed">
                      Autism is now the most common primary need for pupils with
                      an Educational Health Care Plan, accounting for 33.6% of
                      plans.
                    </p>
                    <div className="mt-2 text-sm text-white/50 underline decoration-white/20 underline-offset-4">
                      (DfE, 2025)
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-white/10 overflow-hidden">
                <div className="w-full flex items-start gap-4 py-7 md:py-8 text-left">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: '#60A5FA', fontSize: '34px' }}
                    aria-hidden
                  >
                    local_fire_department
                  </span>
                  <div>
                    <p className="text-base md:text-lg text-white/75 leading-relaxed">
                      Over 50% of neurodivergent individuals report burnout
                      linked to masking and being misunderstood.
                    </p>
                    <div className="mt-2 text-sm text-white/50">
                      (CIPD, 2024)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Tailored Guidance
            </h2>
            <div
              className="mt-5 h-1 w-24 md:w-32 rounded-full mx-auto"
              style={{
                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
              }}
            />
            <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
              Choose the pathway that aligns with your role in the neurodiverse
              ecosystem.
            </p>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="group relative overflow-hidden rounded-3xl h-[520px] flex flex-col justify-end p-8 md:p-10">
              <img
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                src={shutterstock2291389905}
                alt="Mind Sync for Schools"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="relative z-10">
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-white"
                  style={{
                    background: 'rgba(96,165,250,0.18)',
                    border: '1px solid rgba(96,165,250,0.35)',
                  }}
                >
                  Institutional
                </span>
                <h3 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Mind Sync for Schools
                </h3>
                <div className="mt-7">
                  <Link
                    to="/mind-sync-schools"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-[#60A5FA]/90 bg-transparent px-6 py-3 text-sm md:text-base font-semibold text-[#60A5FA] transition-all duration-300 ease-out hover:gap-4 hover:border-transparent hover:bg-gradient-to-r hover:from-[#60A5FA] hover:to-[#9333EA] hover:text-white hover:shadow-xl hover:shadow-[#60A5FA]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/60"
                  >
                    <span className="relative z-10">Read More</span>
                    <span
                      className="material-symbols-outlined relative z-10"
                      style={{ fontSize: '20px' }}
                    >
                      arrow_forward
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl h-[520px] flex flex-col justify-end p-8 md:p-10">
              <img
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                src={shutterstock1717584028}
                alt="Mind Sync for Parents"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="relative z-10">
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-white"
                  style={{
                    background: 'rgba(147,51,234,0.16)',
                    border: '1px solid rgba(147,51,234,0.35)',
                  }}
                >
                  Personal
                </span>
                <h3 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Mind Sync for Parents
                </h3>
                <div className="mt-7">
                  <Link
                    to="/mind-sync-parents"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-[#9333EA]/75 bg-transparent px-6 py-3 text-sm md:text-base font-semibold text-[#E9D5FF] transition-all duration-300 ease-out hover:gap-4 hover:border-transparent hover:bg-gradient-to-r hover:from-[#60A5FA] hover:to-[#9333EA] hover:text-white hover:shadow-xl hover:shadow-[#9333EA]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA]/60"
                  >
                    <span className="relative z-10">Read More</span>
                    <span
                      className="material-symbols-outlined relative z-10"
                      style={{ fontSize: '20px' }}
                    >
                      arrow_forward
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
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

export default OurOfferMindSync;
