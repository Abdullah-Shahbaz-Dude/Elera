import React from 'react';

interface TeamMemberCardProps {
  name: string;
  image: string | null;
  initials: string;
  passions: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  image,
  initials,
  passions,
}) => {
  const gradient = 'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)';

  return (
    <div className="group relative h-full w-full">
      {/* Modern Card with Glass Morphism */}
      <div
        className="relative h-full w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.3)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Image Section */}
        <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden">
          {image ? (
            <>
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
                style={{
                  background: gradient,
                  mixBlendMode: 'overlay',
                }}
              ></div>
            </>
          ) : (
            // Dark Placeholder with Initials
            <div
              className="h-full w-full flex items-center justify-center relative transition-all duration-500 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #1D1D1D 0%, #121419 100%)',
              }}
            >
              {/* Subtle gradient accent border */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)`,
                }}
              ></div>
              {/* Initials */}
              <div className="relative z-10 text-5xl sm:text-6xl md:text-7xl font-bold text-white/60 group-hover:text-white/80 transition-colors duration-300">
                {initials}
              </div>
              {/* Subtle corner glow on hover */}
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: gradient,
                }}
              ></div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-col p-4 sm:p-5 md:p-6 lg:p-8">
          <h3 className="mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white transition-colors duration-300 group-hover:text-[#60A5FA]">
            {name}
          </h3>

          <div className="mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#60A5FA] uppercase tracking-widest">
              Passions & Interests
            </span>
          </div>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed sm:leading-relaxed text-white/80 transition-colors duration-300">
            {passions}
          </p>
        </div>

        {/* Decorative Corner Glow - Hidden on mobile for better performance */}
        <div
          className="hidden sm:block absolute -right-16 -top-16 h-32 sm:h-40 md:h-48 w-32 sm:w-40 md:w-48 rounded-full blur-3xl opacity-10 transition-opacity duration-300"
          style={{
            background: gradient,
          }}
        ></div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
