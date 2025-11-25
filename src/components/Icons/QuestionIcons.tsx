import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Professional icon components with consistent styling
export const LightningIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44L6.5 20.5c-1.5-1.5-2-3.5-2-5.5 0-2 .5-4 2-5.5L4.5 7.5c0-2 1-4 3-5.5H9.5z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44L17.5 20.5c1.5-1.5 2-3.5 2-5.5 0-2-.5-4-2-5.5L19.5 7.5c0-2-1-4-3-5.5H14.5z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="9" cy="9" r="1.5" fill={color} />
    <circle cx="15" cy="9" r="1.5" fill={color} />
  </svg>
);

export const SnowflakeIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2v20M2 12h20M6.34 6.34l11.32 11.32M17.66 6.34L6.34 17.66M19.07 4.93L4.93 19.07M19.07 19.07L4.93 4.93"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

export const CalculatorIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="3" width="14" height="18" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
    <rect x="7" y="7" width="10" height="4" rx="1" fill={color} opacity="0.3" />
    <circle cx="9" cy="14" r="1.5" fill={color} />
    <circle cx="12" cy="14" r="1.5" fill={color} />
    <circle cx="15" cy="14" r="1.5" fill={color} />
    <circle cx="9" cy="17" r="1.5" fill={color} />
    <circle cx="12" cy="17" r="1.5" fill={color} />
    <circle cx="15" cy="17" r="1.5" fill={color} />
    <rect x="9" y="20" width="6" height="1" rx="0.5" fill={color} />
  </svg>
);

export const WarningIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 9v4M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M9 21h6M12 17v4"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ComputerIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="14" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M8 18h8M10 20h4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="11" r="1.5" fill={color} />
    <path d="M6 8h12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const ToolsIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const NetworkIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="2" fill={color} />
    <circle cx="5" cy="5" r="2" fill={color} />
    <circle cx="19" cy="5" r="2" fill={color} />
    <circle cx="5" cy="19" r="2" fill={color} />
    <circle cx="19" cy="19" r="2" fill={color} />
    <path
      d="M12 10V7M12 14v3M7 12H4M20 12h3M7.34 7.34l2.12-2.12M14.54 14.54l2.12 2.12M7.34 16.66l2.12 2.12M14.54 9.46l2.12-2.12"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M12 8v8M8 12h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const CheckmarkIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" fill="none" />
    <path
      d="M8 12l2 2 4-4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NoIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" fill="none" />
    <path
      d="M15 9l-6 6M9 9l6 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HourglassIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 2v6l6 6-6 6v6h12v-6l-6-6 6-6V2H6z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M6 8h12M6 16h12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const WaveformIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3 12h3l2-6 2 12 2-6 2 6 2-12 2 6h3"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M3 10h18M8 2v4M16 2v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="15" r="1" fill={color} />
  </svg>
);

export const QuestionIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" fill="none" />
    <path
      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BalanceIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2v20M3 12h18M8 6l4-4 4 4M8 18l4 4 4-4"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="12" r="1.5" fill={color} />
    <circle cx="16" cy="12" r="1.5" fill={color} />
  </svg>
);

export const NoEntryIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M8 12h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const InfinityIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M18.178 8c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5 2.5-1 2.5-2.5-1-2.5-2.5-2.5zM5.822 8c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5 2.5-1 2.5-2.5-1-2.5-2.5-2.5z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M15.678 8c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5M8.322 8c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const SpiralIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" fill="none" />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M12 12a8 8 0 0 1 8 8"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const RibbonIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2l3 8h8l-6 5 2 8-7-5-7 5 2-8-6-5h8l3-8z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const HeadIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="5" stroke={color} strokeWidth="1.8" fill="none" />
    <path
      d="M5 20c0-4 3-7 7-7s7 3 7 7"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="10" cy="8" r="1" fill={color} />
    <circle cx="14" cy="8" r="1" fill={color} />
    <path d="M12 11v1" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const DIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="4" width="12" height="16" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M6 4h6a6 6 0 0 1 0 12H6V4z" stroke={color} strokeWidth="1.8" fill="none" />
  </svg>
);

export const BeakerIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 2v6l-4 8h14l-4-8V2H9z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M5 16h14M7 20h10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const CloudIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.5" />
  </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="9" cy="10" r="1" fill={color} />
    <circle cx="15" cy="10" r="1" fill={color} />
  </svg>
);

