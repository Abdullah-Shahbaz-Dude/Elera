const cardClass =
  'rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]';

export default function DashboardProgressCardSkeleton() {
  return (
    <div
      className={`${cardClass} p-8 border-l-4 border-l-[#2E7CF6] animate-pulse`}
      role="status"
      aria-label="Loading module progress"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="space-y-3 flex-1">
          <div className="h-6 w-64 max-w-full rounded bg-slate-200" />
          <div className="h-4 w-24 rounded bg-slate-100" />
        </div>
        <div className="text-right space-y-2">
          <div className="h-9 w-16 rounded bg-slate-200 ml-auto" />
          <div className="h-3 w-20 rounded bg-slate-100 ml-auto" />
        </div>
      </div>

      <div className="w-full h-3 rounded-full bg-slate-100 mb-8 overflow-hidden">
        <div className="h-full w-1/3 rounded-full bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((key) => (
          <div
            key={key}
            className="bg-[#F7F9FB] p-4 rounded-xl border border-slate-100 space-y-3"
          >
            <div className="h-6 w-6 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-3 w-20 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
