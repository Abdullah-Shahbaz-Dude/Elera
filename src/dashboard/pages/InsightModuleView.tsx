import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getProgramme,
  getInsightBySlug,
  getInsightSectionsForModule,
  INSIGHT_SIDEBAR_TITLES,
} from '../data/elaraProgramme';

const PROGRAMME_BASE = '/dashboard/my-learning/programme/neurodiversity';

export default function InsightModuleView() {
  const { insightSlug } = useParams<{ insightSlug: string }>();
  const programme = getProgramme();
  const insight = insightSlug ? getInsightBySlug(insightSlug) : null;
  const sections = insight ? getInsightSectionsForModule(insight.slug) : [];

  const [activeInsightIndex, setActiveInsightIndex] = useState(0);
  const [completedInsights, setCompletedInsights] = useState<boolean[]>([false, false, false]);

  const allThreeCompleted = completedInsights.every(Boolean);

  const handleSaveAndContinue = (idx: number) => {
    setCompletedInsights((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
    if (idx < 2) setActiveInsightIndex(idx + 1);
  };

  // Scroll to top when navigating to this page (dashboard main is the scroll container)
  useEffect(() => {
    window.scrollTo(0, 0);
    const el = document.querySelector('main.flex-1.overflow-y-auto.relative');
    if (el) (el as HTMLElement).scrollTop = 0;
  }, [insightSlug]);

  // Scroll to top when switching insight in sidebar
  useEffect(() => {
    const el = document.querySelector('main.flex-1.overflow-y-auto.relative');
    if (el) (el as HTMLElement).scrollTop = 0;
  }, [activeInsightIndex]);

  if (!insight) {
    return (
      <div className="flex-1 overflow-y-auto p-8 scroll-hide flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">Insight module not found.</p>
        <Link
          to={PROGRAMME_BASE}
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
        >
          Back to Programme
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-[#020617] text-white">
      <header className="relative shrink-0 min-h-[260px] hero-gradient flex flex-col justify-end p-10">
        <div className="absolute top-6 left-10 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            Module Insight Overview
          </span>
          <Link
            to={PROGRAMME_BASE}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="text-sm font-medium uppercase tracking-widest">
              Back to Programme
            </span>
          </Link>
        </div>
        <div className="absolute top-6 right-10 text-right">
          <span className="text-xs text-white/70 font-medium">
            3 Insights • Part of {programme.title}
          </span>
        </div>
        <div className="relative z-10 max-w-4xl mt-10">
          <h1 className="text-4xl font-black text-white mb-4 leading-tight tracking-tight">
            {insight.title}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl font-light leading-relaxed whitespace-pre-line">
            {insight.longDescription ?? insight.description}
          </p>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-white/10 rounded-full blur-[120px]" />
        </div>
      </header>

      <main className="flex w-full">
        <div className="w-3/4 flex flex-col p-8 space-y-10">
          {/* Intro: What Learners Will Gain (when available) */}
          {insight.whatLearnersWillGain && insight.whatLearnersWillGain.length > 0 && (
            <section className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">What Learners Will Gain</h3>
                <ul className="space-y-2 text-slate-300">
                  {insight.whatLearnersWillGain.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-primary shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Module Lessons: show only the active insight (Video + Self-Reflection) */}
          <h2 className="text-2xl font-bold text-white">Module Lessons</h2>

          {(() => {
            const idx = activeInsightIndex;
            const section = sections[idx];
            if (!section) return null;
            return (
              <article
                key={idx}
                id={`insight-${idx}`}
                className="scroll-mt-6 space-y-6"
              >
                <h3 className="text-lg font-bold text-white">
                  {idx + 1}. {INSIGHT_SIDEBAR_TITLES[idx]}
                </h3>

                {/* Video */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/40 via-purple-700/40 to-indigo-700/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      className="w-16 h-16 flex items-center justify-center bg-white rounded-full text-black hover:scale-105 transition-transform shadow-xl"
                      aria-label={`Play video for ${section.title}`}
                    >
                      <span
                        className="material-symbols-outlined text-4xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </button>
                  </div>
                  <div className="absolute inset-0 video-gradient flex flex-col justify-end p-6 pointer-events-none">
                    <div className="relative w-full h-1 bg-white/20 rounded-full">
                      <div className="absolute h-full bg-indigo-500 rounded-full" style={{ width: '0%' }} />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-white/70">0:00 / 0:00</span>
                    </div>
                  </div>
                </div>

                {/* Self-Reflection (mandatory to continue) */}
                <section className="glass-panel rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-purple-400">psychology</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Self-Reflection</h4>
                      <p className="text-sm text-slate-400">
                        {section.title} – Complete this to continue to the next insight.
                      </p>
                    </div>
                  </div>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                      {section.questions.map((question, qIdx) => (
                        <div key={qIdx} className="space-y-2">
                          <label className="text-sm font-medium text-slate-200">
                            {qIdx + 1}. {question}
                          </label>
                          <textarea
                            className="w-full reflection-input rounded-xl p-4 text-sm text-slate-200 min-h-[100px] resize-none bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-colors"
                            placeholder="Write your reflection..."
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => handleSaveAndContinue(idx)}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition-all rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                      >
                        {completedInsights[idx] ? 'Completed' : 'Save & Continue'}
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </form>
                </section>
              </article>
            );
          })()}
        </div>

        {/* Right sidebar – Module Contents: 3 Insights + Test Your Knowledge (gated) */}
        <aside className="w-1/4 border-l border-white/5 glass-panel flex flex-col shrink-0 sticky top-0 self-start">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">
              Module Contents
            </h2>
            <p className="text-xs text-slate-400">3 Insights</p>
          </div>
          <div className="flex-1 custom-scrollbar">
            {INSIGHT_SIDEBAR_TITLES.map((title, idx) => {
              const isCurrent = activeInsightIndex === idx;
              const isCompleted = completedInsights[idx];
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => setActiveInsightIndex(idx)}
                  className={`w-full text-left p-4 border-b flex items-start gap-3 transition-colors cursor-pointer ${
                    isCurrent
                      ? 'border-white/10 active-lesson-glow bg-indigo-500/10'
                      : 'border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {isCompleted && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px] text-emerald-500 font-bold">check</span>
                      </div>
                    )}
                    {!isCompleted && isCurrent && (
                      <div className="w-6 h-6 rounded-full border border-indigo-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                      </div>
                    )}
                    {!isCompleted && !isCurrent && (
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                        <span className="text-[10px] text-slate-500 font-bold">{idx + 1}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs truncate ${isCurrent ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>
                      {idx + 1}. {title}
                    </p>
                    <p className={`text-[10px] ${isCurrent ? 'text-indigo-400 font-semibold uppercase' : 'text-slate-500'}`}>
                      {isCompleted ? 'Completed' : isCurrent ? 'Currently Playing' : 'Click to view'}
                    </p>
                  </div>
                </button>
              );
            })}
            <div
              className={`p-4 border-b border-white/5 flex items-start gap-3 ${!allThreeCompleted ? 'opacity-60' : 'opacity-90'}`}
            >
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] text-slate-500 font-bold">4</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-300">4. TEST YOUR KNOWLEDGE</p>
                <p className="text-[10px] text-slate-500">
                  {allThreeCompleted
                    ? 'The test has yet to be completed, but will comprise 12 questions, all multiple choice.'
                    : 'Complete all 3 insights to unlock'}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
