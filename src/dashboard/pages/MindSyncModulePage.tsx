import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MIND_SYNC_MODULE_01 } from '../data/mindSyncSyllabus';
import image from '../../assets/images/futuresync/module-1/Parenting-a-Child-1.jpg';
import aboutImage from '../../assets/images/mindsync/module-1/image-2.jpg';

type TabKey =
  | 'introduction'
  | 'video'
  | 'learn'
  | 'practice'
  | 'takeaway'
  | 'reflection';

interface TocItem {
  key: TabKey;
  label: string;
}

const TOC: TocItem[] = [
  { key: 'introduction', label: 'Introduction' },
  { key: 'video', label: 'Video' },
  { key: 'learn', label: 'Learn' },
  { key: 'practice', label: 'Practice' },
  { key: 'takeaway', label: 'Take away' },
  { key: 'reflection', label: 'Optional reflection' },
];

export default function MindSyncModulePage() {
  const [active, setActive] = useState<TabKey>('introduction');
  const [isScriptOpen, setIsScriptOpen] = useState(false);

  const activeItem = useMemo(() => {
    return TOC.find((t) => t.key === active) ?? TOC[0];
  }, [active]);

  return (
    <div className="flex flex-col min-h-full bg-[#020617] text-white">
      <header className="relative shrink-0 min-h-[260px] flex flex-col justify-end p-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt="Mind Sync"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="absolute inset-0 hero-gradient opacity-50" />
        </div>
        <div className="absolute top-6 left-10 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            Mind Sync - Training Module 01
          </span>
          <Link
            to="/dashboard/my-learning/mind-sync"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="text-sm font-medium uppercase tracking-widest">
              Back to Mind Sync
            </span>
          </Link>
        </div>

        <div className="absolute top-6 right-10 text-right">
          <span className="text-xs text-white/70 font-medium">
            {activeItem.label}
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mt-10">
          <h1 className="text-4xl font-black text-white mb-2 leading-tight tracking-tight">
            {MIND_SYNC_MODULE_01.title}
          </h1>
          <h2 className="text-lg text-white/90 font-semibold mb-4">
            {MIND_SYNC_MODULE_01.subtitle}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl font-light leading-relaxed whitespace-pre-line">
            {MIND_SYNC_MODULE_01.summary}
          </p>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-white/10 rounded-full blur-[120px]" />
        </div>
      </header>

      <main className="flex w-full">
        <div className="w-3/4 flex flex-col p-8 space-y-10">
          {active === 'introduction' && (
            <section className="space-y-6">
              <div className="glass-panel rounded-2xl border border-white/10 p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      About this module
                    </h3>
                    <div className="text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                      {MIND_SYNC_MODULE_01.about.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-72 h-52 rounded-2xl bg-cover overflow-hidden shadow-2xl relative shrink-0">
                    <img
                      alt="Mind Sync"
                      src={aboutImage}
                      className="w-full h-full object-cover  opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/10" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 glass-panel rounded-2xl border border-white/10 p-8 md:p-10">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Learning Outcomes
                  </h3>

                  <ul className="space-y-3">
                    {MIND_SYNC_MODULE_01.learningOutcomes.map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-300">
                        <span className="text-primary shrink-0 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5 glass-panel rounded-2xl border border-white/10 p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img
                      alt=""
                      className="w-full h-full object-cover"
                      src={image}
                    />
                  </div>
                  <div className="relative z-10 w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_50px_rgba(90,218,206,0.2)] mb-6">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      laps
                    </span>
                  </div>
                  <h4 className="relative z-10 text-[12px] text-primary uppercase tracking-[0.2em] font-semibold">
                    Mindful Sync
                  </h4>
                  <p className="relative z-10 text-slate-300 mt-3">
                    Sync your breathing before we begin.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  How this module is structured
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      part: 'Part 01',
                      title: 'Watch',
                      desc: 'Visual guidance on trigger spotting',
                      icon: 'play_circle',
                    },
                    {
                      part: 'Part 02',
                      title: 'Learn',
                      desc: 'Science of the ADHD clash',
                      icon: 'menu_book',
                    },
                    {
                      part: 'Part 03',
                      title: 'Practice',
                      desc: 'Interactive regulation scenarios',
                      icon: 'psychology',
                    },
                    {
                      part: 'Part 04',
                      title: 'Take away',
                      desc: 'Downloadable daily calm guide',
                      icon: 'assignment_turned_in',
                    },
                  ].map((s) => (
                    <div
                      key={s.part}
                      className="glass-panel rounded-2xl border border-white/10 p-6 text-center group hover:border-indigo-400/30 transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-500/20 transition-colors">
                        <span className="material-symbols-outlined text-neutral-400 group-hover:text-indigo-300">
                          {s.icon}
                        </span>
                      </div>
                      <div className="text-[12px] text-white/40 mb-2 uppercase tracking-widest">
                        {s.part}
                      </div>
                      <div className="text-white font-semibold">{s.title}</div>
                      <div className="text-xs text-slate-300/70 mt-2">
                        {s.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10 mt-4 border-t border-white/5 flex flex-col items-center">
                <p className="text-sm text-neutral-500 mb-6 text-center">
                  Ready to begin your transition to calm parenting?
                </p>
                <button
                  type="button"
                  onClick={() => setActive('video')}
                  className="px-10 py-4 bg-primary/10 border border-primary/30 text-primary rounded-2xl hover:bg-primary/20 active:scale-95 transition-all duration-300 text-[12px] uppercase tracking-[0.2em] font-semibold"
                >
                  Launch Introduction
                </button>
              </div>
            </section>
          )}

          {active === 'video' && (
            <section className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">
                  VIDEO SCRIPT & SCENE
                </h3>

                <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="relative aspect-video w-full bg-black/40 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-white/80 font-semibold">
                        Video placeholder
                      </div>
                      <div className="text-xs text-white/60 mt-1">
                        You’ll paste the video link later
                      </div>
                    </div>
                  </div>
                </div>

                <section className="glass-panel rounded-2xl overflow-hidden border border-white/10">
                  <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">
                        description
                      </span>
                      <h4 className="text-lg font-bold text-white">
                        Live Script
                      </h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                        Full video script
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsScriptOpen((o) => !o)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-white/60 hover:text-white"
                        aria-label={
                          isScriptOpen ? 'Collapse script' : 'Expand script'
                        }
                      >
                        <span className="material-symbols-outlined">
                          {isScriptOpen ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div
                    className={`transition-[max-height,opacity] duration-300 ease-out ${
                      isScriptOpen
                        ? 'max-h-[520px] opacity-100'
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="max-h-[520px] overflow-y-auto px-6 md:px-10 py-8 space-y-6 custom-scrollbar">
                      <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {MIND_SYNC_MODULE_01.videoScriptScene.fullScript}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          )}

          {active === 'learn' && (
            <section className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {MIND_SYNC_MODULE_01.learn.heading}
                </h3>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {MIND_SYNC_MODULE_01.learn.body}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {MIND_SYNC_MODULE_01.learn.techniqueHeading}
                </h3>
                <div className="space-y-4">
                  {MIND_SYNC_MODULE_01.learn.steps.map((s) => (
                    <div
                      key={s.title}
                      className="glass-panel rounded-2xl p-6 border border-white/10"
                    >
                      <h4 className="text-lg font-bold text-white mb-2">
                        {s.title}
                      </h4>
                      <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {s.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  The honest part
                </h3>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {MIND_SYNC_MODULE_01.learn.honestPart}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {MIND_SYNC_MODULE_01.learn.coRegulationScript.heading}
                </h3>
                <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-3 gap-0 text-[11px] uppercase tracking-widest text-slate-400 border-b border-white/5">
                    <div className="p-4">Step</div>
                    <div className="p-4">What to say</div>
                    <div className="p-4">Why this matters</div>
                  </div>
                  {MIND_SYNC_MODULE_01.learn.coRegulationScript.rows.map(
                    (row) => (
                      <div
                        key={row.step}
                        className="grid grid-cols-3 gap-0 border-b border-white/5"
                      >
                        <div className="p-4 text-sm text-slate-200 font-semibold">
                          {row.step}
                        </div>
                        <div className="p-4 text-sm text-slate-300 whitespace-pre-line">
                          {row.whatToSay}
                        </div>
                        <div className="p-4 text-sm text-slate-300 leading-relaxed">
                          {row.whyItMatters}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  What not to do
                </h3>
                <ul className="space-y-2 text-slate-300">
                  {MIND_SYNC_MODULE_01.learn.whatNotToDo.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-primary shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {active === 'practice' && (
            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Practice</h3>
              <div className="text-slate-300">
                You said you’ll provide a design for interactive scenarios. This
                section is ready to be wired to that design.
              </div>
            </section>
          )}

          {active === 'takeaway' && (
            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                {MIND_SYNC_MODULE_01.takeaway.heading}
              </h3>
              <div className="glass-panel rounded-2xl p-6 border border-white/10">
                <div className="text-slate-200 font-semibold mb-4">
                  Take-away (on-screen for now)
                </div>
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {MIND_SYNC_MODULE_01.takeaway.body}
                </div>
              </div>
            </section>
          )}

          {active === 'reflection' && (
            <section className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {MIND_SYNC_MODULE_01.takeaway.optionalReflectionHeading}
                </h3>
                <ul className="space-y-3">
                  {MIND_SYNC_MODULE_01.takeaway.optionalReflectionQuestions.map(
                    (q) => (
                      <li key={q} className="flex gap-3 text-slate-300">
                        <span className="text-primary shrink-0 mt-1">•</span>
                        <span>{q}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {MIND_SYNC_MODULE_01.takeaway.beforeYouCloseHeading}
                </h3>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                  {MIND_SYNC_MODULE_01.takeaway.beforeYouCloseBody.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        <aside className="w-1/4 border-l border-white/5 glass-panel flex flex-col shrink-0 sticky top-0 self-start">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">
              Module Contents
            </h2>
            <p className="text-xs text-slate-400">{TOC.length} sections</p>
          </div>
          <div className="flex-1 custom-scrollbar">
            {TOC.map((item) => {
              const isCurrent = active === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActive(item.key)}
                  className={`w-full text-left p-4 border-b flex items-start gap-3 transition-colors cursor-pointer ${
                    isCurrent
                      ? 'border-white/10 active-lesson-glow bg-indigo-500/10'
                      : 'border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {isCurrent ? (
                      <div className="w-6 h-6 rounded-full border border-indigo-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                        <span className="text-[10px] text-slate-500 font-bold">
                          {TOC.findIndex((t) => t.key === item.key) + 1}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs truncate ${isCurrent ? 'font-bold text-white' : 'font-medium text-slate-300'}`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`text-[10px] ${isCurrent ? 'text-indigo-400 font-semibold uppercase' : 'text-slate-500'}`}
                    >
                      {isCurrent ? 'Active' : 'Click to view'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </main>
    </div>
  );
}
