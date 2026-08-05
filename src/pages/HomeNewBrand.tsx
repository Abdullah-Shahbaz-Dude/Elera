import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo/Logo';
import VideoCarousel from '@/components/HeroSection/VideoCarousel';

export default function HomeNewBrand() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-white text-[#1F2937]"
      style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
    >
      <header className="fixed top-0 left-0 right-0 z-50 ">
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
                className={
                  scrolled ? 'hover:text-[#2E7CF6]' : 'hover:text-[#0565f4]'
                }
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

      <section className="relative h-screen min-h-[500px] md:min-h-[600px] w-full overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0A1F44] via-[#12295A] to-[#1E4FBF]" />

        <div className="absolute inset-0 z-[1]">
          <VideoCarousel className="h-full w-full" />
        </div>

        <div className="absolute inset-0 z-[10] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 " />
          <div className="absolute inset-0 bg-white/30" />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#6BA3F8]/10 blur-3xl" />
          <div className="absolute top-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#2E7CF6]/5 blur-3xl" />
        </div>

        <div className="absolute inset-0 z-[40] flex items-end justify-start">
          <div className="w-full px-6 sm:px-8 md:pl-[120px] md:pr-10 pb-20 md:pb-24">
            <div className="max-w-4xl">
              <h1 className="text-[48px] sm:text-[56px] md:text-[80px] lg:text-[96px] leading-[0.9] text-white font-extrabold mb-6 tracking-[-0.04em] drop-shadow-lg text-left">
                Mind{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #1E4FBF 0%, #2E7CF6 60%, #6BA3F8 100%)',
                  }}
                >
                  Sync
                </span>
              </h1>
              <p className="text-[17px] sm:text-[19px] md:text-[22px] lg:text-[24px] font-medium text-white/85 max-w-2xl tracking-[-0.005em] drop-shadow text-left">
                Helping schools understand neurodiversity better.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-14 lg:pt-20 pb-4 lg:pb-6 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-[28px] md:text-[36px] leading-[1.1] text-[#0A1F44] font-extrabold mb-8 tracking-[-0.03em]">
            What is Mind Sync?
          </h2>
          <p className="text-[17px] md:text-[19px] leading-[1.75] text-[#4B5563] mb-4">
            Mind Sync is a platform of tools and resources for schools, grounded
            in psychology and evidence-based good practice.
          </p>
          <p className="text-[17px] md:text-[19px] leading-[1.75] text-[#4B5563]">
            It helps school staff feel more confident in supporting
            neurodiversity in the classroom.
          </p>
        </div>
      </section>

      <section className="bg-white pt-16 pb-10 lg:pt-20 lg:pb-12 relative">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[17px] md:text-[18px] leading-[1.75] text-[#4B5563]">
            Many pupils who are neurodivergent, whether diagnosed or not, can
            often struggle and feel overwhelmed, and some may not even
            understand why. Teachers are trying their best to respond to
            individual needs however class sizes and rising demand on teaching
            and learning can make this difficult.{' '}
            <span className="font-semibold text-[#0A1F44]">
              Recent data shows:
            </span>
          </p>
        </div>
      </section>

      <section className="relative pt-10 pb-20 lg:pt-12 lg:pb-28 bg-gradient-to-b from-white via-[#F7F9FC] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                number: '1 in 5',
                body: 'pupils in mainstream classrooms in England now has identified Special Educational Needs.',
                foot: 'DfE, January 2025',
              },
              {
                number: '56.2%',
                body: 'of pupils with an EHCP are now taught in mainstream classrooms, up every year since 2016.',
                foot: 'DfE, 2025',
              },
              {
                number: '87%',
                body: 'of teachers say they need more help to support their SEND learners in the classroom.',
                foot: 'Teacher Tapp, June 2025',
              },
              {
                number: '33.6%',
                body: 'Autism is now the most common primary need in classrooms with an EHCP pupil, accounting for over a third of all education, health and care plans.',
                foot: 'DfE, 2025',
              },
            ].map((c) => (
              <div
                key={c.number}
                className="bg-white rounded-3xl p-8 lg:p-10 border border-[#E5E9F0] shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08),0_2px_6px_-2px_rgba(10,31,68,0.04)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="font-extrabold tracking-[-0.045em] leading-[0.95] text-[62px] md:text-[74px] mb-4 bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(180deg, #1E4FBF 0%, #2E7CF6 100%)',
                  }}
                >
                  {c.number}
                </div>
                <p className="text-[16px] leading-relaxed text-[#1F2937] font-medium mb-4">
                  {c.body}
                </p>
                <p className="text-[13px] text-[#6B7280] font-medium">
                  {c.foot}
                </p>
              </div>
            ))}

            <div className="bg-gradient-to-br from-[#0A1F44] to-[#12295A] text-white rounded-3xl p-8 lg:p-10 md:col-span-2 lg:col-span-2 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#2E7CF6]/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-[#6BA3F8]/10 blur-3xl" />

              <div className="relative">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="font-extrabold text-[64px] md:text-[82px] leading-none mb-2 tracking-tight">
                      68
                      <span className="text-[32px] md:text-[42px] align-top text-[#6BA3F8]">
                        %
                      </span>
                    </div>
                    <div className="font-extrabold text-[32px] md:text-[38px] leading-none text-white/90 tracking-tight mb-4">
                      &amp; 61
                      <span className="text-[20px] md:text-[24px] align-top text-[#6BA3F8]">
                        %
                      </span>
                    </div>
                    <p className="text-[13px] text-white/60 font-medium">
                      Teacher Tapp, 2024
                    </p>
                  </div>
                  <div>
                    <p className="text-[22px] md:text-[26px] leading-tight font-semibold text-white mb-2 tracking-[-0.02em]">
                      Of primary and secondary teachers felt unprepared to teach
                      SEND pupils after their initial teacher training.
                    </p>
                    <p className="text-[15px] text-white/75 leading-relaxed font-medium">
                      68% of primary teachers, and 61% of secondary teachers.
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
              <h3 className="text-[30px] md:text-[42px] leading-tight text-white font-extrabold tracking-tight mb-5">
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
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
