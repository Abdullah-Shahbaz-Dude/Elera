import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logoImage, shutterstock1717584028 } from '@/assets/images';
import artificialIntelligenceImage from '@/assets/dashboard/artificial-intelligence.png';

const MindSync: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleStartSurvey = () => {
    navigate('/survey/mind-sync/start');
  };

  const modules = [
    { number: 1, title: 'Awareness' },
    { number: 2, title: 'Attitudes' },
    { number: 3, title: 'Behaviours' },
    { number: 4, title: 'Overall Leadership Readiness' },
    { number: 5, title: 'Situational Judgement' },
    { number: 6, title: 'Development Insights' },
  ];

  const handleModuleClick = (moduleNumber: number) => {
    navigate(`/survey/mind-sync/module/${moduleNumber}`);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Blur Effects - Gradient Ellipses */}
      <div className="absolute right-1/4 top-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.2)] to-[rgba(147,51,234,0.2)] blur-[400px]"></div>
      <div className="absolute left-1/4 bottom-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.2)] to-[rgba(147,51,234,0.2)] blur-[400px]"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 md:px-8 md:py-5">
        {/* Gradient Border Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Glass Morphism Background */}
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.65) 100%)',
          }}
        />

        {/* Subtle Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center group relative z-10">
            {logoImage ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA] to-[#9333EA] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-full"></div>
                <img
                  src={logoImage}
                  alt="Elara Logo"
                  className="relative h-20 w-auto brightness-0 invert md:h-24 lg:h-32 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="relative h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#9333EA] flex items-center justify-center shadow-lg shadow-[#60A5FA]/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#60A5FA]/50">
                <span className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">
                  E
                </span>
              </div>
            )}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-[1960px]">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="group mb-6 flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background:
                'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm md:text-base font-medium">Back</span>
          </button>

          {/* Page Title */}
          <div className="mb-4 md:mb-6 text-center">
            <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
              Mind Sync
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Uncover cognitive strengths and hidden skills within your
              organisation.
            </p>
          </div>

          {/* Mind Sync Survey Card */}
          <div className="mb-12 md:mb-16">
            <div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
              style={{
                background:
                  'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
                boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
                padding: '2px',
              }}
            >
              <div
                className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 rounded-2xl md:rounded-3xl transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${shutterstock1717584028})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.3,
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 rounded-2xl md:rounded-3xl"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))',
                  }}
                />

                <div className="relative z-10 p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center">
                        <img
                          src={artificialIntelligenceImage}
                          alt="Mind Sync"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                      <div>
                        <h2 className="mb-2 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                          Mind Sync Survey
                        </h2>
                        <div className="flex items-center gap-2 text-sm md:text-base text-white/60">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                            />
                            <path
                              d="M12 6V12L16 14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span>30 minutes</span>
                        </div>
                      </div>

                      {/* Start Survey Button */}
                      <button
                        onClick={handleStartSurvey}
                        className="rounded-xl px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                        style={{
                          background:
                            'linear-gradient(135deg, #60A5FA, #9333EA)',
                          boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                        }}
                      >
                        Start the survey →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Glow */}
                <div
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-20"
                  style={{
                    background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            {modules.map((module) => (
              <div
                key={module.number}
                onClick={() => handleModuleClick(module.number)}
                className="group relative cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background:
                    'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
                  boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
                  padding: '2px',
                }}
              >
                <div
                  className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="p-6 md:p-8">
                    <div className="mb-2">
                      <span className="text-xs md:text-sm font-medium text-white/60 uppercase tracking-wider">
                        Module {module.number}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                      {module.title}
                    </h3>
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                    style={{
                      background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                    }}
                  />

                  {/* Decorative Corner Glow */}
                  <div
                    className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                    style={{
                      background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MindSync;
