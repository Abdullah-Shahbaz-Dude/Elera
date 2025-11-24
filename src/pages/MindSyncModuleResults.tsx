import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { logoImage } from '@/assets/images';

const MindSyncModuleResults: React.FC = () => {
  const navigate = useNavigate();
  const { moduleNumber } = useParams<{ moduleNumber: string }>();

  const handleBack = () => {
    navigate('/survey/mind-sync');
  };

  // Module data based on number
  const moduleData: {
    [key: string]: { title: string; results: number; bands: string[] };
  } = {
    '1': {
      title: 'Awareness',
      results: 15,
      bands: ['Low', 'Moderate', 'High', 'Very High'],
    },
    '2': {
      title: 'Attitudes',
      results: 25,
      bands: ['Low', 'Moderate', 'High', 'Very High'],
    },
    '3': {
      title: 'Behaviours',
      results: 30,
      bands: ['Low', 'Moderate', 'High', 'Very High'],
    },
    '4': {
      title: 'Overall Leadership Readiness',
      results: 45,
      bands: ['Low', 'Moderate', 'High', 'Very High'],
    },
    '5': {
      title: 'Situational Judgement',
      results: 60,
      bands: ['Low', 'Moderate', 'High', 'Very High'],
    },
    '6': {
      title: 'Development Insights',
      results: 75,
      bands: ['Low', 'Moderate', 'High', 'Very High'],
    },
  };

  const module = moduleData[moduleNumber || '1'] || moduleData['1'];

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
      <main className="relative z-10 mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
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

        {/* Results Card */}
        <div
          className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-8"
          style={{
            background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
            boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
            padding: '2px',
          }}
        >
          <div
            className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(0, 0, 0, 1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Gradient Overlay - Always Visible */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
              }}
            />

            <div className="relative z-10 p-6 md:p-8 lg:p-10">
              {/* Module Title Section */}
              <div className="mb-8 md:mb-10">
                <div className="mb-2">
                  <span className="text-xs md:text-sm font-medium text-white/60 uppercase tracking-wider">
                    Module Results
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">
                  {module.title}
                </h1>
                <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
              </div>

              {/* Results Section */}
              <div className="mb-8 md:mb-10">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    Results
                  </h2>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#60A5FA]/20 to-[#9333EA]/20 border border-white/10">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 11L12 14L22 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#60A5FA]"
                      />
                      <path
                        d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-white/40"
                      />
                    </svg>
                    <span className="text-lg md:text-xl font-bold text-white">
                      {module.results}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-4 md:h-5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${module.results}%`,
                      background: 'linear-gradient(90deg, #60A5FA, #9333EA)',
                    }}
                  />
                </div>
              </div>

              {/* Bands Section */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Bands
                  </h3>
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]"></div>
                </div>
                <div className="space-y-3">
                  {module.bands.map((band, index) => {
                    const isActive =
                      index ===
                      Math.floor((module.results / 100) * module.bands.length);
                    const bandPercentages = [0, 25, 50, 75];
                    const bandRange = `${bandPercentages[index]}% - ${
                      bandPercentages[index + 1] || 100
                    }%`;

                    return (
                      <div
                        key={index}
                        className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                          isActive
                            ? 'border-[#60A5FA] bg-gradient-to-r from-[#60A5FA]/15 via-[#9333EA]/10 to-[#60A5FA]/15 shadow-lg shadow-[#60A5FA]/20'
                            : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                        }`}
                      >
                        {/* Active indicator line */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#60A5FA] to-[#9333EA]"></div>
                        )}

                        <div className="flex items-center gap-4 p-4 md:p-5 pl-5 md:pl-6">
                          {/* Unique numbered badge */}
                          <div className="relative">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${
                                isActive
                                  ? 'bg-gradient-to-br from-[#60A5FA] to-[#9333EA] text-white shadow-lg shadow-[#60A5FA]/30 scale-110'
                                  : 'bg-white/10 text-white/60 group-hover:bg-white/15 group-hover:text-white/80'
                              }`}
                            >
                              {index + 1}
                            </div>
                            {/* Decorative corner accent for active */}
                            {isActive && (
                              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#60A5FA] blur-sm opacity-60"></div>
                            )}
                          </div>

                          {/* Band info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-base md:text-lg font-semibold transition-colors ${
                                  isActive
                                    ? 'text-white'
                                    : 'text-white/90 group-hover:text-white'
                                }`}
                              >
                                {band}
                              </span>
                              {isActive && (
                                <span className="flex items-center gap-1.5 rounded-full bg-[#60A5FA]/20 px-2.5 py-0.5 text-xs font-medium text-[#60A5FA]">
                                  <div className="h-1.5 w-1.5 rounded-full bg-[#60A5FA] animate-pulse"></div>
                                  Active
                                </span>
                              )}
                            </div>
                            <span
                              className={`text-xs md:text-sm transition-colors ${
                                isActive
                                  ? 'text-white/60'
                                  : 'text-white/40 group-hover:text-white/60'
                              }`}
                            >
                              Range: {bandRange}
                            </span>
                          </div>

                          {/* Unique arrow indicator for active */}
                          {isActive && (
                            <div className="flex items-center text-[#60A5FA]">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="animate-pulse"
                              >
                                <path
                                  d="M9 18L15 12L9 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
      </main>
    </div>
  );
};

export default MindSyncModuleResults;
