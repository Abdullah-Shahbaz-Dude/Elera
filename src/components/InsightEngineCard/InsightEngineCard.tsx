import React from 'react';

interface InsightEngineCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image?: string;
  onClick?: () => void;
}

const InsightEngineCard: React.FC<InsightEngineCardProps> = ({
  number,
  title,
  description,
  icon,

  image,
  onClick,
}) => {
  const gradient = 'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)';

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer h-full w-full rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        minHeight: '320px',
      }}
    >
      {/* Gradient Border Container */}
      <div
        className="relative h-full w-full rounded-2xl md:rounded-3xl p-[2px] transition-all duration-300 group-hover:p-[3px]"
        style={{
          background: gradient,
          boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
        }}
      >
        {/* Inner Card */}
        <div
          className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Gradient Overlay on Hover */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20 z-0"
            style={{
              background: gradient,
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-5 md:p-6 lg:p-8">
            {/* Icon/Image Container */}
            <div className="mb-4 md:mb-6 flex items-center justify-center flex-shrink-0">
              {image ? (
                <div className="relative w-full h-28 md:h-36 lg:h-40 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              ) : (
                <div className="flex h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="mb-3 md:mb-4 flex-shrink-0">
              <span className="text-xs md:text-sm font-medium text-white/60 uppercase tracking-wider block">
                Insight Engine {number}
              </span>
              <h3 className="mt-2 md:mt-3 text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight">
                {title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base leading-relaxed text-white/80 md:text-white/90 flex-grow">
              {description}
            </p>
          </div>

          {/* Decorative Corner Glow */}
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40 z-0"
            style={{
              background: gradient,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InsightEngineCard;
