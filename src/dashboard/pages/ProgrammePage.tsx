import { Link } from 'react-router-dom';
import { getProgramme } from '../data/elaraProgramme';

const PROGRAMME_BASE = '/dashboard/my-learning/programme/neurodiversity';

export default function ProgrammePage() {
  const programme = getProgramme();
  const firstSlug = programme.insightModules[0]?.slug;

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <header className="relative shrink-0 min-h-[420px] hero-gradient flex flex-col p-8 md:p-12">
        {/* Decorative blur – behind content */}
        <div className="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-40 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />
        </div>

        {/* Top bar: category + back link (left) | module count (right) */}
        <div className="relative z-10 flex justify-between items-start mb-10 md:mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              {programme.category}
            </span>
            <Link
              to="/dashboard/my-learning"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group w-fit"
            >
              <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="text-sm font-medium uppercase tracking-widest">
                Back to Library
              </span>
            </Link>
          </div>
          <span className="text-xs text-white/70 font-medium whitespace-nowrap">
            {programme.insightModules.length} Insight Modules
          </span>
        </div>

        {/* Spacer so hero content sits toward bottom of header */}
        <div className="flex-1 min-h-6" />

        {/* Hero: title, description, CTAs */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            {programme.title}
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl font-light leading-relaxed mb-8">
            {programme.shortDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {firstSlug && (
              <Link
                to={`${PROGRAMME_BASE}/insights/${firstSlug}`}
                className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-50 transition-all shadow-xl shadow-black/20"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                RESUME MODULE
              </Link>
            )}
            <button
              type="button"
              className="w-14 h-14 rounded-2xl border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0"
              aria-label="Bookmark"
            >
              <span className="material-symbols-outlined">bookmark</span>
            </button>
            <button
              type="button"
              className="w-14 h-14 rounded-2xl border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0"
              aria-label="Share"
            >
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12 space-y-12">
        <section>
          <h3 className="text-2xl font-bold text-white mb-4">
            Programme Overview
          </h3>
          <div className="text-slate-300 leading-relaxed whitespace-pre-line">
            {programme.programmeOverview}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-white mb-4">
            What Learners Will Gain
          </h3>
          <ul className="space-y-3">
            {programme.whatLearnersWillGain.map((item, i) => (
              <li key={i} className="flex gap-3 text-slate-300">
                <span className="text-primary shrink-0 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <section className="w-full max-w-6xl mx-auto px-8 py-12 md:px-12">
        <h3 className="text-2xl font-bold text-white mb-8">
          Insight Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-9">
          {programme.insightModules.map((insight, index) => {
            const moduleNum = String(index + 1).padStart(2, '0');
            return (
              <Link
                key={insight.id}
                to={`${PROGRAMME_BASE}/insights/${insight.slug}`}
                className="lesson-card p-6 rounded-[32px] flex flex-col gap-4 group transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/60 via-purple-700/60 to-indigo-700/60 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-white">
                        play_arrow
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-md text-[10px] font-bold text-white">
                    3 Insights
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                      Insight Module {moduleNum}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold leading-snug group-hover:text-indigo-400 transition-colors text-white">
                    {insight.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1 text-slate-400">
                      <span className="material-symbols-outlined text-sm">
                        schedule
                      </span>
                      <span className="text-[10px]">3 Insights</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