export const PictureIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="8.5" cy="8.5" r="1.5" fill={color} />
    <path d="M21 15l-5-5L5 21" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const QuietIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M11 5L6 9H2v6h4l5 4V5zM19 9l-6 6M13 9l6 6"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TeamIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="3" cy="7" r="2" fill={color} />
    <circle cx="21" cy="7" r="2" fill={color} />
  </svg>
);

export const FlexibleIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m10.6 10.6l-4.24-4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m10.6-10.6l-4.24 4.24"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

export const StructureIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" fill="none" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" fill="none" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" fill="none" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" fill="none" />
  </svg>
);

export const CreativeIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const SpeechIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 18v4M8 22h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const VideoIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M23 7l-7 5 7 5V7z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <rect x="1" y="5" width="15" height="14" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
  </svg>
);

export const HandsIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M17 11V7a5 5 0 0 0-10 0v4M7 11v5a5 5 0 0 0 10 0v-5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="12" cy="16" r="1" fill={color} />
  </svg>
);

export const MixIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M12 2v20M2 12h20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

export const MusicIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 18V5l12-2v13"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="18" cy="16" r="3" stroke={color} strokeWidth="1.8" fill="none" />
  </svg>
);

export const BreakIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const MovementIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const SunriseIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M17 18a5 5 0 0 0-10 0M12 2v8M4.22 10.22l1.42 1.42M18.36 10.22l-1.42 1.42" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M2 18h20M6 14h12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M12 1v3M12 20v3M23 12h-3M4 12H1M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05l-2.12-2.12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const AfternoonIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M12 12v12M2 12h20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="m2 6 10 7 10-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const PersonIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="5" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M5 21a7 7 0 0 1 14 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6 9v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9M6 9h12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="2" fill={color} />
  </svg>
);

export const MessageIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const GiftIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="8" width="18" height="4" rx="1" stroke={color} strokeWidth="1.8" fill="none" />
    <rect x="3" y="12" width="18" height="10" rx="1" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M12 8V2M8 4h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const DoorIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M9 21V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1" fill={color} />
  </svg>
);

export const PuzzleIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m10.6 10.6l-4.24-4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m10.6-10.6l-4.24 4.24"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const BookIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const FreedomIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const RocketIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M9 12H4s.55-3.03 2-4M13 2v3s2.55.55 4 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const SoloIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="5" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M5 21a7 7 0 0 1 14 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
);

// Icon mapping function
export const getQuestionIcon = (
  iconName: string | undefined,
  props: IconProps = {}
): React.ReactNode => {
  const iconMap: { [key: string]: React.FC<IconProps> } = {
    lightning: LightningIcon,
    brain: BrainIcon,
    snowflake: SnowflakeIcon,
    calculator: CalculatorIcon,
    warning: WarningIcon,
    lightbulb: LightbulbIcon,
    computer: ComputerIcon,
    tools: ToolsIcon,
    network: NetworkIcon,
    plus: PlusIcon,
    checkmark: CheckmarkIcon,
    no: NoIcon,
    hourglass: HourglassIcon,
    waveform: WaveformIcon,
    calendar: CalendarIcon,
    question: QuestionIcon,
    balance: BalanceIcon,
    'no-entry': NoEntryIcon,
    infinity: InfinityIcon,
    spiral: SpiralIcon,
    ribbon: RibbonIcon,
    head: HeadIcon,
    d: DIcon,
    beaker: BeakerIcon,
    cloud: CloudIcon,
    chat: ChatIcon,
    picture: PictureIcon,
    quiet: QuietIcon,
    team: TeamIcon,
    flexible: FlexibleIcon,
    structure: StructureIcon,
    creative: CreativeIcon,
    document: DocumentIcon,
    speech: SpeechIcon,
    video: VideoIcon,
    'hands-on': HandsIcon,
    hands: HandsIcon,
    mix: MixIcon,
    music: MusicIcon,
    break: BreakIcon,
    movement: MovementIcon,
    clock: ClockIcon,
    sunrise: SunriseIcon,
    sun: SunIcon,
    afternoon: AfternoonIcon,
    moon: MoonIcon,
    email: EmailIcon,
    phone: PhoneIcon,
    person: PersonIcon,
    trophy: TrophyIcon,
    message: MessageIcon,
    gift: GiftIcon,
    door: DoorIcon,
    puzzle: PuzzleIcon,
    heart: HeartIcon,
    book: BookIcon,
    freedom: FreedomIcon,
    star: StarIcon,
    rocket: RocketIcon,
    solo: SoloIcon,
  };

  const IconComponent = iconName ? iconMap[iconName] : null;
  return IconComponent ? <IconComponent {...props} /> : null;
};

