export default function LearningProgrammeCardSkeleton({
  compact = true,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden border border-slate-200 bg-slate-100 animate-pulse ${
        compact
          ? 'aspect-video rounded-2xl shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]'
          : 'aspect-[16/9] rounded-3xl shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]'
      }`}
      role="status"
      aria-label="Loading programme"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F3864]/25 via-[#1F3864]/10 to-slate-100" />

      <div className="absolute inset-x-0 top-0 h-1.5 bg-white/40">
        <div className="h-full w-0 bg-slate-200" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 space-y-3">
        <div className="h-5 w-24 rounded bg-slate-200/80" />

        {compact ? (
          <>
            <div className="h-6 w-40 rounded bg-slate-200/90" />
            <div className="flex items-center justify-between mt-4 gap-4">
              <div className="h-4 flex-1 max-w-[180px] rounded bg-slate-200/70" />
              <div className="h-10 w-10 rounded-full bg-slate-200/80 shrink-0" />
            </div>
          </>
        ) : (
          <>
            <div className="h-3 w-48 rounded bg-slate-200/70" />
            <div className="h-7 w-36 rounded bg-slate-200/90" />
            <div className="space-y-2 pt-1">
              <div className="h-3 w-full max-w-md rounded bg-slate-200/70" />
              <div className="h-3 w-3/4 max-w-sm rounded bg-slate-200/60" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
