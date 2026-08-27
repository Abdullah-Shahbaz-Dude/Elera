import { Link } from 'react-router-dom';
import type { ProgrammeSummary } from '@/api/learning';
import {
  getProgrammeBadge,
  getProgrammeImage,
} from '@/dashboard/data/learningProgrammeAssets';

const badgeToneClass: Record<'new' | 'popular' | 'progress', string> = {
  new: 'bg-[#2E7CF6]/20 text-white',
  popular: 'text-white',
  progress: 'bg-white/90 text-[#2E7CF6] backdrop-blur-md border border-[#2E7CF6]/20',
};

export default function LearningProgrammeCard({
  programme,
  compact = false,
}: {
  programme: ProgrammeSummary;
  compact?: boolean;
}) {
  const badge = getProgrammeBadge(programme);
  const image = getProgrammeImage(programme.programme_id);

  return (
    <Link
      to={programme.route}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white flex items-end shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)] ${
        compact ? 'aspect-video' : 'aspect-[16/9] rounded-3xl hover:border-[#2E7CF6]/30'
      } transition-all duration-500`}
    >
      <img
        alt={programme.title}
        src={image}
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F3864]/90 via-[#1F3864]/30 to-transparent" />
      {programme.progress_percent > 0 ? (
        <div className="absolute inset-x-0 top-0 h-1.5 bg-white/30">
          <div
            className="h-full bg-[#2E7CF6]"
            style={{ width: `${programme.progress_percent}%` }}
          />
        </div>
      ) : null}
      <div className="relative p-6 w-full">
        <div
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded w-fit mb-2 ${badgeToneClass[badge.tone]}`}
          style={
            badge.tone === 'popular'
              ? { backgroundColor: 'rgba(31, 122, 122, 0.35)' }
              : undefined
          }
        >
          {badge.label}
        </div>
        {compact ? (
          <>
            <h4 className="text-lg font-bold text-white">{programme.title}</h4>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-white/80 line-clamp-1">
                {programme.subtitle}
              </span>
              <span className="h-10 w-10 bg-white/20 group-hover:bg-white/30 rounded-full flex items-center justify-center transition-colors shrink-0">
                <span className="material-symbols-outlined text-sm text-white">
                  arrow_forward
                </span>
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
              {programme.subtitle}
            </div>
            <div className="text-xl font-bold text-white mt-1">{programme.title}</div>
            <div className="text-sm text-white/85 max-w-xl mt-2 line-clamp-2">
              {programme.description}
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
