import React from 'react';

interface TrainingCategoryCardProps {
  title: string;
  description: string;
  backgroundImage?: string;
  onLearnMore: () => void;
}

const TrainingCategoryCard: React.FC<TrainingCategoryCardProps> = ({
  title,
  description,
  backgroundImage,
  onLearnMore,
}) => {
  return (
    <div className="group relative h-full w-full min-h-[400px] md:min-h-[450px]">
      {/* Card Container */}
      <div
        className="relative h-full w-full rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 20px rgba(96, 165, 250, 0.15)',
        }}
      >
        {/* Background Image */}
        {backgroundImage && (
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.4,
            }}
          />
        )}

        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
          }}
        />

        {/* Gradient Overlay on Hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(147, 51, 234, 0.2))',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col p-6 md:p-8 justify-between">
          <div>
            {/* Title */}
            <h3 className="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-white text-left">
              {title}
            </h3>

            {/* Gradient Divider */}
            <div
              className="mb-4 h-1 w-16 rounded-full"
              style={{
                background: 'linear-gradient(to right, #60A5FA, #9333EA)',
              }}
            />

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/90 text-left">
              {description}
            </p>
          </div>

          {/* Learn More Button */}
          <button
            type="button"
            onClick={onLearnMore}
            className="w-fit mt-6 rounded-xl px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background:
                'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(147, 51, 234, 0.3))',
              boxShadow: '0 4px 20px rgba(96, 165, 250, 0.3)',
            }}
          >
            Learn More
          </button>
        </div>

        {/* Decorative Corner Glow */}
        <div
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          style={{
            background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
          }}
        />
      </div>
    </div>
  );
};

export default TrainingCategoryCard;
