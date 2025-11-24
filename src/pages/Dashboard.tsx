import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  logoImage,
  shutterstock1330833800,
  shutterstock1717584028,
  shutterstock682503142,
  shutterstock726121441,
} from '@/assets/images';
import InsightEngineCard from '@/components/InsightEngineCard/InsightEngineCard';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Icon components for each Insight Engine
  const LightbulbIcon = () => (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2ZM15 13.7L14 14.5V16H10V14.5L9 13.7C7.8 12.86 7 11.5 7 10C7 7.24 9.24 5 12 5C14.76 5 17 7.24 17 10C17 11.5 16.2 12.86 15 13.7Z"
        fill="#FCD34D"
      />
      <path
        d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21Z"
        fill="#FCD34D"
      />
    </svg>
  );

  const MindSyncIcon = () => (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#3B82F6"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="12" cy="8" r="2" fill="#3B82F6" />
      <path
        d="M8 14C8 11.79 9.79 10 12 10C14.21 10 16 11.79 16 14"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="7" r="1.5" fill="#3B82F6" />
      <circle cx="17" cy="7" r="1.5" fill="#3B82F6" />
      <circle cx="7" cy="17" r="1.5" fill="#3B82F6" />
      <circle cx="17" cy="17" r="1.5" fill="#3B82F6" />
      <path
        d="M9 9L7 7M15 9L17 7M9 15L7 17M15 15L17 17"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const DigitalBiasIcon = () => (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="#3B82F6"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 8C8 8 10 10 12 10C14 10 16 8 16 8"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="14" r="1.5" fill="#3B82F6" />
      <circle cx="15" cy="14" r="1.5" fill="#3B82F6" />
      <path
        d="M6 6L4 4M20 6L22 4M6 18L4 20M20 18L22 20"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const DataEngineIcon = () => (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="16" width="4" height="4" fill="#3B82F6" />
      <rect x="10" y="12" width="4" height="8" fill="#3B82F6" />
      <rect x="16" y="8" width="4" height="12" fill="#3B82F6" />
      <path
        d="M6 16L8 14L10 16L14 12L18 16"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 16L20 14L22 16"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  const insightEngines = [
    {
      id: 1,
      number: 1,
      title: 'Reveal Hidden Brilliance',
      description: 'Unlock hidden talents across the workforce.',
      icon: <LightbulbIcon />,
      color: '#FCD34D',
      image: shutterstock1330833800,
      route: '/survey/reveal-hidden-brilliance',
    },
    {
      id: 2,
      number: 2,
      title: 'Mind Sync',
      description:
        'Helping Managers & Team Leaders understand neurodiversity to support strategic advantage.',
      icon: <MindSyncIcon />,
      color: '#3B82F6',
      image: shutterstock1717584028,
      route: '/survey/mind-sync',
    },
    {
      id: 3,
      number: 3,
      title: 'Digital Bias',
      description:
        'For the whole organization identifying cultural and psychological barriers that block digital adoption.',
      icon: <DigitalBiasIcon />,
      color: '#3B82F6',
      image: shutterstock682503142,
      route: '/survey/digital-bias',
    },
    {
      id: 4,
      number: 4,
      title: 'Elara Data Engine',
      description:
        'Supporting organizational understanding for neurodiverse individuals.',
      icon: <DataEngineIcon />,
      color: '#3B82F6',
      image: shutterstock726121441,
      route: '/survey/elara-data-engine',
    },
  ];

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    navigate('/');
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

        <div className="relative mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group relative z-10">
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

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[#A78BFA] transition-all duration-300 hover:text-white hover:scale-105 active:scale-95 group"
            aria-label="Logout"
            title="Logout"
            style={{
              background:
                'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(167, 139, 250, 0.15) 100%)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              boxShadow: '0 4px 15px rgba(147, 51, 234, 0.1)',
            }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#60A5FA] to-[#9333EA] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              <path
                d="M18 6L22 10M22 10L18 14M22 10H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="relative z-10 text-sm md:text-base font-medium">
              Logout
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:py-24">
        <div className="mx-auto max-w-[1960px]">
          {/* Title */}
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
              Main Dashboard
            </h1>
            <div
              className="mx-auto h-1 w-32 rounded-full"
              style={{
                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
              }}
            ></div>
          </div>

          {/* Welcome Message */}
          <p className="mb-12 md:mb-16 text-center text-lg md:text-xl text-white/80">
            Welcome to Elara, Choose your Insight Engine below to begin.
          </p>

          {/* Insight Engine Cards Grid */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 justify-center items-stretch">
            {insightEngines.map((engine) => (
              <div key={engine.id} className="flex justify-center">
                <InsightEngineCard
                  number={engine.number}
                  title={engine.title}
                  description={engine.description}
                  icon={engine.icon}
                  color={engine.color}
                  image={engine.image}
                  onClick={() => handleCardClick(engine.route)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
